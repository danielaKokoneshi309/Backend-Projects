const mongoose = require("mongoose");

module.exports = function () {
  const db = process.env.DB;
  mongoose.connect(db);
};
