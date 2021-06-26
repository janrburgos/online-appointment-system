require("dotenv").config({
  path: "../.env",
});
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 1337;
const applicantRouter = require("./Routers/applicantRouter");
const reviewerRouter = require("./Routers/reviewerRouter");
const applicationRouter = require("./Routers/applicationRouter");
const documentRouter = require("./Routers/documentRouter");
const doctypeRouter = require("./Routers/doctypeRouter");
const uploadRouter = require("./Middlewares/uploadRouter");
const createDocRouter = require("./Middlewares/createDocRouter");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT, console.log(`server is listening to port ${PORT}`));

app.use(morgan("tiny"));
app.use(express.json({ limit: "1mb" }));
app.use(cors());
app.use("/api/applicants", applicantRouter);
app.use("/api/reviewers", reviewerRouter);
app.use("/api/applications", applicationRouter);
app.use("/api/documents", documentRouter);
app.use("/api/doctypes", doctypeRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/createdoc", createDocRouter);
