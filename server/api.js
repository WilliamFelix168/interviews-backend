const express = require("express");
const serverless = require('serverless-http');
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const SERVER_FUNCTIONS = '/.netlify/functions/api';

dotenv.config();


//Connect to DB
mongoose.connect(process.env.DB_CONNECT, { useUnifiedTopology: true, useNewUrlParser: true }, () => {
  console.log("connected to db");
})

//Middleware
app.use(express.json());

//Import Routes
const authRoute = require("../routes/auth");
const productRoute = require("../routes/product");

app.use(SERVER_FUNCTIONS + "/user", authRoute);
app.use(SERVER_FUNCTIONS + "/product", productRoute);

module.exports = app;
module.exports.handler = serverless(app);
