import React from "react"
import { BlitzLayout } from "@blitzjs/next"
import Nav from "../components/Nav"
import { GlobalStyles } from "tss-react"

const Layout: BlitzLayout<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <GlobalStyles
        styles={{
          "#__next": {
            "& > main": {
              marginTop: 56,
            },
          },
        }}
      />
      <Nav />
      <main>{children}</main>
    </>
  )
}

export default Layout
