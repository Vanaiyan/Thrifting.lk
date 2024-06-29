const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// Define CartItemSchema
const CartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please enter firstname"],
  },
  lastName: {
    type: String,
    required: [true, "Please enter lastname"],
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
    unique: [true, "Email already have an account"],
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: String,
    default: "User",
  },
  // New fields
  address: {
    type: String,
    default: "",
  },
  dateOfBirth: {
    type: Date,
    default: null,
  },
  profilePicture: {
    type: String,
    default: "path/to/default/profile/picture.jpg", // Change this to your default profile picture path
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    default: "other",
  },
  // Products user interacted with, limited to 10
  interactedProducts: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    maxlength: 5, // Limiting the array length to 5
  },
  // New field for cart items
  cartItems: [CartItemSchema],
  resetPasswordToken: String,
  resetPasswordTokenExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJwtToken = function () {
  console.log("Expire Time : ", process.env.JWT_EXPIRES_TIME);
  return jwt.sign({ id: this.id, role: this.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

userSchema.methods.isValidPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.resetPassword = function () {
  const token = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  this.resetPasswordTokenExpire = Date.now() + 30 * 60 * 1000;

  return token;
};

userSchema.methods.getResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordTokenExpire = Date.now() + 30 * 60 * 1000;

  return resetToken;
};

let user = mongoose.model("user", userSchema);

module.exports = user;
