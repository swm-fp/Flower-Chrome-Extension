import React, { useState, useEffect } from "react";
import FlowerAPI from "../apis/FlowerAPI";
import "../css/memoList.scss";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import MemoModal from "./MemoModal.js";

function Media() {
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
        ? Array.from(memo).map((item, index) => <MemoModal item={item} />)
        : ""}
    </Grid>
  );
}

export default function MemoList() {
  return (
    <Box overflow="hidden" clone>
      <Paper>
        <Box px={4}>
          {/* <Grid item></Grid> */}
          <Media />
        </Box>
      </Paper>
    </Box>
  );
}
