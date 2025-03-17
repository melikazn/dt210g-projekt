const db = require("../db"); // Importerar databaskopplingen

// Middleware för att kontrollera om en film finns i databasen
const checkMovieExists = (req, res, next) => {
  const { title } = req.params; // Hämta filmens titel från URL-parametern

  // Söker efter filmen i databasen
  db.query("SELECT * FROM movies WHERE title = ?", [title], (err, results) => {
    if (err) {
      // Om ett fel uppstår i databasen, returnera ett felmeddelande
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (results.length === 0) {
      // Om filmen inte hittas, returnera ett 404-meddelande
      return res.status(404).json({ message: "Movie not found" });
    }

    // Om filmen finns, fortsätt till nästa middleware eller route-handler
    next();
  });
};

module.exports = checkMovieExists; 
