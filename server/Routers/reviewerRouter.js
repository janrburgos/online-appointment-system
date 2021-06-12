const express = require("express");
const router = express.Router();
const Reviewer = require("../Models/Reviewer");

router.get("/:email", (req, res) => {
  Reviewer.find({ email: req.params.email }).then((applicant) => {
    res.send(applicant);
  });
});

module.exports = router;
