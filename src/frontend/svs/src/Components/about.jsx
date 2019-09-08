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
          The purpose of this project is to automate the tedious task of
          entering values into a spreadsheet, inspired by a mission to create a practical tool 
          that can automate a common task. <br />
          This program uses Machine Learning to recognize tabular data from an
          image. After that, it uses the Google Sheets API to convert the image
          into a usable spreadsheet. <br />
        </div>
      </div>
    );
  }
}
