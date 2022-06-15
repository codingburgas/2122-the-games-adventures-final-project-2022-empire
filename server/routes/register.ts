import express, { Router, Request, Response } from "express";
import { isRegisterDataValid } from "../validations";
import User from "../models/Users";
import {UserReturnData, UserData} from "../types";
import {
    invalidArgumentsResponse,
    invalidDataResponse,
    notEnoughArgumentsResponse,
    successOrFailureResponse
} from "../constants";

const registerRouter: Router = express.Router();

registerRouter.post("/", (req: Request, res: Response) => {
    if(!(req.body.username && req.body.password))
        return res.send(notEnoughArgumentsResponse);

    if (typeof(req.body.username) != "string" || typeof(req.body.username) != "string")
        return res.send(invalidArgumentsResponse);

    const registerData: UserData = {
        username: req.body.username,
        password: req.body.password,
    };

    if(isRegisterDataValid(registerData)) {
        User.registerUser({username: registerData.username, password: registerData.password})
        .then((value: UserReturnData | null) => {
            return res.send(successOrFailureResponse(value));
        });
    } else {
        return res.send(invalidDataResponse);
    }

});

export default registerRouter;
