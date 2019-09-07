import React from "react";
import "./home.css";

export default class Home extends React.Component {
  render() {
    return (
      <div className="home">
        {/* <div className="image"></div> */}
        <div className="titleWrapper">
          <div className="title">
            <div className="yellow">S</div>
            <div className="grey">mart</div>
            <div className="blue">V</div>
            <div className="grey">ision</div>
            <div className="red">S</div>
            <div className="grey">heets</div>
            <div className="green">.ml</div>
          </div>
        </div>
        <div className="description">
          Convert your sheets into Google Sheets
        </div>
      </div>
    );
  }
}
