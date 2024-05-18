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
  .post(isAuthenticatedUser, createProduct);
// .get(isAuthenticatedUser, getProducts)
router.route("/products/new").post(authorizeRoles("admin"), newProduct);
router
  .route("/products/:id")
  .get(getSingleProduct)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;
