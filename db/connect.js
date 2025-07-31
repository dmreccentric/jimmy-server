const mongoose = require("mongoose");

async function connectDB(url) {
  try {
    await mongoose.connect(url); // No options needed
    console.log("Connected to the DB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

module.exports = connectDB;
