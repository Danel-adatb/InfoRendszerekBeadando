import { Repository } from "typeorm";

export class Controller {
    repository: Repository<any>;

    handleError = (res, status = 500, message = 'Internal Server Error!') => {
        res.status(status).json({message});
    }
}