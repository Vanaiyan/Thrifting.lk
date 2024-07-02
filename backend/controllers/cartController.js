const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const Cart = require("../models/cartModel"); // No longer needed
const User = require("../models/userModel");
const Product = require("../models/productModel");
const Seller = require("../models/sellerModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.addToCart = catchAsyncError(async (req, res, next) => {
  const userId = req.user._id;
  const { productId } = req.body;

  // Validate request data
  if (!userId || !productId) {
    return next(new ErrorHandler(400, "Invalid request data"));
  }

  // Find the product to ensure it exists
  const product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler(404, "Product not found"));
  }

  // Check if the product is already in another user's cart
  if (product.inCart && product.cartUser.toString() !== userId.toString()) {
    return next(
      new ErrorHandler(400, "Product is already in another user's cart")
    );
  }

  // Find the user
  let user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler(404, "User not found"));
  }

  const existingProductIndex = user.cartItems.findIndex((item) => {
    return item.productId.toString() === productId;
  });

  if (existingProductIndex === -1) {
    // If the product doesn't exist, add it to the user's cart
    user.cartItems.push({
      productId: productId,
    });

    // Update the product's cart status
    product.inCart = true;
    product.cartUser = userId;
    product.cartTimestamp = new Date();
  }

  // Save the updated user and product
  await user.save();
  await product.save();

  res
    .status(201)
    .json({ success: true, message: "Product added to cart successfully" });
});

// Function to get products of a user
exports.getCartProduct = catchAsyncError(async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Find the user and populate cart items with product details
    const user = await User.findById(userId).populate("cartItems.productId");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Create an object to store products grouped by seller ID
    const productsBySeller = {};

    // Combine product details with cart items and group by seller ID
    user.cartItems.forEach((cartItem) => {
      const product = cartItem.productId;
      // console.log("CartItem")
      // console.log("CartItem product",product)
      if (product) {
        if (!productsBySeller[product.seller]) {
          productsBySeller[product.seller] = [];
        }

        productsBySeller[product.seller].push({
          productId: product._id,
          name: product.name,
          price: product.price,
          discount: product.discount,
          description: product.description,
          seller: product.seller,
          cartTimestamp: cartItem.createdAt, // assuming there's a timestamp on the cartItem
          isInterested: product.isInterested,
          soldConfirmedBuyer: product.soldConfirmedBuyer,
          interestedTimestamp: product.interestedTimestamp,
          image: product.pictures[0].image,
        });
      } else {
        console.error("Product not found for cartItem:", cartItem._id);
      }
    });

    // Fetch the name of the seller for each seller ID
    for (const sellerId of Object.keys(productsBySeller)) {
      const seller = await Seller.findById(sellerId);
      const sellerName = seller
        ? `${seller.firstName} ${seller.lastName}`
        : "Unknown Seller";

      productsBySeller[sellerId].forEach((product) => {
        product.sellerName = sellerName;
      });
    }

    res.status(200).json({ success: true, productsBySeller });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

exports.deleteProductFromCart = catchAsyncError(async (req, res, next) => {
  try {
    const userId = req.user._id;
    const productIdToDelete = req.params.id;

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Find the index of the product to delete
    const productIndexToDelete = user.cartItems.findIndex(
      (item) => item.productId.toString() === productIdToDelete
    );

    if (productIndexToDelete === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found in the cart" });
    }

    // Remove the product from the cart
    user.cartItems.splice(productIndexToDelete, 1);

    // Update the user in the database
    await user.save();

    // Update the product's cart details
    const product = await Product.findById(productIdToDelete);
    if (product) {
      product.inCart = false;
      product.cartUser = null;
      product.cartTimestamp = null;
      product.isInterested = false;
      product.interestedTimestamp = null;
      await product.save();
    }

    res.status(200).json({
      success: true,
      message: "Product removed from cart successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

exports.updateCartItemQuantity = catchAsyncError(async (req, res, next) => {
  return next(new ErrorHandler(400, "Quantity update is not supported"));
});

exports.interestedProduct = catchAsyncError(async (req, res, next) => {
  try {
    const userId = req.user._id;
    const productId = req.params.productId;

    if (!ObjectId.isValid(productId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid product ID format" });
    }

    const objectId = new ObjectId(productId);
    // console.log("Converted ObjectId:", objectId);

    // Find the product by its ID
    const product = await Product.findById(objectId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    // console.log("Product:", product);

    // Update the product's interested status and timestamp
    product.isInterested = true;
    product.interestedTimestamp = new Date();
    await product.save();
    // console.log("Product interest status updated");

    // Find the seller associated with the product
    const seller = await Seller.findById(product.seller);
    if (!seller) {
      return res
        .status(404)
        .json({ success: false, message: "Seller not found" });
    }
    // console.log("Seller:", seller);

    // Check if the user is already in the interestedUsers array for this product
    const existingInterest = seller.interestedUsers.find(
      (interest) =>
        interest.productId.equals(objectId) && interest.userId.equals(userId)
    );
    // console.log("Existing Interest:", existingInterest);

    if (existingInterest) {
      // Update the timestamp if the user is already interested
      existingInterest.timestamp = new Date();
    } else {
      // Add the user's interest to the seller's interestedUsers array
      seller.interestedUsers.push({
        productId: objectId,
        userId: userId,
        timestamp: new Date(),
      });
    }

    await seller.save();
    console.log("Seller's interestedUsers updated");

    res.status(200).json({
      success: true,
      message: "Product interest marked successfully",
      product,
    });
  } catch (error) {
    console.error("Error:", error);
    return next(
      new ErrorHandler("An error occurred while updating product interest", 500)
    );
  }
});

exports.notInterestedProduct = catchAsyncError(async (req, res, next) => {
  try {
    const productId = req.params.productId;

    // Find the product by its ID
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Update the product's interested status and timestamp
    product.isInterested = false;
    product.interestedTimestamp = null; // Clear the timestamp if needed
    product.inCart = false;
    product.cartUser = null;
    product.cartTimestamp = null;
    await product.save();

    res.status(200).json({
      success: true,
      message: "Product interest removed successfully",
      product,
    });
  } catch (error) {
    return next(
      new ErrorHandler(
        "An error occurred while updating product interest status",
        500
      )
    );
  }
});

exports.soldConfirmByBuyer = catchAsyncError(async (req, res, next) => {
  try {
    const productId = req.params.productId;

    // Find the product by its ID
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Update the product's interested status and timestamp
    product.soldConfirmedBuyer = true;

    // Save the updated product
    await product.save();

    res.status(200).json({
      success: true,
      message: "Product Sold Confirmed By Buyer Updated successfully",
      product,
    });
  } catch (error) {
    return next(
      new ErrorHandler(
        "An error occurred while updating product sold status by buyer",
        500
      )
    );
  }
});
