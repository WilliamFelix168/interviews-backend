const express = require("express");
const serverless = require("serverless-http");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

//Connect to DB
mongoose.connect(
  process.env.DB_CONNECT,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("connected to db");
  }
);

//Middleware
app.use(express.json());

//Import Routes
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");

app.use("/api/user", authRoute);
app.use("/api/product", productRoute);

app.listen(3000, () => console.log("Server is running"));
