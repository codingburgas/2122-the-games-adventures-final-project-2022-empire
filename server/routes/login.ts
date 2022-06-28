import express, { Router, Request, Response } from "express";
import { UserReturnData, UserData } from "../types";
import { isLoginDataValid } from "../helpers/validations";
import {
  invalidArgumentsResponse,
  invalidDataResponse,
  notEnoughArgumentsResponse,
  successOrFailureResponse,
} from "../constants";
import User from "../models/Users";
import { LoggerManager } from "../helpers/loggerManager";

const jwt = require("jsonwebtoken");
const loginRouter: Router = express.Router();
const loggerManager = new LoggerManager();

loginRouter.use(express.json());
loginRouter.use(express.urlencoded());

/**
 * Attempts to log in a user with given username and password
 */
loginRouter.post("/", (req: Request, res: Response) => {
  if (!(req.body.username && req.body.password)) {
    loggerManager.logWarn(
      `Login failed. Reason: Not enough arguments in request.`
    );

    return res.send(notEnoughArgumentsResponse);
  }

  if (
    typeof req.body.username != "string" ||
    typeof req.body.username != "string"
  ) {
    loggerManager.logWarn(
      `Login failed. Reason: Invalid arguments in request.`
    );

    return res.send(invalidArgumentsResponse);
  }

  const loginData: UserData = {
    username: req.body.username,
    password: req.body.password,
  };

  if (!isLoginDataValid(loginData)) {
    loggerManager.logWarn(`Login failed. Reason: Validations failed.`);
    return res.send(invalidDataResponse);
  }

  // TODO: Implement actual login
  User.loginUser(loginData).then((value: UserReturnData | null) => {
    if (!value) {
        loggerManager.logWarn(`Login failed. Reason: Database refused.`);
        return res.send(successOrFailureResponse(value));
    }

    const accessToken = jwt.sign({
        expiresIn: "1d",
        subject: value.id
    }, process.env.ACCESS_TOKEN_SECRET);

    return res.send(successOrFailureResponse(value, accessToken));
  });
});

export default loginRouter;
