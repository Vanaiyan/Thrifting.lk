const cron = require("node-cron");
const Product = require("../models/productModel");
require("dotenv").config();

// Function to remove expired products from the cart
const removeExpiredCartItems = async () => {
  try {
    const now = new Date();
    const expirationHours = parseInt(process.env.CART_EXPIRATION_HOURS, 10);
    const cutoff = new Date(now.getTime() - expirationHours * 60 * 60 * 1000);
    console.log("cutoff", cutoff);
    await Product.updateMany(
      { inCart: true, cartTimestamp: { $lt: cutoff } },
      { $set: { inCart: false, cartUser: null, cartTimestamp: null } }
    );

    console.log("Expired cart items cleared");
  } catch (error) {
    console.error("Error clearing expired cart items:", error);
  }
};

// Schedule the task to run every hour

cron.schedule("0 * * * *", () => {
  console.log("Running task to clear expired cart items");
  removeExpiredCartItems();
});

module.exports = {
  removeExpiredCartItems,
};

//cron.schedule
// "* * * * *": Every minute
// "0 * * * *": Every hour (at minute 0)
// "0 0 * * *": Every day at midnight
// "0 0 * * 0": Every Sunday at midnight
// "*/5 * * * *": Every 5 minutes
