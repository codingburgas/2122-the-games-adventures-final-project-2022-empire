import express, { Router, Request, Response } from "express";
import { LoggerManager } from "../helpers/loggerManager";
import User from "../models/Users";

const usersRouter: Router = express.Router();
const loggerManager = new LoggerManager();

usersRouter.get("/:username", async (req: Request, res: Response) => {
  loggerManager.logInfo(
    `Trying to get info for user with username: ${req.params.username}.`
  );

  const user = await User.getUsers().by({ username: req.params.username });

  if (user.length != 0) {
    loggerManager.logInfo(`User with username: ${req.params.username} found.`);
    return res.send(JSON.stringify(user[0]));
  }
  
  loggerManager.logWarn(
    `User with username: ${req.params.username} not found.`
  );

  return res.send(
    JSON.stringify({ response: "A user with that username doesn't exist!" })
  );
});

export default usersRouter;
