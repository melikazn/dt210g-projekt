const pool = require("../db");// Importerar databaskopplingen

// Funktion för att lägga till en recension
const addReview = async (req, res) => {
  const { movieTitle, review } = req.body; // Hämtar filmens titel och recensionen från förfrågan
  const userId = req.user.id;  // Hämtar användarens ID från den autentiserade användaren

  // Kontroll om obligatoriska fält saknas
  if (!movieTitle || !review) {
    return res.status(400).json({ message: "Movie title and review are required" });
  }

  try {
// Lägger till recensionen i databasen
    const [result] = await pool.query(
      "INSERT INTO reviews (user_id, movie_title, review) VALUES (?, ?, ?)",
      [userId, movieTitle, review]
    );

    const reviewId = result.insertId;  // Hämtar ID:t på den nyskapade recensionen
    console.log(reviewId);
     // Hämtar användarnamnet baserat på userId
    const [user] = await pool.query("SELECT username FROM users WHERE id = ?", [userId]);

    res.status(201).json({
      id: reviewId,
      username: user[0]?.username || "Anonym",
      review,
      message: "Review added successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding review", error: error.message });
  }
};
// Funktion för att hämta recensioner baserat på filmens titel
const getReviewsByMovie = async (req, res) => {
    const { title } = req.params;
  
    try {
       // Hämtar alla recensioner för den angivna filme
      const [reviews] = await pool.query(
        "SELECT r.review, r.created_at, u.username, r.id FROM reviews r JOIN users u ON r.user_id = u.id WHERE r.movie_title = ?",
        [title]
      );
  
      res.status(200).json(reviews);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching reviews", error: error.message });
    }
  };
  
  // Ta bort recension
const deleteReview = async (req, res) => {
  const { id } = req.params;// Hämtar recensionens ID från URL-parametrarna
  const userId = req.user.id; // Hämtar ID för den inloggade användaren
  console.log(req.params);
  console.log(req.user);
  

  try {
    // Kontrollera om recensionen existerar och tillhör användaren
    const [review] = await pool.query(
      "SELECT * FROM reviews WHERE id = ? AND user_id = ?",
      [id, userId]
    );

    if (review.length === 0) {
      return res.status(404).json({ message: "Review not found or you are not authorized to delete this review." });
    }

    // Ta bort recensionen från databsen 
    await pool.query("DELETE FROM reviews WHERE id = ?", [id]);

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting review", error: error.message });
  }
};

// Uppdatera recension
const updateReview = async (req, res) => {
  const { id } = req.params;
  const { review } = req.body;
  const userId = req.user.id;
// Kontrollera om ny recensionstext har skickats
  if (!review) {
    return res.status(400).json({ message: "Review content is required" });
  }

  try {
    // Kontrollera om recensionen existerar och tillhör användaren
    const [existingReview] = await pool.query(
      "SELECT * FROM reviews WHERE id = ? AND user_id = ?",
      [id, userId]
    );

    if (existingReview.length === 0) {
      return res.status(404).json({ message: "Review not found or you are not authorized to update this review." });
    }

    // Uppdatera recensionen i databasen 
    await pool.query("UPDATE reviews SET review = ? WHERE id = ?", [review, id]);

    res.status(200).json({ message: "Review updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating review", error: error.message });
  }
};
// Exporterar funktionerna så att de kan användas i andra delar av applikationen
module.exports = { addReview , getReviewsByMovie, deleteReview, updateReview};
