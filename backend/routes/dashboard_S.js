const express = require("express");
const router = express.Router();

const path = require("path");
const SellerProduct = require("../controllers/sellerDashboardController");

 router.route("/myproduct/:sellerId").get(SellerProduct.getProductsBySellerId);

module.exports = router;
