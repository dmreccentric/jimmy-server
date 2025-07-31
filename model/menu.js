const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  title: {
    type: String,
    required: [true, "must provide item name"],
    trim: true,
  },
  category: {
    type: String,
    enum: ["pastries", "foodtray", "cake", "drinks"],
  },
  price: {
    type: Number,
    required: [true, "item price must be provided"],
  },
  quantity: {
    type: Number,
  },
  img: {
    type: String,
    required: [true, "item image must be provided"],
  },
  desc: {
    type: String,
  },
});

module.exports = mongoose.model("Menu", menuSchema);
