import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
export default function NeedLoginPage() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Typography
          component="div"
          style={{
            textAlign: "center"
          }}
        >
          <img
            src="https://i.imgur.com/7iPJ80Q.png"
            alt="quotes"
            width="100%"
          />
        </Typography>
      </Container>
    </React.Fragment>
  );
}
