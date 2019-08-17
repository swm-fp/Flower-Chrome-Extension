import React, { Component } from "react";
import LoginButton from "./LoginButton";
import TestButton from "./TestButton";
import GRAPH from "./GraphGen";
import BMButton from "./BMButton";
import BMTreemap from "./BMTreemap";

import {
  Navbar,
  NavDropdown,
  Form,
  Button,
  Nav,
  FormControl
} from "react-bootstrap";

import { IoLogoGithub } from "react-icons/io";

export default class NavCustom extends Component {
  render() {
    return (
      <Navbar bg="light" variant="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Item>
              <Nav.Link href="#home">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="https://github.com/swm-fp/Flower-Chrome-Extension">
                <IoLogoGithub /> SWM-FP
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <NavDropdown title="Test" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">
                  <LoginButton />
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  <GRAPH />
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  <BMTreemap />
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.4">
                  <BMButton />
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.5">
                  <TestButton />
                </NavDropdown.Item>
              </NavDropdown>
            </Nav.Item>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
