// Import required modules and middleware
let express = require("express");
let router = express.Router();
const {
  add,
  deleteProduct,
  view,
  updateQuantity,
} = require("../controllers/stock");
const auth = require("../middlewares/authentication");

// Apply the authentication middleware to protect the routes below
router.use(auth);

// Define API routes for managing stock items

// Route for adding a new stock item using the "add" controller function
router.put("/stock/add", add);

// Route for viewing all stock items using the "view" controller function
router.get("/stock/view", view);

// Route for deleting a specific stock item using the "deleteProduct" controller function
router.delete("/stock/delete/:productID", deleteProduct);

// Route for updating the quantity of a stock item using the "updateQuantity" controller function
router.post("/stock/update", updateQuantity);

// Export the router to be used in other parts of the application
module.exports = router;
