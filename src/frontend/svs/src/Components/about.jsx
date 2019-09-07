import React from "react";
import "./about.css";

export default class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="about">
        <div className="title">
          <div className="yellow">A</div>bout
        </div>
        <div className="aboutText">
          This project was created to erase the pain of entering values manually
          into a google spreadsheet.
        </div>
      </div>
    );
  }
}
