import ThemeProvider from "./ThemeProvider"
import React, { FC } from "react"
import { EmotionCache } from "@emotion/cache"
import Layout from "../layouts/Layout"

const Providers: FC<{
  children?: any
  themeCache: EmotionCache
}> = ({ children, themeCache }) => {
  return (
    <ThemeProvider cache={themeCache}>
      <Layout>{children}</Layout>
    </ThemeProvider>
  )
}

export default Providers
