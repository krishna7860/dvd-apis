const express = require('express');

const { create, getOrders, getOrder } = require('../controllers/order');
const advancedResults = require('../middleware/advanceResults');
const Order = require('../models/Order');

const router = express.Router();

router.route("/").post(create).get(advancedResults(Order), getOrders);

router.route("/:id").get(getOrder);

module.exports = router;
