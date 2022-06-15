import  express, { Router, Request, Response } from "express";
import { UserData } from "../types";
import { isLoginDataValid } from "../validations";
import { invalidArgumentsResponse, invalidDataResponse, notEnoughArgumentsResponse } from "../constants";

const loginRouter: Router = express.Router();

loginRouter.post("/", (req: Request, res: Response) => {
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
        return res.send(JSON.stringify({response: "Success"}));
    } else {
        return res.send(invalidDataResponse);
    }
})
