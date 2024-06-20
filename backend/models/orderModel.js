const mongoose = require("mongoose");

// Define the Order schema
const orderSchema = new mongoose.Schema({
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Create the Order model
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
