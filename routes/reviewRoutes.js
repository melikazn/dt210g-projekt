const express = require("express");
const jwt = require("jsonwebtoken");
const { addReview , deleteReview, updateReview} = require("../controllers/reviewController");
const authMiddleware = require("../middleware/authMiddleware");
const { getReviewsByMovie } = require("../controllers/reviewController"); 
const router = express.Router();

router.post("/:title", authMiddleware, addReview); // Endast inloggade användare kan skriva recensioner
router.get("/:title", getReviewsByMovie);
router.delete("/:id", authMiddleware, deleteReview); // Endast inloggade användare kan ta bort recensioner
router.put("/:id", authMiddleware, updateReview); // Endast inloggade användare kan uppdatera recensioner
// Tokenvalidering
router.get("/validate-token", (req, res) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extrahera token från Authorization header
  
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
      }
  
      // Om token är giltig, skicka tillbaka användarinformation eller en framgångsrik status
      res.status(200).json({ message: "Token is valid", userId: decoded.id });
    });
  });
module.exports = router;
