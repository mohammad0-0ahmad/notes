import { setupBlitzClient } from "@blitzjs/next";
import { BlitzRpcPlugin } from "@blitzjs/rpc";

export const authConfig = {
  cookiePrefix: "d-notes-cookie-prefix",
};

export const { withBlitz } = setupBlitzClient({
  plugins: [BlitzRpcPlugin({})],
});
