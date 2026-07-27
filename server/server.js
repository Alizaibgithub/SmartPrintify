const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SmartPrintify Backend Running");
});

app.post("/api/formatting/validate", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  const options = req.body.options ? JSON.parse(req.body.options) : {};

  return res.json({
    message: "Formatting validation request received.",
    fileName: req.file.originalname,
    options,
    issues: [
      "Title formatting check pending",
      "Spacing check pending",
    ],
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});