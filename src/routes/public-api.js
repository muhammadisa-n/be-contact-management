import express from "express";
import userControiller from "../controllers/user-controiller.js";
const publicRouter = new express.Router();
publicRouter.post("/api/auth/register", userControiller.register);
publicRouter.post("/api/auth/login", userControiller.login);
export { publicRouter };
