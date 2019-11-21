import React, { useEffect, useState } from "react";
import "../css/memoList.scss";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import MemoModal from "./MemoModal.js";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { useSelector, useDispatch } from "react-redux";
import { getMemos } from "../modules/memos";
import MemoGroup from "./MemoGroup";

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

function Media() {
  const classes = useStyles();
  const { data, loading, error } = useSelector(state => state.memos.memos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMemos());
  }, [dispatch]);

  if (loading)
    return (
      <div className={classes.loading}>
        <LinearProgress className={classes.loadingBar} />
      </div>
    );
  if (error || !data)
    return <Typography component="p">Internet or Login Error</Typography>;

  return (
    <div>
      {data.map((data3, index) => {
        return <MemoGroup data={data3} index={index} />;
      })}
    </div>
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
