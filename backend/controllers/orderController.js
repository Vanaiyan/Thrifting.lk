const mongoose = require("mongoose");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const Seller = require("../models/sellerModel");
const Feedback = require("../models/feedbackModel");

const getOrdersByUserId = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Find orders by userId
    const orders = await Order.find({ userId });

    // Prepare the response
    const orderDetails = await Promise.all(
      orders.map(async (order) => {
        const product = await Product.findById(order.productId);
        const seller = await Seller.findById(order.sellerId);

        // Fetch feedback/rating for the product
        const feedback = await Feedback.findOne({
          userId,
          productId: order.productId,
        });

        return {
          productId: order.productId,
          productName: product.name,
          sellerName: seller.firstName + " " + seller.lastName,
          sellerId: seller._id,
          timestamp: order.timestamp,
          feedback: feedback ? feedback.rating : null, // Assuming 'rating' is a field in the Feedback model
        };
      })
    );

    res.status(200).json({
      success: true,
      orders: orderDetails,
    });
  } catch (error) {
    next(new ErrorHandler("Error fetching orders", 500));
  }
};

module.exports = { getOrdersByUserId };
