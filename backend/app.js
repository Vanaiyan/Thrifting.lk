const express = require("express");
const app = express();
const cors = require("cors");
const errorMiddleware = require("./middlewares/error");
const products = require("./routes/product");
const auth = require("./routes/auth");
const chat = require("./routes/chat");

const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api", products);
app.use("/api", auth);
app.use("/api", chat);

app.use(errorMiddleware);
module.exports = app;
