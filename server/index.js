require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);

// Error handling middleware
app.use((error, req, res, next) => {
  const message = error.message || "Server error";
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({ message });
});


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected sucessfully"))
  .catch(err => console.log("DB Connection Error:", err));

app.listen(process.env.PORT, () => console.log(`Server running on port: ${process.env.PORT}`));
