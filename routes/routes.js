const fs = require("fs");
const path = require("path");
const uuid = require("uuid");
const router = require("express").Router();

//HTML Routes
// Get notes.html
router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});
//Get index.html
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// API Routes
// GET /api/notes
router.get("/api/notes", (req, res) => {
  res.json(fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8"));
});

// POST /api/notes
router.post("/api/notes", (req, res) => {
  const { title, text } = req.body;
  const newNote = {
    id: uuid.v4(),
    title: title,
    text: text,
  };
  const notes = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8")
  );
  // Receives a new note to save to the db.json file
  notes.push(newNote);
  fs.writeFileSync(
    path.join(__dirname, "../db/db.json"),
    JSON.stringify(notes)
  );
  res.json(notes);
});


module.exports = router;
