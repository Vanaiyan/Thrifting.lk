const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter the Product name"],
    trim: true,
    maxlength: [100, "Product name cannot exceed 100 characters"],
  },
  price: {
    type: Number,
    default: 0.0,
  },
  discount: {
    type: Number,
    default: 0.0,
  },
  category: {
    type: String,
    required: [true, "Please Enter product Category"],
  },
  description: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
let schema = mongoose.model("Product", productSchema);
module.exports = schema;
