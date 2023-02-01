import React from "react";
import { BlitzLayout } from "@blitzjs/next";
import Nav from "../components/Nav";
import { GlobalStyles as TssGlobalStyles } from "tss-react";
import { useTheme } from "@mui/material/styles";

const Layout: BlitzLayout<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <GlobalStyles />
      <Nav />
      <main>{children}</main>
    </>
  );
};

export default Layout;

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

const GlobalStyles = () => {
  const {
    palette: { background },
  } = useTheme();
  return (
    <TssGlobalStyles
      styles={{
        "*": {
          boxSizing: "border-box",
          margin: 0,
          padding: 0,
          WebkitUserDrag: "none",
        },
        body: {
          background: `${background.default} !important`,
        },
      }}
    />
  );
};
