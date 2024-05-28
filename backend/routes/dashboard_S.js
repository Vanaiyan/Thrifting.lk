const express = require("express");
const router = express.Router();

const path = require("path");
const Dashboard_S = require("../controllers/sellerDashboardController");

router.route("/myproducts/:sellerId").get(Dashboard_S.getProductsBySellerId);

router.route("/myproduct").get(Dashboard_S.getProductsBySellerId);
router.route("/myproducts/:productId").put(Dashboard_S.changeProductStatus);

router
  .route("/profile/:sellerId")
  .get(Dashboard_S.getSellerProfile)
  .put(Dashboard_S.updateSellerProfile);

module.exports = router;
