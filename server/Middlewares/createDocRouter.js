const express = require("express");
const router = express.Router();
const { jsPDF } = require("jspdf");
const doc = new jsPDF();
const { cloudinary } = require("../Utils/cloudinary");

router.post("/", (req, res) => {
  doc.text(
    `This is ${req.body.documentName} of ${req.body.applicantInfo.firstName} ${req.body.applicantInfo.lastName}`,
    10,
    10
  );

  const pdfBase64 = Buffer.from(doc.output()).toString("base64");

  cloudinary.uploader.upload(
    `data:application/pdf;base64,${pdfBase64}`,
    {
      folder: `online-appointment-system/Created Documents/${req.body.folderName}`,
      upload_preset: "online-appointment-system-created-documents",
    },
    (error, data) => {
      res.send(data.url);
    }
  );
});

module.exports = router;
