import './footer.css';
import React from 'react';
const Link = require('react-router-dom').Link;

export default class Footer extends React.Component{

  render(){
    return (
      <div className="footer">
        <div className="source">
          <Link to="/about" className="link aboutLink">About</Link><Link to="/privacy" className="link privacyLink">Privacy</Link><Link to="/home" className="link homeLink">Home</Link>
          <div>
            This project is available on <a href="https://github.com/enioluwa23/smart-vision-sheets" className="link">GitHub</a>
          </div>
        </div>
      </div>
    );
  }
}
