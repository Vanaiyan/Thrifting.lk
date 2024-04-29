const Seller = require("../models/sellerModel");
const Product = require("../models/productModel");

const getProductsBySellerId = async (req, res) => {
  try {
    const  id  = req.params.sellerId;
    // const id = "662ba6ddffd7af4f4a7fd633";

    console.log(id);
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
    const id = "662ba747e59446416eacee2d";
    //const id = req.user.id;
    const seller = await Seller.findById(id);
    if (!seller) {
      return res.status(404).json({ message: 'Seller not found' });
    }
    res.json(seller);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);

    if (!product) {
      return next(new ErrorHandler("Product not found", 400));
    }

    if (product.status === false) {
      product.status = true; // Update the status to indicate the product is sold
      await product.save(); // Save the updated product

      await product.deleteOne(); // Delete the product from the database

      return res.status(200).json({
        success: true,
        message: "Product deleted successfully",
      });
    } else {
      return next(new ErrorHandler("Product cannot be deleted as it is not available", 400));
    }
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
  deleteProduct
};
