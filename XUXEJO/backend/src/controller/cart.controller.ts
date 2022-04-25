import { getRepository } from "typeorm";
import { Cart } from "../entity/Cart";
import { Controller } from "./controller";

export class CartController extends Controller {
    repository = getRepository(Cart);

    getMaxPreparation = async (req, res) => {
        try {
            const entity = await this.repository.query("SELECT MAX(preparation) as maxPreparation FROM orders");
            
            if(!entity) {
                res.status(404).json('No Entity Found To Be Deleted!');
                return;
            }

            res.json(entity);
        } catch(err) {
            console.log('No Entity');
        }
    };

    getMaxPrice = async (req, res) => {
        try {
            const entity = await this.repository.query("SELECT SUM(price) as sumPrice FROM orders");

            if(!entity) {
                res.status(404).json('No Entity Found To Be Deleted!');
                return;
            }
            

            res.json(entity);
        } catch(err) {
            console.log('No Entity');
        }
    };

    addFinal = async (req, res) => {
        const price = req.body.price;
        const preparation = req.body.preparation;
        const uploaderId = req.body.uploaderId;

        try {
            const order = {
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


}