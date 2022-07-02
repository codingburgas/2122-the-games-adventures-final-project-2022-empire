import express, { Router, Request, Response } from "express";
import { LoggerManager } from "../helpers/loggerManager";
import User from "../models/Users";
import { successOrFailureResponse } from "../constants";
import AuthMiddleware from "../middlewares/authMiddleware";
import { isUpdateDataValid } from "../helpers/validations";

const usersRouter: Router = express.Router();
const loggerManager = new LoggerManager();

usersRouter.use(express.json());
usersRouter.use(express.urlencoded());

/**
 * Returns a user's id and username based on the user's id.
 * @async
 */
usersRouter.get('/:id(\\d+)/', async(req: Request, res:Response) => {
   loggerManager.logInfo(
      `Trying to get info for user with id: ${req.params.id}.`
    );

   const user =  await User.getUsers().by({id: Number(req.params.id)});

   if (user.length != 0) {
      return res.send(JSON.stringify(user[0]));
   }
   return res.send(JSON.stringify({response: "A user with that id doesn't exist!"}));
});

/**
 * Returns the current logged in user's username and id
 */
usersRouter.use(AuthMiddleware).get('/@me',async (req:Request, res:Response) => {
  loggerManager.logInfo(
    `Trying to get info for user with id: ${req.id}.`
  );

  const user = await User.getUsers().by({ id: req.id });

  if (user.length != 0) {
    loggerManager.logInfo(`User with id: ${req.id} found.`);
    return res.send({response: "Success", data: user[0]});
  }

  loggerManager.logWarn(
    `User with username: ${req.params.username} not found.`
  );

  return res.send(
    JSON.stringify({ response: "A user with that username doesn't exist!" })
  );
})

/**
 * Returns a user's id and username based on the user's username
 */
usersRouter.get('/:username', async (req: Request, res: Response) => {
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

/**
 * Deletes the current logged in user
 */
usersRouter.use(AuthMiddleware).delete('/@me', async(req: Request, res:Response) => {
  loggerManager.logInfo(
    `Trying to delete user with id: ${req.id}.`
  );

  User.deleteUserById(Number(req.id));

   loggerManager.logInfo(`User with id: ${req.id} deleted.`);
   return res.send(successOrFailureResponse(true));
});

/**
 * Updates the current logged user's username or id
 */
usersRouter.use(AuthMiddleware).patch('/@me', async (req: Request, res: Response) => {
  loggerManager.logInfo("Trying to update user with id: " + req.id);

  if(!req.body.username) {
     loggerManager.logWarn(`Update failed. Reason: Not enough arguments in request.`);
     return res.send(JSON.stringify({response: "No username provided"}));
  }

  if(typeof req.body.username !== "string") {
      loggerManager.logWarn(`Update failed. Reason: Invalid arguments in request.`);
      return res.send(JSON.stringify({response: "Invalid username"}));
   }

   if (!isUpdateDataValid({ username: req.body.username, password: 'undefined' })) {
    loggerManager.logWarn(`Update failed. Reason: Invalid arguments in request.`);
    return res.send(JSON.stringify({response: "Invalid username"}));
   }

   User.updateUserById({id: req.id, newUsername: req.body.username})
   .then((result) => {
      result ?
      loggerManager.logInfo(`Update successful.`) :
      loggerManager.logWarn(`Update failed. Reason: Database refused.`);

      return res.send(successOrFailureResponse(result))
   })
});

export default usersRouter;
