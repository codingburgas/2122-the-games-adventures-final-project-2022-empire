import express, { Express, Request, Response } from "express";
import usersRouter from "./routes/users";
import registerRouter from "./routes/register";
import loginRouter from "./routes/login";
import { LoggerManager } from "./helpers/loggerManager";
import cors from 'cors';
import { createServer } from 'http';
import {Server, Socket} from 'socket.io';
import {auth} from "./middlewares/authSocket";
import {onPlayerMovement} from "./routes/webSocket";

const app: Express = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(express.static(process.cwd() + "/client"));
app.use(cors());
app.use((req: Request, res: Response, next: Function) => {
  res.contentType("application/json");
  next();
});

app.use("/api/register", registerRouter);
app.use("/api/login", loginRouter);
app.use("/api/users", usersRouter);

const port = process.env.PORT || 4000;

app.get("/", (req: Request, res: Response) => {
  res.contentType(".html").sendFile(process.cwd() + "/client/index.html");
});

const httpServer = createServer(app);

const io = new Server(httpServer);

io.use(auth);

io.on('connection', (socket: Socket) => {
  socket.on('playerMovement', (data) => {
    onPlayerMovement(socket, JSON.parse(data));
  })
});

httpServer.listen(port);
