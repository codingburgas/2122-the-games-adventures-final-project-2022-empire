import express, { Router, Request, Response } from "express";
import { isRegisterDataValid } from "../helpers/validations";
import User from "../models/Users";
import { UserReturnData, UserData } from "../types";
import {
  invalidArgumentsResponse,
  invalidDataResponse,
  notEnoughArgumentsResponse,
  successOrFailureResponse,
} from "../constants";
import { LoggerManager } from "../helpers/loggerManager";

const registerRouter: Router = express.Router();
const loggerManager = new LoggerManager();

registerRouter.use(express.json());
registerRouter.use(express.urlencoded());

/**
 * Attempts to register a user with given username and password
 */
registerRouter.post("/", (req: Request, res: Response) => {
  loggerManager.logInfo(
    `User with username: ${req.body.username} is trying to register.`
  );

  if (!(req.body.username && req.body.password)) {
    loggerManager.logWarn(
      `Register failed. Reason: Not enough arguments in request.`
    );

    return res.send(notEnoughArgumentsResponse);
  }

  if (
    typeof req.body.username != "string" ||
    typeof req.body.password != "string"
  ) {
    loggerManager.logWarn(
      `Register failed. Reason: Invalid arguments in request.`
    );

    return res.send(invalidArgumentsResponse);
  }

  const registerData: UserData = {
    username: req.body.username,
    password: req.body.password,
  };

  if (!isRegisterDataValid(registerData)) {
    loggerManager.logWarn(`Register failed. Reason: Validations failed.`);

    return res.send(invalidDataResponse);
  }

  User.registerUser(registerData).then((value: UserReturnData | null) => {
    value
      ? loggerManager.logInfo(`Register successful.`)
      : loggerManager.logWarn("Register failed. Reason: Database refused.");

    return res.send(successOrFailureResponse(value));
  });
});

export default registerRouter;
