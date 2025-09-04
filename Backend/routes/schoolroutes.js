const express = require("express");
const multer = require("multer");
const path = require("path");
const db = require("../config/db");

const router = express.Router();

// File upload setup
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../schoolImages"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Add school
router.post("/addSchool", upload.single("image"), (req, res) => {
  const { name, address, city, state, contact, email_id } = req.body;
  const image = req.file ? req.file.filename : null;

  const sql = "INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?,?,?,?,?,?,?)";
  db.query(sql, [name, address, city, state, contact, email_id, image], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "School added successfully" });
  });
});

// Fetch schools
router.get("/schools", (req, res) => {
  db.query("SELECT * FROM schools", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

module.exports = router;
