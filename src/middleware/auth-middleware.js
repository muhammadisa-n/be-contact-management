import { prismaClient } from "../application/database.js";
import bcrypt from "bcrypt";
import axios from "axios";
import "dotenv/config";
export const authMiddleware = async (req, res, next) => {
  const mode = process.env.NODE_ENV;
  if (mode === "development") {
    // Local token auth
    const token = req.get("Authorization");
    if (!token) {
      return res.status(401).json({ errors: "Unauthorized" });
    }
    const user = await prismaClient.user.findFirst({ where: { token } });
    if (!user) {
      return res.status(401).json({ errors: "Unauthorized" });
    }
    req.user = user;
    return next();
  }
  try {
    const ssoResponse = await axios.get(
      `${process.env.SSO_SERVICE_URL}/api/verify-sso`,
      {
        headers: {
          "x-app-key": process.env.SSO_API_KEY,
        },
      }
    );

    if (ssoResponse.status !== 200) {
      return res.status(401).json({ errors: "Unauthorized" });
    }

    const ssoUser = ssoResponse.data.data.user;
    const username = ssoUser.email;
    let user = await prismaClient.user.findUnique({
      where: { username },
    });
    if (!user) {
      const hashedPassword = await bcrypt.hash("123456", 10);
      user = await prismaClient.user.create({
        data: {
          username,
          password: hashedPassword,
          name: ssoUser.fullName,
          token: null,
        },
      });
    }

    req.user = user;
    return next();
  } catch (err) {
    console.error("SSO verification failed:", err.message);
    return res.status(401).json({ errors: "Unauthorized" });
  }
};
