const Product = require("../models/productModel");
const Seller = require("../models/sellerModel");
const ErrorHandler = require("../utils/errorHandler");
const APIFeatures = require("../utils/apiFeatures");
const catchAsyncError = require("../middlewares/catchAsyncError");
const Order = require("../models/orderModel");
const Feedback = require("../models/feedbackModel");
const nodemailer = require("nodemailer"); // Import nodemailer for sending emails
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

// All function to Admin Dashboard page

//Function to get Products, Sellers, Buyers and Orders Counts
exports.getCounts = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments({ status: false });
    const totalSellers = await Seller.countDocuments({ authenticated: true });
    const totalBuyers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();

    // Function to format counts to K or M (e.g., 1000 -> 1K, 1000000 -> 1M)
    const formatNumber = (count) => {
      if (count >= 1000000) {
        return `${(count / 10000000).toFixed(0)}M`;
      } else if (count >= 1000) {
        return `${(count / 1000).toFixed(0)}K`;
      }
      return count;
    };

    // Format counts to K or M if applicable
    const formattedTotalProducts = formatNumber(totalProducts);
    const formattedTotalSellers = formatNumber(totalSellers);
    const formattedTotalBuyers = formatNumber(totalBuyers);
    const formattedTotalOrders = formatNumber(totalOrders);

    res.status(200).json({
      totalProducts: formattedTotalProducts,
      totalSellers: formattedTotalSellers,
      totalBuyers: formattedTotalBuyers,
      totalOrders: formattedTotalOrders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Get best sellers
exports.getBestSeller = async (req, res) => {
  try {
    const sellers = await Seller.find({ rating: { $gte: 5 } }).sort({
      rating: -1,
    });
    res.json(sellers);
  } catch (error) {
    console.error("Error fetching best sellers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//All function to All Product page

//Function To get All Products and remove sold products
exports.getAllProductsToAdmin = async (req, res, next) => {
  try {
    // Fetch all products where status is false and select only specified fields
    // const products = await Product.find({ status: true }).select('_id name description price image seller');
    const products = await Product.find({ status: false }).populate({
      path: "seller",
      select: "firstName lastName",
    });

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

// Function to Delete product
exports.deleteProducts = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate({
      path: "seller",
      select: "firstName lastName email rating", // Assuming Seller model has these fields
    });

    if (!product) {
      return next(new ErrorHandler("Product not found", 400));
    }

    const seller = product.seller;

    if (!seller) {
      return next(new ErrorHandler("Seller not found", 400));
    }

    // Check if the seller has a rating
    if (seller.rating) {
      // Reduce the seller's rating by 1
      seller.rating -= 1;
      await seller.save();
      console.log("suki");
    } else {
      // Send an email to the seller

      console.log(seller.email);
      const mailOptions = {
        to: seller.email,
        subject: "Product Deletion Notification",
        text: `Dear ${seller.firstName} ${seller.lastName},\n\nWe are writing to inform you that the product you have added to our platform,"${product.name}" has been removed from our listing.\n\nAfter careful consideration, we regret to inform you that we are not confident in the product you have added, and therefore, we have decided to delete it from our platform. We understand that this may be disappointing news, and we apologize for any inconvenience this may cause.\n\nIf you have any questions or require further information, please do not hesitate to contact our support team at [Support Email Address] or [Support Phone Number].\n\nBest regards,\nThrifting.lk`,
      };
      console.log("data");
      await sendEmail(mailOptions);
      console.log("hello");
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//Function to search product
exports.searchProducts = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    let products = [];

    if (query) {
      products = await Product.find({
        $or: [{ name: { $regex: query, $options: "i" } }],
      });
    }
    res.json({ products });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//All function to Sellers page

// Function To get Approved Sellers
exports.getApprovedSellersToAdmin = async (req, res, next) => {
  try {
    // Fetch all sellers from the database where authenticated is false
    const sellers = await Seller.find({ authenticated: true });

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

// Function to send warning email to seller
exports.warnSeller = async (req, res, next) => {
  try {
    const seller = await Seller.findById(req.params.id);

    if (!seller) {
      return next(new ErrorHandler("Seller not found", 400));
    }

    // Prepare email options
    const mailOptions = {
      to: seller.email,
      subject: "Warning Notification",
      text: `Dear ${seller.firstName} ${seller.lastName},\n\nThis is a warning regarding your account. Please take the necessary actions to comply with our policies.\n\nBest regards,\nYour Company`,
    };

    // Send email notification
    try {
      await sendEmail(mailOptions);
      console.log("Warning email sent successfully");
    } catch (error) {
      console.error("Failed to send warning email:", error);
    }

    res.status(200).json({
      success: true,
      message: "Warning email sent successfully",
    });
  } catch (err) {
    console.error("Error sending warning email:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Function to delete seller

exports.deleteSeller = async (req, res, next) => {
  try {
    const seller = await Seller.findById(req.params.id);

    if (!seller) {
      return next(new ErrorHandler("Seller not found", 400));
    }

    const sellerEmail = seller.email; // Capture seller email before deleting
    const sellerName = `${seller.firstName} ${seller.lastName}`; // Capture seller name before deleting

    await seller.deleteOne();

    // Prepare email options
    const mailOptions = {
      to: sellerEmail,
      subject: "Account Deletion Notification",
      text: `Dear ${sellerName},\n\nWe regret to inform you that your seller account has been deleted from our platform due to receiving an excessive amount of negative feedback from users and suspicious activity associated with your account.\n\nIf you have any questions or wish to discuss this matter further, please contact our support team at [Support Email Address] or [Support Phone Number].\n\nWe apologize for any inconvenience this may cause.\n\nBest regards,\nThrifting.lk`,
    };

    // Send email notification
    try {
      await sendEmail(mailOptions);
      console.log("Email notification sent successfully");
    } catch (error) {
      console.error("Failed to send email notification:", error);
    }

    res.status(200).json({
      success: true,
      message: "Seller deleted successfully",
      seller,
    });
  } catch (err) {
    console.error("Error deleting seller:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//Function to search seller
exports.searchSellers = async (req, res) => {
  try {
    const { query, sellerId } = req.query;

    if (!query && !sellerId) {
      return res
        .status(400)
        .json({ message: "Query or seller ID parameter is required" });
    }

    let sellers = [];

    if (query) {
      sellers = await Seller.find({
        $or: [
          { firstName: { $regex: query, $options: "i" } },
          { lastName: { $regex: query, $options: "i" } },
        ],
      });
    }

    if (sellerId) {
      const sellerById = await Seller.findById(sellerId);
      if (sellerById) {
        sellers.push(sellerById);
      }
    }

    res.json({ sellers });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//All function to Users page

// Function To get users
exports.getUsersToAdmin = async (req, res, next) => {
  try {
    // Fetch all users from the database
    const users = await User.find();

    res.status(200).json({
      success: true,
      users: users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//All funtion to Order List page

// Function to get all orders to admin
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

    // Filter out orders where productId or userId is null
    const validOrders = orders.filter(
      (order) => order.productId !== null && order.userId !== null
    );

    // Check the filtered orders
    // console.log("Filtered valid orders:", validOrders);

    // Transform the valid orders
    const transformedOrders = validOrders.map((order) => ({
      id: order._id,
      productName: order.productId ? order.productId.name : "Unknown",
      sellerName: order.sellerId
        ? `${order.sellerId.firstName} ${order.sellerId.lastName}`
        : "Unknown",
      userName: order.userId
        ? `${order.userId.firstName} ${order.userId.lastName}`
        : "Unknown",
      date: order.timestamp, // Use timestamp as the order date
      amount: order.productId ? `$ ${order.productId.price}` : "Unknown",
      userAvatar: order.userId.avatar,
      sellerAvatar: order.sellerId ? order.sellerId.avatar : null,

      // orderId: order._id, // Uncomment if orderId is needed
      // status: order.status, // Uncomment if status is needed
    }));

    res.status(200).json({
      success: true,
      orders: transformedOrders,
    });
  } catch (err) {
    // console.error("Error fetching orders:", err.message); // Log the error message
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//All function to Seller Approval page

// Function To get Sellers to Approval
exports.getSellersToAdmin = async (req, res, next) => {
  try {
    // Fetch all sellers from the database where authenticated is true
    const sellers = await Seller.find({ authenticated: false });

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

// Function to approve a seller
exports.approveSeller = async (req, res, next) => {
  try {
    const sellerId = req.params.id;
    const seller = await Seller.findByIdAndUpdate(
      sellerId,
      { authenticated: true },
      { new: true }
    );

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Seller not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Seller approved successfully",
      seller: seller,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Function to reject a seller
exports.rejectSeller = async (req, res, next) => {
  try {
    const sellerId = req.params.id;
    const seller = await Seller.findByIdAndDelete(sellerId);

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Seller not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Seller reject successfully",
      seller,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// All function to Report Feedback

// Function to fetch data based on issue category count
exports.getIssueSeller = async (req, res) => {
  try {
    const aggregateResult = await Feedback.aggregate([
      {
        $group: {
          _id: { sellerId: "$sellerId", issueCategory: "$issueCategory" },
          count: { $sum: 1 },
          sellerName: { $first: "$firstName $lastName" }, // Assuming seller name is in the Seller model
          sellerEmail: { $first: "$email" }, // Assuming seller email is in the Seller model
          rating: { $first: "$rating" }, // Calculate average rating
        },
      },
      {
        $match: {
          count: { $gt: 2 }, // Filter where count is greater than 5
        },
      },
    ]);
    // Fetch additional seller details using the sellerId
    const sellerIds = aggregateResult.map((result) => result._id.sellerId);
    const sellers = await Seller.find({ _id: { $in: sellerIds } });
    // Combine seller details into the aggregate result
    const results = aggregateResult.map((result) => {
      const seller = sellers.find(
        (s) => s._id.toString() === result._id.sellerId.toString()
      );
      return {
        sellerId: result._id.sellerId,
        sellerName: seller
          ? `${seller.firstName} ${seller.lastName}`
          : "Unknown",
        sellerEmail: seller ? seller.email : "Unknown",
        issueCategory: result._id.issueCategory,
        rating: seller ? seller.rating : "null",
      };
    });

    res.json(results);
  } catch (error) {
    console.error("Error fetching grouped feedback:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Graph
// Utility function to get the last six months
const getLastSixMonths = () => {
  const months = [];
  const date = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth() - i, 1));
    months.push({ month: d.getUTCMonth() + 1, year: d.getUTCFullYear() });
  }
  return months;
};

exports.getOrderCountLastSixMonths = async (req, res) => {
  try {
    const lastSixMonths = getLastSixMonths();

    const results = await Order.aggregate([
      {
        $match: {
          timestamp: {
            $gte: new Date(
              Date.UTC(lastSixMonths[0].year, lastSixMonths[0].month - 1, 1)
            ),
            $lt: new Date(
              Date.UTC(lastSixMonths[5].year, lastSixMonths[5].month, 1)
            ),
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$timestamp" },
            month: { $month: "$timestamp" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);

    const data = lastSixMonths.map((month) => {
      const found = results.find(
        (result) =>
          result._id.year === month.year && result._id.month === month.month
      );
      return {
        name: `${month.month}/${month.year}`,
        uv: found ? found.count : 0,
        count: found ? found.count : 0,
      };
    });

    res.json(data);
  } catch (error) {
    console.error("Error fetching order count:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
