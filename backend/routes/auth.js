const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserProfile,
  changePassword,
  updateProfile,
  getUserInfo,
  updateUserInfo,
  updateUserProfilePicture,
} = require("../controllers/authController");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authenticate");
const { loginSeller } = require("../controllers/sellerAuthController");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").post(resetPassword);
router.route("/password/change").put(isAuthenticatedUser, changePassword);
router.route("/user").get(isAuthenticatedUser, getUserInfo);
router.route("/user").put(isAuthenticatedUser, updateUserInfo);
router.route("/user/profilePicture").put(isAuthenticatedUser, updateUserProfilePicture);


// router.route("/myprofile").get(isAuthenticatedUser, getUserProfile);
// router.route("/update").put(isAuthenticatedUser, updateProfile);

router.route("/seller/login").post(loginSeller);

module.exports = router;
