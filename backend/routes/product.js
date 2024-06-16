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

router
  .route("/products")
  .get(isAuthenticatedUser, getProducts)
  .post(createProduct);

// .get(isAuthenticatedUser, getProducts)
// .post(isAuthenticatedUser, createProduct);

router.route("/products/new").post(authorizeRoles("admin"), newProduct);
router
  .route("/products/:id")
  .get(getSingleProduct)
  .put(updateProduct)
  .delete(deleteProduct);

router.route("/products/new").post(authorizeRoles("admin"), newProduct);
router.route("/products/:id").get(getSingleProduct).put(updateProduct);
//.delete(deleteProduct);
router
  .route("/users/interact")
  .post(isAuthenticatedUser, pushInteractedProduct);
router.route("/recommendations").get(isAuthenticatedUser, getRecommendations);

module.exports = router;
