const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db"); 
const crypto = require("crypto");

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Hasha användarens lösenord
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generera en slumpmässig JWT-hemlighet för varje användare
    const jwtSecret = crypto.randomBytes(64).toString("hex"); // Generera en stark hemlighet

    // Spara användaren tillsammans med den genererade jwtSecret i databasen
    await pool.query(
      "INSERT INTO users (username, email, password, jwt_secret) VALUES (?, ?, ?, ?)",
      [username, email, hashedPassword, jwtSecret]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = rows[0]; // Hämta användaren från databasen

    // Kontrollera lösenordet
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Skapa JWT med användarens unika hemlighet
    const token = jwt.sign({ userId: user.id }, user.jwt_secret, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token , username:user.username, userId:user.id});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

module.exports = { registerUser, loginUser };
