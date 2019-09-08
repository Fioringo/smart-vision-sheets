import React from "react";
// import './nav.css';

export default class Api extends React.Component {
  render() {
    console.log("API Page loaded");
    return (
      <div className="container">
        <div className="title">How to use SVS</div>
        <div className="contentText">
          <div className="block">
            <div className="apiText">
              To use our api, you'll need to convert your image to{" "}
              <code>base64</code> and call{" "}
              <code>https://svisions.tech/api/image</code>
            </div>
            <div className="apiExample">
              <div className="language">JavaScript:</div>
              <code>axios.post('https://svisions.tech/api/image',image)</code>
            </div>
          </div>
          <br />
        </div>
      </div>
    );
  }
}
