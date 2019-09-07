import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import './nav.css';

export default class Nav extends React.Component{

  render(){
    return (
      <div className="nav">
        <Link to="/"><img className="logo" src="../svslogo.svg" alt="logo"></img></Link>
        <Link to="/Api" className="item">Api</Link>
        <Link to="/Upload" className="item">Upload</Link>
      </div>
    );
  }
}
