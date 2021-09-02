const mongoose = require("mongoose");
const slugify = require("slugify");

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add a Movie title"],
  },
  overview: {
    type: String,
    required: [true, "Please add a overview"],
  },
  poster: {
    type: String,
    default: "",
  },
  slug: String,
  release_date: {
    type: Date,
    required: [true, "Release Date is required"],
  },
  genres: {
    type: [String],
    required: [true, "At least one genre is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create Movie Slug
MovieSchema.pre("save", function(next) {
    this.slug = slugify(this.title, { lower: true });
    next();
  });

module.exports = mongoose.model("Movie", MovieSchema);