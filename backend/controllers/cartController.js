const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const Cart = require("../models/cartModel");
const User = require("../models/userModel"); //It wants to change as seller model
const Product = require("../models/productModel");
const Seller = require("../models/sellerModel");

exports.addToCart = catchAsyncError(async (req, res, next) => {
  const userId = req.user._id;
  const { productId, quantity } = req.body;

  // Validate request data
  if (!userId || !productId || !quantity) {
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

  // Find the user's cart or create a new one if it doesn't exist
  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = new Cart({ user: userId, products: [] });
  }

  const existingProductIndex = cart.products.findIndex((item) => {
    return item.productId.toString() === productId;
  });

  if (existingProductIndex !== -1) {
    // If the product already exists, update its quantity
    cart.products[existingProductIndex].quantity += quantity;
  } else {
    // If the product doesn't exist, add it to the cart
    cart.products.push({
      productId: productId,
      quantity,
    });

    // Update the product's cart status
    product.inCart = true;
    product.cartUser = userId;
    product.cartTimestamp = new Date();
  }

  // Save the updated cart and product
  await cart.save();
  await product.save();

  res
    .status(201)
    .json({ success: true, message: "Product added to cart successfully" });
});

//Function for get products of a user
exports.getCartProduct = catchAsyncError(async (req, res, next) => {
  try {
    const userId = req.user._id;
    // Find the user's cart
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    // Extract product IDs from the cart
    const productIds = cart.products.map((item) => item.productId);

    // Fetch all product details associated with the product IDs
    const products = await Product.find({ _id: { $in: productIds } });

    // Create an object to store products grouped by seller ID
    const productsBySeller = {};

    // Combine product details with quantities from the cart and group by seller ID
    cart.products.forEach((cartItem) => {
      const product = products.find((product) =>
        product._id.equals(cartItem.productId)
      );

      if (!productsBySeller[product.seller]) {
        productsBySeller[product.seller] = [];
      }
      productsBySeller[product.seller].push({
        productId: cartItem.productId,
        name: product ? product.name : "Unknown Product",
        price: product ? product.price : 0,
        quantity: cartItem.quantity,
        discount: product ? product.discount : 0,
        description: product ? product.description : "No description",
        seller: product ? product.seller : "Unknown Seller",
        cartTimestamp: product.cartTimestamp,
        isInterested: product.isInterested,
        soldConfirmedBuyer: product.soldConfirmedBuyer,
        interestedTimestamp: product.interestedTimestamp,
      });
    });

    // Fetch the name of the seller for each seller ID
    for (const sellerId of Object.keys(productsBySeller)) {
      const seller = await User.findById(sellerId); // It want to change as fetch details from Seller collection
      console.log("seller", seller);
      const sellerName = seller ? seller.firstName : "Unknown Seller"; //It want to be change as seller userName After implement seller Login
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

    // Find the user's cart
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    // Find the index of the product to delete
    const productIndexToDelete = cart.products.findIndex(
      (item) => item.productId.toString() === productIdToDelete
    );

    if (productIndexToDelete === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found in the cart" });
    }

    // Remove the product from the cart
    cart.products.splice(productIndexToDelete, 1);

    // Update the cart in the database
    await cart.save();

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

//update product quantity
exports.updateCartItemQuantity = catchAsyncError(async (req, res, next) => {
  const userId = req.user._id;
  const productId = req.params.id;
  const { quantity } = req.body;

  // Validate request data
  if (!userId || !productId || !quantity) {
    return next(new ErrorHandler(400, "Invalid request data"));
  }

  // Find the user's cart
  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    return next(new ErrorHandler(404, "Cart not found"));
  }

  // Find the index of the product in the cart
  const productIndex = cart.products.findIndex((item) => {
    return item.productId.toString() === productId;
  });

  if (productIndex === -1) {
    return next(new ErrorHandler(404, "Product not found in cart"));
  }

  // Update the quantity of the product
  cart.products[productIndex].quantity = quantity;

  // Save the updated cart to the database
  await cart.save();

  res.status(200).json({
    success: true,
    message: "Cart item quantity updated successfully",
  });
});

//To add a Product is interested to a user
exports.interestedProduct = catchAsyncError(async (req, res, next) => {
  try {
    const userId = req.user._id; // Assuming the user ID is available from the request (authenticated user)
    const productId = req.params.productId;

    // Find the product by its ID
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Update the product's interested status and timestamp
    product.isInterested = true;
    product.interestedTimestamp = new Date();
    await product.save();

    // Find the seller associated with the product
    const seller = await Seller.findById(product.seller);
    if (!seller) {
      return res
        .status(404)
        .json({ success: false, message: "Seller not found" });
    }

    // Check if the user is already in the interestedUsers array for this product
    const existingInterest = seller.interestedUsers.find(
      (interest) =>
        interest.productId.equals(productId) && interest.userId.equals(userId)
    );

    if (existingInterest) {
      // Update the timestamp if the user is already interested
      existingInterest.timestamp = new Date();
    } else {
      // Add the user's interest to the seller's interestedUsers array
      seller.interestedUsers.push({
        productId,
        userId,
        timestamp: new Date(),
      });
    }

    await seller.save();

    res.status(200).json({
      success: true,
      message: "Product interest marked successfully",
      product,
    });
  } catch (error) {
    // Handle other errors (e.g., database connection error)
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
    // Save the updated product
    await product.save();

    res.status(200).json({
      success: true,
      message: "Product interest removed successfully",
      product,
    });
  } catch (error) {
    // Handle other errors (e.g., database connection error)
    return next(
      new ErrorHandler(
        "An error occurred while updating product interest status",
        500
      )
    );
  }
});

//When a buyer says Product is sold
exports.soldConfirmByBuyer = catchAsyncError(async (req, res, next) => {
  try {
    // const userId = req.user._id;
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
    // Handle other errors (e.g., database connection error)
    return next(
      new ErrorHandler(
        "An error occurred while updating product sold status by buyer",
        500
      )
    );
  }
});
