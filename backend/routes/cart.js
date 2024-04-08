const express = require("express");
const {
  addToCart,
  getCartProduct,
  deleteProductFromCart,
  updateCartItemQuantity,
} = require("../controllers/cartController");
const router = express.Router();
const { isAuthenticatedUser } = require("../middlewares/authenticate");

router.route("/addToCart").post(isAuthenticatedUser, addToCart);    //Add a product to the cart
router.route("/getCart").get(isAuthenticatedUser, getCartProduct); //get all products in the user cart
router
  .route("/cart/:id")
  .delete(isAuthenticatedUser, deleteProductFromCart) //delete a product from user cart
  .put(isAuthenticatedUser, updateCartItemQuantity);  //route to change quantity of a product

module.exports = router;
