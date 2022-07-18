const fs = require("fs");
const path = require("path");
const uuid = require("uuid");
const router = require("express").Router();

// API Routes
// GET /api/notes
router.get("/api/notes", (req, res) => {
  const notesData = fs.readFileSync(path.join(process.cwd(), "db/db.json"), "utf8");
  const parsedData = JSON.parse(notesData);
  res.json(parsedData);
});

// POST /api/notes
router.post("/api/notes", (req, res) => {
  const { title, text } = req.body;
  if (title && text) {
  const newNote = {
    id: uuid.v4(),
    title,
    text,
  };

     // Read current saved notes
     const readNotes = fs.readFileSync(path.join(process.cwd(), '/db/db.json'), 'utf8')

     // Convert string into JSON object
     const parsedNotes = JSON.parse(readNotes);

     // Add a new review
     parsedNotes.push(newNote);
     // Write new notes back to the file
     fs.writeFileSync(
         path.join(process.cwd(), "db/db.json"),
         JSON.stringify(parsedNotes),
     );

     // Response Status
     const response = {
         status: 'Succcess',
         body: newNote,
     }
     // Send response status
     res.status(201).json(response)
 } else {
     res.status(500).json('Error in POST')
 }
})


module.exports = router;
