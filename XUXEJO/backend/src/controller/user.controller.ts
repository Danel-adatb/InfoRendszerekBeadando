import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { Controller } from "./controller";
import { validate } from "class-validator";
import { Request, Response } from "express";
import jwt = require('jsonwebtoken');

const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

export class UserController extends Controller{
    repository = getRepository(User);

    fetchAll = async (req, res, next) => {
        try {
            const entities = await this.repository.find();

            if(!(entities.length > 0)) {
                res.status(404).json({message: "No User Found!"})
                return;
            }

            res.status(200).json(entities);
        } catch (err) {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        }
    }

    createUser = async (req, res, next) => {
        const name = req.body.name;
        const number = req.body.number;
        const email = req.body.email;
        const password = req.body.password;
        const role = req.body.role;

        try {
            const user = {
                name: name,
                number: number,
                email: email,
                password: await bcrypt.hash(password, 12),
                role: role
            };

            const result = await this.repository.save(user);
        } catch(err) {
            console.log(err);
            res.status(409).send("Email already in use");
            return;
        }

        
        res.status(201).json({ message: 'Added User Successfully!'})
    }

    deleteUser = async (req, res, next) => {
        try {
            const entity = await this.repository.findOneOrFail(req.params.id);

            if(!entity) {
                res.status(404).json({message: 'No such Entity to delete!'});
                return;
            }

            const del = await this.repository.delete(req.params.id);

            res.status(200).json(del);
        } catch (err) {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        }
    }

    register = async (req, res) => {

        const errors = validationResult(req);

        if(!errors.isEmpty()) return;

        const name = req.body.name;
        const number = req.body.number;
        const email = req.body.email;
        const password = req.body.password;
        const role = 'USER';

        try {
            const hashedPassword = await bcrypt.hash(password, 12)
            const userDetails = {
                name: name,
                number: number,
                email: email,
                password: hashedPassword,
                role: role
            };

            if(email == userDetails.email) {
                res.status(400).json({message: 'This email is already used'})
                return;
            }

            const result = await this.repository.save(userDetails);
            res.status(201).json({ message: 'User is registered!'})
        } catch(err) {
            console.error(err);
            res.json(err);
        }
    };

    login = async (req: Request, res: Response) => {
        const email = req.body.email;
        const password = req.body.password;

        try {
            const user = await this.repository.findOneOrFail({where: {email}});

            const isEqual = await bcrypt.compare(password, user.password);

            if(!isEqual) {
                res.status(404).json("Wrong password");
                return;
            }

            const token = jwt.sign(
                {
                    email: user.email,
                    id: user.id,
                    role: user.role
                },
                'secretfortoken',
                {
                    expiresIn: '1h'
                }
            );

            res.status(200).json({ token: token, id: user.id, role: user.role});
        } catch(e) {
            res.status(404).json("Wrong email");
        }
    }
}