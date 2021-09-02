const mongoose = require("mongoose");

const StockSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.ObjectId,
    ref: "Movie",
    required: true
  },
  availbleStock: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  pricePerDay: {
    type: Number,
    default: 10,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
  
module.exports = mongoose.model("Stock", StockSchema);