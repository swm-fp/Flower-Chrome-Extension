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

function Media(props) {
  const { loading = false } = props;
  const [memo, setStateMemo] = useState([]);

  useEffect(() => {
    getMemoList().then(res => setStateMemo(res));
  }, []);

  let getMemoList = async () => {
    return await FlowerAPI.getMemos();
  };

  return (
    <Grid container spacing={3}>
      {(loading ? Array.from(new Array(0)) : memo).map((item, index) => (
        <Grid className="memo-grid" item md={2} sm={4}>
          <Box className="memo-display-box" key={index} width="100%" my={5}>
            <Skeleton
              variant="rect"
              width="100%"
              height={118}
              margin-bottom={10}
            />

            <Box className="memo-display-box">
              <Typography gutterBottom variant="body2">
                <div className="memo-display-title">
                  <MemoModal props={item} />
                </div>
              </Typography>

              <Typography
                display="block"
                variant="caption"
                color="textSecondary"
                className="memo-url"
              >
                <a href={item.requestUrl}>{item.requestUrl}</a>
              </Typography>

              <Typography variant="caption" color="textSecondary">
                memo contents example and it requries
              </Typography>
            </Box>
          </Box>
        </Grid>
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
