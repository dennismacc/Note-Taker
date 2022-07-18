const express = require("express");
const path = require("path");
const app = express();

// Routes
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

//Middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//PORT info
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});

// Call the API Routes
app.use("/api", apiRoutes);
// Call the HTML Routes
app.use("/", htmlRoutes);

// Route for handling the HTML GET requests
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});
