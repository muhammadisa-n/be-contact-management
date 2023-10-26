import express from "express";
import userControiller from "../controllers/user-controiller.js";
const publicRouter = new express.Router();
publicRouter.post("/api/users", userControiller.register);

export { publicRouter };
