import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import './App.css'
import Home from './Components/home'
import Api from './Components/api'
import Upload from './Components/upload'
import Nav from './Components/nav'
import Footer from './Components/footer'

export default class App extends React.Component{

  render(){
    return (
      <div className="App">
        <Router>
          <Nav/>
          <div className="content">
            <Route path="/" component={Home}/>
            <Route path="/apiPage" component={Api}/>
            <Route path="/upload" component={Upload}/>
          </div>
          <Footer/>
        </Router>
      </div>
    );
  }
}
