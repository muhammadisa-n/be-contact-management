import express from "express";
import userControiller from "../controllers/user-controiller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
const userRouter = new express.Router();
userRouter.use(authMiddleware);
userRouter.get("/api/users/current", userControiller.get);

export { userRouter };
