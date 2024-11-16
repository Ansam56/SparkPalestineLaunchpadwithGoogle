// Import required modules
var path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv"); // Module to load environment variables from a .env file
dotenv.config(); // Load environment variables from .env file into process.env

const { analyzeURL } = require("./URLAnalyzer");

const app = express();
const cors = require("cors");

// Use middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("dist"));

const API_KEY = process.env.API_KEY; // Store API key from environment variables

// Define a GET route for the root path
app.get("/", (req, res) => {
  res.sendFile("index.html"); // Send the index.html file as the response
});

// Define a POST route for URL analysis
app.post("/", async (req, res) => {
  const url = req.body.url; // Extract URL from request body

  const analysis = await analyzeURL(url, API_KEY); // Analyze the URL using the URLAnalyzer function
  res.json(analysis); // Send the analysis result back to the client as a JSON response
});

// Start the server and listen on port 8000 for incoming requests
app.listen(8000, () => {
  console.log("Listening on port 8000!");
});
