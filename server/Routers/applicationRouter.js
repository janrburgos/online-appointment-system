const express = require("express");
const router = express.Router();
const Application = require("../Models/Application");

router.get("/:string", (req, res) => {
  Application.find({ applicantId: req.params.string }).then((data) => {
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
