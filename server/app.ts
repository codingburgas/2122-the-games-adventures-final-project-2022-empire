import express, { Express, Request, Response} from "express";
import usersRouter from "./routes/users";
import registerRouter from "./routes/register"
import loginRouter from "./routes/login";

const app: Express = express()

app.use(express.json());
app.use(express.urlencoded());

app.use("/api/users", usersRouter);
app.use("/api/register", registerRouter);
app.use("/api/login", loginRouter);
app.use("/api/users", usersRouter);

const port = process.env.PORT || 4000;

app.get('/', (req: Request, res: Response) =>  {
    res.send('Qsha');
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
