const fs = require("fs");
const path = require("path");
const uuid = require("uuid");
const router = require("express").Router();

// API Routes
// GET /api/notes
router.get("/api/notes", (req, res) => {
  const notesData = fs.readFileSync(
    path.join(process.cwd(), "db/db.json"),
    "utf8"
  );
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
    const readNotes = fs.readFileSync(
      path.join(process.cwd(), "/db/db.json"),
      "utf8"
    );

    // Convert string into JSON object
    const parsedNotes = JSON.parse(readNotes);

    // Add a new review
    parsedNotes.push(newNote);
    // Write new notes back to the file
    fs.writeFileSync(
      path.join(process.cwd(), "db/db.json"),
      JSON.stringify(parsedNotes)
    );

    // Response Status
    const response = {
      status: "Succcess",
      body: newNote,
    };
    // Send response status
    res.status(201).json(response);
  } else {
    res.status(500).json("Error in POST");
  }
});

// GET route for ID
router.get('/api/notes/:id', (req, res) => {
  const requestID = req.params.id
  const readNotes = fs.readFileSync(path.join(process.cwd(), "db/db.json"), 'utf8');
  const parsedNotes = JSON.parse(readNotes);
  // Iterate through the terms name to find the ID
  console.log('REQUESTED SINGLE NOTE ID IS:', requestID)
  if (requestID) {
      console.info(`${req.method} request received to get a single a review`);
      for (let i = 0; i < parsedNotes.length; i++) {
          const currentID = parsedNotes[i]
          if (currentID.id === requestID) {
              return res.json(currentID);
          }
      }
  }
  // Return a message if the term doesn't exist 
  return res.json('No term found');

})

// Delete note
router.delete("/api/notes/:id", (req, res) => {
  const { id } = req.params;
  const readNotes = fs.readFileSync(
    path.join(process.cwd(), "/db/db.json"),
    "utf8"
  );
  const parsedNotes = JSON.parse(readNotes);
  const newNotes = parsedNotes.filter((note) => note.id !== id);
  fs.writeFileSync(
    path.join(process.cwd(), "db/db.json"),
    JSON.stringify(newNotes)
  );
  res.status(200).json({
    status: "Success",
    message: "Note deleted",
  });
});

module.exports = router;
