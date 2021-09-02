
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Order = require("../models/Order");
const moment = require("moment");
const Stock = require("../models/Stock");

// @desc      Create Order
// @route     POST /api/v1/order
// @access    Public
exports.create = asyncHandler(async (req, res, next) => {
    const { userId, movieId, bookedDays } = req.body;

    const returnDate = moment().add(bookedDays, 'days').format("DD-MM-YYYY");

    const stock = await Stock.findOne({ movieId: movieId });

    if(stock.availbleStock === 0) {
        return next(new ErrorResponse(`Stock not available for movie ${movieId}`, 400));
    }

    const price = stock.pricePerDay * bookedDays;
  
    // Create order
    const order = await Order.create({
        userId,
        movieId,
        price,
        returnDate,
    });

    if(order) {
       await Stock.updateOne({ movieId: movieId }, { $inc: { availbleStock: -1} });
    }

    res.status(201).json(order);
});

// @desc      Get Orders
// @route     POST /api/v1/order
// @access    Public
exports.getOrders = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});

// @desc      Get Order
// @route     POST /api/v1/order/:id
// @access    Public
exports.getOrder = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findOne({ id });
  if (!order) {
    return next(new ErrorResponse(`order not found with id of ${id}`, 404));
  }
  
  res.status(200).json({
    success: true,
    data: order,
  });
});