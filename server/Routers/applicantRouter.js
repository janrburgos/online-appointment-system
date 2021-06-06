const express = require("express");
const router = express.Router();
const Applicant = require("../Models/Applicant");

router.get("/", (req, res) => {
  Applicant.find({}).then((data) => {
    res.send(data);
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

router.delete("/:_id", (req, res) => {
  Applicant.findByIdAndDelete(req.params._id).then((applicant) => {
    res.send(applicant);
  });
});

module.exports = router;
