import React from "react";
import "../App.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import CSVLogo from "../images/csv-file-format-extension.svg";
import GoogleSheets from "../images/Google sheets.svg";

export default class SheetResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  startAgain = () => {
    this.props.startAgain();
  };

  render() {
    return (
      <div className="about">
        <div className="title">
          <div className="yellow">R</div>esults
        </div>
        <div className="aboutText">
          Here are the results! How would you like to save them?
        </div>
        <div className="options">
          <Card bg="info" style={{ width: "12rem" , margin: "0.4em", padding: "0.3em"}} className="text-center">
            <Card.Img variant="top" src={CSVLogo} />
            <Card.Body>
              <Card.Title>CSV File</Card.Title>
              {/* <Card.Text>
              Download this CSV file with your sheet in <code>.csv</code> format.
            </Card.Text> */}
              <Button variant="warning">Download</Button>
            </Card.Body>
          </Card>
          <Card bg="primary" style={{ width: "12rem" , margin: "0.4em", padding: "0.2em"}} className="text-center">
            <Card.Img variant="top" src={GoogleSheets} />
            <Card.Body>
              <Card.Title>Google Sheets</Card.Title>
              {/* <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text> */}
              <Button variant="warning">Add to Sheets</Button>
            </Card.Body>
          </Card>
        </div>
        <Button onClick={this.startAgain} variant="danger" className="glyphicon glyphicon-repeat">Start Over</Button>
      </div>
    );
  }
}
