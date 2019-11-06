import React, { useState, useEffect } from "react";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles, fade } from "@material-ui/core/styles";

import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { useSelector, useDispatch } from "react-redux";
import { getMemos } from "../modules/memos";

const useStyles = makeStyles(theme => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  }
}));

export default function SearchEngine() {
  const classes = useStyles();
  const { data, loading, error } = useSelector(state => state.memos.memos);
  const dispatch = useDispatch();

  const [input, setInput] = useState("");

  useEffect(() => {
    dispatch(getMemos());
  }, [dispatch]);

  if (loading || error || !data) return null;

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        // label="Search..."
        placeholder="Search…"
        value={input}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput
        }}
        inputProps={{ "aria-label": "search" }}
        onChange={x => {
          setInput(x.target.value);
        }}
        onKeyPress={e => {
          if (e.charCode === 13) {
            window.location = "https://www.google.com/search?q=" + input;
          }
        }}
      />
      {/* <Autocomplete
        placeholder="Search…"
        freeSolo
        disableClearable
        options={data.map(option => option.url)}
        renderInput={params => (
          <TextField
            {...params}
            label="Search input"
            margin="normal"
            variant="outlined"
            fullWidth
          />
        )}
      /> */}
    </div>
  );
}
