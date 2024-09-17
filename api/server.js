const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;

app.use(cors()); // CORS support

// Serve static files from the public folder
app.use(express.static("public"));

// Movie search endpoint
app.get("/api/movies", async (req, res) => {
  const { title } = req.query;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  try {
    const response = await axios.get(`https://www.omdbapi.com/?s=${title}&apikey=${API_KEY}`);
    const { Search } = response.data;

    if (Search) {
      res.json(Search);
    } else {
      res.status(404).json([]);
    }
  } catch (error) {
    console.error("Error fetching from OMDb API:", error.message);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
