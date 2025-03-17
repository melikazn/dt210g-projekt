const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");
const router = express.Router();

router.post("/register", registerUser); // Hantera registrering
router.post("/login", loginUser); // Hantera inloggning

module.exports = router;
