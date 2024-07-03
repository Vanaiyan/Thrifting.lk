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
        const feedbacks = await Feedback.find({
          userId,
          productId: order.productId,
        });
        // console.log(feedbacks);

        // Check if any of the feedbacks have a rating
        const feedbackRating = feedbacks.some(
          (feedback) => feedback.rating != null
        )
          ? feedbacks.find((feedback) => feedback.rating != null).rating
          : null;

        return {
          productId: order.productId,
          productName: product.name,
          sellerName: seller.firstName + " " + seller.lastName,
          sellerId: seller._id,
          timestamp: order.timestamp,
          feedback: feedbackRating, // Set feedback rating if any feedback has a rating
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
