const express = require("express");
const userRoutes = require("./routes/userRoutes"); // Importerar rutter för användarhantering
const reviewRoutes = require("./routes/reviewRoutes"); // Importerar rutter för recensioner
const movieRoutes = require("./routes/movieRoutes"); // Importerar rutter för filmer
const cors = require("cors"); // Importerar CORS för att möjliggöra förfrågningar från andra domäner
const app = express();// Skapar en Express-applikation
const port = 3000;
app.use(express.json());
app.use(cors());

// Rutter för användarhantering, recensioner och filmer
app.use("/users", userRoutes); // Hantera användarrutter (registrering, inloggning)
app.use("/reviews", reviewRoutes);
app.use("/movies", movieRoutes); // Hantera filmer, t.ex. OMDb API-sökningar
// Startsida för API:et
app.get("/", (req, res) => {
  res.send("Film Backend API");
});
// Logga alla routade middleware-funktioner
console.log(app._router.stack);
// Starta servern och lyssna på angiven port
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
