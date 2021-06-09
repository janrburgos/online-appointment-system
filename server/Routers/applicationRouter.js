const express = require("express");
const router = express.Router();
const Application = require("../Models/Application");

// router.get("/", (req, res) => {
//   Application.find({}).then((data) => {
//     res.send(data);
//   });
// });

router.get("/:string", (req, res) => {
  Application.find({ applicantId: req.params.string }).then((data) => {
    res.send(data);
  });
});

// router.get("/:email", (req, res) => {
//   Application.find({ email: req.params.email }).then((application) => {
//     res.send(application);
//   });
// });

router.post("/", (req, res) => {
  let newApplication = new Application(req.body);
  newApplication.save().then((application) => {
    res.send(application);
  });
});

// router.put("/:_id", (req, res) => {
//   Applicant.findByIdAndUpdate(req.params._id, req.body, {
//     useFindAndModify: false,
//     new: true,
//   }).then((applicant) => {
//     res.send(applicant);
//   });
// });

// router.delete("/:_id", (req, res) => {
//   Applicant.findByIdAndDelete(req.params._id).then((applicant) => {
//     res.send(applicant);
//   });
// });

module.exports = router;
