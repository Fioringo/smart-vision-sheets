import React from "react";
import "../App.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import CSVLogo from "../images/csv-file-format-extension.svg";
import GoogleSheets from "../images/Google sheets.svg";
import Axios from "axios";
import CsvDownloader from "react-csv-downloader";

export default class SheetResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  startAgain = () => {
    this.props.startAgain();
  };

  createSheet = () => {
    Axios.post("", this.props.data);
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
          <Card
            bg="info"
            style={{ width: "12rem", margin: "0.4em", padding: "0.3em" }}
            className="text-center"
          >
            <Card.Img variant="top" src={CSVLogo} />
            <Card.Body>
              <Card.Title>CSV File</Card.Title>
              <CsvDownloader>
                <Button variant="warning">Download</Button>
              </CsvDownloader>
            </Card.Body>
          </Card>
          <Card
            bg="primary"
            style={{ width: "12rem", margin: "0.4em", padding: "0.2em" }}
            className="text-center"
          >
            <Card.Img variant="top" src={GoogleSheets} />
            <Card.Body>
              <Card.Title>Google Sheets</Card.Title>
              <Button variant="warning" onClick={this.createSheet}>
                Add to Sheets
              </Button>
            </Card.Body>
          </Card>
        </div>
        <Button onClick={this.startAgain} variant="danger">
          <span className="glyphicon glyphicon-repeat"></span>Start Over
        </Button>
      </div>
    );
  }
}
