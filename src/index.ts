import express,{ Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();



const userController = require("./controller/user.controller");
const blogController = require("./controller/blog.controller");




const app = express();
const port = process.env.PORT || 8000;




app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use("/user", userController);
app.use("/blog", blogController);





app.get("/",(req: Request,res: Response)=>{
    res.send("Hello this is test routing API.");
});

app.listen(port, ()=>{
    console.log("Server is running on port : ",port);
});