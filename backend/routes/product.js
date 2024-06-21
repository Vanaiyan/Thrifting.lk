const express = require("express");
const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProduct,
  getRecommendations,
  pushInteractedProduct,
} = require("../controllers/productController");

const router = express.Router();
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authenticate");

router.route("/products").get(getProducts);

router.route("/products/:sellerId").post(createProduct);

router.route("/products/new").post(authorizeRoles("admin"), newProduct);

router
  .route("/products/:id")
  .get(getSingleProduct)
  .put(updateProduct)
  .delete(deleteProduct);

router
  .route("/users/interact")
  .post(isAuthenticatedUser, pushInteractedProduct);
router.route("/recommendations").post(getRecommendations);

module.exports = router;
