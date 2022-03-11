const { connect } = require("mongoose");
const { success, error, info } = require("consola");
const { MONGODB_URL_CLOUD, MONGODB_URL_LOCAL, NODE_ENV } = require("./index");
exports.DbConnection = async () => {
  try {
    if (NODE_ENV === "development") {
      await connect(MONGODB_URL_LOCAL);
      success(
        `LOCAL MONGODB DATABASE CONNECTED ${NODE_ENV} mode`.magenta.bold
      );
    } else {
      await connect(MONGODB_URL_CLOUD);
      error(`CLOUD MONGODB DATABASE CONNECTED`);
    }
  } catch (err) {
    error(err);
  }
};
