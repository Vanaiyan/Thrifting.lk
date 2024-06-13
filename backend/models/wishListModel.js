const mongoose = require("mongoose");

// Define the Wishlist schema
const WishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // Reference to the Product model
      },
    ],
  },
  { timestamps: true }
);

// Create and export the Wishlist model
const Wishlist = mongoose.model("Wishlist", WishlistSchema);
module.exports = Wishlist;
