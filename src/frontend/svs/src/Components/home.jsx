import React from "react";
import "./home.css";
const Link = require("react-router-dom").Link;
let qs = require("query-string");
const BASE_DOMAIN =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    const accessToken = window.localStorage.getItem("accessToken");
    const refreshToken = window.localStorage.getItem("refreshToken");
    const userId = window.localStorage.getItem("userId");
    this.state = {
      accessToken,
      refreshToken,
      userId
    };
  }

  getHashParams = () => {
    const hashParams = {};
    let e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    this.resetUrl();
    return hashParams;
  }

  componentDidMount = () => {
    const params = this.getHashParams();
    console.log(params);
    const { accessToken, refreshToken, userId } = params;
    this.setState({
      accessToken,
      refreshToken,
      userId,
    });
    if (userId) {
      window.localStorage.setItem("accessToken", accessToken);
      window.localStorage.setItem("refreshToken", refreshToken);
      window.localStorage.setItem("userId", userId);
    }
  };

  resetUrl = () => {
    const currUrl = window.location.href;
    const resetUrl = currUrl.substring(0, currUrl.lastIndexOf("#"));
    const currState = window.history.state;
    window.history.replaceState(currState, "SVS", resetUrl);
  };

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
        <br />
        <div className="smallText">
          Converting your hand written sheets is easy with 4 simple steps:
        </div>
        <div className="homeText">
          <div className="step">
            <div className="stepTitle">
              {"Step"} <div className="yellow">1</div>:
            </div>
            <div className="stepText">
              <a href={`${BASE_DOMAIN}/login`} className="link">
                Login
              </a>{" "}
              with your Google Account
            </div>
          </div>
          <div className="step">
            <div className="stepTitle">
              {"Step"} <div className="blue">2</div>:
            </div>
            <div className="stepText">
              Take a picture of the desired sheet to become a google sheet!
            </div>
          </div>
          <div className="step">
            <div className="stepTitle">
              {"Step"}
              <div className="red">{"3"}</div>:
            </div>
            <div className="stepText">
              Upload the image{" "}
              <Link to="/feature" className="link">
                here!
              </Link>
            </div>
          </div>
          <div className="step">
            <div className="stepTitle">
              {"Step"} <div className="green">4</div>:
            </div>
            <div className="stepText">Enjoy your Google Sheet!</div>
          </div>
        </div>
      </div>
    );
  }
}
