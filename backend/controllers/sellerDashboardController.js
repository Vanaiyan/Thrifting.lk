const Seller = require("../models/sellerModel");
const Product = require("../models/productModel");
const bcrypt = require("bcrypt");

const authenticateSeller = async (req, res) => {
  try {
    const id = req.params.sellerId;
    const seller = await Seller.findById(id);
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }
    seller.authenticated = true;
    await seller.save();

    res.json({ message: "Seller authenticated successfully", seller });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductsBySellerId = async (req, res) => {
  try {
    const id = req.params.sellerId;
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
    //const id = "662ba6ddffd7af4f4a7fd633";
    const id = req.params.sellerId;
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
    const id = req.params.sellerId;
    const seller = await Seller.findById(id);
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    const { password, ...updatedFields } = req.body;
    Object.assign(seller, updatedFields);

    await seller.save();
    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const validateSellerPassword = async (req, res) => {
  try {
    const id = req.params.sellerId;
    const { currentPassword } = req.body;
    const seller = await Seller.findById(id).select("+password");

    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }
    const isMatch = await bcrypt.compare(currentPassword, seller.password);

    if (isMatch) {
      res.json({ valid: true });
    } else {
      res.json({ valid: false });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateSellerPassword = async (req, res) => {
  try {
    const id = req.params.sellerId;
    const seller = await Seller.findById(id);

    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    if (req.body.newPassword) {
      const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
      seller.password = hashedPassword;
    } else {
      return res.status(400).json({ message: "Password is required" });
    }
    await seller.save();
    res.json({ message: "Password updated successfully" });
  } catch (error) {
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
  authenticateSeller,
  getProductsBySellerId,
  getSellerProfile,
  updateSellerProfile,
  changeProductStatus,
  validateSellerPassword,
  updateSellerPassword,
};
