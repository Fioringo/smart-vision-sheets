import React from 'react';
// import './nav.css';

export default class Api extends React.Component{

  render(){
    console.log("API Page loaded")
    return (
      <div className="container">
        <div className="title">
          How to use SVS
        </div>
        <div className="contentText">
          In order to use our api you'll have to convert your image to <code>base64</code> and call <code>svisions.tech/api</code>
        </div>
      </div>
    );
  }
}
