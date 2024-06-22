const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const Seller = require("../models/sellerModel");
const sendToken = require("../utils/jwt");
const sendEmail = require("../utils/email");

exports.loginSeller = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter email & Password"));
  }

  const user = await Seller.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Seller username or password"));
  }

  if (!(await user.isValidPassword(password))) {
    return next(new ErrorHandler("Invalid Seller email or password"));
  }

  sendToken(user, 201, res);
});

exports.getSingleSeller = async (req, res, next) => {
  try {
    const seller = await Seller.findById(req.params.id);
    if (!seller) {
      return next(new ErrorHandler("Seller not found", 400));
    }

    res.status(200).json({
      success: true,
      seller,
    });
  } catch (err) {
    // Handle errors if any occurred during the process
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
