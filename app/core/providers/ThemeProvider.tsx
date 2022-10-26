import { CacheProvider, EmotionCache } from "@emotion/react"
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { useTheme } from "@mui/material/styles"
import { GlobalStyles as TssGlobalStyles } from "tss-react"
import { FC } from "react"
import theme from "../constants/theme/theme"
import { light } from "../constants/theme/palettes"

const ThemeProvider: FC<{ children: any; cache: EmotionCache }> = ({ children, cache }) => {
  return (
    <CacheProvider value={cache}>
      <CssBaseline />
      <MuiThemeProvider theme={createTheme({ ...theme, palette: light })}>
        <GlobalStyles />
        {children}
      </MuiThemeProvider>
    </CacheProvider>
  )
}

export default ThemeProvider

export { makeStyles } from "tss-react/mui"

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

const GlobalStyles = () => {
  const {
    palette: { background },
  } = useTheme()
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
  )
}
