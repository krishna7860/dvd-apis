const express = require('express');

const { create, getStocks, getAvailableByID } = require('../controllers/stock');
const advancedResults = require('../middleware/advanceResults');
const Stock = require('../models/Stock');

const router = express.Router();

router.route("/").post(create).get(advancedResults(Stock), getStocks);

router.route("/:id").get(getAvailableByID);

module.exports = router;
