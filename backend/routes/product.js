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
  getSuggestions,
} = require("../controllers/productController");
const router = express.Router();
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authenticate");
const { getSingleSeller } = require("../controllers/sellerAuthController");

router.route("/products").get(getProducts);

router.route("/products/:sellerId").post(createProduct);

router.route("/seller/:id").get(getSingleSeller);

router.route("/products/new").post(authorizeRoles("admin"), newProduct);

router
  .route("/products/:id")
  .get(getSingleProduct)
  .put(updateProduct)
  .delete(deleteProduct);

router
  .route("/users/interact")
  .post(
    isAuthenticatedUser,
    authorizeRoles("User", "Seller"),
    pushInteractedProduct
  );
router.route("/recommendations").post(getRecommendations);
router.route("/suggestion").post(getSuggestions);

module.exports = router;
