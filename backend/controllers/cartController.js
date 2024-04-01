const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

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
      productId: productId, // Ensure that the field name matches the schema definition
      quantity,
    });
  }

  // Update the cart in the database
  await cart.save();

  res
    .status(201)
    .json({ success: true, message: "Product added to cart successfully" });
});

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

    // Combine product details with quantities from the cart
    const cartProducts = cart.products.map((cartItem) => {
      const product = products.find((product) =>
        product._id.equals(cartItem.productId)
      );
      return {
        productId: cartItem.productId,
        name: product ? product.name : "Unknown Product",
        price: product ? product.price : 0,
        quantity: cartItem.quantity,
        discount: product ? product.discount : 0,
        description: product.description,
      };
    });

    res.status(200).json({ success: true, products: cartProducts });
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
