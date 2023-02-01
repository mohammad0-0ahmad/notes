import { ThemeOptions } from "@mui/material";
import Link from "app/core/components/Link";

const theme: Omit<ThemeOptions, "palette"> = {
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1280,
    },
  },
  components: {
    MuiTextField: {
      defaultProps: { fullWidth: true },
    },
    MuiButton: {
      defaultProps: { disableElevation: true, variant: "contained", LinkComponent: Link },
      styleOverrides: { root: { textTransform: "capitalize" } },
    },
    MuiTab: {
      defaultProps: { LinkComponent: Link },
      styleOverrides: { root: { textTransform: "capitalize" } },
    },
    MuiTableCell: {
      styleOverrides: {
        root: { textOverflow: "ellipsis", overflow: "hidden" },
        head: { background: "transparent" },
      },
    },
    MuiTable: {
      styleOverrides: { root: { tableLayout: "fixed" } },
    },
  },
};

export default theme;

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true;
    tablet: true;
    laptop: true;
    desktop: true;
  }
}
