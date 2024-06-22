const express = require("express");
const router = express.Router();
const { getAllProductsToAdmin,
    deleteSeller,getAllOrders, 
    getApprovedSellersToAdmin,
    getSellersToAdmin,
    approveSeller,rejectSeller,
    deleteProducts,
    warnSeller,
    getCounts,
    getOrderCountLastSixMonths,
    getBestSeller,
    searchSellers,
    searchProducts,
    getIssueSeller,
    getUsersToAdmin, 
   } = require("../controllers/adminController");

// Admin Dashboard
router.route("/admin/count").get(getCounts);
router.get('/order-count-last-six-months', getOrderCountLastSixMonths);
router.route("/admin/bestsellers").get(getBestSeller);


//Admin All Products
router.route("/admin/products").get(getAllProductsToAdmin);
router.route("/admin/product/:id").delete(deleteProducts);
router.route("/admin/product/search").get(searchProducts);


// Admin Approved Sellers
router.route("/admin/sellers").get(getApprovedSellersToAdmin);
router.route("/admin/warnseller/:id").post(warnSeller);
router.route("/admin/seller/:id").delete(deleteSeller);
router.route("/admin/seller/search").get(searchSellers);


// ADmin User
router.route("/admin/users").get(getUsersToAdmin);


// Admin Orders List
router.route("/admin/orders").get(getAllOrders);

// Admin Seller Approval
router.route("/admin/sellerstoapproval").get(getSellersToAdmin);
router.route("/admin/approveSeller/:id").put(approveSeller);
router.route("/admin/rejectSeller/:id").delete(rejectSeller);

// Admin Report Feedback
router.route("/admin/issueseller").get(getIssueSeller);


module.exports = router;

