import express from "express";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { mainRouter } from "../routes/main-router.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
dotenv.config();
export const web = express();
web.use(express.json());
web.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
web.use(cookieParser());
web.use(mainRouter);
web.use(errorMiddleware);
