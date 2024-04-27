const express = require("express");
const app = express();
const cors = require("cors");
const errorMiddleware = require("./middlewares/error");
const products = require("./routes/product");
const auth = require("./routes/auth");
const chat = require("./routes/chat");
const cart = require("./routes/cart");
const wishlist = require("./routes/wishList");
const register_S = require("./routes/register_S");

const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api", products);
app.use("/api", auth);
app.use("/api", chat);
app.use("/api", cart);
app.use("/api", wishlist);
app.use("/seller", register_S);

app.use(errorMiddleware);
app.set("trust proxy", 1);

module.exports = app;
