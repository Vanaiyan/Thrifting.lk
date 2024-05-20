const express = require("express");
const { isAuthenticatedUser } = require("../middlewares/authenticate");
const {
  getFeedbacksByProduct,
  createFeedback,
} = require("../controllers/feedbackController");
const router = express.Router();

router.route("/feedback").get(isAuthenticatedUser, getFeedbacksByProduct); //Add a product to the cart
router.route("/feedback").post(isAuthenticatedUser, createFeedback); //Add a product to the cart

module.exports = router;
