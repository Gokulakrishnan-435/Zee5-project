const { Schema, model } = require("mongoose");

let movieSchema = new Schema(
  {
    movieImg: {
      type: [""],
      required: true,
    },
    movieDes: {
      type: String,
      required: true,
    },
    movieFile: {
      type: [""],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("movies", movieSchema);
