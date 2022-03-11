let multer = require("multer");
let { Router } = require("express");
let movieSchema = require("../models/createMovies");
let router = Router();

let { storage } = require("../middlewares/multer");
let { Router } = require("express");
let upload = multer({ storage: storage });
let { createMovies } = require("../controllers/auth");
let router = Router();
router.route("/create-movies").post(upload, createMovies);

module.exports = router;
