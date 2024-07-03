const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Seller = require("../models/sellerModel");
const Admin = require("../models/adminModel");

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  console.log("TokenCheck"0;
  console.log("Token : ", token);
  if (!token) {
    return next(new ErrorHandler("Login First to Access", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, role } = decoded;
    // console.log("data of user", id, role);
    let user;

    if (role === "User") {
      user = await User.findById(id);
    } else if (role === "Seller") {
      user = await Seller.findById(id);
    } else if (role === "Admin") {
      user = await Admin.findById(id);
    }

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    req.user = user;
    req.user.role = role; // Attach role to req.user
    // console.log(req.user);
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token expired. Please log in again." });
    }
    return res
      .status(401)
      .json({ message: "Invalid token. Please log in again." });
  }
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorHandler(`Role ${req.user.role} is not allowed`));
    }
    next();
  };
};
