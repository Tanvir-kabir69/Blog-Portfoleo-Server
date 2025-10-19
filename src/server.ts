import http, { Server } from "http";
import app from "./app";
import dotenv from "dotenv";
import { prisma } from "./app/config/db";
import seedOwner from "./app/utils/seedOwner";

dotenv.config();

let server: Server | null = null;

async function connectToDB() {
  try {
    await prisma.$connect();
    console.log("✅ DB connection successfull!!");
  } catch (error) {
    console.log("🚫 DB connection failed!");
    console.log(error);
    process.exit(1);
  }
}

async function startServer() {
  try {
    await connectToDB(); // ✅ wait for DB connection first
    server = http.createServer(app);
    server.listen(process.env.PORT, async () => {
      console.log(`🚀 Server is running on port ${process.env.PORT}`);
      await seedOwner(); // ✅ seed only after server + DB ready
    });
    handleProcessEvents();
  } catch (error) {
    console.error("❌ Error during server startup:", error);
    process.exit(1);
  }
}

/**
 * Gracefully shutdown the server and close database connections.
 * @param {string} signal - The termination signal received.
 */
async function gracefulShutdown(signal: string) {
  console.warn(`🔄 Received ${signal}, shutting down gracefully...`);

  if (server) {
    server.close(async () => {
      console.log("✅ HTTP server closed.");

      try {
        console.log("Server shutdown complete.");
      } catch (error) {
        console.error("❌ Error during shutdown:", error);
      }

      process.exit(0);
    });
  } else {
    process.exit(0);
  }
}

/**
 * Handle system signals and unexpected errors.
 */
function handleProcessEvents() {
  process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
  process.on("SIGINT", () => gracefulShutdown("SIGINT"));

  process.on("uncaughtException", (error) => {
    console.error("💥 Uncaught Exception:", error);
    gracefulShutdown("uncaughtException");
  });

  process.on("unhandledRejection", (reason) => {
    console.error("💥 Unhandled Rejection:", reason);
    gracefulShutdown("unhandledRejection");
  });
}

// Start the application
startServer();
