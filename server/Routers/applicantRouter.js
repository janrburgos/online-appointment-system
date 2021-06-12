const express = require("express");
const router = express.Router();
const Applicant = require("../Models/Applicant");

router.get("/:email", (req, res) => {
  Applicant.find({ email: req.params.email }).then((applicant) => {
    res.send(applicant);
  });
});

router.get("/id/:_id", (req, res) => {
  Applicant.find({ _id: req.params._id }).then((applicant) => {
    res.send(applicant);
  });
});

router.post("/", (req, res) => {
  let newApplicant = new Applicant(req.body);
  newApplicant.save().then((applicant) => {
    res.send(applicant);
  });
});

router.put("/:_id", (req, res) => {
  Applicant.findByIdAndUpdate(req.params._id, req.body, {
    useFindAndModify: false,
    new: true,
  }).then((applicant) => {
    res.send(applicant);
  });
});

module.exports = router;
