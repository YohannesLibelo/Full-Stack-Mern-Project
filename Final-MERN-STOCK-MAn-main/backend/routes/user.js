// Import required modules and user controller functions
let express = require("express");
let router = express.Router();
const { register, login, logout } = require("../controllers/user");

// Define API routes for user authentication

// Route for user registration using the "register" controller function
router.post("/user/register", register);

// Route for user login using the "login" controller function
router.post("/user/login", login);

// Route for user logout using the "logout" controller function
router.get("/user/logout", logout);

// Export the router to be used in other parts of the application
module.exports = router;
