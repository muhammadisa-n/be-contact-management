import express from "express";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { mainRouter } from "../routes/main-router.js";
import cors from "cors";
export const web = express();
web.use(express.json());
web.use(cors());
web.use(mainRouter);
web.use(errorMiddleware);
