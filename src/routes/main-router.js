import express from "express";
import { publicRouter } from "./public-api.js";
import { userRouter } from "./api.js";
import "dotenv/config";

export const mainRouter = express.Router();

mainRouter.get("/", (req, res) => {
  res.status(200).json({
    app_name: process.env.APP_NAME,
    message: "Server its Running  🚀 ",
    author: "Muhammad Isa",
    status_code: 200,
  });
});
mainRouter.get("/api", (req, res) => {
  res.status(200).json({
    app_name: process.env.APP_NAME,
    message: "Api its Running  🚀 ",
    author: "Muhammad Isa",
    status_code: 200,
  });
});
mainRouter.use(publicRouter);
mainRouter.use(userRouter);
mainRouter.use("*", (req, res, next) => {
  res.status(404).json({
    message: "Request Not Found",
    status_code: 404,
  });
});
