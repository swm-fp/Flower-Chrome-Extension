import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ShareIcon from "@material-ui/icons/Share";

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
  }
}));

export default function MenuBar() {
  const classes = useStyles();
  return (
    <Paper className={classes.menubar}>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<ShareIcon />}
      >
        Share
      </Button>
    </Paper>
  );
}
