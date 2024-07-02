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
const paginate = require("../utils/pagination");
const mongoose = require('mongoose');

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
    return next(new ErrorHandler("Invalid Admin username or password"));
  }

  if (!(await user.isValidPassword(password))) {
    return next(new ErrorHandler("Invalid Admin email or password"));
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


//Graph
// Utility function to get the last six months
const getLastSixFullMonths = () => {
  const months = [];
  const date = new Date();
  // Start from the previous month
  date.setMonth(date.getMonth() - 1);
  for (let i = 5; i >= 0; i--) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth() - i, 1));
    months.push({ month: d.getUTCMonth() + 1, year: d.getUTCFullYear() });
  }
  return months;
};

exports.getTotalOrdersLastSixMonths = async (req, res) => {
  try {
    const lastSixMonths = getLastSixFullMonths();

    const results = await Order.aggregate([
      {
        $match: {
          timestamp: {
            $gte: new Date(Date.UTC(lastSixMonths[0].year, lastSixMonths[0].month - 1, 1)),
            $lt: new Date(Date.UTC(lastSixMonths[5].year, lastSixMonths[5].month + 1, 1))
          }
        }
      },
      {
        $group: {
          _id: { year: { $year: "$timestamp" }, month: { $month: "$timestamp" } },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 }
      }
    ]);

    const data = lastSixMonths.map(month => {
      const found = results.find(result => result._id.year === month.year && result._id.month === month.month);
      return {
        name: `${month.month}/${month.year}`,
        uv: found ? found.count : 0,
        count: found ? found.count : 0
      };
    });

    res.json(data);
  } catch (error) {
    console.error('Error fetching order count:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Utility function to get the last six weeks
const getLastSixFullWeeks = () => {
  const weeks = [];
  const currentDate = new Date();
  const startOfCurrentWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));

  for (let i = 1; i <= 6; i++) { // Start from 1 to skip the current week
    const startOfWeek = new Date(startOfCurrentWeek);
    startOfWeek.setDate(startOfCurrentWeek.getDate() - (i * 7));
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    // Only include weeks that are fully in the past
    if (endOfWeek < currentDate) {
      const startDate = `${startOfWeek.getDate()}/${startOfWeek.getMonth() + 1}`;
      const endDate = `${endOfWeek.getDate()}/${endOfWeek.getMonth() + 1}`;
      weeks.push({ startOfWeek, endOfWeek, startDate, endDate });
    }
  }

  return weeks.reverse(); // Reverse to get the weeks in ascending order
};

exports.getTotalOrdersLastSixWeeks = async (req, res) => {
  try {
    const lastSixWeeks = getLastSixFullWeeks();

    const weeklyResults = await Promise.all(
      lastSixWeeks.map(async (week, index) => {
        const results = await Order.aggregate([
          {
            $match: {
              timestamp: {
                $gte: week.startOfWeek,
                $lt: week.endOfWeek
              }
            }
          },
          {
            $group: {
              _id: null,
              count: { $sum: 1 }
            }
          }
        ]);

        const startDate = week.startDate;
        const endDate = week.endDate;

        return {
          name: `${startDate}-${endDate}`,
          uv: results.length > 0 ? results[0].count : 0,
          count: results.length > 0 ? results[0].count : 0
        };
      })
    );

    res.json(weeklyResults);
  } catch (error) {
    console.error('Error fetching order count:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



// Function to get monthly product counts
exports. getMonthlyProductCounts = async (req, res)  => {
  try {
    const productCounts = await Product.aggregate([
      {
        $addFields: {
          createdAt: {
            $dateFromString: {
              dateString: { $toString: "$createdAt" }
            }
          }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1
        }
      },
      {
        $project: {
          year: "$_id.year",
          month: "$_id.month",
          count: 1,
          _id: 0
        }
      }
    ]);
    res.status(200).json(productCounts);
  } catch (error) {
    console.error('Error in getMonthlyProductCounts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}



//Get lastsixmonths products count where status = true
const getLastSixFullMonthsProducts = () => {
  const months = [];
  const date = new Date();
  date.setMonth(date.getMonth() - 1); // Start from the previous month
  for (let i = 5; i >= 0; i--) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth() - i, 1));
    months.push({ month: d.getUTCMonth() + 1, year: d.getUTCFullYear() });
  }
  return months;
};

exports.getTotalProductsLastSixMonths = async (req, res) => {
  try {
    const lastSixMonths = getLastSixFullMonthsProducts();

    const results = await Product.aggregate([
      {
        $match: {
          status: true, // Only count products where status is true
          createdAt: {
            $gte: new Date(Date.UTC(lastSixMonths[0].year, lastSixMonths[0].month - 1, 1)),
            $lt: new Date(Date.UTC(lastSixMonths[5].year, lastSixMonths[5].month + 1, 1))
          }
        }
      },
      {
        $group: {
          _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 }
      }
    ]);

    const data = lastSixMonths.map(month => {
      const found = results.find(result => result._id.year === month.year && result._id.month === month.month);
      return {
        name: `${month.month}/${month.year}`,
        uv: found ? found.count : 0,
        count: found ? found.count : 0
      };
    });

    res.json(data);
  } catch (error) {
    console.error('Error fetching product count:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};






//All function to All Product page

//Function To get All Products and remove sold products
exports.getAllProductsToAdmin = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const options = {
      page,
      limit,
      populateOptions: {
        path: 'seller',
        select: 'firstName lastName',
      },
    };

    const result = await paginate(Product, { status: false }, options);

    res.status(200).json({
      success: true,
      products: result.results,
      totalCount: result.totalCount,
      totalPages: result.totalPages,
      currentPage: result.currentPage,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
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
      console.log("Rating updated for seller:", seller.email);
    } else {
      // Send an email to the seller
      console.log("Sending email to seller:", seller.email);
      const mailOptions = {
        to: seller.email,
        subject: "Product Deletion Notification",
        text: `Dear ${seller.firstName} ${seller.lastName},\n\nWe are writing to inform you that the product you have added to our platform, "${product.name}" has been removed from our listing.\n\nAfter careful consideration, we regret to inform you that we are not confident in the product you have added, and therefore, we have decided to delete it from our platform. We understand that this may be disappointing news, and we apologize for any inconvenience this may cause.\n\nIf you have any questions or require further information, please do not hesitate to contact our support team at [Support Email Address] or [Support Phone Number].\n\nBest regards,\nThrifting.lk`,
      };
      await sendEmail(mailOptions);
      console.log("Email sent successfully");
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
    const { query, page, limit } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    const searchQuery = {
      $or: [{ name: { $regex: query, $options: 'i' } }],
    };

    const options = {
      page,
      limit,
    };

    const result = await paginate(Product, searchQuery, options);

    res.json({
      products: result.results,
      totalCount: result.totalCount,
      totalPages: result.totalPages,
      currentPage: result.currentPage,
    });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//All function to Sellers page

// Function To get Approved Sellers
exports.getApprovedSellersToAdmin = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const options = {
      page,
      limit,
    };

    const result = await paginate(Seller, { authenticated: true }, options);

    res.status(200).json({
      success: true,
      sellers: result.results,
      totalCount: result.totalCount,
      totalPages: result.totalPages,
      currentPage: result.currentPage,
    });
  } catch (err) {
    console.error('Error fetching approved sellers:', err);
    res.status(500).json({
      success: false,
      message: 'Server Error',
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

    // Delete all products associated with the seller
    await Product.deleteMany({ seller: req.params.id });

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
      message: "Seller and their products deleted successfully",
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
    const { query, page, limit } = req.query;

    if (!query) {
      return res.status(400).json({ message: 'Query parameter is required' });
    }

    const isObjectId = mongoose.Types.ObjectId.isValid(query);
    let searchQuery = {
      $or: [
        { firstName: { $regex: query, $options: 'i' } },
        { lastName: { $regex: query, $options: 'i' } },
        ...(isObjectId ? [{ _id: query }] : [])
      ]
    };

    const options = {
      page,
      limit,
    };

    const result = await paginate(Seller, searchQuery, options);

    res.json({ 
      sellers: result.results,
      totalCount: result.totalCount,
      totalPages: result.totalPages,
      currentPage: result.currentPage,
    });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Server error" });
  }
};




//All function to Users page

// Function To get users
exports.getUsersToAdmin = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const options = {
      page,
      limit,
    };

    const result = await paginate(User, {}, options); // Fetch all users with pagination

    res.status(200).json({
      success: true,
      users: result.results,
      totalCount: result.totalCount,
      totalPages: result.totalPages,
      currentPage: result.currentPage,
    });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

//All funtion to Order List page

// Function to get all orders to admin
exports.getAllOrders = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    const orders = await Order.find()
      .populate({
        path: "productId",
        select: "name price",
      })
      .populate({
        path: "sellerId",
        select: "firstName lastName avatar",
      })
      .populate({
        path: "userId",
        select: "firstName lastName avatar",
      })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    const validOrders = orders.filter(order => 
      order.productId !== null && 
      order.userId !== null
    );

    const transformedOrders = validOrders.map((order) => ({
      id: order._id,
      productName: order.productId ? order.productId.name : 'Unknown',
      sellerName: order.sellerId ? `${order.sellerId.firstName} ${order.sellerId.lastName}` : 'Unknown',
      userName: order.userId ? `${order.userId.firstName} ${order.userId.lastName}` : 'Unknown',
      date: order.timestamp,
      amount: order.productId ? `$ ${order.productId.price}` : 'Unknown',
      userAvatar: order.userId.avatar,
      sellerAvatar: order.sellerId ? order.sellerId.avatar : null,
    }));

    const totalCount = await Order.countDocuments();

    res.status(200).json({
      success: true,
      orders: transformedOrders,
      totalCount,
    });
  } catch (err) {
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
    const { page, limit } = req.query;
    const options = {
      page,
      limit,
    };

    const result = await paginate(Seller, { authenticated: false }, options);

    res.status(200).json({
      success: true,
      sellers: result.results,
      totalCount: result.totalCount,
      totalPages: result.totalPages,
      currentPage: result.currentPage,
    });
  } catch (err) {
    console.error('Error fetching sellers:', err);
    res.status(500).json({
      success: false,
      message: 'Server Error',
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
        message: 'Seller not found',
      });
    }

    // Prepare email options
    const mailOptions = {
      to: seller.email,
      subject: 'Seller Approval Notification',
      text: `Dear ${seller.firstName} ${seller.lastName},\n\nWe are pleased to inform you that your seller account has been approved.\n\nYou can now start selling on our platform.\n\nIf you have any questions or need further assistance, please contact our support team.\n\nBest regards,\nThrifting.lk`,
    };

    // Send email using the sendEmail function
    await sendEmail(mailOptions);

    res.status(200).json({
      success: true,
      message: 'Account approved successfully',
      seller: seller,
    });
  } catch (err) {
    console.error('Error approving seller and sending email:', err);
    res.status(500).json({
      success: false,
      message: 'Server Error',
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
        message: 'Seller not found',
      });
    }

    // Prepare email options
    const mailOptions = {
      to: seller.email,
      subject: 'Account Rejection Notification',
      text: `Dear ${seller.firstName} ${seller.lastName},\n\nWe regret to inform you that your seller account has been rejected.If you have any questions or wish to provide valid documents for reconsideration, please contact our support team at [Support Email Address] or [Support Phone Number].\n\nWe apologize for any inconvenience this may cause.\n\nBest regards,\nThrifting.lk`,
    };

    // Send email using the sendEmail function
    await sendEmail(mailOptions);

    res.status(200).json({
      success: true,
      message: 'Seller rejected successfully',
      seller,
    });
  } catch (err) {
    console.error('Error rejecting seller and sending email:', err);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

// All function to Report Feedback

// Function to fetch data based on issue category count to delete seller
exports.getDeleteSeller = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    const aggregateResult = await Feedback.aggregate([
      {
        $group: {
          _id: { sellerId: "$sellerId", issueCategory: "$issueCategory" },
          count: { $sum: 1 },
          sellerName: { $first: '$firstName' },
          sellerLastName: { $first: '$lastName' },
          sellerEmail: { $first: '$email' },
          rating: { $first: '$rating' },
        },
      },
      {
        $match: {
          count: { $gt: 4 },
        },
      },
    ])
    .skip((pageNumber - 1) * limitNumber)
    .limit(limitNumber);

    const sellerIds = aggregateResult.map(result => result._id.sellerId);
    const sellers = await Seller.find({ _id: { $in: sellerIds } });

    const results = aggregateResult.map(result => {
      const seller = sellers.find(s => s._id.toString() === result._id.sellerId.toString());
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

    const totalCount = await Feedback.aggregate([
      {
        $group: {
          _id: { sellerId: '$sellerId', issueCategory: '$issueCategory' },
          count: { $sum: 1 },
        },
      },
      {
        $match: {
          count: { $gt: 4 },
        },
      },
      {
        $count: 'total',
      },
    ]);

    res.json({ results, totalCount: totalCount[0]?.total || 0 });
  } catch (error) {
    console.error("Error fetching grouped feedback:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};




// Function to fetch data based on issue category count to warn seller
exports.getWarnSeller = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    const aggregateResult = await Feedback.aggregate([
      {
        $group: {
          _id: { sellerId: '$sellerId', issueCategory: '$issueCategory' },
          count: { $sum: 1 },
          sellerName: { $first: '$firstName' },
          sellerLastName: { $first: '$lastName' },
          sellerEmail: { $first: '$email' },
          rating: { $first: '$rating' },
        },
      },
      {
        $match: {
          count: { $gt: 2, $lte: 4 },
        },
      },
    ])
    .skip((pageNumber - 1) * limitNumber)
    .limit(limitNumber);

    const sellerIds = aggregateResult.map(result => result._id.sellerId);
    const sellers = await Seller.find({ _id: { $in: sellerIds } });

    const results = aggregateResult.map(result => {
      const seller = sellers.find(s => s._id.toString() === result._id.sellerId.toString());
      return {
        sellerId: result._id.sellerId,
        sellerName: seller ? `${seller.firstName} ${seller.lastName}` : 'Unknown',
        sellerEmail: seller ? seller.email : 'Unknown',
        issueCategory: result._id.issueCategory,
        rating: seller ? seller.rating : 'null',
      };
    });

    const totalCount = await Feedback.aggregate([
      {
        $group: {
          _id: { sellerId: '$sellerId', issueCategory: '$issueCategory' },
          count: { $sum: 1 },
        },
      },
      {
        $match: {
          count: { $gt: 2, $lte: 4 },
        },
      },
      {
        $count: 'total',
      },
    ]);

    res.json({ results, totalCount: totalCount[0]?.total || 0 });
  } catch (error) {
    console.error('Error fetching grouped feedback:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};




// Function to send warning emails to sellers based on grouped feedback
exports.warnSeller = async (req, res, next) => {
  try {
    // Aggregate feedback data to group by sellerId and issueCategory, and count occurrences
    const aggregateResult = await Feedback.aggregate([
      {
        $group: {
          _id: { sellerId: '$sellerId', issueCategory: '$issueCategory' },
          count: { $sum: 1 }
        }
      },
      {
        $match: {
          count: { $gt: 2 } // Filter where count is greater than 2
        }
      }
    ]);

    // If no sellers have more than two issues, return success response
    if (aggregateResult.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No sellers found with more than two issues in any category."
      });
    }

    // Fetch additional seller details using the sellerId from aggregate results
    const sellerIds = [...new Set(aggregateResult.map(result => result._id.sellerId))];
    const sellers = await Seller.find({ _id: { $in: sellerIds } });

    // Prepare to send warning emails to each seller
    const emailPromises = [];
    for (const result of aggregateResult) {
      const seller = sellers.find(s => s._id.toString() === result._id.sellerId.toString());

      if (!seller) {
        continue; // Skip if seller details are not found
      }

      const sellerName = `${seller.firstName} ${seller.lastName}`;
      const sellerEmail = seller.email;
      const issueCategory = result._id.issueCategory;

      // Check if a warning has already been sent for this seller and issue category
      const existingWarning = seller.warnings.find(warning => warning.issueCategory === issueCategory);

      if (!existingWarning) {
        // Construct email text summarizing the issue category
        const mailOptions = {
          to: sellerEmail,
          subject: 'Warning Notification',
          text: `Dear ${sellerName},\n\nWe have received multiple reports regarding issues associated with your account in the '${issueCategory}' category, encompassing between 10 and 15 records. Should this issue count exceed 15, your account will be subject to deletion. Please address this issue as soon as possible to avoid further action.\n\nBest regards,\nThrifting.lk`
        };

        // Send email notification
        emailPromises.push(sendEmail(mailOptions));

        // Add the warning to the seller's warnings array
        seller.warnings.push({ issueCategory });

        // Save the updated seller document
        await seller.save();
      }
    }

    // Wait for all emails to be sent
    await Promise.all(emailPromises);

    // Respond with success message after sending all emails
    res.status(200).json({
      success: true,
      message: "Warning emails sent successfully",
    });
  } catch (err) {
    // Handle errors during the process
    console.error('Error sending warning emails:', err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};




