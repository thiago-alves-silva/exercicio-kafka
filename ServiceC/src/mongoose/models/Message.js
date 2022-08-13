const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  message: Object,
  createdAt: Date,
});

module.exports = mongoose.model("data_testecv", schema, "data_testecv");
