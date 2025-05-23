import express from "express";
import userControiller from "../controllers/user-controiller.js";
const publicRouter = new express.Router();
publicRouter.post("/api/users/register", userControiller.register);
publicRouter.post("/api/users/login", userControiller.login);
export { publicRouter };
