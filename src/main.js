import { logger } from "./application/logging.js";
import { web } from "./application/web.js";
import dotenv from "dotenv";
dotenv.config();
web.listen(process.env.WEB_PORT, () => {
  logger.info(`App Start on : ${process.env.WEB_PORT}`);
});
