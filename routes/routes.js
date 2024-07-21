const router = require("express").Router();
const {
  GET_HOME,
  POST_HOME,
  GET_DATA,
  GET_UPDATE,
  POST_UPDATE,
  GET_DELETE,
} = require("../controllers/controller.js");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});
const upload = multer({ storage: storage }).single("image");
//GET HOME
router.get("/", GET_HOME);
//POST HOME
router.post("/", upload, POST_HOME);
//GET DATA
router.get("/data", GET_DATA);
//GET UPDATE
router.get("/update/:id", GET_UPDATE);
//POST UPDATE
router.post("/update/:id", upload, POST_UPDATE);
//GET DELETE
router.get("/delete/:id", GET_DELETE);

//EXPORTING ROUTER
module.exports = router;
