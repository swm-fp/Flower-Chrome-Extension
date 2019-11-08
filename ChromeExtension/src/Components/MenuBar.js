import React, { useState, useRef } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ShareIcon from "@material-ui/icons/Share";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import BlockIcon from "@material-ui/icons/Block";

import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";

import { useSelector, useDispatch } from "react-redux";
import { shareOn, shareOff } from "../modules/share";

const useStyles = makeStyles(theme => ({
  menubar: {
    minHeight: 36,
    height: "48px !important",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 3),
    marginBottom: 10,
    background: "rgba(0,0,0,0)"
  },
  button: {
    margin: theme.spacing(1)
  },
  shareTitle: {
    backgroundColor: "rgba(255, 255, 0, 0.6)"
  },
  deleteTitle: {
    backgroundColor: "rgba(255, 0, 0, 0.6)"
  }
}));

export default function MenuBar() {
  const classes = useStyles();

  const { check } = useSelector(state => ({
    check: state.share.check
  }));

  const dispatch = useDispatch();
  const shareCheckOn = () => dispatch(shareOn());
  const shareCheckOff = () => dispatch(shareOff());

  // const [deleteMemo, setDeleteMemo] = useState(false);
  // const deleteOpen = () => {
  //   setDeleteMemo(true);
  // };
  // const deleteClose = () => {
  //   setDeleteMemo(false);
  // };
  // const descriptionElementRef = useRef(null);

  const shareMemos = () => {
    let lst = document.querySelectorAll("#shareClicked");
    let memo_share_list = [];
    for (let i = 0; i < lst.length; i++) {
      memo_share_list.push(lst[i].getAttribute("value"));
    }
    console.log(memo_share_list);
  };

  return (
    <Paper className={classes.menubar}>
      {!check ? (
        <Button
          variant="contained"
          color="inherit"
          className={classes.button}
          startIcon={<ShareIcon />}
          onClick={shareCheckOn}
        >
          Share
        </Button>
      ) : (
        <div>
          <Button
            variant="contained"
            color="inherit"
            className={classes.button}
            startIcon={<AlternateEmailIcon />}
            onClick={shareMemos}
          >
            Ready to Share
          </Button>
          <Button
            variant="contained"
            color="inherit"
            className={classes.button}
            startIcon={<BlockIcon />}
            onClick={shareCheckOff}
          >
            Cancel
          </Button>
        </div>
      )}
      {/* <Dialog open={deleteMemo} onClose={deleteClose}>
        <DialogTitle className={classes.deleteTitle}>Delete</DialogTitle>
        <DialogContent dividers>
          <DialogContentText ref={descriptionElementRef} tabIndex={-1}>
            <Typography>다중 선택 삭제 기능은 아직 준비 중 입니다.</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Button
        variant="contained"
        color="inherit"
        className={classes.button}
        startIcon={<DeleteIcon />}
        onClick={deleteOpen}
      >
        Delete
      </Button> */}
    </Paper>
  );
}
