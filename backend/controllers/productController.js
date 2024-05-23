const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const APIFeatures = require("../utils/apiFeatures");
const catchAsyncError = require("../middlewares/catchAsyncError");

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
    req.body.seller ="662ba747e59446416eacee2d";
   

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
