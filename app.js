const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

// Security headers
app.use(helmet());

// Allow only the frontend origin
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Body parsers, with a size limit
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

// Request logs only in development
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Wedding Planner API is running",
  });
});

// API routes
app.use("/api/v1/auth", require("./routes/AuthRoutes"));
app.use("/api/v1/categories", require("./routes/CategoryRoutes"));
app.use("/api/v1/cities", require("./routes/CityRoutes"));
app.use("/api/v1/vendors", require("./routes/VendorRoutes"));
app.use("/api/v1/leads", require("./routes/LeadRoutes"));
app.use("/api/v1/contact", require("./routes/ContactRoutes"));

// Must stay last: 404 first, then the error handler
app.use(notFound);
app.use(errorHandler);

module.exports = app;