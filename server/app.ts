import express, { Express, Request, Response} from "express";
import mysql, {Connection} from 'mysql2';

const app: Express = express()

const port = process.env.PORT || 4000;

const connection: Connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
})

connection.connect((err) => {
    if(err)
    {
        console.log(err);
        return;
    }
    console.log("Connected to the database!");
})

app.get('/', (req: Request, res: Response) =>  {
    res.send('Qsha');
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
