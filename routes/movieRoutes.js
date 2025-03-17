const express = require("express");
const { getMovieFromOMDb } = require("../controllers/movieController");
const checkMovieExists = require("../middleware/movieMiddleware");

const router = express.Router();

// Route för att söka efter film med titel, och kontrollera om filmen finns i databasen
router.get("/omdb/:title", checkMovieExists, (req, res, next) => {
  console.log(`Received request for movie with title: ${req.params.title}`);
  next();  // Skicka vidare till nästa middleware
}, getMovieFromOMDb);

module.exports = router;
