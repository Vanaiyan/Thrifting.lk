const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const Cart = require("../models/cartModel");
const User = require("../models/userModel"); //It wants to change as seller model
const Product = require("../models/productModel");

//Add a product to the cart
exports.addToCart = catchAsyncError(async (req, res, next) => {
  const userId = req.user._id;
  const { productId, quantity } = req.body;

  // Validate request data
  if (!userId || !productId || !quantity) {
    return next(new ErrorHandler(400, "Invalid request data"));
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
  }

  // Update the cart in the database
  await cart.save();

  res
    .status(201)
    .json({ success: true, message: "Product added to cart successfully" });
});

//Function for get products of a user
exports.getCartProduct = catchAsyncError(async (req, res, next) => {
  try {
    const userId = req.user._id;
    console.log("1 check", req.user._id);
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
    console.log("2 check", products);

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
      });
    });
    console.log("3 check", productsBySeller);

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

// Delete a single product from the cart
exports.deleteProductFromCart = catchAsyncError(async (req, res, next) => {
  try {
    const userId = req.user._id;
    const productIdToDelete = req.params.id;

    // Find the user's cart
    const cart = await Cart.findOne({ user: userId });
    console.log(productIdToDelete);
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
