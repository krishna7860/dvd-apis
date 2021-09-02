const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
  },
  movieId: {
    type: mongoose.Schema.ObjectId,
    ref: "Movie",
    required: true
  },
  price: {
    type: Number,
    default: 0,
  },
  returnDate: {
    type: Date,
    required: [true, "Release Date is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
  
module.exports = mongoose.model("Order", OrderSchema);