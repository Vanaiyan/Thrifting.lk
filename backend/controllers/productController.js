const Product = require("../models/productModel");
const Seller = require("../models/sellerModel");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const APIFeatures = require("../utils/apiFeatures");
const catchAsyncError = require("../middlewares/catchAsyncError");
const axios = require("axios");

exports.getProducts = catchAsyncError(async (req, res, next) => {
  // const resPerPage = 8;
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
  const apiFeatures = new APIFeatures(baseQuery, req.query).search().filter();
  // .paginate(resPerPage);

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
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
    const { discount } = req.body;

    if (discount >= product.price) {
      return res.status(400).json({
        success: false,
        message: "Discount cannot be greater than or equal to the price",
      });
    }
    await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Successful",
    });
  } catch (err) {
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
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
exports.newProduct = async (req, res, next) => {
  req.body.user = req.user.id;

  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
};

exports.createProduct = async (req, res, next) => {
  try {
    const seller = await Seller.findById(req.params.sellerId);
    if (!seller) {
      return res.status(404).json({
        success: false,
        error: "Seller not found",
      });
    }
    req.body.seller = req.params.sellerId;
    const newProduct = await Product.create(req.body);

    console.log("Product created successfully");

    res.status(201).json({
      success: true,
      product: newProduct,
    });
  } catch (err) {
    console.error("Error creating product:", err);

    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((error) => error.message);
      console.log("error is :", err);
      return res.status(400).json({
        success: false,
        error: errors.join(", "),
      });
    }

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.getRecommendations = async (req, res) => {
  console.log("Recommendation Process starting");

  try {
    // 1. Fetch user data (if authenticated)
    let interactedProducts = null;
    const userId = req.body.user ? req.body.user : null; // Handle unauthenticated users
    console.log("User Id of rec user : ", userId);
    if (userId) {
      const user = await User.findById(userId).exec();
      interactedProducts = user.interactedProducts || [];
      console.log("Interacted Products:", interactedProducts);
    }

    // 2. Handle empty interactedProducts and unauthenticated users
    if (!interactedProducts || !userId || !interactedProducts.length > 0) {
      console.log("TRy to get random products : ");
      const randomProducts = await Product.aggregate([
        { $sample: { size: 50 } }, // Sample 50 random products
        {
          $match: {
            status: { $ne: true }, // Exclude products where status is true (sold)
            inCart: { $ne: true }, // Exclude products in any cart
          },
        },
      ]);
      // randomProducts now contains 50 random products that meet the specified conditions

      res.status(200).json(randomProducts);
      return;
    }

    // 3. Call Flask server for recommendations (modify URL if needed)
    const response = await axios.post("http://localhost:5001/recommend", {
      product_ids: interactedProducts,
    });
    console.log("Response from Flask:", response.data);
    const recommendedProductIds = response.data;

    // 4. Fetch recommended products with additional conditions
    const products = await Product.find({
      _id: { $in: recommendedProductIds }, // Include recommended products
      $or: [
        { status: false }, //status means soldStatus(if status true = sold)
        { inCart: false }, // Exclude products in any cart
        { cartUser: { $ne: userId } }, // Exclude products in current user's cart
      ],
    });

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching recommendations:", error.message);
    res.status(500).json({
      message: "Error fetching recommendations",
      error: error.message, // Consider sanitizing error message for security
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
    if (user.interactedProducts.length > 3) {
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
