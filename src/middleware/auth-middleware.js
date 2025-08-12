import { prismaClient } from "../application/database.js";
import axios from "axios";

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
    const ssoToken = req.cookies.sso_token;
    if (!ssoToken) {
      return res.status(401).json({ errors: "Unauthorized" });
    }
    const ssoResponse = await axios.get(`${process.env.AUTH_SERVICE_URL}/me`, {
      headers: {
        Authorization: `Bearer ${ssoToken}`,
      },
    });

    if (ssoResponse.status !== 200 || !ssoResponse.data?.data?.user) {
      return res.status(401).json({ errors: "Unauthorized" });
    }

    req.user = ssoResponse.data.data.user;
    return next();
  } catch (err) {
    console.error("SSO verification failed:", err.message);
    return res.status(401).json({ errors: "Unauthorized" });
  }
};
