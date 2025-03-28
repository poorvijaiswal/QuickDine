const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./config/db");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Database Connection
app.get("/", (req, res) => {
    db.query("SELECT 1", (err, result) => {
        if (err) {
            res.status(500).send("Database connection error!");
        } else {
            res.send("DinEasy Backend is Running...");
        }
    });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
