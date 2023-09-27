import dotenv from "dotenv";
dotenv.config();
import { web } from "./application/web.js";
import { logger } from "./application/logging.js";
web.listen(process.env.WEB_PORT, process.env.WEB_HOST, () => {
  logger.info(
    `App Start in http://${process.env.WEB_HOST}:${process.env.WEB_PORT}`
  );
});
