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

const fileStorageEngineReceipt = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/Receipts");
  },
  filename: (req, file, cb) => {
    let ext = file.mimetype.split("/");
    cb(null, `${file.fieldname}-${Date.now()}.${ext[1]}`);
  },
});
const uploadReceipt = multer({ storage: fileStorageEngineReceipt });

const fileStorageEngineAvatar = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/Avatars");
  },
  filename: (req, file, cb) => {
    let ext = file.mimetype.split("/");
    cb(null, `${file.fieldname}-${Date.now()}.${ext[1]}`);
  },
});
const uploadAvatar = multer({ storage: fileStorageEngineAvatar });

router.post("/document1", upload.single("document1"), (req, res) => {
  res.send(req.file);
});
router.post("/document2", upload.single("document2"), (req, res) => {
  res.send(req.file);
});
router.post("/document3", upload.single("document3"), (req, res) => {
  res.send(req.file);
});
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
router.post("/receipt", uploadReceipt.single("receipt"), (req, res) => {
  res.send(req.file);
});
router.post("/avatar", uploadAvatar.single("avatar"), (req, res) => {
  res.send(req.file);
});

module.exports = router;
