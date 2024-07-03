const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/userModel");
const sendToken = require("../utils/jwt");
const sendEmail = require("../utils/email");
const crypto = require("crypto");
const { log } = require("console");

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { firstName, lastName, email, password, avatar } = req.body;
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
  });

  sendToken(user, 201, res);
});

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter email & Password"));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid username or password"));
  }

  if (!(await user.isValidPassword(password))) {
    return next(new ErrorHandler("Invalid email or password"));
  }

  sendToken(user, 201, res);
});

exports.logoutUser = (req, res, next) => {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .status(200)
    .json({
      success: true,
      message: "LoggedOut",
    });
};

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found with this"));
  }

  const resetToken = user.getResetToken();
  const ReceiverEmail = user.email;
  // console.log("Reset : ", resetToken);
  // console.log("Email : ", ReceiverEmail);

  try {
    await user.save();

    const resetUrl = `${req.protocol}://localhost:3000/password/reset/${resetToken}`;
    const text = `Your password reset link \n\n${resetUrl}`;

    sendEmail({
      to: user.email,
      subject: "Password Recovery",
      text,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email}`,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message), 500);
  }
});

exports.resetPassword = catchAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordTokenExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHandler("Password reset token expired"));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordTokenExpire = undefined;
  await user.save({ validateBeforeSave: false });

  sendToken(user, 201, res);
});

exports.changePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  if (!(await user.isValidPassword(req.body.oldPassword))) {
    return next(new ErrorHandler("Old Password is Incorrect"));
  }

  user.password = req.body.password;
  await user.save();

  res.status(200).json({
    success: true,
    user,
  });
});

// exports.updateProfile = catchAsyncError(async (req, res, next) => {
//   const newUserData = {
//     name: req.body.name,
//     email: req.body.email,
//   };

//   const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
//     new: true,
//     runValidators: true,
//   });

//   res.status(200).json({
//     success: true,
//     user,
//   });
// });

exports.getUserInfo = (req, res) => {
  try {
    // console.log("Requested User", req.user);
    // Return the user information from req.user
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve user information." });
  }
};

exports.updateUserInfo = catchAsyncError(async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      address,
      gender,
      dateOfBirth,
      currentPassword,
      newPassword,
    } = req.body;

    const user = await User.findById(req.user.id).select("+password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Check if the email is being updated
    if (user.email !== email) {
      const emailExists = await User.findOne({ email });

      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: "The email address is already in use",
        });
      }
    }

    // Update user profile information
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.address = address || user.address;
    user.gender = gender || user.gender;
    user.dateOfBirth = dateOfBirth || user.dateOfBirth;

    if (currentPassword && newPassword) {
      if (!(await user.isValidPassword(currentPassword))) {
        return res
          .status(400)
          .json({ success: false, message: "Wrong current password" });
      }
      user.password = newPassword;
    }

    await user.save();

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler("Server Error", 500));
  }
});

exports.updateUserProfilePicture = catchAsyncError(async (req, res, next) => {
  try {
    const { profilePicture } = req.body;

    const user = await User.findById(req.user.id).select("+password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    user.profilePicture = profilePicture;

    await user.save();

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler("Server Error", 500));
  }
});
