const express = require("express");
const { isAuthenticatedUser } = require("../middlewares/authenticate");
const {
  addToWishlist,
  removeFromWishlist,
  getWishListItems,
} = require("../controllers/wishListController");
const router = express.Router();

router.route("/wishlist").get(isAuthenticatedUser, getWishListItems); //Add a product to the cart
router.route("/wishlist").post(isAuthenticatedUser, addToWishlist); //Add a product to the cart
router
  .route("/wishlist/:productId")
  .delete(isAuthenticatedUser, removeFromWishlist); //Add a product to the cart

module.exports = router;
