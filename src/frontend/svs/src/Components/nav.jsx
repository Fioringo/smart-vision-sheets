import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./nav.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Home from './home'
import Api from './api'
import Footer from './footer'
import Upload from "./upload";

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeKey: "Home"
    };
  }

  handleSelect = page => this.setState({ activeKey: page });

  render() {
    return (
      <Router>
        <Navbar
          bg="dark"
          variant="dark"
          expand="lg"
          fixed="top"
          collapseOnSelect
          className="nav-bar"
        >
          <Navbar.Brand as={Link} to="/">
            <div className="logoImage" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link
                className="item"
                onSelect={this.handleSelect}
                as={Link}
                to="/api"
              >
                API
              </Nav.Link>
              <Nav.Link
                className="item"
                onSelect={this.handleSelect}
                as={Link}
                to="/upload"
              >
                Upload
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="content">
            <Route path="/" component={Home}/>
            <Route path="/apiPage" component={Api}/>
            <Route path="/upload" component={Upload}/>
          </div>
          <Footer/>
      </Router>
    );
  }
}
