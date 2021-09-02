const express = require('express');

const { create, getMovies, getMovie } = require('../controllers/movie');
const advancedResults = require('../middleware/advanceResults');
const Movie = require('../models/Movie');

const router = express.Router();

router.route("/").post(create).get(advancedResults(Movie), getMovies);

router.route("/:id").get(getMovie);

module.exports = router;
