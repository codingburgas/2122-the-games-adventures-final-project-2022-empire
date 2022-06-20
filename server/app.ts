import express, { Express, Request, Response} from "express";
import usersRouter from "./routes/users";
import registerRouter from "./routes/register"
import loginRouter from "./routes/login";
import { LoggerManager } from "./helpers/loggerManager";

const app: Express = express()

app.use(express.json());
app.use(express.urlencoded());
app.use((req: Request, res: Response, next: Function) => {
    res.contentType("application/json");
    next();
});

app.use("/api/register", registerRouter);
app.use("/api/login", loginRouter);
app.use("/api/users", usersRouter);

const port = process.env.PORT || 4000;

app.get('/', (req: Request, res: Response) =>  {
    res.send('Qsha');
});

app.listen(port, () => {
    const loggerManager = new LoggerManager();

    loggerManager.logInfo(`Server is running on port ${port}`);
})
