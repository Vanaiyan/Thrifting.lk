const express = require("express");
const {
  getUsers,
  getUserProfile,
  getSellerProfile,
} = require("../controllers/chatController");
const router = express.Router();
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authenticate");

router.route("/getusers").get(isAuthenticatedUser, getUsers);
router.route("/user-profile").get(isAuthenticatedUser, getUserProfile);
router
  .route("/seller-profile/:sellerId")
  .get(isAuthenticatedUser, getSellerProfile);

module.exports = router;
