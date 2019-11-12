// default
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";

// UI component

import {
  createMuiTheme,
  MuiThemeProvider,
  makeStyles
} from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import "./css/newtab.scss";

// components & api
import MainDashboard from "./Components/MainDashboard";
import LogoutButton from "./Components/LogoutButton";
import LoginButton from "./Components/LoginButton";
import NeedLoginPage from "./Components/NeedLoginPage";
import SearchEngine from "./Components/SearchEngine";
import MenuBar from "./Components/MenuBar";
import FlowerAPI from "./apis/FlowerAPI";

// redux
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./modules/";
import ReduxThunk from "redux-thunk";

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: 5,
    marginRight: 36
  },
  toolbar: {
    minHeight: 48,
    height: "56px !important",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1)
  },
  content: {
    flexGrow: 1,
    width: "100%",
    padding: theme.spacing(3)
  },
  logo: {
    margin: "10px 0px 0px 20px",
    height: "48px"
  },
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

  const [loginState, setLoginState] = useState(true);

  useEffect(() => {
    const loginCheck = async () => {
      return await FlowerAPI.checkLoginStatus();
    };
    loginCheck().then(res => setLoginState(res));
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed">
          <Toolbar className={classes.toolbar}>
            <Typography className={classes.title}>
              <img
                src="https://i.imgur.com/XAszQxS.png"
                className={classes.logo}
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

        <main className={classes.content}>
          <div className={classes.toolbar} />

          {loginState ? (
            <div>
              <MenuBar />
              <MainDashboard />
            </div>
          ) : (
            <NeedLoginPage />
          )}
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
