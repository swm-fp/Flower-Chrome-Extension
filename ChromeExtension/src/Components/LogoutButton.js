import React from "react";
import Button from "@material-ui/core/Button";
import FlowerAPI from "../apis/FlowerAPI";

function logout() {
  FlowerAPI.updateLogoutState();
  window.location.reload(false);
}

export default function LogoutButton() {
  return (
    <Button variant="outlined" onClick={logout}>
      logout
    </Button>
  );
}
