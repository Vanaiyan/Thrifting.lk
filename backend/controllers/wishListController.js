const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const Wishlist = require("../models/wishListModel");

exports.addToWishlist = catchAsyncError(async (req, res, next) => {
  // Extract the user ID and product ID from the request body
  const { productId } = req.body;
  const userId = req.user._id;

  try {
    // 1. Check if there is a document for the userId
    let wishlistItem = await Wishlist.findOne({ user: userId });

    if (!wishlistItem) {
      // If there is no document for the userId, create a new one
      wishlistItem = await Wishlist.create({
        user: userId,
        products: [],
      });
    }

    // 2. Check if the productId is already in the wishlist
    const productIndex = wishlistItem.products.indexOf(productId);
    if (productIndex === -1) {
      // If the productId is not in the wishlist, push it into the array
      wishlistItem.products.push(productId);
    } else {
      // 3. If the productId is already in the wishlist, remove it from the array
      wishlistItem.products.splice(productIndex, 1);
    }

    // Save the changes to the wishlist document
    await wishlistItem.save();

    res.status(200).json({ success: true, wishlistItem });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

//Remove an Item from the list
exports.removeFromWishlist = catchAsyncError(async (req, res, next) => {
  // Extract the user ID and product ID from the request body
  const { productId } = req.params;
  const userId = req.user._id;

  try {
    // Find the wishlist item for the user
    const wishlistItem = await Wishlist.findOne({ user: userId });

    if (!wishlistItem) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found for the user",
      });
    }

    // Check if the product exists in the wishlist
    const productIndex = wishlistItem.products.indexOf(productId);
    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Product not found in the wishlist",
      });
    }

    // Remove the product from the wishlist
    wishlistItem.products.splice(productIndex, 1);
    await wishlistItem.save();

    res
      .status(200)
      .json({ success: true, message: "Product removed from wishlist" });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Route to get all wishlist items for a user
exports.getWishListItems = catchAsyncError(async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Find wishlist items for the specified user and populate the products
    let wishlistItems = await Wishlist.find({ user: userId }).populate(
      "products"
    );
    if (wishlistItems.length === 1) {
      wishlistItems = wishlistItems[0];
    }
    res.status(200).json({ success: true, wishlistItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
