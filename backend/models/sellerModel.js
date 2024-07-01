const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const addressSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
  },
  district: {
    type: String,
  },
  postalCode: {
    type: Number,
    validate: {
      validator: (value) => {
        return validator.isPostalCode(String(value), "any");
      },
      message: "Please enter a valid postal code",
    },
  },
});

//To store who interested in Products of this seller
const interestedUserSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});
const sellerSchema = new mongoose.Schema({
  role: {
    type: String,
    default: "Seller",
    immutable: true,
  },
  firstName: {
    type: String,
    required: [true, "Please enter firstname"],
  },
  lastName: {
    type: String,
    required: [true, "Please enter lastname"],
  },

  password: {
    type: String,
    required: true,
    select: false,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already have an account"],
    validate: [validator.isEmail, "Please enter a valid email"],
    lowercase: true,
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number required"],
    validate: {
      validator: (value) => {
        const sriLankanPhoneNumberRegex = /^(?:0)?[0-9]{10}$/;
        return sriLankanPhoneNumberRegex.test(value);
      },
      message: "Please enter a valid phone number in the format 07xxxxxxxx",
    },
  },

  addressField: addressSchema,

  nicNumber: {
    type: String,
    required: [true, "Please enter NIC number"],
    immutable: true,
    unique: [true, "Enter valid NIC number"],
  },
  nicName: {
    type: String,
  },

  frontImage: {
    type: String,
    required: true,
  },
  backImage: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },
  authenticated: {
    type: Boolean,
    default: false,
  },
  warnings: [
    {
      issueCategory: { type: String, required: true },
      date: { type: Date, default: Date.now }
    }
  ],

  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],

  interestedUsers: [interestedUserSchema], 
});

sellerSchema.query.byName = function (firstName) {
  return this.find({ firstName: new RegExp(firstName, "i") });
};

sellerSchema.query.byNicNumber = function (nicNumber) {
  return this.find({ nicNumber: new RegExp("^" + nicNumber, "i") });
};

sellerSchema.query.byId = function (_id) {
  return this.find({ _id: new RegExp(_id, "i") });
};

sellerSchema.methods.getJwtToken = function () {
  console.log("Expire Time : ", process.env.JWT_EXPIRES_TIME);
  return jwt.sign({ id: this.id, role: this.role }, process.env.JWT_SECRET, {
    // expiresIn: "59s",
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

sellerSchema.methods.isValidPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Seller", sellerSchema);
