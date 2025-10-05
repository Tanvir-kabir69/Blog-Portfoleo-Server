import compression from "compression";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import notFoundRoute from "./app/middlewares/notFound";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import router from "./app/router";

const app = express();

// Middleware
app.use(cors()); // Enables Cross-Origin Resource Sharing
app.use(compression()); // Compresses response bodies for faster delivery
app.use(express.json()); // Parse incoming JSON requests

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Default route for testing
app.get("/", (req: Request, res: Response) => {
  res.send("API is running");
});

app.use("/api/v1", router);

// Global Error Handler/
app.use(globalErrorHandler);

// 404 Handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// 404 Handler Middleware
app.use(notFoundRoute);
export default app;
