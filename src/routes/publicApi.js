import express from "express";
import userController from "../controller/userController.js";
const publicRouter = express.Router();

publicRouter.get("/", (req, res) => {
  res.status(200).json({
    status: `Server is running in http://${process.env.WEB_HOST}:${process.env.WEB_PORT}/api`,
  });
});
publicRouter.get("/api", (req, res) => {
  res.status(200).json({
    status: `Server Running in http://${process.env.WEB_HOST}:${process.env.WEB_PORT}`,
  });
});
publicRouter.post("/api/users", userController.register);
publicRouter.post("/api/users/login", userController.login);
export { publicRouter };
