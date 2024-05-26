const Seller = require("../models/sellerModel");
const Product = require("../models/productModel");
const bcrypt = require("bcrypt");

const getProductsBySellerId = async (req, res) => {
  try {
    //const id = req.params.sellerId;
    const id = "662ba6ddffd7af4f4a7fd633";

    const seller = await Seller.findById(id);
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }
    const products = await Product.find({ seller: id });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSellerProfile = async (req, res) => {
  try {
    const id = "662ba6ddffd7af4f4a7fd633";
    //const id = req.user.id;
    const seller = await Seller.findById(id);
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }
    res.json(seller);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const updateSellerProfile = async (req, res) => {
  try {
   // const id = req.user.id; 
     const id = "662ba6ddffd7af4f4a7fd633"; 

    // Retrieve the seller from the database
    const seller = await Seller.findById(id);
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    // Hash the password if provided
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    // Update seller's data with the data from the request body
    Object.assign(seller, req.body);

    // Save the updated seller data
    await seller.save();

    // Send the updated seller data in the response
    res.json(seller);
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


const changeProductStatus = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (!product) {
      return next(new ErrorHandler("Product not found", 400));
    }
    product.status = !product.status;
    await product.save();

    return res.status(200).json({
      success: true,
      message: `Product ${product.status ? "sold" : "available"} successfully`,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  getProductsBySellerId,
  getSellerProfile,
  updateSellerProfile,
  changeProductStatus,
};
