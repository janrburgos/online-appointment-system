const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DocumentSchema = new Schema({
  applicantId: { type: Schema.Types.ObjectId, ref: "Applicant" },
  docType: String,
  documentUrl: String,
  dateUploaded: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Document", DocumentSchema);
