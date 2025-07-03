import { Request, Response, Router } from "express";
import { verifyToken } from "../middlewares/token";
import logger from "@/logger/logger";
import { existsSync, readFileSync } from "fs";
import { join } from "path";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({
    data: req.headers,
  });
});

router.get("/logs", (req: Request, res: Response) => {
  try {
    const logFilePath = join(process.cwd(), "logs", "combined.log");

    if (!existsSync(logFilePath)) {
      res.status(404).send("Log file not found");
      return;
    }

    const logContent = readFileSync(logFilePath, "utf8");
    res.setHeader("Content-Type", "text/plain");
    res.send(logContent);
  } catch (error) {
    logger.error(`Error reading log file: ${error}`);
    res.status(500).send("Error reading log file");
  }
});

export { router as indexRouter };
