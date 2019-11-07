import React, { useState } from "react";
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
  }
});

export default function MemoModal(item) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [displayState, setDisplayState] = useState(false);

  const [deleteMemo, setDeleteOpen] = useState(false);

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

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
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
      <Card>
        <CardActionArea>
          <Typography
            component="div"
            style={{
              height: "15px",
              backgroundColor: "#cfe8fc"
            }}
          />
        </CardActionArea>

        <CardActionArea onClick={handleClickOpen} p="0px">
          <CardContent className={classes.card} p="0px">
            <Typography
              variant="body2"
              color="textSecondary"
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
            <Button onClick={handleClose} color="primary">
              <a href={item.item.url}>Go to Website</a>
            </Button>
          </DialogActions>
        </Dialog>
        <CardActions className={classes.buttonGroup}>
          <IconButton
            aria-label="Share"
            className={classes.buttonLeft}
            color="primary"
            fontSize="small"
            disableSpacing
          >
            <ShareIcon color="primary" fontSize="small" />
          </IconButton>
          <IconButton
            aria-label="delete"
            color="primary"
            fontSize="small"
            onClick={deleteOpen}
            disableSpacing
          >
            <DeleteIcon color="primary" fontSize="small" />
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
