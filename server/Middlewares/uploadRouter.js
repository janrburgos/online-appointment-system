const express = require("express");
const router = express.Router();
const multer = require("multer");

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/Uploads");
  },
  filename: (req, file, cb) => {
    let ext = file.mimetype.split("/");
    cb(null, `${file.fieldname}-${Date.now()}.${ext[1]}`);
  },
});
const upload = multer({ storage: fileStorageEngine });

router.post("/document4", upload.single("document4"), (req, res) => {
  res.send(req.file);
});
router.post("/document5", upload.single("document5"), (req, res) => {
  res.send(req.file);
});
router.post("/document6", upload.single("document6"), (req, res) => {
  res.send(req.file);
});
router.post("/document7", upload.single("document7"), (req, res) => {
  res.send(req.file);
});
router.post("/document8", upload.single("document8"), (req, res) => {
  res.send(req.file);
});
router.post("/document9", upload.single("document9"), (req, res) => {
  res.send(req.file);
});

module.exports = router;
