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
        <br/>
        <div className="smallText">
          Converting your hand written sheets is easy with 4 simple steps:
        </div>
        <div className="homeText">
          <div className="step">
            <div className="stepTitle">{"Step" } <div className="yellow">1</div>:</div>
            <div className="stepText">Login with your Google Account</div>
          </div>
          <div className="step">
            <div className="stepTitle">{"Step" } <div className="blue">2</div>:</div>
            <div className="stepText">Take a picture of the desired sheet to become a google sheet!</div>
          </div>
          <div className="step">
            <div className="stepTitle">{"Step"}<div className="red">{"3"}</div>:</div>
            <div className="stepText">Upload the image here!</div>
          </div>
          <div className="step">
            <div className="stepTitle">{"Step" } <div className="green">4</div>:</div>
            <div className="stepText">Enjoy your Google Sheet!</div>
          </div>
        </div>
      </div>
    );
  }
}
