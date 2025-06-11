const Mongoose = require("mongoose");

const { Schema } = Mongoose;

// Cart Item Schema
const CartItemSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "productId",
  },
  productName: {
    type: String,
    default: "",
  },
  quantity: Number,
});

// Cart Schema
const CartSchema = new Schema({
  products: [CartItemSchema],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Mongoose.model("Cart", CartSchema);
