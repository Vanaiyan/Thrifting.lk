const Seller = require("../models/sellerModel");
const bcrypt = require("bcrypt");

const getAllSellers = async (req, res) => {
  try {
    const sellers = await Seller.find();
    res.json(sellers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSeller = async (req, res) => {
  console.log(req.body);
  try {
    const {
      firstName,
      lastName,
      password,
      email,
      phoneNumber,
      addressField: { address, city, district, postalCode },

      nicName,
      nicNumber,
      frontImage,
      backImage,
    } = req.body;
    console.log(req.body);
    const hashedPassword = await bcrypt.hash(password, 10);

    if (
      !firstName ||
      !lastName ||
      !password ||
      !email ||
      !phoneNumber ||
      !address ||
      !city ||
      !district ||
      !postalCode ||
      !nicName ||
      !nicNumber ||
      !frontImage ||
      !backImage
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if seller with the same email already exists
    const existingSellerByEmail = await Seller.findOne({ email });
    if (existingSellerByEmail) {
      return res
        .status(400)
        .json({ message: "Seller with this email already exists" });
    }

    // Check if seller with the same NIC number already exists
    const existingSellerByNIC = await Seller.findOne({ nicNumber });
    if (existingSellerByNIC) {
      return res
        .status(400)
        .json({ message: "Seller with this NIC number already exists" });
    }

    const seller = new Seller({
      firstName,
      lastName,
      password: hashedPassword,
      email,
      phoneNumber,
      addressField: {
        address,
        city,
        district,
        postalCode,
      },
      nicName,
      nicNumber,
      frontImage,
      backImage,
    });
    const createdSeller = await seller.save();
    res.status(200).json(createdSeller);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllSellers,
  createSeller,
};
