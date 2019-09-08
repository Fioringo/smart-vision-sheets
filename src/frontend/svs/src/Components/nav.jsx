import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./nav.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Home from "./home";
import Api from "./api";
import Footer from "./footer";
import Upload from "./upload";
import About from "./about";
import axios from "axios";
import Privacy from "./privacy";
import SheetResult from "./result";
import FeaturePage from "./featurePage";

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeKey: "Home",
      auth: null
    };
  }

  componentDidMount() {
    // console.log("header mounted");
    axios
      .get("/auth/current_user")
      .then(response => {
        console.log("response from auth/google", response);
        this.setState({ auth: response.data.userData });
        console.log("auth: ", this.state.auth);
        console.log(typeof this.state.auth);
      })
      .catch(function(err) {
        console.log(err);
      });
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
                eventKey="API"
                onSelect={this.handleSelect}
                as={Link}
                to="/api"
              >
                API
              </Nav.Link>
              <Nav.Link
                className="item"
                eventKey="Upload"
                onSelect={this.handleSelect}
                as={Link}
                to="/feature"
              >
                Upload
              </Nav.Link>
              <Nav.Link
                className="item"
                eventKey="Upload"
                onSelect={this.handleSelect}
                href={this.state.auth ? "/auth/logout" : "/auth/google"}
              >
                {this.state.auth ? "Logout" : "Google Login"}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="content">
          <Route path="/" exact component={Home} />
          <Route path="/api" component={Api} />
          <Route path="/upload" component={Upload} />
          <Route path="/about" component={About} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/results" component={SheetResult} />
          <Route path="/feature" component={FeaturePage} />
        </div>
        <Footer />
      </Router>
    );
  }
}
