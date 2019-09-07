import React from "react";
import "./about.css";

export default class Privacy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="about">
        <div className="title">
          <div className="yellow">P</div>rivacy
        </div>
        <div className="aboutText">
          We do not share your data with anybody.
        </div>
        
      </div>
    );
  }
}