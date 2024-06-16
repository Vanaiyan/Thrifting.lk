const express = require("express");
const { getOrdersByUserId } = require("../controllers/orderController"); // Adjust the import path
const { isAuthenticatedUser } = require("../middlewares/authenticate");

const router = express.Router();

router.route("/orders").get(isAuthenticatedUser, getOrdersByUserId);

module.exports = router;
