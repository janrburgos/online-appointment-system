const express = require("express");
const router = express.Router();
const { cloudinary } = require("../Utils/cloudinary");

router.post("/avatar", (req, res) => {
  cloudinary.uploader
    .upload(req.body.data, {
      upload_preset: "online-appointment-system-avatars",
    })
    .then((avatar) => res.send(avatar.url));
});

router.post("/receipt", (req, res) => {
  cloudinary.uploader
    .upload(req.body.data, {
      upload_preset: "online-appointment-system-receipts",
    })
    .then((receipt) => res.send(receipt.url));
});

router.post("/document", (req, res) => {
  cloudinary.uploader
    .upload(req.body.data, {
      upload_preset: "online-appointment-system-uploads",
    })
    .then((document) => res.send(document.url));
});

module.exports = router;
