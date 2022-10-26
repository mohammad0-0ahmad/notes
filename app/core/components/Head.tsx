import React, { FC } from "react"
import NextHead from "next/head"
import pkg from "pkgJson"

type HeadType = FC<{ title?: string }>
const Head: HeadType = ({ title = undefined }) => {
  return (
    <NextHead>
      <title>{pkg.name + (title ? ` | ${title}` : "")}</title>
      <link rel="icon" href="/favicon.ico" />
    </NextHead>
  )
}

export default Head
