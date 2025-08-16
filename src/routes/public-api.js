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
    const response = await axios.get(
      `${process.env.SSO_SERVICE_URL}/api/verify-sso`,
      {
        headers: { "x-app-key": process.env.SSO_API_KEY },
      },
      {
        withCredentials: true,
      }
    );

    return res.status(200).json({ data: response.data });
  } catch (err) {
    console.error(err);
    return res.status(403).json({ error: "Invalid or expired token" });
  }
});
export { publicRouter };
