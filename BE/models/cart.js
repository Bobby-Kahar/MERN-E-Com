const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var ItemSchema = new Schema({
  product_id: {
    type: String,
    ref: "Product",
    required: true,
  },
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  category: {
    type: String,
  },
  productImage: {
    type: String,
  },
  qty: {
    type: Number,
    required: true,
    min: [1, "Quantity can not be less then 1."],
  },
  total: {
    type: Number,
  },
});
const CartSchema = new Schema({
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  items: [ItemSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("cart", CartSchema);