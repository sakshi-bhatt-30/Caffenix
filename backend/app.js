const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");

// const { auth } = require('express-oauth2-jwt-bearer');

const errorMiddleware = require("./middleware/error");

// Load environment variables
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({ path: "backend/config/.env" });
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// app.use(auth(config));


// Route Imports
const productRoute = require("./routes/productRoutes");
const userRoute = require("./routes/userRoutes");
const orderRoute = require("./routes/orderRoutes");
const paymentRoute = require("./routes/paymentRoutes");

app.use("/api/v1", productRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", orderRoute);
app.use("/api/v1", paymentRoute);

// Razorpay key route
app.get("/api/getkey", (req, res) => 
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);

// This route doesn't need authentication
app.get('/api/public', function(req, res) {
    res.json({
      message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
    });
  });
  
  // This route needs authentication
  app.get('/api/private', checkJwt, function(req, res) {
    res.json({
      message: 'Hello from a private endpoint! You need to be authenticated to see this.'
    });
  });



// Error middleware
app.use(errorMiddleware);

module.exports = app;
