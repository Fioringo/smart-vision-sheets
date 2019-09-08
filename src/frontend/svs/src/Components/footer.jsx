import React from 'react';
import { BrowserRouter as Link } from "react-router-dom"
import './footer.css';

export default class Footer extends React.Component{

  render(){
    return (
      <div className="footer">
        <div className="source">
        <Link to="/about" className="link">About</Link> | <Link to="/privacy" className="link">Privacy</Link>
        <div>
        This project is available on <a href="https://github.com/enioluwa23/smart-vision-sheets" className="link">GitHub</a>
        </div>
        </div>
      </div>
    );
  }
}
