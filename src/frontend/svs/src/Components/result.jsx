import React from "react";
import "./about.css";

export default class SheetResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="about">
        <div className="title">
          <div className="yellow">R</div>esults
        </div>
        <div className="aboutText">
          Here are the results!
        </div>
        
      </div>
    );
  }
}
