const AuthSchema = require("../models/Auth");
let movieSchema = require("../models/createMovies");
const bcrypt = require("bcryptjs");
const { JWT_COOKIE_EXPIRE } = require("../config");
/* @http request post
    @access public
    url=> api/auth/signup
*/
exports.SignUp = async (req, res) => {
  // write signup logic
  let { username, email, role, password } = req.body;
  try {
    let payload = {
      username,
      email,
      role,
      password,
    };
    // SAVE INTO DATABASE
    let user = await AuthSchema.create(payload);
    sendTokenRequest(user, 201, res);
  } catch (error) {
    console.log(error);
    res.status(501).json("server errror");
  }
};

/* @http request post
    @access public
    url=> api/auth/signin
*/

exports.SignIn = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "email and password required" });
    }
    //  check your exists or not
    let user = await AuthSchema.findOne({ email }).select("+password");

    if (!user) {
      return res
        .status(401)
        .json({ message: "email not exists in our database" });
    }

    // check password
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "password not matched" });
    }
    sendTokenRequest(user, 201, res);
  } catch (error) {
    return res.status(501).json({ message: "server error" });
  }
};

function sendTokenRequest(user, statusCode, res) {
  let TOKEN = user.getJWTtoken();
  let options = {
    expires: new Date(Date.now() + JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  res
    .status(statusCode)
    .cookie("Token", TOKEN, options)
    .json({ message: "successfully stord", TOKEN });
}
exports.getMe = async (req, res, next) => {
  try {
    let user = await AuthSchema.findById(req.user.id);
    res.status(200).json({ message: "successfully fetched", user });
  } catch (error) {
    res.status(501).json({ message: "server error" });
  }
};
function sendRequest(movies, statusCode, res) {
  let TOKEN = movies.getJWTtoken();
  let options = {
    expires: new Date(Date.now() + JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    
  };
  res
    .status(statusCode)
    .cookie("Token", TOKEN, options)
    .json({ message: "successfully stord", TOKEN });
}
exports.createMovies = async (req, res) => {
  // write signup logic
  let { movieImg, movieDes, movieFile } = req.body;
  try {
    let payload = {
      movieImg,
      movieFile,
      movieDes,
    };
    // SAVE INTO DATABASE
    let movies = await movieSchema.create(payload);
    sendRequest(movies, 201, res);
  } catch (error) {
    console.log(error);
    res.status(501).json("server errror");
  }
};
