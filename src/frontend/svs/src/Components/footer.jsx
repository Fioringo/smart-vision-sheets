import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import './footer.css';

export default class Footer extends React.Component{

  render(){
    return (
      <div className="footer">
        <div className="source">
        <Link to="/about" className="link">About</Link>
        <div>
        <a href="https://github.com/enioluwa23/smart-vision-sheets" className="link">This project is available on GitHub</a>
        </div>
        </div>
      </div>
    );
  }
}
