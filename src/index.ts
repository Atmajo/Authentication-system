import './config/module-alias';

import express, { Express, Request, Response } from "express";
import { indexRouter } from "@/routers";
import { config } from "@/config/config";
import logger from "@/logger/logger";
import schedulePing from '@/lib/cron';

const app: Express = express();
const port = config.port;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

app.listen(port, async () => {
  await schedulePing.start();
  logger.info(`Server is running at http://localhost:${port}`);
});
