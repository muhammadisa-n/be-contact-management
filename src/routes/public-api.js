import express from "express";
import userControiller from "../controllers/user-controiller.js";
import "dotenv/config";
import axios from "axios";
const publicRouter = new express.Router();
publicRouter.post("/api/users/register", userControiller.register);
publicRouter.post("/api/users/login", userControiller.login);
publicRouter.get("/api/verify-sso", async (req, res) => {
  if (process.env.NODE_ENV !== "production") {
    return res.status(400).json({ error: "SSO only available in production" });
  }
  try {
    const token = req.cookies.sso_token;
    if (!token) return res.status(401).json({ error: "Not logged in" });
    console.log(token);
    const response = await axios.get(`${process.env.AUTH_SERVICE_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.status(200).json({ user: response.data });
  } catch (err) {
    console.error(err);
    return res.status(403).json({ error: "Invalid or expired token" });
  }
});
export { publicRouter };
