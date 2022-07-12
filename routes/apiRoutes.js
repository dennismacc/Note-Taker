const fs = require("fs");
const path = require("path");
const router = require("express").Router();

// API Routes
// GET /api/notes
router.get("/api/notes", (req, res) => {
  res.json(fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8"));
});

// POST /api/notes
router.post(
  "/api/notes",
  (req, res) => {
    const newNote = req.body;
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

