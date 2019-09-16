import React from "react";
import { Nav, NavDropdown, Image } from "react-bootstrap";
import "../css/sidebar.css";
import {
  FaGithub,
  FaGitlab,
  FaFacebookSquare,
  FaLinkedin,
  FaTwitter,
  FaHome,
  FaList
} from "react-icons/fa";

import { IoIosContacts, IoIosPodium } from "react-icons/io";

function SidebarCustom(props) {
  return (
    <div className="sidebar-content">
      <h1 className="main-title">Flower</h1>
      <div>
        <a>
          <Image
            className="profile-image"
            src="https://avatars2.githubusercontent.com/u/16396561?s=460&v=4"
            roundedCircle
            fluid
          />
        </a>
      </div>
      <div className="social-icons">
        <a href="">
          <FaGithub className="social-icon" />
        </a>
        <a href="">
          <FaGitlab className="social-icon" />
        </a>
        <a href="">
          <FaLinkedin className="social-icon" />
        </a>
        <a href="">
          <FaTwitter className="social-icon" />
        </a>
        <a href="">
          <FaFacebookSquare className="social-icon" />
        </a>
      </div>
      <NavDropdown.Divider />
      <Nav fill defaultActiveKey="/home" variant="tabs" className="flex-column">
        <Nav.Item>
          <Nav.Link eventKey="Home">
            <FaHome /> Home
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="list">
            <FaList /> List
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="analysis">
            <IoIosPodium /> Analysis
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Share">
            <IoIosContacts /> Share
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <NavDropdown title={"More..."} id="nav-dropdown">
            <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
            <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
            <NavDropdown.Item eventKey="4.3">
              Something else here
            </NavDropdown.Item>
          </NavDropdown>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default SidebarCustom;
