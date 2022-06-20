import express, {Router, Request, Response} from "express";
import User from "../models/Users";
import { successOrFailureResponse } from "../constants";

const usersRouter: Router = express.Router();

usersRouter.get('/:id(\\d+)/', async(req: Request, res:Response) => {
   const user =  await User.getUsers().by({id: Number(req.params.id)});

   if (user.length != 0) {
      return res.send(JSON.stringify(user[0]));
   }
   return res.send(JSON.stringify({response: "A user with that id doesn't exist!"}));
});

usersRouter.get('/:username', async (req: Request, res: Response) => {
   const user = await User.getUsers().by({username: req.params.username});

   if(user.length != 0) {
      return res.send(JSON.stringify(user[0]));
   }
   return res.send(JSON.stringify({response: "A user with that username doesn't exist!"}));
});

usersRouter.delete('/:id(\\d+)/', async(req: Request, res:Response) => {
   await User.deleteUserById(Number(req.params.id));
});

usersRouter.post('/:username', async (req: Request, res: Response) => {
   if(typeof req.body.username !== "string")
      return res.send(JSON.stringify({response: "Invalid username"}));

   if(!req.body.username)
      return res.send(JSON.stringify({response: "No username provided"}));

   User.updateUserById({oldUsername: req.params.username, newUsername: req.body.username})
   .then((result) => {
      return res.send(successOrFailureResponse(result))
   })
});

export default usersRouter;
