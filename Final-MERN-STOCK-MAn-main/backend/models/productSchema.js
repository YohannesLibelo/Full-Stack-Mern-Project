// Mongoose Schema for the "Product" collection.

const mongoose = require("mongoose");

// Define the product schema using Mongoose.Schema
const productSchema = new mongoose.Schema({
  // Define the "productID" field with type String
  productID: {
    type: String,
  },
  // Define the "productName" field with type String
  productName: {
    type: String,
  },
  // Define the "productQuantity" field with type Number
  productQuantity: {
    type: Number,
  },
});

// Create a Mongoose model named "Product" using the defined product schema
const Product = mongoose.model("Product", productSchema);

// Export the Product model to be used in other parts of the application
module.exports = Product;
