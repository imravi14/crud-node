const User = require("../models/crud.js");
const fs = require("fs");
//GET HOME
var GET_HOME = (req, res) => {
  res.render("index", {
    title: "Welcome",
  });
};
//POST HOME
var POST_HOME = async (req, res) => {
  try {
    const userdata = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      image: req.file.filename,
      color: req.body.color,
      gender: req.body.gender,
      country: req.body.country,
      content: req.body.content,
    });
    console.log(userdata);
    const userFound = await userdata.save();
    res.redirect("/data");
  } catch (err) {
    console.log(err);
  }
};
//GET DATA
var GET_DATA = async (req, res) => {
  try {
    const userFound = await User.find({});
    if (userFound.length > 0) {
      res.render("data", {
        title: "Your-Data",
        data: userFound,
      });
    } else {
      res.redirect("/");
      res.send("No Records");
    }
  } catch (err) {
    console.log(err);
  }
};
//GET UPDATE
var GET_UPDATE = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById({ _id: id });
    res.render("update", {
      title: "Update-Data",
      user,
    });
  } catch (err) {
    console.log(err);
  }
};
//POST UPDATE
var POST_UPDATE = async (req, res) => {
  try {
    const id = req.params.id;
    //IMAGE UPDATE
    let new_image = "";
    if (req.file) {
      new_image = req.file.filename;
      try {
        fs.unlinkSync("./public/images/" + req.body.old_image);
      } catch (err) {
        console.log(err);
      }
    } else {
      new_image = req.body.old_image;
    }
    //IMAGE UPDATE END
    await User.findByIdAndUpdate(id, {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      image: new_image,
      color: req.body.color,
      gender: req.body.gender,
      country: req.body.country,
      content: req.body.content,
    });
    res.redirect("/data");
  } catch (err) {
    console.log(err);
  }
};
//GET DELETE
var GET_DELETE = async (req, res) => {
  const id = req.params.id;
  const result = await User.findByIdAndDelete(id);
  if (result && result.image != "") {
    try {
      fs.unlinkSync("./public/images/" + result.image);
    } catch (err) {
      console.log(err);
    }
  }
  res.redirect("/data");
};
//EXPORTING CONTROLLER
module.exports = {
  GET_HOME,
  POST_HOME,
  GET_DATA,
  GET_UPDATE,
  POST_UPDATE,
  GET_DELETE,
};
