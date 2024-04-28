// Import required modules and initialize the Express app
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require("dotenv").config({ path: "./config.env" });
const PORT = 8080;
const cors = require("cors");

// Enable CORS to allow cross-origin requests between frontend and backend
app.use(cors());

// Connect to the database
require("./db/connection");

// Middleware to parse cookies from the request
app.use(cookieParser());

// Middleware to parse JSON data in request bodies
app.use(express.json());

// Middleware to parse URL-encoded data in request bodies
app.use(express.urlencoded({ extended: true }));

// Alternative body parser middleware, used to parse JSON data in request bodies
app.use(bodyParser.json());

// Mount user routes
app.use(require("./routes/user"));

// Mount stock routes
app.use(require("./routes/stock"));

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
