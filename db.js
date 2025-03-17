// Importerar mysql2 med stöd för promises
const mysql = require('mysql2/promise');
// Skapar en anslutningspool till MySQL-databasen
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', 
  password: '', 
  database: 'filmer', 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
