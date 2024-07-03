const cron = require("node-cron");
const User = require("../models/userModel"); // Adjust the path as needed
const Product = require("../models/productModel");
const Feedback = require("../models/feedbackModel");
const Seller = require("../models/sellerModel");
require("dotenv").config();
// Function to remove expired cart items
const removeExpiredCartItems = async () => {
  try {
    const now = new Date();
    const expirationHours = parseInt(process.env.CART_EXPIRATION_HOURS, 10);
    const cutoff = new Date(now.getTime() - expirationHours * 60 * 60 * 1000);

    // console.log(`Current time: ${now}`);
    // console.log(`Cutoff time: ${cutoff}`);

    // Find products with expired cartTimestamp
    const expiredProducts = await Product.find({
      cartTimestamp: { $lt: cutoff },
      isInterested: false,
      inCart: true,
    });

    // console.log(`Expired products found: ${expiredProducts.length}`);
    if (expiredProducts.length > 0) {
      // console.log("Expired products details: ", expiredProducts);
    }

    // Update each expired product and corresponding user cart
    await Promise.all(
      expiredProducts.map(async (product) => {
        // console.log(`Processing product: ${product._id}`);

        // Update product status
        await Product.findByIdAndUpdate(product._id, {
          $set: {
            isInterested: false,
            interestedTimestamp: null,
            inCart: false,
            cartUser: null,
            cartTimestamp: null,
            soldConfirmedBuyer: false,
          },
        });

        // console.log(`Product ${product._id} status updated`);

        // Find and update user cart
        const userUpdateResult = await User.updateMany(
          { "cartItems.productId": product._id },
          {
            $pull: { cartItems: { productId: product._id } },
          }
        );

        // console.log(
        //   `Users updated for product ${product._id}: `,
        //   userUpdateResult
        // );
      })
    );

    // console.log("Expired cart items removed and product statuses reset");
  } catch (error) {
    console.error("Error clearing expired cart items:", error);
  }
};

// module.exports = removeExpiredCartItems;

// Function to update interested products
const updateInterestedProducts = async () => {
  try {
    const now = new Date();
    const expirationHours = parseInt(
      process.env.INTERESTED_EXPIRATION_HOURS,
      10
    );
    const cutoff = new Date(now.getTime() - expirationHours * 60 * 60 * 1000);

    // console.log(`Current time: ${now}`);
    // console.log(`Cutoff time to interested: ${cutoff}`);

    // Find products with expired cartTimestamp
    const expiredProducts = await Product.find({
      interestedTimestamp: { $lt: cutoff },
      isInterested: true,
    });

    // console.log(
    //   `Expired products found in Interested: ${expiredProducts.length}`
    // );
    if (expiredProducts.length > 0) {
      // console.log("Expired interested products details: ", expiredProducts);
    }

    // Update each expired product and corresponding user cart
    await Promise.all(
      expiredProducts.map(async (product) => {
        // console.log(`Processing product: ${product._id}`);

        // Update product status
        await Product.findByIdAndUpdate(product._id, {
          $set: {
            isInterested: false,
            interestedTimestamp: null,
            inCart: false,
            cartUser: null,
            cartTimestamp: null,
            soldConfirmedBuyer: false,
          },
        });

        // console.log(`Product ${product._id} status updated in Interested`);

        // Find and update user cart
        const userUpdateResult = await User.updateMany(
          { "cartItems.productId": product._id },
          {
            $pull: { cartItems: { productId: product._id } },
          }
        );

        // console.log(
        //   `Users updated for product ${product._id}: `,
        //   userUpdateResult
        // );
      })
    );

    // console.log("Expired cart items removed and product statuses reset");
  } catch (error) {
    console.error("Error clearing expired cart items:", error);
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

    // Update Seller collection with average ratings
    await Promise.all(
      result.map(async (sellerRating) => {
        const { _id, averageRating } = sellerRating;
        try {
          const seller = await Seller.findByIdAndUpdate(
            _id,
            { $set: { rating: averageRating } },
            { new: true }
          );
          if (!seller) {
            console.error(`Seller with id ${_id} not found.`);
            return;
          }
          // console.log(
          //   `Updated seller ${seller._id} with average rating ${averageRating}`
          // );
        } catch (error) {
          console.error(
            `Error updating seller ${_id} with average rating:`,
            error
          );
        }
      })
    );

    // console.log("Average ratings updated successfully.");
  } catch (error) {
    console.error("Error calculating seller ratings:", error);
  }
};

// Schedule the script to run every Sunday at midnight
cron.schedule("* * * * *", async () => {
  console.log("Running script to calculate and update seller ratings...");
  await calculateSellerRatings();
});

// Schedule the task to run every minute for testing
cron.schedule("* * * * *", () => {
  console.log("Running task to clear expired cart items");
  removeExpiredCartItems();
});

// Schedule the task to run every minute for testing
cron.schedule("* * * * *", () => {
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
// "0 0 * * ": Every day at midnight
// "0 0 * * 0": Every Sunday at midnight
// "/5 * * * *": Every 5 minutes
