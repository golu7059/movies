
const express = require("express");
const axios = require("axios");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;
const _dirname = path.resolve();

const cors = require('cors');
app.use(cors()); // Add CORS support to avoid cross-origin issues


app.use(express.static("public"));


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
    console.error("Error fetching from OMDb API:", error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
});
// app.use(express.static(path.join(_dirname, "/frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(_dirname + "/index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
