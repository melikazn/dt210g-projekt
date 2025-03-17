const axios = require("axios");

const getMovieFromOMDb = async (req, res) => {
  const { title } = req.params;  // Hämtar filmens titel från URL-parametern
  const apiKey = "f5f1e3b7"; // API-nyckel

  try {
    // Gör en API-begäran till OMDb API med filmens titel och API-nyckeln
    const response = await axios.get(`http://www.omdbapi.com/?t=${encodeURIComponent(title)}&y=${encodeURIComponent(year)}&apikey=${apiKey}`);

    
    if (response.data.Response === "False") {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json(response.data);  // Skicka tillbaka filmens data som svar
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching data from OMDb API", error: error.message });
  }
};

module.exports = { getMovieFromOMDb };
