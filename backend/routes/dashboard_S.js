const express = require("express");
const router = express.Router();

const path = require("path");
const Dashboard_S = require("../controllers/sellerDashboardController");

 router.route("/myproduct/:sellerId").get(Dashboard_S.getProductsBySellerId);
 router.route("/profile").get(Dashboard_S.getSellerProfile);
 

module.exports = router;
