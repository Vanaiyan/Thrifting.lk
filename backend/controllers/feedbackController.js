const Feedback = require("../models/feedbackModel");
const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");

// Get all feedbacks for a specific product
exports.getFeedbacksByProduct = catchAsyncError(async (req, res, next) => {
  const { productId } = req.params;

  const feedbacks = await Feedback.find({ productId })
    .populate("userId", "name")
    .populate("sellerId", "name");

  if (!feedbacks) {
    return next(new ErrorHandler("Feedbacks not found for this product", 404));
  }

  res.status(200).json({
    success: true,
    feedbacks,
  });
});

// Post a new feedback
exports.createFeedback = catchAsyncError(async (req, res, next) => {
  const { productId, sellerId, rating, review, issueCategory } = req.body;
  const userId = req.user.id;

  // Create the feedback object without rating initially
  let feedbackData = {
    userId,
    productId,
    sellerId,
    review,
    rating,
    issueCategory,
  };

  // Add rating only if it is not null or undefined
  //   if (rating !== null && rating !== undefined) {
  //     feedbackData.rating = rating;
  //   }

  try {
    const feedback = await Feedback.create(feedbackData);

    res.status(201).json({
      success: true,
      message: "Feedback posted successfully",
      feedback,
    });
  } catch (error) {
    console.error("Error creating feedback:", error);
    next(error);
  }
});
