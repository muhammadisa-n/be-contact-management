import express from "express";
import userControiller from "../controllers/user-controiller.js";
import "dotenv/config";
import axios from "axios";
const publicRouter = new express.Router();
publicRouter.post("/api/users/register", userControiller.register);
publicRouter.post("/api/users/login", userControiller.login);
publicRouter.post("/api/verify-sso", async (req, res) => {
  if (process.env.NODE_ENV !== "production") {
    return res.status(400).json({ error: "SSO only available in production" });
  }
  const header = req.get("x-app-key");
  if (header !== process.env.SSO_APP_KEY || !header) {
    return res.status(401).json({ errors: "Missing Header Requirement" });
  }
  const token = req.cookies.sso_token;
  if (!token) {
    return res
      .status(403)
      .json({ status: false, error: "Invalid or expired token" });
  }
  try {
    const response = await axios.post(
      `${process.env.SSO_SERVICE_URL}/api/verify-sso`,
      {
        app_key: process.env.SSO_APP_KEY,
      },
      {
        headers: {
          "x-token": token,
        },
      }
    );

    return res.status(200).json({ data: response.data });
  } catch (err) {
    console.error(err);
    return res.status(403).json({ error: "Invalid or expired token" });
  }
});
export { publicRouter };
