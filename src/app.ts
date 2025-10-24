import express, { Express, Request, Response } from "express";
import moderationRoutes from "./api/v1/routes/moderationRoutes";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

const app: Express = express();
app.use(express.json());
// Configure Morgan based on LOG_LEVEL and NODE_ENV
const logLevel = process.env.LOG_LEVEL || "dev";
const nodeEnv = process.env.NODE_ENV || "development";

if (nodeEnv === "production") {
  app.use(morgan("combined"));
} else {
  app.use(morgan(logLevel));
}


/**
 * Mount moderation routes on /api/v1/moderation
 */
app.use("/api/v1/moderation", moderationRoutes);

/**
 * Default error handler for unmatched routes
 */
app.use((req: Request, res: Response): void => {
    res.status(404).json({ message: "Endpoint not found" });
});

export default app;