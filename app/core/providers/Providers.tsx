import ThemeProvider from "./ThemeProvider";
import React, { FC } from "react";
import { EmotionCache } from "@emotion/cache";
import Layout from "../layouts/Layout";
import ProfileProvider from "./ProfileProvider";

const Providers: FC<{
  children?: any;
  themeCache: EmotionCache;
}> = ({ children, themeCache }) => {
  return (
    <ThemeProvider cache={themeCache}>
      <ProfileProvider>
        <Layout>{children}</Layout>
      </ProfileProvider>
    </ThemeProvider>
  );
};

export default Providers;
