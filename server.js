const express = require("express");
const env = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const colors = require("colors");
const fileUpload = require("express-fileupload");
const errorHandler = require("./middleware/error");
const connect = require("./config/db");

// Load environment variables
env.config({ path: "./config/config.env" });

// Connect to database
connect();

// Route files
const auth = require("./routes/auth");
const movie = require("./routes/movies");
const stock = require("./routes/stock");
const order = require("./routes/orders")

const app = express();

app.use(express.json());
// Dev Logging middleware
process.env.NODE_ENV === "development" ? app.use(morgan("dev")) : null;

// File Upload
app.use(fileUpload());

// set static folder
app.use(express.static(path.join(__dirname, "public")));

//Mount routers
app.use("/api/v1/auth", auth);
app.use("/api/v1/movie", movie);
app.use("/api/v1/stock", stock);
app.use("/api/v1/order", order);


app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle Unhandled Rejection
process.on("unhandledRejection", (err, promise) => {
  console.log(`Unhandled Rejection : ${err.message}`.red);
  // Close Server
  server.close(() => process.exit(1));
});