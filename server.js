const express = require("express");
const mysql = require("mysql2");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const PORT = process.env.PORT || 8080;

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT
});

db.connect((err) => {
  if (err) {
    console.error("MySQL Error ❌", err);
  } else {
    console.log("MySQL Connected ✅");
  }
});

// 🔴 THIS WAS MISSING
app.get("/", (req, res) => {
  res.status(200).send("Server is running 🚀");
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
