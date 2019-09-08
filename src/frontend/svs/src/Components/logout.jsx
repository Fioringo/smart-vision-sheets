import React from "react";
import "../App.css";
const Link = require('react-router-dom').Link
const Button = require('react-bootstrap').Button

export default class LogOut extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    window.localStorage.removeItem("accessToken")
    window.localStorage.removeItem("refreshToken")
    window.localStorage.removeItem("userId")
    this.props.logoutHandler();
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="about">
        <div className="title">
          You've been logged out!
        </div>
        <Button as={Link} to="/" variant="success">Back Home</Button>
      </div>
    );
  }
}
