import { Routes } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"
import logout from "app/auth/mutations/logout"
import React, { useState, Suspense } from "react"
import { useCurrentUser } from "../hooks/useCurrentUser"
import { Trans } from "@m0-0a/next-intl"
import pkg from "pkgJson"
import { AppBar, Toolbar, IconButton, Box, SwipeableDrawer, Button } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"
import { makeStyles } from "../providers/ThemeProvider"
import useMediaQuery from "@mui/material/useMediaQuery"

const NavMenu = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const handleDrawerToggle = (value?: boolean) => () => {
    setIsDrawerOpen((current) => (value === undefined ? !current : value))
  }
  const {
    theme: { breakpoints },
  } = useStyles()
  const isTabletDown = useMediaQuery(breakpoints.down("tablet"))

  const navItems = !currentUser
    ? [
        { label: "Nav.signIn.label", href: Routes.SignInPage().pathname },
        { label: "Nav.signUp.label", href: Routes.SignupPage().pathname },
      ]
    : [{ label: "Nav.signOut.label", onClick: () => logoutMutation() }]

  return !isTabletDown ? (
    <Box sx={{ display: { xs: "none", sm: "block" } }}>
      {navItems.map(({ label, ...props }, i) => (
        <Button key={label + i} {...props}>
          <Trans i18nKey={label}></Trans>
        </Button>
      ))}
    </Box>
  ) : (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="end"
        onClick={handleDrawerToggle()}
      >
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        anchor="right"
        open={isDrawerOpen}
        onClose={handleDrawerToggle(false)}
        onOpen={handleDrawerToggle(true)}
      >
        <Tabs orientation="vertical">
          {navItems.map(({ label, ...props }, i) => (
            <Tab key={label + i} label={<Trans i18nKey={label} />} {...props} />
          ))}
        </Tabs>
      </SwipeableDrawer>
    </>
  )
}

const Nav = () => {
  const { classes } = useStyles()

  return (
    <AppBar component="nav">
      <Toolbar>
        <Button className={classes.logo} href={Routes.Home().pathname}>
          {pkg.name}
        </Button>
        <Suspense>
          <NavMenu />
        </Suspense>
      </Toolbar>
    </AppBar>
  )
}
export default Nav

const useStyles = makeStyles()(() => ({
  logo: {
    marginRight: "auto",
  },
}))
