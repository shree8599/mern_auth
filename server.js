
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Port
const PORT = process.env.PORT || 5000;

// MongoDB Connection
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
    console.error("MONGO_URI is not defined in the environment variables.");
    process.exit(1);
}

mongoose
    .connect(mongoUri)
    .then(() => {
        console.log("MongoDB Connected");

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server Running on Port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB Connection Error:", err);
        process.exit(1);
    });