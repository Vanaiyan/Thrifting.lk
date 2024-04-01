const express = require("express");
const {
  addToCart,
  getCartProduct,
  deleteProductFromCart,
  updateCartItemQuantity,
} = require("../controllers/cartController");
const router = express.Router();
const { isAuthenticatedUser } = require("../middlewares/authenticate");

router.route("/addToCart").post(isAuthenticatedUser, addToCart);
router.route("/getCart").get(isAuthenticatedUser, getCartProduct);
router
  .route("/cart/:id")
  .delete(isAuthenticatedUser, deleteProductFromCart)
  .put(isAuthenticatedUser, updateCartItemQuantity);

module.exports = router;
