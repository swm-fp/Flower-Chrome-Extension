import React, { Component } from "react";
import FlowerAPI from "../apis/FlowerAPI";
import { Button } from "react-bootstrap";
export default class BMButton extends Component {
  render() {
    return (
        <div>
            <Button onClick={FlowerAPI.postTags}> test </Button>
            <Button onClick={FlowerAPI.getTags}> test </Button>
        </div>
    );
  }
}
