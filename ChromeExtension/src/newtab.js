import React from "react";
import ReactDOM from "react-dom";

import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/newtab.scss";
import MainDashboard from "./Components/MainDashboard";

import clsx from "clsx";
import {
  createMuiTheme,
  MuiThemeProvider,
  makeStyles
} from "@material-ui/core/styles";

import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import DirectionsIcon from "@material-ui/icons/Directions";
import Badge from "@material-ui/core/Badge";

import MailIcon from "@material-ui/icons/Mail";
import { red } from "@material-ui/core/colors";

import Avatar from "@material-ui/core/Avatar";

import LoginButton from "./Components/LoginButton";
import FlowerAPI from "./apis/FlowerAPI";

const drawerWidth = 180;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  title: {
    flexGrow: 1
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },

  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 5,
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    height: "48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    width: "90%",
    padding: theme.spacing(3)
  },
  avatar: {
    margin: 10
  },
  margin: {
    margin: theme.spacing(2)
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  },
  search: {
    padding: "1px 3px",
    display: "flex",
    alignItems: "center",
    width: "400px"
  }
}));

export default function NewTab() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#5F4B8B"
      },
      secondary: {
        main: "#ffffff"
      }
    }
  });

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              <b>touch-it </b>
            </Typography>
            <Paper className={classes.search}>
              <Input
                className={classes.input}
                color="secondary"
                placeholder="Search on Google"
                inputProps={{ "aria-label": "search google" }}
                variant="filled"
              />

              <IconButton className={classes.iconButton} aria-label="search">
                <SearchIcon />
              </IconButton>

              <Divider className={classes.divider} orientation="vertical" />

              <IconButton
                color="Primary"
                className={classes.iconButton}
                aria-label="directions"
              >
                <DirectionsIcon />
              </IconButton>
            </Paper>
            <IconButton
              aria-label="4 pending messages"
              className={classes.margin}
            >
              <Badge badgeContent={4} color="#ff0000">
                <MailIcon />
              </Badge>
            </IconButton>

            <Avatar className={classes.avatar}>H</Avatar>
            {(async () => {
              return await FlowerAPI.getLoginState();
            })() ? (
              ""
            ) : (
              <LoginButton />
            )}
          </Toolbar>
        </AppBar>

        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open
            })
          }}
          open={open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
        </Drawer>

        <main className={classes.content}>
          <div className={classes.toolbar}></div>

          <MainDashboard />
        </main>
      </div>
    </MuiThemeProvider>
  );
}

ReactDOM.render(<NewTab />, document.getElementById("root"));
registerServiceWorker();
