const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
  applicantId: { type: Schema.Types.ObjectId, ref: "Applicant" },
  transactionDocument: String,
  amount: Number,
  transactionRequirements: [
    {
      requirementName: String,
      requirementUrl: {
        type: String,
        default: "no-document.png",
      },
      requirementStatus: { type: String, default: "-" },
    },
  ],
  transactionDate: { type: Date, default: Date.now() },
  transactionStatus: { type: String, default: "-" },
  paymentReceiptUrl: String,
  paymentStatus: { type: String, default: "-" },
  appointmentDate: { type: String, default: "-" },
});

module.exports = mongoose.model("Application", ApplicationSchema);
