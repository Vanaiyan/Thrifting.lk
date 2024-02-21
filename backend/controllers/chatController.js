const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/userModel");
const APIFeatures = require("../utils/apiFeatures");

exports.getUsers = catchAsyncError(async (req, res, next) => {
  let query;

  if (req.query) {
    query = new APIFeatures(User.find(), req.query).searchuser().query;
  } else {
    query = User.find();
  }

  const users = await query;

  if (!users) {
    return next(new ErrorHandler("No users found", 404));
  }

  res.status(200).json({
    success: true,
    users,
  });
});

exports.getUserProfile = catchAsyncError(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    // Handle other errors (e.g., database connection error)
    return next(
      new ErrorHandler("An error occurred while fetching user profile", 500)
    );
  }
});
