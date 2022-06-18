import express, {Router, Request, Response} from "express";
import User from "../models/Users";

const usersRouter: Router = express.Router();

usersRouter.get('/:username', async (req: Request, res: Response) => {
   const user = await User.getUsers().by({username: req.params.username});

   if(user.length != 0) {
      return res.send(JSON.stringify(user[0]));
   }
   return res.send(JSON.stringify({response: "A user with that username doesn't exist!"}));
});

export default usersRouter;
