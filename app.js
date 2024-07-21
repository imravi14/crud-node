const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const router = require("./routes/routes.js");
const PORT = 5000;

//MIDDLEWARE
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//CONNECTING TO DB AND STARTING SERVER
mongoose
  .connect(
    "mongodb+srv://prajapatravi331:admin_ravi@cluster0.ujjwmfw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(
    app.listen(PORT, () => {
      console.log("Connected To DB And Server Started At PORT :" + PORT);
    })
  )
  .catch((err) => {
    console.log(err);
  });

//ROUTER
app.use(router);
