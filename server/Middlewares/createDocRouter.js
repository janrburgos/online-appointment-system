const express = require("express");
const router = express.Router();
const fs = require("fs");
const pdfkit = require("pdfkit");
const pdf = new pdfkit();

router.post("/", (req, res) => {
  // create folder and pdf file
  fs.mkdir(`public/Created Documents/${req.body.folderName}`, (err) => {
    if (err) {
      console.log(`directory ${req.body.folderName} already exists`);
    } else {
      console.log(`directory ${req.body.folderName} created`);
    }
  });

  pdf.pipe(
    fs.createWriteStream(
      `public/Created Documents/${req.body.folderName}/${req.body.fileName}.pdf`
    )
  );
  pdf
    .text(
      `this is ${req.body.documentName} of ${req.body.applicantInfo.firstName} ${req.body.applicantInfo.lastName}`
    )
    .fontSize(25);
  pdf.end();
  res.send("hello");
});

module.exports = router;
