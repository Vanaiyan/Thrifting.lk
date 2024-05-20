const express = require("express");
const { isAuthenticatedUser } = require("../middlewares/authenticate");
const {
  getFeedbacksByProduct,
  createFeedback,
} = require("../controllers/feedbackController");
const router = express.Router();

router.route("/feedback").get(isAuthenticatedUser, getFeedbacksByProduct);
router.route("/feedback").post(isAuthenticatedUser, createFeedback);
module.exports = router;
