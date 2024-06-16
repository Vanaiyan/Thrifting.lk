const cron = require("node-cron");
const Product = require("../models/productModel");
const Feedback = require("../models/feedbackModel");
const Seller = require("../models/sellerModel");
const Cart = require("../models/cartModel"); // Assuming you have a cart model
require("dotenv").config();

// Function to remove expired products from the cart
const removeExpiredCartItems = async () => {
  try {
    const now = new Date();
    const expirationHours = parseInt(process.env.CART_EXPIRATION_HOURS, 10);
    const cutoff = new Date(now.getTime() - expirationHours * 60 * 60 * 1000);
    console.log("expira cart hours", expirationHours);
    // Find expired products
    const expiredProducts = await Product.find(
      { inCart: true, cartTimestamp: { $lt: cutoff }, isInterested: false },
      "_id"
    );
    console.log(expiredProducts);
    if (expiredProducts.length > 0) {
      const expiredProductIds = expiredProducts.map((product) => product._id);

      // Update the products
      await Product.updateMany(
        { _id: { $in: expiredProductIds } },
        { $set: { inCart: false, cartUser: null, cartTimestamp: null } }
      );

      // Update the carts
      await Cart.updateMany(
        { "products.productId": { $in: expiredProductIds } },
        { $pull: { products: { productId: { $in: expiredProductIds } } } }
      );

      console.log("Expired cart items cleared and removed from carts");
    }
  } catch (error) {
    console.error("Error clearing expired cart items:", error);
  }
};

// Function to update interested products
const updateInterestedProducts = async () => {
  try {
    const now = new Date();
    const interestedExpirationHours = parseInt(
      process.env.INTERESTED_EXPIRATION_HOURS,
      10
    );
    console.log("int hours", interestedExpirationHours);
    const cutoff = new Date(
      now.getTime() - interestedExpirationHours * 60 * 60 * 1000
    );
    console.log("Interested cutoff", cutoff);

    // Find interested products with expired timestamps
    const expiredInterestedProducts = await Product.find(
      { isInterested: true, interestedTimestamp: { $lt: cutoff } },
      "_id"
    );

    console.log("Interest Expire", expiredInterestedProducts);

    if (expiredInterestedProducts.length > 0) {
      const expiredInterestedProductIds = expiredInterestedProducts.map(
        (product) => product._id
      );

      // Update the products
      await Product.updateMany(
        { _id: { $in: expiredInterestedProductIds } },
        {
          $set: {
            isInterested: false,
            interestedTimestamp: null,
            inCart: false,
            cartUser: null,
            cartTimestamp: null,
            soldConfirmedBuyer: false,
          },
        }
      );

      // Update the carts
      await Cart.updateMany(
        { "products.productId": { $in: expiredInterestedProductIds } },
        {
          $pull: {
            products: { productId: { $in: expiredInterestedProductIds } },
          },
        }
      );

      console.log("Expired interested products updated and removed from carts");
    }
  } catch (error) {
    console.error("Error updating interested products:", error);
  }
};

// Calculate average ratings for sellers
const calculateSellerRatings = async () => {
  try {
    // Aggregate to calculate average rating per seller
    const result = await Feedback.aggregate([
      {
        $group: {
          _id: "$sellerId",
          averageRating: { $avg: "$rating" },
          count: { $sum: 1 }, // Count of feedbacks for debugging purposes
        },
      },
    ]);

    // Update Correct Seller collection with average ratings
    await Promise.all(
      result.map(async (sellerRating) => {
        const { _id, averageRating } = sellerRating;
        try {
          const seller = await Seller.findByIdAndUpdate(
            _id,
            { $set: { rating: averageRating } }, // Update 'rating' field
            { new: true }
          );
          if (!seller) {
            console.error(`Seller with id ${_id} not found.`);
            return;
          }
          console.log(
            `Updated seller ${seller._id} with average rating ${averageRating}`
          );
        } catch (error) {
          console.error(
            `Error updating seller ${_id} with average rating:`,
            error
          );
        }
      })
    );

    console.log("Average ratings updated successfully.");
  } catch (error) {
    console.error("Error calculating seller ratings:", error);
  }
};

// Schedule the script to run every Sunday at midnight
cron.schedule("0 0 * * 0", async () => {
  console.log("Running script to calculate and update seller ratings...");
  await calculateSellerRatings();
});

// Schedule the task to run every minute for testing
cron.schedule("0 * * * *", () => {
  console.log("Running task to clear expired cart items");
  removeExpiredCartItems();
});

// Schedule the task to run every minute for testing
cron.schedule("0 * * * *", () => {
  console.log("Running task to update expired interested products");
  updateInterestedProducts();
});

module.exports = {
  removeExpiredCartItems,
  updateInterestedProducts,
  calculateSellerRatings,
};

//cron.schedule
// "* * * * *": Every minute
// "0 * * * *": Every hour (at minute 0)
// "0 0 * * *": Every day at midnight
// "0 0 * * 0": Every Sunday at midnight
// "*/5 * * * *": Every 5 minutes
