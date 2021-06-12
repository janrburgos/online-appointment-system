const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const PORT = 1337;
const applicantRouter = require("./Routers/applicantRouter");
const reviewerRouter = require("./Routers/reviewerRouter");
const applicationRouter = require("./Routers/applicationRouter");
const doctypeRouter = require("./Routers/doctypeRouter");
const uploadRouter = require("./Middlewares/uploadRouter");

mongoose.connect("mongodb://localhost:27017/appointmentapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT, console.log(`server is listening to port ${PORT}`));

app.use(express.static("./public"));
app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());
app.use("/api/applicants", applicantRouter);
app.use("/api/reviewers", reviewerRouter);
app.use("/api/applications", applicationRouter);
app.use("/api/doctypes", doctypeRouter);
app.use("/api/upload", uploadRouter);
