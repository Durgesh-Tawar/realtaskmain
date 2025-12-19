const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "vandurgesh18",
  database: "formdata"
});

db.connect((err) => {
  if (err) {
    console.log("MySQL Error ❌", err);
  } else {
    console.log("MySQL Connected ✅");
  }
});

// ✅ Form submit route
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
      res.send("Something went wrong");
    } else {
      res.send("Form Submitted Successfully ✅");
    }
  });
});

// Server start
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
