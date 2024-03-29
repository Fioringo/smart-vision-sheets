import React from "react";
import "../App.css";
import Upload from "./upload";
import SheetResult from "./result";

export default class FeaturePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadView: true,
      data: null,
      counter: 0,
      loading: false,
    };
  }

  startOver = () => {
    let tempCounter = this.state.counter + 1
    this.setState({
      uploadView: true,
      data: null,
      counter: tempCounter
    })
  }
  
  update = (data) => {
    let tempCounter = this.state.counter + 1
    this.setState({
      data,
      counter: tempCounter,
      uploadView: false,
    })
  }

  render() {
    return (
      <div className="FeaturePage">
        {this.state.uploadView ? <Upload key={this.state.counter} update={this.update}/> : <SheetResult key={this.state.counter} startAgain={this.startOver} data={this.state.data}/>}
      </div>
    );
  }
}
