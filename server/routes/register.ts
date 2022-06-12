import express, {Router, Request, Response} from "express";
import {isRegisterDataValid} from "../validations";
import User from "../models/Users";
import {RegisterData} from "../types";

const registerRouter: Router = express.Router();

registerRouter.post("/", (req: Request, res: Response) => {
    if(!(req.body.username && req.body.password))
        return res.send(JSON.stringify({response: "Not enough arguments!"}));

    if (typeof(req.body.username) != "string" || typeof(req.body.username) != "string")
        return res.send(JSON.stringify({response: "Invalid arguments"}));

    const username: string = req.body.username;
    const password: string = req.body.password;

    const data: RegisterData = {
        username: username,
        password: password
    };

    if(isRegisterDataValid(data)) {
        res.send(User.registerUser({username: data.username, password: data.password}));
    }

});

export default registerRouter;
