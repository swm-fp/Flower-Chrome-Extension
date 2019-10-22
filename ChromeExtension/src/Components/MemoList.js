import React, { useState, useEffect } from "react";
import FlowerAPI from "../FlowerAPI.js";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";

function Media(props) {
  const { loading = false } = props;
  const [memo, setStateMemo] = useState([]);

  useEffect(() => {
    getMemoList().then(res => setStateMemo(res));
  }, []);

  let getMemoList = async () => {
    return await FlowerAPI.readAllNodes();
  };

  return (
    <Grid container wrap="nowrap">
      {(loading ? Array.from(new Array(0)) : memo).map((item, index) => (
        <Box key={index} width={210} marginRight={0.5} my={5}>
          <Skeleton variant="rect" width={210} height={118}></Skeleton>

          {item ? (
            <Box paddingRight={2}>
              <Typography gutterBottom variant="body2">
                {item.title}
              </Typography>
              <Typography
                display="block"
                variant="caption"
                color="textSecondary"
              >
                this is testing message
              </Typography>
              <Typography variant="caption" color="textSecondary">
                This is testing message for promotion This is testing message
                for promotion This is testing message for promotion
              </Typography>
            </Box>
          ) : (
            <React.Fragment>
              <Skeleton />
              <Skeleton width="60%" />
            </React.Fragment>
          )}
        </Box>
      ))}
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
          <Media loading />
          <Media />
        </Box>
      </Paper>
    </Box>
  );
}
