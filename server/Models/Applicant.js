const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ApplicantSchema = new Schema({
  applicantNumber: { type: String, default: Date.now() },
  email: { type: String, required: true },
  password: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, required: true },
  birthDate: { type: String, required: true }, // YYYYMMDD
  civilStatus: { type: String, required: true },
  citizenship: { type: String, required: true },
  placeOfBirth: { type: String, required: true },
  currentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  avatar: {
    type: String,
    default:
      "https://res.cloudinary.com/janrcloud/image/upload/v1624670305/online-appointment-system/Avatars/default-avatar.png",
  },
});

module.exports = mongoose.model("Applicant", ApplicantSchema);
