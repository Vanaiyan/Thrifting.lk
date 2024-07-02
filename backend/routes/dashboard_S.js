const express = require("express");
const router = express.Router();
const {isAuthenticatedUser, authorizeRoles} = require('../middlewares/authenticate');

const Dashboard_S = require("../controllers/sellerDashboardController");

router
  .route("/authenticate/:sellerId")
  .get(Dashboard_S.authenticateSeller);

router
  .route("/myproducts/:sellerId")
  .get(isAuthenticatedUser,authorizeRoles("Seller"),Dashboard_S.getProductsBySellerId);

router
  .route("/myproducts/orderManage/:sellerId")
  .get(isAuthenticatedUser,authorizeRoles("Seller"),Dashboard_S.getProductOrderDetails);

router
  .route("/myproducts/changeSoldStatus/:productId")
  .put(isAuthenticatedUser,authorizeRoles("Seller"),Dashboard_S.changeSoldProductStatus);

router
  .route("/myproducts/changeNotSoldStatus/:productId")
  .put(isAuthenticatedUser,authorizeRoles("Seller"),Dashboard_S.changeNotSoldProductStatus);

router
  .route("/profile/:sellerId")
  .get(isAuthenticatedUser,authorizeRoles("Seller"),Dashboard_S.getSellerProfile)
  .put(isAuthenticatedUser,authorizeRoles("Seller"),Dashboard_S.updateSellerProfile);

router
  .route("/profile/editPassword/:sellerId")
  .put(isAuthenticatedUser,authorizeRoles("Seller"),Dashboard_S.updateSellerPassword);

router
  .route("/profile/validatePassword/:sellerId")
  .put(isAuthenticatedUser,authorizeRoles("Seller"),Dashboard_S.validateSellerPassword);

module.exports = router;
