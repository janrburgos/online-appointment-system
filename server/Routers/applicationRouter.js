const express = require("express");
const router = express.Router();
const Application = require("../Models/Application");

router.get("/:_id", (req, res) => {
  Application.find({ applicantId: req.params._id }).then((data) => {
    res.send(data);
  });
});

router.get("/review/:status", (req, res) => {
  Application.find({ transactionStatus: req.params.status }).then((data) => {
    res.send(data);
  });
});

router.post("/", (req, res) => {
  let newApplication = new Application(req.body);
  newApplication.save().then((application) => {
    res.send(application);
  });
});

router.put("/:_id", (req, res) => {
  Application.findByIdAndUpdate(req.params._id, req.body, {
    useFindAndModify: false,
    new: true,
  }).then((application) => {
    res.send(application);
  });
});

module.exports = router;
