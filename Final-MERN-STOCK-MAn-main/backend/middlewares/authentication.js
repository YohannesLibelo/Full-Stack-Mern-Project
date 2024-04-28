// Middleware for authentication using JWT (JSON Web Token).

const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = async (req, res, next) => {
  // Extract the token from the authorization header
  const authHeader = req.headers[`authorization`];
  console.log("authHeader", authHeader);
  const token = authHeader.split(" ")[1];
  // console.log("auth token", token);
  // const data = jwt.verify(token);
  // console.log("verify in backend", data);

  // If no token is found, respond with a 403 (Forbidden) status code and error message
  if (!token) {
    res.status(403).send("Unauthorized user");
  }

  try {
    // Verify the token using the JWT secret key
    const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("data in backend", data);

    // If token verification is successful, proceed to the next middleware or route handler
    next();
  } catch (err) {
    // If token verification fails, respond with a 403 (Forbidden) status code and error message
    // res.status(403).send("Unauthorized user in catch");
  }

  // In case of any errors or exceptions, proceed to the next middleware or route handler
  next();
};

module.exports = auth;
