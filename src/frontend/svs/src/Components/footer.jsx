import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import './footer.css';

export default class Footer extends React.Component{

  render(){
    return (
      <div className="footer">
        <div className="source">
          <div className="text">This project is available on <a className="link" href="https://github.com/enioluwa23/smart-vision-sheets">GitHub</a></div>
          <Link to="/about" className="link">About</Link>
        </div>
      </div>
    );
  }
}
