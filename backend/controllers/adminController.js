const Product = require("../models/productModel");
const Seller = require("../models/sellerModel");
const ErrorHandler = require("../utils/errorHandler");
const APIFeatures = require("../utils/apiFeatures");
const catchAsyncError = require("../middlewares/catchAsyncError");
const Order = require("../models/orderModel");
const User = require("../models/userModel");
const Admin = require("../models/adminModel");
const sendToken = require("../utils/jwt");
const sendEmail = require("../utils/email");

exports.registerAdmin = catchAsyncError(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  const user = await Admin.create({
    firstName,
    lastName,
    email,
    password,
  });

  sendToken(user, 201, res);
});

exports.loginAdmin = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter email & Password"));
  }

  const user = await Admin.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Seller username or password"));
  }

  if (!(await user.isValidPassword(password))) {
    return next(new ErrorHandler("Invalid Seller email or password"));
  }

  sendToken(user, 201, res);
});

//Function To get All Products and remove sold products
exports.getAllProductsToAdmin = async (req, res, next) => {
  try {
    // Fetch all products where status is false and select only specified fields
    // const products = await Product.find({ status: true }).select('_id name description price image seller');
    const products = await Product.find({ status: false });

    res.status(200).json({
      success: true,
      products: products,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//Function To get All Sellers
exports.getAllSellersToAdmin = async (req, res, next) => {
  try {
    console.log("mnkmn");
    // Fetch all sellers from the database
    const sellers = await Seller.find();
    console.log(sellers);
    res.status(200).json({
      success: true,
      sellers: sellers,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//Function to delete seller
exports.deleteSeller = async (req, res, next) => {
  try {
    const seller = await Seller.findById(req.params.id);

    if (!seller) {
      return next(new ErrorHandler("Seller not found", 400));
    }

    await seller.deleteOne();

    res.status(200).json({
      success: true,
      seller,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// //Function to get all orderlist
exports.getAllOrders = async (req, res, next) => {
  try {
    // Fetch all orders from the database and populate the references
    const orders = await Order.find()
      .populate({
        path: "productId",
        select: "name price", // Assuming Product model has a 'name' field
      })
      .populate({
        path: "sellerId",
        select: "firstName lastName avatar", // Assuming Seller model has a 'firstName' field
      })
      .populate({
        path: "userId",
        select: "firstName lastName avatar", // Assuming User model has a 'firstName' field
      });

    // Filter out orders where productId, sellerId, or userId is null
    const validOrders = orders.filter(
      (order) =>
        order.productId !== null &&
        order.sellerId !== null &&
        order.userId !== null
    );

    // Check the filtered orders
    console.log("Filtered valid orders:", validOrders);

    // Transform the valid orders
    const transformedOrders = validOrders.map((order) => ({
      id: order._id,
      productName: order.productId.name,
      sellerName: `${order.sellerId.firstName} ${order.sellerId.lastName}`,
      userName: `${order.userId.firstName} ${order.userId.lastName}`,
      date: order.timestamp, // Use timestamp as the order date
      amount: `$ ${order.productId.price}`,
      userAvatar: order.userId.avatar,
      sellerAvatar: order.sellerId.avatar,
      // orderId: order._id, // Uncomment if orderId is needed
      // status: order.status, // Uncomment if status is needed
    }));

    res.status(200).json({
      success: true,
      orders: transformedOrders,
    });
  } catch (err) {
    console.error("Error fetching orders:", err.message); // Log the error message
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
