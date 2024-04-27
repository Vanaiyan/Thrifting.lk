const Seller = require("../models/sellerModel");
const Product = require("../models/productModel");

const getProductsBySellerId = async (req, res) => {
  try {
    const  id  = req.params.sellerId;
    //const id = "662ba747e59446416eacee2";

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

module.exports = {
  getProductsBySellerId,
};
