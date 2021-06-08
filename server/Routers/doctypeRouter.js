const express = require("express");
const router = express.Router();
const Doctype = require("../Models/Doctype");

router.get("/", (req, res) => {
  Doctype.find({}).then((data) => {
    res.send(data);
  });
});

router.get("/:doctype", (req, res) => {
  Doctype.find({ name: req.params.doctype }).then((doctype) => {
    res.send(doctype);
  });
});

module.exports = router;
