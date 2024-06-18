const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter the Product name"],
    trim: true,
    maxlength: [100, "Product name cannot exceed 100 characters"],
  },
  description: {
    type: String,
    required: [true, "Please enter the Product description"],
    maxlength: [500, "Product description cannot exceed 500 characters"],
    minlength: [100, "Product description cannot be below 100 characters"],
  },
  price: {
    type: Number,
    required: [true, "Please enter the Product price"],
    default: 0.0,
    validate: {
      validator: function(value) {
        return value >= 0;
      },
      message: "Price cannot be a negative value"
    }
  },
  gender: {
    type: String,
    required: [true, "Please specify the gender"],
    enum: ['men', 'women', 'unisex'], 
  },
  category: {
    type: [String],
    required: [true, "Please enter product category"],
  },
  pictures: [
    {
      image: {
        type: String,
        required: [true, "Please upload an image"],
      },
    },
  ],
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
    required: [true, "Please enter Seller"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  inCart: {
    type: Boolean,
    default: false,
  },
  cartUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  cartTimestamp: {
    type: Date,
    default: null,
  },
  isInterested: {
    type: Boolean,
    default: false,
  },
  interestedTimestamp: {
    type: Date,
    default: null,
  },
  soldConfirmedBuyer: {
    type: Boolean,
    default: false,
  },
  status: {
    type: Boolean,
    default: false,
  },
});

productSchema.query.byId = function (_id) {
  return this.find({ _id: new RegExp(_id, "i") });
};

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
