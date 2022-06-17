import  express, { Router, Request, Response } from "express";
import {UserReturnData, UserData} from "../types";
import { isLoginDataValid } from "../helpers/validations";
import {
    invalidArgumentsResponse,
    invalidDataResponse,
    notEnoughArgumentsResponse,
    successOrFailureResponse
} from "../constants";
import User from "../models/Users";
import { LoggerManager } from "../helpers/loggerManager";

const loginRouter: Router = express.Router();
const loggerManager = new LoggerManager();

loginRouter.post("/", (req: Request, res: Response) => {
    loggerManager.logDebug("Qsha");
    if(!(req.body.username && req.body.password))
        return res.send(notEnoughArgumentsResponse);

    if (typeof(req.body.username) != "string" || typeof(req.body.username) != "string")
        return res.send(invalidArgumentsResponse);

    const loginData: UserData = {
      username: req.body.username,
      password: req.body.password,
    };

    if(isLoginDataValid(loginData))
    {
        // TODO: Implement actual login
        User.loginUser(loginData)
        .then((value: UserReturnData | null) => {
            return res.send(successOrFailureResponse(value));
        });
    } else {
        return res.send(invalidDataResponse);
    }
})

export default loginRouter;
