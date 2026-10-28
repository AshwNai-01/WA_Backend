require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    // Async errors nobody caught: log, close the server, exit
    process.on("unhandledRejection", (err) => {
      console.error("Unhandled rejection:", err.message);
      server.close(() => process.exit(1));
    });

    // Ctrl+C: finish open requests, then exit
    process.on("SIGINT", () => {
      console.log("Shutting down server...");
      server.close(() => process.exit(0));
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();