"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const userController = require("./controller/user.controller");
const blogController = require("./controller/blog.controller");
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use("/user", userController);
app.use("/blog", blogController);
app.get("/", (req, res) => {
    res.send("Hello this is test routing API.");
});
app.listen(port, () => {
    console.log("Server is running on port : ", port);
});
