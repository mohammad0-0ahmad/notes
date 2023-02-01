import { Trans } from "@m0-0a/next-intl";
import { ArrowBack } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Avatar,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { makeStyles } from "app/core/providers/ThemeProvider";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { pages } from "../constants/theme/nav";
import { useProfile } from "../providers/ProfileProvider";
import { getShownPageIndex } from "../utilities/getPageIndex";
import Link from "./Link";

const Nav: FC = () => {
  const { name, rights } = useProfile();
  const [currentPageIndex, setCurrentPageIndex] = useState<false | number>(false);
  const [isOpen, setIsOpen] = useState(false);
  const {
    classes,
    theme: {
      breakpoints: { down },
    },
  } = useStyles({ x: 10 });
  const isDrawerVisible = useMediaQuery(down("laptop"));
  const { pathname } = useRouter();

  useEffect(() => {
    setCurrentPageIndex(getShownPageIndex(pathname));
  }, [pathname]);

  const tabs = (
    <Grid container direction="column" className={classes.tabsContainer}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        className={classes.avatarContainer}
      >
        <Avatar>{name?.[0].toUpperCase()}</Avatar>
        <Typography component="p" variant="h6">
          {name}
        </Typography>
      </Grid>
      <Divider variant="middle" className={classes.divider} />
      <Tabs orientation="vertical" value={currentPageIndex} variant="fullWidth">
        {pages.reduce((current, { label, icon: Icon, onClick, accessibility, ...props }) => {
          return [
            ...current,
            <Tab
              key={label}
              component={Link}
              label={<Trans i18nKey={label} />}
              icon={Icon && <Icon />}
              onClick={(e) => {
                setTimeout(() => setIsOpen(false), 300);
                onClick && onClick(e);
              }}
              iconPosition="start"
              {...props}
            />,
          ];
        }, [])}
      </Tabs>
      <Tab
        icon={<LogoutIcon />}
        label={<Trans i18nKey={"Nav.signOut.label"} />}
        iconPosition="start"
        className={classes.logOutTab}
        onClick={() => signOut({ callbackUrl: "/" })}
      />
    </Grid>
  );
  return (
    <>
      <AppBar elevation={0} className={classes.appBar}>
        <Toolbar>
          {isDrawerVisible && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setIsOpen((c) => !c)}
            >
              {isOpen ? <ArrowBack /> : <MenuIcon />}
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            notes
          </Typography>
        </Toolbar>
      </AppBar>
      {isDrawerVisible ? (
        <Drawer
          open={isOpen}
          anchor="left"
          onClose={() => {
            setIsOpen(false);
          }}
          className={classes.drawer}
        >
          {tabs}
        </Drawer>
      ) : (
        tabs
      )}
    </>
  );
};

export default Nav;

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

export const topBarHeight = 56;
export const sideBarWidth = 225;

const useStyles = makeStyles()(
  ({ palette: { primary, secondary }, breakpoints: { up }, spacing }) => ({
    appBar: {
      height: topBarHeight,
      [up("laptop")]: {
        width: `calc(100% - ${sideBarWidth}px)`,
        left: sideBarWidth,
      },
    },
    avatarContainer: {
      marginTop: spacing(2),
      "& .MuiAvatar-root": {
        width: 50,
        height: 50,
        marginBottom: spacing(1),
        backgroundColor: primary.main,
      },
    },
    divider: {
      backgroundColor: primary.main,
      margin: spacing(2, 3),
    },
    tabsContainer: {
      width: sideBarWidth,
      backgroundColor: secondary.main,
      color: secondary.contrastText,
      height: "100%",
      [up("laptop")]: {
        position: "fixed",
        height: "100vh",
        top: 0,
        left: 0,
      },
      "& .MuiTab-root": {
        minHeight: 48,
        justifyContent: "start",
      },
      "& .MuiTabs-indicator": {
        transform: "scaleY(0.5)",
        width: 0,
        marginRight: -1,
        height: 0,
        borderTop: "25px solid transparent",
        borderBottom: "25px solid transparent",
        borderRight: `15px solid ${primary.main}`,
        background: "transparent",
      },
    },
    logOutTab: {
      marginTop: "auto",
      opacity: 1,
    },
    drawer: {
      height: `calc(100vh - ${topBarHeight}px)`,
      marginTop: `${topBarHeight}px`,
      "&>.MuiBackdrop-root,>.MuiPaper-root,>.MuiModal-root": {
        height: `calc(100vh - ${topBarHeight}px)`,
        marginTop: `${topBarHeight}px`,
      },
      "&>.MuiPaper-root": {
        width: sideBarWidth,
        backgroundColor: secondary.main,
        color: secondary.contrastText,
      },
    },
  })
);
