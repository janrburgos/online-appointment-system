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
        default:
          "https://res.cloudinary.com/janrcloud/image/upload/v1624670245/online-appointment-system/Uploads/no-document.png",
      },
      requirementStatus: { type: String, default: "-" },
    },
  ],
  transactionDate: { type: Date, default: Date.now() },
  transactionStatus: { type: String, default: "-" }, // "pending", "to resubmit requirements", "set appointment date" "to claim document", "cancelled", "document claimed"
  transactionStatusUpdated: { type: Number, default: Date.now() },
  remarks: { type: String, default: "-" },
  paymentReceiptUrl: { type: String, default: "" },
  paymentStatus: { type: String, default: "-" }, // "pending", "rejected", "accepted"
  appointmentDate: { type: String, default: "-" }, // YYYYMMDD
});

module.exports = mongoose.model("Application", ApplicationSchema);
