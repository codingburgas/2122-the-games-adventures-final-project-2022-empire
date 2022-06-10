import express, { Express, Request, Response} from "express";

const app: Express = express()

const port = process.env.PORT || 4000;

app.get('/', (req: Request, res: Response) =>  {
    res.send('Qsha!');
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
