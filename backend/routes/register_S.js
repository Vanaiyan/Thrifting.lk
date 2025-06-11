const  express =require('express');
const router = express.Router();

const path= require('path');
const Seller = require('../controllers/registerController');

router.route('/')
    .get(Seller.getAllSellers)
router.route('/')
    .post(Seller.createSeller)

module.exports =router;