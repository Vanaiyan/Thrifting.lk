const Product = require("../models/productModel");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const APIFeatures = require("../utils/apiFeatures");
const catchAsyncError = require("../middlewares/catchAsyncError");
const axios = require("axios");

exports.getProducts = catchAsyncError(async (req, res, next) => {
  const resPerPage = 16;
  let userId = null;
  if (req.user && req.user._id) {
    userId = req.user._id; // Get the current user ID
  }
  
  // Build the base query
  let baseQuery = Product.find({
    $or: [
      { inCart: false }, // Include products that are not in any cart
      { cartUser: userId }, // Include products that are in the cart of the current user
    ],
  });

  // Apply search, filter, and pagination
  const apiFeatures = new APIFeatures(baseQuery, req.query)
    .search()
    .filter()
    .paginate(resPerPage);

  const products = await apiFeatures.query;

  res.status(200).json({
    success: true,
    products,
  });
});

exports.getSingleProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product not found", 400));
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    // Handle errors if any occurred during the process
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body);

    if (!product) {
      return next(new ErrorHandler("Product not found", 400));
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    // Handle errors if any occurred during the process
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product not found", 400));
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.newProduct = async (req, res, next) => {
  // req.body.seller = req.user.id;
  req.body.seller = "662ba747e59446416eacee2d";

  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
};

exports.createProduct = async (req, res, next) => {
  try {
    // req.body.user = req.user.id;
    req.body.seller = "662ba747e59446416eacee2d";

    const newProduct = await Product.create(req.body);

    res.status(201).json({
      success: true,
      product: newProduct,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.getRecommendations = async (req, res) => {
  console.log("Recommendation Process starting");

  const userId = req.user._id; // Assuming you're using authentication middleware to set req.user

  try {
    // Fetch the user document to get interactedProducts
    const user = await User.findById(userId).exec();
    let interactedProducts = user.interactedProducts || [];

    console.log("Interacted Products:", interactedProducts);

    // If interactedProducts is empty, fetch the first 12 products from the database
    if (interactedProducts.length === 0) {
      const randomProducts = await Product.aggregate([
        { $sample: { size: 24 } },
      ]);

      res.status(200).json(randomProducts);
      return; // Return early after sending the response
    }

    // Call Flask server for recommendations
    const response = await axios.post("http://localhost:5001/recommend", {
      product_ids: interactedProducts,
    });

    console.log("Response from Flask:", response.data);
    const recommendedProductIds = response.data;

    // Fetch full product documents based on recommendations and conditions
    const products = await Product.find({
      $and: [
        { _id: { $in: recommendedProductIds } }, // Include products recommended by Flask
        {
          $or: [
            { inCart: false }, // Include products that are not in any cart
            { cartUser: userId }, // Include products that are in the cart of the current user
          ],
        },
      ],
    });

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching recommendations:", error.message);
    res.status(500).json({
      message: "Error fetching recommendations",
      error: error.message,
    });
  }
};

//To update interested products in User document
exports.pushInteractedProduct = catchAsyncError(async (req, res, next) => {
  const userId = req.user._id;
  const { productId } = req.body;

  try {
    // Find the user by userId
    let user = await User.findById(userId);

    if (!productId) {
      return next(new ErrorHandler("ProductId not defined", 404));
    }

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    // Ensure the user has an array to store interacted products
    if (!user.interactedProducts) {
      user.interactedProducts = [];
    }

    // Check if the product already exists in the array
    if (user.interactedProducts.includes(productId)) {
      return res.status(200).json({
        success: true,
        message: "Product Already added",
      });
    }

    // Push productId to the interactedProducts array
    user.interactedProducts.push(productId);

    // If the array exceeds 10 items, remove the oldest one (first in the array)
    if (user.interactedProducts.length > 5) {
      user.interactedProducts.shift(); // Remove the first element
    }

    // Save the updated user document
    await user.save();

    // Respond with success message
    res.status(200).json({
      success: true,
      message: "Product added to interacted products successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
