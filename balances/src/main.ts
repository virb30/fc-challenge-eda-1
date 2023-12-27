import express, { Request, Response } from 'express';


const app = express();


app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.status(200);
    return res.json({ message: "Hello, World" });
});


app.listen(3003, () => {
    console.log("balances service is running");
});