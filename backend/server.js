const express = require("express");
const { DbConnection } = require("./config/db");
const cors = require("cors");
const colors = require("colors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { success, error, info } = require("consola");
const { PORT, NODE_ENV } = require("./config");

const AuthRoutes = require("./routes/auth");
const app = express();

let StartServer = async () => {
  /*-----------------database connection started here-------------*/
  DbConnection();
  /*-----------------database connection started here-------------*/

  /*Middleware section starts here----------------*/
  if (NODE_ENV === "developmet") {
    app.use(morgan("dev"));
  }

  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());
  /*Middleware section ends here----------------*/
  /*listen port starts here---------------*/

  // ====load Allroutes=========
  app.use("/api/auth", AuthRoutes);
  app.listen(PORT, err => {
    if (err) throw err;
    info(`server is running on port number ${PORT}`.blue.bold);
  });
  /*listen port ends here---------------*/
};
StartServer();
