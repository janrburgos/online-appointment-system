const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
  applicantId: { type: Schema.Types.ObjectId, ref: "Applicant" },
  transactionDocument: String,
  amount: Number,
  transactionRequirements: [String],
  transactionDate: { type: Date, default: Date.now() },
  transactionStatus: { type: String, default: "-" },
  paymentStatus: { type: String, default: "-" },
  appointmentDate: { type: String, default: "-" }, // YYYY-MM-DDTHH:MM:SSZ
});

module.exports = mongoose.model("Application", ApplicationSchema);
