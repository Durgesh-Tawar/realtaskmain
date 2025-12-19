const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));

// MySQL connection (Railway compatible)
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

db.connect((err) => {
  if (err) {
    console.log("MySQL Error ❌", err);
  } else {
    console.log("MySQL Connected ✅");
  }
});

// Form submit route
app.post("/submit", (req, res) => {
  const { full_name, email, mobile, area_city } = req.body;

  const sql = `
    INSERT INTO consultations
    (full_name, email, mobile, area_city)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [full_name, email, mobile, area_city], (err) => {
    if (err) {
      console.log("Insert Error ❌", err);
      res.status(500).send("Something went wrong");
    } else {
      res.send("Form Submitted Successfully ✅");
    }
  });
});

// ✅ Railway PORT fix
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
