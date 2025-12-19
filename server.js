const express = require("express");
const mysql = require("mysql2");

const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Railway PORT fix ✅
const PORT = process.env.PORT || 3000;

// MySQL (Railway ENV use karna hai)
const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT
});


db.connect(err => {
  if (err) console.log(err);
  else console.log("MySQL Connected ✅");
});

app.post("/submit", (req, res) => {
  const { full_name, email, mobile, area_city } = req.body;

  const sql =
    "INSERT INTO consultations (full_name,email,mobile,area_city) VALUES (?,?,?,?)";

  db.query(sql, [full_name, email, mobile, area_city], err => {
    if (err) return res.send("Error");
    res.send("Form submitted successfully ✅");
  });
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
