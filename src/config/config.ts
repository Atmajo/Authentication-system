import { config as dotenvConfig } from "dotenv";
dotenvConfig();

export const config = {
  port: process.env.PORT ? process.env.PORT : 3000,
  jwtsecret: process.env.JWT_SECRET!,
  url: process.env.URL ? process.env.URL : "http://localhost:3000",
};
