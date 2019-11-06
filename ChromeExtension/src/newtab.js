// default
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";

// UI component
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

import "./css/newtab.scss";

// components & api
import MainDashboard from "./Components/MainDashboard";
import LogoutButton from "./Components/LogoutButton";
import LoginButton from "./Components/LoginButton";
import NeedLoginPage from "./Components/NeedLoginPage";
import FlowerAPI from "./apis/FlowerAPI";

// redux
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./modules/";
import ReduxThunk from "redux-thunk";
import SearchEngine from "./Components/SearchEngine";

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const drawerWidth = 180;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexGrow: 1
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
    width: "95%",
    padding: theme.spacing(3)
  },

  margin: {
    margin: theme.spacing(2)
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  },
  logo: { width: "50%", height: "50%" },
  auth: {
    display: "contents"
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

  const [open, setOpen] = useState(false);
  const [loginState, setLoginState] = useState(true);

  useEffect(() => {
    const loginCheck = async () => {
      return await FlowerAPI.checkLoginStatus();
    };
    loginCheck().then(res => setLoginState(res));
  }, []);

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
            <Typography className={classes.title}>
              <img
                src="https://i.imgur.com/XAszQxS.png"
                className="logo"
                alt="logo"
              />
            </Typography>

            {loginState ? (
              <div className={classes.auth}>
                <SearchEngine />
                <LogoutButton />
              </div>
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
          {loginState ? <MainDashboard /> : <NeedLoginPage />}
        </main>
      </div>
    </MuiThemeProvider>
  );
}

ReactDOM.render(
  <Provider store={store}>
    <NewTab />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
