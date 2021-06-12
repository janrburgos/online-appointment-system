const express = require("express");
const router = express.Router();
const Document = require("../Models/Document");

router.get("/:_id", (req, res) => {
  Document.find({ applicantId: req.params._id }).then((data) => {
    res.send(data);
  });
});

router.post("/", (req, res) => {
  let newDocument = new Document(req.body);
  newDocument.save().then((document) => {
    res.send(document);
  });
});

module.exports = router;
