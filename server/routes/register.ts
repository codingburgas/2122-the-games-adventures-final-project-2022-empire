import express, {Router, Request, Response} from "express";

const registerRouter: Router = express.Router();

registerRouter.post("/", (req: Request, res: Response) => {
    if(!(req.body.username && req.body.password))
        return res.send(JSON.stringify({response: "Not enough arguments!"}));

    if (typeof(req.body.username) != "string" || typeof(req.body.username != "string"))
        return res.send(JSON.stringify({response: "Invalid arguments"}));

    const username: string = req.body.username;
    const password: string = req.body.password;


});

export default registerRouter;
