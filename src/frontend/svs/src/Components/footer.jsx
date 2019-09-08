import React from 'react';
// import { BrowserRouter as Link} from "react-router-dom"
import Link from 'react-router-dom/Link'
import './footer.css';

export default class Footer extends React.Component{

  render(){
    return (
      <div className="footer">
        <div className="source">
          <Link to="/about" className="link">About</Link> | <Link to="/privacy" className="link">Privacy</Link> | <Link to="/home" className="link">Home</Link>
          <div>
            This project is available on <a href="https://github.com/enioluwa23/smart-vision-sheets" className="link">GitHub</a>
          </div>
        </div>
      </div>
    );
  }
}
