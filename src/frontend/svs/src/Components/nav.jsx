import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./nav.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Home from "./home";
import Footer from "./footer";
import Upload from "./upload";
import About from "./about";
import Privacy from "./privacy";
import SheetResult from "./result";
import FeaturePage from "./featurePage";
import LogOut from "./logout";
const BASE_DOMAIN = process.env.NODE_ENV === "production" ? "" : "http://localhost:5000"

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeKey: "Home",
      loggedIn: false,
    };
  }

  componentDidMount() {
    if (window.localStorage.getItem("accessToken") !== null) {
      this.setState({
        loggedIn: true
      })
    }
  }

  handleLogout = () => {
    this.setState({ loggedIn: false });

  };

  handleSelect = page => {
    if (window.localStorage.getItem("accessToken") !== null) {
      this.setState({
        loggedIn: true
      })
    }
    this.setState({ activeKey: page })
  };

  render() {
    return (
      <Router>
        <Navbar
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
                eventKey="Upload"
                onSelect={this.handleSelect}
                as={Link}
                to="/feature"
              >
                Upload
              </Nav.Link>
              {this.state.loggedIn ?
                <Nav.Link className="item" eventKey="Login" onSelect={this.handleSelect} as={Link} to="/logout">Logout</Nav.Link> :
                <Nav.Link className="item" eventKey="Login" onSelect={this.handleSelect} href={`${BASE_DOMAIN}/login`}>Google Login</Nav.Link>}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="content">
          <Route path="/" exact component={Home} />
          <Route path="/upload" component={Upload} />
          <Route path="/about" component={About} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/results" component={SheetResult} />
          <Route path="/feature" component={FeaturePage} />
          <Route path="/logout" component={(props) => <LogOut {...props} logoutHandler={this.handleLogout}/>}/>
        </div>
        <Footer />
      </Router>
    );
  }
}
