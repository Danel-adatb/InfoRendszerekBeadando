
import { getRepository } from "typeorm";
import { Orders } from "../entity/Orders";
import { Controller } from "./controller";

export class OrderController extends Controller {
    repository = getRepository(Orders);

    fetchAll = async (req, res, next) => {
        try {
            const entities = await this.repository.find();

            if(!(entities.length > 0)) {
                res.status(404).json({message: "No Order Found!"})
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

    AddOrder = async (req, res, next) => {
        const foodName = req.body.foodName;
        const imgUrl = req.body.imgUrl;
        const category = req.body.category;
        const description = req.body.description;
        const price = req.body.price;
        const preparation = req.body.preparation;
        const uploaderId = req.body.uploaderId;

        try {
            const order = {
                foodName: foodName,
                imgUrl: imgUrl,
                category: category,
                description: description,
                price: price,
                preparation: preparation,
                uploaderId: uploaderId
            };

            const result = await this.repository.save(order);
        } catch(err) {
            console.log(err);
            return;
        }

        res.status(201).json({ message: 'Added Order Successfully!'})
    }

    deleteOrder = async (req, res, next) => {
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

    deleteAllOrder = async (req, res, next) => {
        try {
            const entity = await this.repository.query("DELETE FROM orders");

            if(!entity) {
                res.status(404).json({message: 'No such Entity to delete!'});
                return;
            }

            const del = await this.repository.delete(entity);

            res.status(200).json(del);
        } catch(err) {
            res.json({message: "Something went wrong", error: err})
        }
    }
}