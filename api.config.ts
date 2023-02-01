import { ConfigFileType } from "@m0-0a/next/api";
import { dbMiddleware, requireAuth } from "db/middlewares";

const config: ConfigFileType = {
  globalMiddlewares: [dbMiddleware, requireAuth],
};

export default config;
