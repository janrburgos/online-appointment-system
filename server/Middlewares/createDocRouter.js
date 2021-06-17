const express = require("express");
const router = express.Router();
const fs = require("fs");
const { jsPDF } = require("jspdf");
const doc = new jsPDF();

router.post("/", (req, res) => {
  fs.mkdir(`public/Created Documents/${req.body.folderName}`, (err) => {
    if (err) {
      console.log(`directory ${req.body.folderName} already exists`);
    } else {
      console.log(`directory ${req.body.folderName} created`);
    }
  });

  doc.text(
    `This is ${req.body.documentName} of ${req.body.applicantInfo.firstName} ${req.body.applicantInfo.lastName}`,
    10,
    10
  );
  doc.save(
    `public/Created Documents/${req.body.folderName}/${req.body.fileName}.pdf`
  );
  res.end();
});

module.exports = router;
