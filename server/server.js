const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const formattingRoutes = require("./routes/formattingRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SmartPrintify Backend Running");
});

app.use("/api/formatting", formattingRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});