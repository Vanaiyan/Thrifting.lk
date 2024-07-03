const Feedback = require("../models/feedbackModel");
const Product = require("../models/productModel");
const Seller = require("../models/sellerModel");
const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const nodemailer = require("nodemailer");
const sendEmail = require("../utils/email");
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

exports.getFeedbacksByProductId = catchAsyncError(async (req, res, next) => {
  const productId = req.params.id;

  const feedbacks = await Feedback.find({ productId });
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
  const userId = req.user._id;
  console.log(productId, sellerId, rating, review, issueCategory);
  // Create the feedback object
  let feedbackData = {
    userId,
    productId,
    sellerId,
    review,
    rating,
    issueCategory,
  };

  try {
    // Fetch product information
    console.log("Product", productId);
    console.log("Seller", sellerId);
    const product = await Product.findById(productId);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    const feedback = await Feedback.create(feedbackData);
    // Check if issueCategory is "no_response" and product.isInterested is true
    if (issueCategory === "no_response" && product.isInterested) {
      // Fetch seller information
      const seller = await Seller.findById(sellerId);
      if (!seller) {
        return next(new ErrorHandler("Seller not found", 404));
      }
      // Prepare email options
      const emailOptions = {
        to: seller.email,
        subject: "User Feedback: No Response",
        text: `Dear ${seller.firstName},\n\nA user has reported that they have not received a response regarding the product "${product.name}". Please attend to this issue as soon as possible.\n\nThank you.`,
      };

      // Send the email
      await sendEmail(emailOptions);
    }

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
