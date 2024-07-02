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
    getTotalOrdersLastSixMonths,
    getBestSeller,
    searchSellers,
    searchProducts,
    getDeleteSeller,
    getWarnSeller,
    getUsersToAdmin,   
    registerAdmin,
    loginAdmin,
    getMonthlyProductCounts,
    getTotalProductsLastSixMonths,
    getTotalOrdersLastSixWeeks,
   } = require("../controllers/adminController");

// Admin Dashboard
router.route("/admin/count").get(getCounts);
router.route('/order-count-last-six-months').get(getTotalOrdersLastSixMonths);
router.route('/product-count-last-six-months').get(getTotalProductsLastSixMonths);
router.route('/order-count-last-six-weeks').get(getTotalOrdersLastSixWeeks);
// router.get('/order-count-last-six-months', getOrderCountLastSixMonths);
router.route("/admin/bestsellers").get(getBestSeller);

//Admin All Products
router.route("/admin/register").post(registerAdmin);
router.route("/admin/login").post(loginAdmin);
router.route("/admin/products").get(getAllProductsToAdmin);
router.route("/admin/product/:id").delete(deleteProducts);
router.route("/admin/product/search").get(searchProducts);
router.route("/admin/total").get(getMonthlyProductCounts);


// Admin Approved Sellers
router.route("/admin/sellers").get(getApprovedSellersToAdmin);
router.route("/admin/seller/:id").delete(deleteSeller);
router.route("/admin/seller/search").get(searchSellers);


// Admin User
router.route("/admin/users").get(getUsersToAdmin);

// Admin Orders List
router.route("/admin/orders").get(getAllOrders);

// Admin Seller Approval
router.route("/admin/sellerstoapproval").get(getSellersToAdmin);
router.route("/admin/approveSeller/:id").put(approveSeller);
router.route("/admin/rejectSeller/:id").delete(rejectSeller);

// Admin Report Feedback
router.route("/admin/todeleteseller").get(getDeleteSeller);
router.route("/admin/towarnseller").get(getWarnSeller);
router.route("/admin/warnseller").post(warnSeller);



module.exports = router;



// SMTP_HOST = sandbox.smtp.mailtrap.io
// SMTP_PORT = 2525
// SMTP_USER = cf7a42dfc2b7fc
// SMTP_PASS = 24219035531cc0
// SMTP_FROM_NAME = vanai
// SMTP_FROM_EMAIL = vanaiyan@gmail.com