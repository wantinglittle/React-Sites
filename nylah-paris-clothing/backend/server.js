const path = require("path");
const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(cors());

// Connecting Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/cart", require("./routes/cart"));

// Error Handler Middleware
app.use(errorHandler);

// Serve Frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});

