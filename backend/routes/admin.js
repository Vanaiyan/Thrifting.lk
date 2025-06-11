const express = require("express");
const router = express.Router();
const { getAllProductsToAdmin, getAllSellersToAdmin,deleteSeller,getAllOrders } = require("../controllers/adminController");


router.route("/admin/products").get(getAllProductsToAdmin);
router.route("/admin/sellers").get(getAllSellersToAdmin);
// Define the delete seller route
router.route("/admin/seller/:id").delete(deleteSeller);
router.route("/admin/orders").get(getAllOrders);


module.exports = router;

