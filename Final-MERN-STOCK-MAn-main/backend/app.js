// Import required modules and route handlers
let createError = require("http-errors");
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");

let indexRouter = require("./routes/index");
let usersRouter = require("./routes/user");

let logger = require("morgan");

let app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// Middleware for logging HTTP requests and responses in the console
app.use(logger("dev"));

// Middleware to parse JSON data in request bodies
app.use(express.json());

// Middleware to parse URL-encoded data in request bodies
app.use(express.urlencoded({ extended: false }));

// Middleware to parse cookies from the request
app.use(cookieParser());

// Middleware to serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Mount the indexRouter to handle requests at the root path "/"
app.use("/", indexRouter);

// Mount the usersRouter to handle requests at the "/user" path
app.use("/user", usersRouter);

// Middleware to handle 404 errors and forward to the error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler middleware
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render("error");
});

// Export the app to be used in the server.js file or other parts of the application
module.exports = app;
