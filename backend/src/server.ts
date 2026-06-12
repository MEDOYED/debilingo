import { app } from "./app.js";
import { testConnection } from "./config/supabase.js";

const PORT = process.env.PORT || 3001;

// Start server
const startServer = async () => {
  try {
    // Test Supabase connection
    const connected = await testConnection();
    if (!connected) {
      console.warn(
        "⚠ Warning: Supabase connection test failed. The server will start but database operations may fail."
      );
    }

    const numericPort = parseInt(PORT as string, 10);
    app.listen(numericPort, "0.0.0.0", () => {
      // app.listen(PORT, () => {
      console.log("=".repeat(50));
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 API endpoint: http://localhost:${PORT}/api`);
      console.log(`🏥 Health check: http://localhost:${PORT}/health`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
      console.log("=".repeat(50));
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully...");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("SIGINT received, shutting down gracefully...");
  process.exit(0);
});
