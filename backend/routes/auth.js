const { Router } = require("express");
const { SignIn, SignUp, getMe } = require("../controllers/auth");
const { Protected } = require("../middlewares/auth");
const router = Router();
router.route("/signup").post(SignUp);
router.route("/signin").post(SignIn);
router.route("/me").get(Protected, getMe);
module.exports = router;
