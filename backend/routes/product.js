const express = require("express");
const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProduct,
} = require("../controllers/productController");
const router = express.Router();
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authenticate");

router
  .route("/products")
  .get(getProducts)
  // .get(isAuthenticatedUser, getProducts)
  .post(isAuthenticatedUser, createProduct);
router.route("/products/new").post(authorizeRoles("admin"), newProduct);
router
  .route("/products/:id")
  .get(getSingleProduct)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;
