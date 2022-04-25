import express = require("express");
import "reflect-metadata";
import { createConnection } from "typeorm";
import { connectionOptions } from "../ormconfig";
import { getRouter } from "./routes";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";


createConnection(connectionOptions).then(async connection => {

    const app = express();

    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());
    app.use(express.json());
    app.use('/api', getRouter());

    app.listen(3000, () => console.log('Successfully listening on Port 3000...'));

}).catch(error => console.log(error));
