const path = require("path");
const router = require("express").Router();

//HTML Routes
//Get notes.html
router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

module.exports = router;
