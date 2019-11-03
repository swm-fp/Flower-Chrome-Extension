import React, { useState, useEffect } from "react";
import FlowerAPI from "../apis/FlowerAPI";
import "../css/memoList.scss";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import MemoModal from "./MemoModal.js";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  loading: {
    height: "500px"
  },
  loadingBar: {
    margin: "auto"
  }
}));

function Media() {
  const classes = useStyles();
  const [memo, setMemo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const memoList = async () => {
      try {
        setMemo(null);
        setLoading(true);
        const memoVal = await FlowerAPI.getMemos();
        setMemo(memoVal);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    memoList();
  }, []);
  if (loading)
    return (
      <div className={classes.loading}>
        <LinearProgress className={classes.loadingBar} />
      </div>
    );
  if (error || !memo)
    return (
      <div>
        <Typography component="p">Internet or Login Error</Typography>
      </div>
    );
  return (
    <Grid container className="memo-dashboard">
      {memo.length > 0
        ? Array.from(memo).map((item, index) => <MemoModal item={item} />)
        : ""}
    </Grid>
  );
}

export default function MemoList() {
  return (
    <Box overflow="hidden" clone>
      <Box px={4}>
        <Grid item></Grid>
        <Media />
      </Box>
    </Box>
  );
}
