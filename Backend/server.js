const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs"); 
const schoolRoutes = require("./routes/schoolroutes");
require('dotenv').config();

const app = express();


const uploadDir = path.join(__dirname, "schoolImages");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });


app.use(cors());
app.use(express.json());
app.use("/schoolImages", express.static(uploadDir));

app.use("/api", schoolRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
