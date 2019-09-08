import React from "react";
import "../App.css";
const Link = require('react-router-dom').Link
const Button = require('react-bootstrap').Button

export default class LogOut extends React.Component {

  componentDidMount = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("userId")
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
