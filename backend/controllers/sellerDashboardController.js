const Seller = require("../models/sellerModel");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");

const getProductsBySellerId = async (req, res) => {
  try {
    const id = req.params.sellerId;
    // const id = "662ba6ddffd7af4f4a7fd633";

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
      return res.status(404).json({ message: "Seller not found" });
    }
    res.json(seller);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const changeProductStatus = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    console.log(productId);
    // Find the product by its ID
    const product = await Product.findById(productId);
    if (!product) {
      return next(new ErrorHandler("Product not found", 400));
    }

    // Toggle the product status
    product.status = !product.status;
    await product.save();

    // If the product is sold, create a new order
    if (product.status) {
      // const sellerId = req.seller._id;
      const sellerId = "6648fcb3d57b2383f46d43ff";
      // Find the seller by their ID
      const seller = await Seller.findById(sellerId);
      if (!seller) {
        return next(new ErrorHandler("Seller not found", 400));
      }

      // Get the last interested user for the specific product
      const interestedUsersForProduct = seller.interestedUsers.filter(
        (user) => user.productId.toString() === productId.toString()
      );

      if (interestedUsersForProduct.length === 0) {
        return next(
          new ErrorHandler("No interested user found for this product", 400)
        );
      }

      // Find the user with the latest timestamp
      const lastInterestedUser = interestedUsersForProduct.reduce(
        (latest, user) => {
          return user.timestamp > latest.timestamp ? user : latest;
        }
      );

      const userId = lastInterestedUser.userId;

      // Create a new order
      const newOrder = new Order({
        sellerId,
        productId,
        userId,
        timestamp: new Date(),
      });

      await newOrder.save();
    }

    return res.status(200).json({
      success: true,
      message: `Product ${product.status ? "sold" : "available"} successfully`,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  getProductsBySellerId,
  getSellerProfile,
  changeProductStatus,
};
