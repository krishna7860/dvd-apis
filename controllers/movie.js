
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Movie = require("../models/Movie");
const Stock = require("../models/Stock");

// @desc      Create Movie
// @route     POST /api/v1/movie
// @access    Public
exports.create = asyncHandler(async (req, res, next) => {
    const { title, overview, poster, release_date, genres } = req.body;
  
    // Create user
    const movie = await Movie.create({
      title,
      overview,
      poster,
      release_date,
      genres
    });

    res.status(201).json(movie);
});

// @desc      Get Movies
// @route     POST /api/v1/movie
// @access    Public
exports.getMovies = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});

// @desc      Get Movie
// @route     POST /api/v1/movie/:id
// @access    Public
exports.getMovie = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const movie = await Movie.findById(id);

  const stock = await Stock.findOne({ movieId: movie.id }).select('availbleStock pricePerDay');


  if (!movie) {
    return next(new ErrorResponse(`movie not found with id of ${id}`, 404));
  }
  res.status(200).json({
    success: true,
    data: {
      movie,
      stock
    }
  });
});