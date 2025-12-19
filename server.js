const express = require("express");
const mysql = require("mysql2");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const PORT = process.env.PORT || 8080;

const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT
});

db.connect((err) => {
  if (err) {
    console.error("MySQL Error ❌", err);
  } else {
    console.log("MySQL Connected ✅");
  }
});

app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

app.post("/submit", (req, res) => {
  const { full_name, email, mobile, area_city } = req.body;

  const sql =
    "INSERT INTO consultations (full_name,email,mobile,area_city) VALUES (?,?,?,?)";

  db.query(sql, [full_name, email, mobile, area_city], (err) => {
    if (err) return res.status(500).send("DB Error");
    res.send("Form submitted successfully ✅");
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port", PORT);
});
