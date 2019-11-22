import React, { useState, useRef } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ShareIcon from "@material-ui/icons/Share";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import BlockIcon from "@material-ui/icons/Block";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import { useSelector, useDispatch } from "react-redux";
import { shareOn, shareOff } from "../modules/share";
import FlowerAPI from "../apis/FlowerAPI";

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
    backgroundColor: "rgba(0,0,0, 0.6)"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  dialog: {
    width: "50%"
  }
}));

export default function MenuBar() {
  const classes = useStyles();

  const { check } = useSelector(state => ({
    check: state.share.check
  }));
  const [projectName, setProjectName] = useState("");

  const dispatch = useDispatch();
  const shareCheckOn = () => dispatch(shareOn());
  const shareCheckOff = () => dispatch(shareOff());

  const [shareMemo, setShareMemo] = useState(false);
  const shareOpen = () => {
    setShareMemo(true);
  };
  const shareClose = () => {
    setShareMemo(false);
  };

  const [projectName2, setProjectName2] = useState("");
  const [shareMemo2, setShareMemo2] = useState(false);

  const shareOpen2 = () => {
    setShareMemo2(true);
  };
  const shareClose2 = () => {
    setShareMemo2(false);
  };

  const descriptionElementRef = useRef(null);

  const shareMemos = async () => {
    let lst = document.querySelectorAll("#shareClicked");
    let memo_share_list = [];
    for (let i = 0; i < lst.length; i++) {
      memo_share_list.push(lst[i].getAttribute("value"));
    }
    console.log({ name: projectName, memoIdList: memo_share_list });

    await FlowerAPI.postProject(projectName, memo_share_list);

    setProjectName("");
  };

  return (
    <Paper className={classes.menubar}>

      <Button
        variant="contained"
        color="inherit"
        className={classes.button}
        startIcon={<AlternateEmailIcon />}
        onClick={shareOpen}
      >
        Create Project
          </Button>

      <Dialog
        open={shareMemo}
        onClose={shareClose}
        fullWidth="md"
        maxWidth="md"
      >
        <DialogTitle className={classes.shareTitle}>Share</DialogTitle>
        <DialogContent dividers>
          <DialogContentText ref={descriptionElementRef} tabIndex={-1}>
            <Typography>Project 명을 입력해주세요</Typography>
            <TextField
              id="outlined-basic"
              className={classes.textField}
              label="Project"
              margin="normal"
              variant="outlined"
              onChange={e => setProjectName(e.target.value)}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={async () => {
              await FlowerAPI.postProject(projectName);
              shareClose();

            }}
            color="primary"
          >
            OK
              </Button>
        </DialogActions>
      </Dialog>

      <Button
        variant="contained"
        color="inherit"
        className={classes.button}
        // startIcon={<AlternateEmailIcon />}
        onClick={shareOpen2}
      >
        Get Share Memo
          </Button>

      <Dialog
        open={shareMemo2}
        onClose={shareClose2}
        fullWidth="md"
        maxWidth="md"
      >
        <DialogTitle className={classes.shareTitle}>
          공유받은 링크
            </DialogTitle>
        <DialogContent dividers>
          <DialogContentText ref={descriptionElementRef} tabIndex={-1}>
            <Typography>Link를 입력해주세요</Typography>
            <TextField
              id="outlined-basic"
              className={classes.textField}
              label="Link"
              margin="normal"
              variant="outlined"
              onChange={e => setProjectName2(e.target.value)}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={async () => {
              shareClose2();

              const r = await FlowerAPI.followProject(projectName2);
              console.log(JSON.stringify(r));
            }}
            color="primary"
          >
            OK
              </Button>
        </DialogActions>
      </Dialog>




    </Paper>
  );
}
