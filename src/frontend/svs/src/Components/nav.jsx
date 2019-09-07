import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import './nav.css';

export default class Nav extends React.Component{

  render(){
    return (
      <div className="nav">
        <Link to="/" className="logo">logo</Link>
        <Link to="/Api" className="text">Api</Link>
        <Link to="/Upload" className="text">Upload</Link>
      </div>
    );
  }
}
