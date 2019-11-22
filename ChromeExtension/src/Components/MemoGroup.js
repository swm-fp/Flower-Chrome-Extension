import React, { useState, useRef } from "react";
import "../css/memoList.scss";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import MemoModal from "./MemoModal.js";
import Button from "@material-ui/core/Button";
import FlowerAPI from "../apis/FlowerAPI";

import { useSelector, useDispatch } from "react-redux";
import { shareOn, shareOff } from "../modules/share";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import UnfoldLessIcon from "@material-ui/icons/UnfoldLess";

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
    margin: theme.spacing(0.5)
  },
  button2: {
    margin: theme.spacing(0.5)
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
  const [open, setOpen] = useState(false);
  const [shareKey, setShareKey] = useState("");

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

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = useRef(null);

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
        {!displayState ? <UnfoldLessIcon /> : <UnfoldMoreIcon />}
      </Button>

      <Button
        variant="contained"
        size="small"
        className={classes.button2}
        onClick={async () => {
          setOpen(true);
          let response = await FlowerAPI.postShareLink(data3.projectId);
          setShareKey(JSON.stringify(response));
        }}
      >
        Share
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth="md" maxWidth="md">
        <DialogTitle>Share Key</DialogTitle>
        <DialogContent dividers>
          <DialogContentText ref={descriptionElementRef} tabIndex={-1}>
            {shareKey}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

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
          onClick={async () => {
            shareCheckOff();
            console.log(data3);
            let lst = document.querySelectorAll("#shareClicked");
            let memo_add_list = [];
            for (let i = 0; i < lst.length; i++) {
              memo_add_list.push(lst[i].getAttribute("value"));
            }
            let response = await FlowerAPI.addMemoToProject(
              data3.projectId,
              memo_add_list
            );
            console.log(response);
          }}
          className={classes.button3}
        >
          OK
        </Button>
      )}

      <Button variant="contained" size="small" className={classes.button2}>
        Delete
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
