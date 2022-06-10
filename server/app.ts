import express, { Express, Request, Response} from "express";
import mysql, {Connection} from 'mysql2';

const app: Express = express()

const port = process.env.PORT || 4000;

const connection: Connection = mysql.createConnection({
    host: 'mysqldb',
    user: 'root',
    password: 'idk',
    port: 3306,
})

connection.connect((err) => {
    if(err)
    {
        console.log(err);
        return;
    }
    console.log("Pog");
})

app.get('/', (req: Request, res: Response) =>  {
    res.send('Qsha!');
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
