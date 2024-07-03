const express = require("express");
const { isAuthenticatedUser ,authorizeRoles} = require("../middlewares/authenticate");
const {
  getFeedbacksByProduct,
  getFeedbacksByProductId,
  createFeedback,
} = require("../controllers/feedbackController");
const router = express.Router();

router.route("/feedback").get(isAuthenticatedUser, getFeedbacksByProduct);
router.route("/feedback").post(isAuthenticatedUser, createFeedback);

router.route("/feedback/:id").get(isAuthenticatedUser,authorizeRoles("Seller"),getFeedbacksByProductId);
module.exports = router;
