import React, { useState } from "react";
import "../css/memoList.scss";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import MemoModal from "./MemoModal.js";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  loading: {
    height: "500px"
  },
  loadingBar: {
    margin: "auto"
  },
  button: {
    backgroundColor: " #f39f86",
    backgroundImage: "linear-gradient(315deg, #f39f86 0%, #f9d976 74%)",
    margin: theme.spacing(1)
  },
  project: {
    color: "#323232",
    fontWeight: "bold"
  }
}));

export default function MemoGroup(data3) {
  data3 = data3.data;
  const classes = useStyles();
  const [displayState, setDisplayState] = useState(false);
  const visibleCheck = () => {
    setDisplayState(!displayState);
  };
  return (
    <div>
      <Button
        variant="contained"
        size="small"
        onClick={visibleCheck}
        className={classes.button}
      >
        {data3.name}
      </Button>

      <Button variant="contained" size="small">
        Share
      </Button>

      <Button variant="contained" size="small">
        Add
      </Button>

      <Grid
        container
        className="memo-dashboard"
        style={{ display: displayState ? "none" : "" }}
      >
        {data3.Memos.length > 0 &&
          Array.from(data3.Memos).map((item, index) => (
            <MemoModal item={item} />
          ))}
      </Grid>
    </div>
  );
}
