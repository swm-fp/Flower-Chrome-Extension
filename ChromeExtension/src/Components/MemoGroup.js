import React, { useState } from "react";
import "../css/memoList.scss";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import MemoModal from "./MemoModal.js";
import Button from "@material-ui/core/Button";

import { useSelector, useDispatch } from "react-redux";
import { shareOn, shareOff } from "../modules/share";
import FlowerAPI from "../apis/FlowerAPI";

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
  button2: {
    margin: theme.spacing(1)
  },
  button3: {
    backgroundColor: "#7ee8fa",
    backgroundImage: "linear-gradient(315deg, #7ee8fa 0%, #80ff72 74%)",
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
  const [add, setAdd] = useState(false);
  const visibleCheck = () => {
    setDisplayState(!displayState);
  };

  const dispatch = useDispatch();
  const shareCheckOn = () => {
    setAdd(true);
    dispatch(shareOn());
  };
  const shareCheckOff = () => {
    setAdd(false);
    dispatch(shareOff());
    AddMemos();
  };

  const AddMemos = async () => {
    let lst = document.querySelectorAll("#shareClicked");
    let memo_add_list = [];
    for (let i = 0; i < lst.length; i++) {
      memo_add_list.push(lst[i].getAttribute("value"));
    }
    console.log(data3.projectId);
    console.log(memo_add_list);
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

      <Button variant="contained" size="small" className={classes.button2}>
        Share
      </Button>

      {!add ? (
        <Button
          variant="contained"
          size="small"
          onClick={shareCheckOn}
          className={classes.button2}
        >
          Add
        </Button>
      ) : (
        <Button
          variant="contained"
          size="small"
          onClick={shareCheckOff}
          className={classes.button3}
        >
          OK
        </Button>
      )}

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
