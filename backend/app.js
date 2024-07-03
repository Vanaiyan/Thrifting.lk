const express = require("express");
const app = express();
const cors = require("cors");
const errorMiddleware = require("./middlewares/error");
const products = require("./routes/product");
const auth = require("./routes/auth");
const chat = require("./routes/chat");
const cart = require("./routes/cart");
const feedback = require("./routes/feedback");
const wishlist = require("./routes/wishList");
const register_S = require("./routes/register_S");
const dashboard_S = require("./routes/dashboard_S");
const admin = require("./routes/admin");
const cookieParser = require("cookie-parser");
const orderRoutes = require("./routes/order"); // Adjust the import path
const path = require('path');

// Require cron jobs
const cronJobs = require("./controllers/cronJobs");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://thrifting-lk-fe.onrender.com",
    credentials: true,
  })
);

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'frontend/build')));

app.use("/api", products);
app.use("/api", auth);
app.use("/api", chat);
app.use("/api", feedback);
app.use("/api", dashboard_S);
app.use("/api", cart);
app.use("/api", wishlist);
app.use("/seller", register_S);
app.use("/api", admin);
app.use("/api", orderRoutes);

app.use(errorMiddleware);
app.set("trust proxy", 1);

// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'));
});

// Initialize cron jobs
cronJobs;

module.exports = app;
