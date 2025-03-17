const jwt = require("jsonwebtoken");
const pool = require("../db");

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Logga token för att kontrollera
    console.log("Received Token:", token);

    // Första steg: Dekoda token för att få användar-ID
    const decoded = jwt.decode(token); // Använd decode för att extrahera användar-ID utan att verifiera

    if (!decoded || !decoded.userId) {
      return res.status(401).json({ message: 'Invalid token, userId not found' });
    }

    const userId = decoded.userId; // Extrahera userId från token

    // Hämta användarens jwt_secret från databasen
    const [userRows] = await pool.query("SELECT jwt_secret FROM users WHERE id = ?", [userId]);

    if (userRows.length === 0) {
      return res.status(401).json({ message: 'User not found' });
    }

    const user = userRows[0];
    
    // Logga användarens jwt_secret för att verifiera att vi får den rätta hemligheten
    console.log("User JWT Secret:", user.jwt_secret);

    // Steg två: Verifiera token med den rätta jwt_secret
    jwt.verify(token, user.jwt_secret, (err, decoded) => {
      if (err) {
        console.error("JWT Verification Error:", err);
        return res.status(401).json({ message: 'Token is not valid' });
      }

      req.user = { id: userId }; // Lägg till användarinformationen i requesten
      next(); // Fortsätt till nästa middleware eller route handler
    });

  } catch (error) {
    console.error("Error in authMiddleware:", error);
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
