const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter the Product name"],
    trim: true,
    maxlength: [100, "Product name cannot exceed 100 characters"],
  },
  price: {
    type: Number,
    default: 0.0,
  },
  images: [
    {
      image: {
        type: String,
        required: true,
      },
    },
  ],
  discount: {
    type: Number,
    default: 0.0,
  },
  category: {
    type: String,
    required: [true, "Please Enter product Category"],
  },
  description: {
    type: String,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
    required: [true, "Please Enter Seller"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },

  status:{
    type: Boolean,
    default:false
  }
});
productSchema.query.byId = function (_id) {
  return this.find({ _id: new RegExp(_id, "i") });
};


let schema = mongoose.model("Product", productSchema);
module.exports = schema;
