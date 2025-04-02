const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("Killing the process");
  res.send("Shutting down");
  process.exit();
});

module.exports = router;
