const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DoctypeSchema = new Schema({
  name: { type: String, required: true },
  requirements: [{ type: String }],
});

module.exports = mongoose.model("Doctype", DoctypeSchema);
