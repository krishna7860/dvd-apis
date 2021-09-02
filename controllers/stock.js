
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Stock = require("../models/Stock");

// @desc      Create Stock
// @route     POST /api/v1/stock
// @access    Public
exports.create = asyncHandler(async (req, res, next) => {
    const { movieId, availbleStock, isActive, pricePerDay } = req.body;
  
    // Create user
    const stock = await Stock.create({
     movieId,
     availbleStock,
     isActive,
     pricePerDay,
    });

    res.status(201).json(stock);
});

// @desc      Get Stocks
// @route     POST /api/v1/stock
// @access    Public
exports.getStocks = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});

// @desc      Get Stock
// @route     POST /api/v1/stock/:id
// @access    Public
exports.getAvailableByID = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const stock = await Stock.findOne({ movieId: id });
  if (!stock) {
    return next(new ErrorResponse(`stock not found with id of ${id}`, 404));
  }
  
  res.status(200).json({
    success: true,
    data: stock,
  });
});