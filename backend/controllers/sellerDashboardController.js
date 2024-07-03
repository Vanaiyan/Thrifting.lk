const Seller = require("../models/sellerModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const Order = require("../models/orderModel");
const bcrypt = require("bcrypt");

const authenticateSeller = async (req, res) => {
  try {
    const id = req.params.sellerId;
    const seller = await Seller.findById(id);
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }
    authenticatedStatus = seller.authenticated;
    res.json({
      message: "Seller authenticated successfully",
      authenticatedStatus,
    });
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
    //const products = await Product.find({ seller: id }).populate('cartUser', '_id');
    //console.log(products);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductOrderDetails = async (req, res) => {
  try {
    const id = req.params.sellerId;
    const seller = await Seller.findById(id);
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }
    // Find products where the seller is the given ID and isInterested is true
    const products = await Product.find({ seller: id, isInterested: true });

    // Collect unique buyer IDs from products
    const buyerIds = [...new Set(products.map((product) => product.cartUser))];

    // Fetch buyer details based on buyerIds
    const buyers = await Promise.all(
      buyerIds.map(async (buyerId) => {
        const buyer = await User.findById(buyerId);
        return buyer;
      })
    );

    // Prepare response with products and buyer details
    const productsWithBuyers = products.map((product) => ({
      ...product.toObject(),
      buyer: buyers.find((buyer) => buyer._id.equals(product.cartUser)) || null,
    }));

    res.json(productsWithBuyers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSellerProfile = async (req, res) => {
  try {
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

const changeNotSoldProductStatus = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    // console.log("Received productId:", productId);

    const product = await Product.findById(productId);
    if (!product) {
      console.error("Product not found for ID:", productId);
      return next(new ErrorHandler("Product not found", 400));
    }

    product.status = req.body.status;
    product.inCart = false;
    product.cartUser = null;
    product.cartTimestamp = null;
    product.isInterested = false;
    product.interestedTimestamp = null;
    product.soldConfirmedBuyer = false;
    await product.save();

    // Find all users that have this product in their cart
    const usersWithProductInCart = await User.updateMany(
      { "cartItems.productId": productId },
      { $pull: { cartItems: { productId: productId } } }
    );

    return res.status(200).json({
      success: true,
      message: `Product ${product.status ? "sold" : "available"} successfully`,
    });
  } catch (err) {
    console.error("Error occurred:", err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const changeSoldProductStatus = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const { sellerId, status } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return next(new ErrorHandler("Product not found", 400));
    }

    const userId = product.cartUser;
    // console.log("UserId", product.cartUser);

    // Update product status
    product.status = status;
    product.inCart = false;
    product.cartUser = null;
    product.cartTimestamp = null;
    product.isInterested = false;
    product.interestedTimestamp = null;
    product.soldConfirmedBuyer = false;
    await product.save();

    // Remove the product from all users' cart items
    await User.updateMany(
      { "cartItems.productId": productId },
      { $pull: { cartItems: { productId: productId } } }
    );

    // Create a new order if the product is marked as sold
    if (status) {
      const newOrder = new Order({
        sellerId,
        productId,
        userId,
        timestamp: new Date(),
      });

      await newOrder.save();
      // console.log("New order created:", newOrder);
    }

    return res.status(200).json({
      success: true,
      message: `Product ${status ? "sold" : "available"} successfully`,
    });
  } catch (err) {
    console.error("Error occurred:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  authenticateSeller,
  getProductsBySellerId,
  getProductOrderDetails,
  getSellerProfile,
  updateSellerProfile,
  changeSoldProductStatus,
  changeNotSoldProductStatus,
  validateSellerPassword,
  updateSellerPassword,
};
