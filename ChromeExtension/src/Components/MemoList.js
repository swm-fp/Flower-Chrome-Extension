import React, { useState, useEffect } from "react";
import FlowerAPI from "../apis/FlowerAPI";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import "../css/memoList.scss";
import MemoModal from "./MemoModal.js";

import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  card: {
    maxWidth: 345
  }
});

function Media() {
  const classes = useStyles();
  const [memo, setStateMemo] = useState([]);

  useEffect(() => {
    getMemoList().then(res => setStateMemo(res));
  }, []);

  let getMemoList = async () => {
    return await FlowerAPI.getMemos();
  };

  return (
    <Grid container className="memo-dashboard">
      {memo.length > 0
        ? Array.from(memo).map((item, index) => (
            <Grid className="memo-grid" item md={2} sm={4}>
              <Card>
                <CardActionArea>
                  <Skeleton
                    variant="rect"
                    width="100%"
                    height={118}
                    margin-bottom={10}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Test
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                  <MemoModal props={item} />
                </CardActions>
              </Card>
              {/* <Box
                  className="memo-display-box"
                  key={index}
                  width="100%"
                  my={5}
                >
                  
                    
                  </MemoModal>
                  <Box className="memo-display-box">
                    <Typography gutterBottom variant="body2">
                      <div className="memo-display-title"></div>
                    </Typography>

                    <Typography
                      display="block"
                      variant="caption"
                      color="textSecondary"
                      className="memo-url"
                    >
                      <a href={item.url}>{item.url}</a>
                    </Typography>

                    <Typography variant="caption" color="textSecondary">
                      {item.content === null
                        ? "hellohellohellohellohellohello"
                        : item.content}
                    </Typography>
                  </Box>
                </Box> */}
            </Grid>
          ))
        : ""}
    </Grid>
  );
}

Media.propTypes = {
  loading: PropTypes.bool
};

export default function MemoList() {
  return (
    <Box overflow="hidden" clone>
      <Paper>
        <Box px={4}>
          <Grid item>
            <ButtonGroup size="small" aria-label="small outlined button group">
              <Button>All</Button>
              <Button>Theme</Button>
              <Button>URL</Button>
            </ButtonGroup>
          </Grid>
          <Media />
        </Box>
      </Paper>
    </Box>
  );
}
