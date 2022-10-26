import React, { forwardRef } from "react"
import NextLink, { LinkProps as NextLinkProps } from "next/link"
import MuiLink, { LinkProps } from "@mui/material/Link"

type LinkPropsType = NextLinkProps & Omit<LinkProps, keyof NextLinkProps>

const Link = forwardRef<any, LinkPropsType>(({ href, ...props }, ref) => {
  return (
    <NextLink ref={ref} {...({ href, ...props } as NextLinkProps)} passHref>
      <MuiLink {...(props as any)} />
    </NextLink>
  )
})

export default Link
