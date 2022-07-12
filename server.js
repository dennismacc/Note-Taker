const fs = require("fs");
const express = require("express");
const path = require("path");
const router = require("express").Router();
const app = express();

// Routes
const apiRoutes = require("./routes/routes");

//Middleware
app.use("/api", apiRoutes);
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//PORT info
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
