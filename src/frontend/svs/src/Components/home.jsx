import React from "react";
import "./home.css";
const Link = require('react-router-dom').Link;
let qs = require("query-string")

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const userId = localStorage.getItem('userId');
    this.state = {
      loggedIn: accessToken !== null,
      accessToken,
      refreshToken,
      userId,
    }
  }

  componentDidMount = () => {
    const params = qs.parse();
    console.log(params);
    const {accessToken, refreshToken, loggedIn } = params;
    this.setState({
      loggedIn: loggedIn ? true : false,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
    if(this.state.loggedIn) {
      localStorage.setItem("accessToken", this.state.accessToken)
      localStorage.setItem("refreshToken", this.state.refreshToken)
      localStorage.setItem("userId", this.state.userId)
    }
    this.resetUrl()
  }

  resetUrl = () => {
    const currUrl= window.location.href;
    const resetUrl = currUrl.substring(0, currUrl.lastIndexOf('#'));
    const currState = window.history.state;
    window.history.replaceState(currState, "SVS", resetUrl);
  }

  render() {
    return (
      <div className="home">
        {/* <div className="image"></div> */}
        <div className="titleWrapper">
          <div className="title">
            <span className="yellow">S</span>mart
            <span className="blue">V</span>ision
            <span className="red">S</span>heets
            <span className="green">.ml</span>
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
            <div className="stepText">Upload the image <Link to="/feature" className="link">here!</Link></div>
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
