import React, { useState, useEffect, useRef } from "react";

import { useSelector } from "react-redux";
import "typeface-roboto";

import "../css/memoList.scss";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ShareIcon from "@material-ui/icons/Share";

import Button from "@material-ui/core/Button";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

import { makeStyles } from "@material-ui/core/styles";

import ReactMarkdown from "react-markdown";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import FlowerAPI from "../apis/FlowerAPI";

const useStyles = makeStyles({
  card: {
    height: "100px",
    overflow: "hidden"
  },
  buttonGroup: {
    padding: "0px"
  },
  buttonLeft: {
    marginLeft: "auto"
  },
  cautionTitle: {
    backgroundColor: "rgba(255, 0, 0, 0.6)"
  },
  cardBorder: {
    color: "white",
    backgroundColor: "#dc8665"
    // border: "3px solid rgba(220, 150, 101, 0.7)"
  },
  project: {
    height: "15px",
    backgroundColor: "#c0c0c0"
  },
  projectShare: {
    height: "15px",
    backgroundColor: "rgba(0, 0, 0, 0)"
  }
});

export default function MemoModal(item) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [displayState, setDisplayState] = useState(false);
  const [shareChecked, setShareChecked] = useState(false);

  const [deleteMemo, setDeleteOpen] = useState(false);

  const { check } = useSelector(state => ({
    check: state.share.check
  }));

  const deleteOpen = () => {
    setDeleteOpen(true);
  };

  const deleteClose = () => {
    setDeleteOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const memoDelete = memoId => {
    setDisplayState(true);
    FlowerAPI.deleteMemos(memoId);
  };

  const shareClick = memoId => {
    setShareChecked(!shareChecked);
  };

  const descriptionElementRef = useRef(null);

  useEffect(() => {
    const { current: descriptionElement } = descriptionElementRef;
    if (descriptionElement !== null) {
      descriptionElement.focus();
    }
  }, [open, deleteMemo]);

  return (
    <Grid
      className="memo-grid"
      item
      md={2}
      sm={4}
      style={{ display: displayState ? "none" : "inline" }}
    >
      <Card
        className={check && shareChecked ? classes.cardBorder : null}
        id={check && shareChecked ? "shareClicked" : null}
        value={item.item.memoId}
      >
        <CardActionArea>
          <Typography
            component="div"
            className={
              check && shareChecked ? classes.projectShare : classes.project
            }
          />
        </CardActionArea>

        <CardActionArea onClick={check ? shareClick : handleClickOpen} p="0px">
          <CardContent className={classes.card} p="0px">
            <Typography
              variant="body2"
              color={shareChecked ? "inherit" : "textSecondary"}
              className={classes.card}
              inline
            >
              {item.item.content}
            </Typography>
          </CardContent>
        </CardActionArea>

        <Dialog open={open} onClose={handleClose} fullWidth="md" maxWidth="md">
          <DialogTitle>Memo</DialogTitle>
          <DialogContent dividers>
            <DialogContentText ref={descriptionElementRef} tabIndex={-1}>
              <ReactMarkdown source={item.item.content}></ReactMarkdown>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleClose();
                window.location.href = item.item.url;
              }}
              color="primary"
            >
              Go to Website
            </Button>
          </DialogActions>
        </Dialog>
        <CardActions className={classes.buttonGroup}>
          <IconButton
            aria-label="Share"
            className={classes.buttonLeft}
            color={check && shareChecked ? "inherit" : "primary"}
            fontSize="small"
            disableSpacing
          >
            <ShareIcon
              color={check && shareChecked ? "inherit" : "primary"}
              fontSize="small"
            />
          </IconButton>
          <IconButton
            aria-label="delete"
            color={check && shareChecked ? "inherit" : "primary"}
            fontSize="small"
            onClick={!shareChecked && deleteOpen}
            disableSpacing
          >
            <DeleteIcon
              color={check && shareChecked ? "inherit" : "primary"}
              fontSize="small"
            />
          </IconButton>
          <Dialog open={deleteMemo} onClose={deleteClose}>
            <DialogTitle className={classes.cautionTitle}>Caution</DialogTitle>
            <DialogContent dividers>
              <DialogContentText ref={descriptionElementRef} tabIndex={-1}>
                <Typography>
                  메모를 삭제하면 복구 할 수 없습니다. 그래도 삭제하시겠습니까?
                </Typography>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  deleteClose();
                  memoDelete(item.item.memoId);
                }}
                color="primary"
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </CardActions>
      </Card>
    </Grid>
  );
}
