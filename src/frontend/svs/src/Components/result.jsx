import React from "react";
import "../App.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import CSVLogo from "../images/csv-file-format-extension.svg";
import GoogleSheets from "../images/Google sheets.svg";
import Axios from "axios";
import { CSVLink } from "react-csv";
const ListGroup = require("react-bootstrap").ListGroup;
const BASE_DOMAIN =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";

export default class SheetResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previousProjects: [],
      data: [],
      fileName: "",
      loggedIn: false
    };
  }

  componentDidMount = () => {
    if (localStorage.getItem("accessToken") !== null) {
      this.setState({
        userId: localStorage.getItem("userId"),
        loggedIn: true
      });
    }
    if (this.props.data) {
      this.setState({
        data: this.props.data
      });
    }
    Axios.post(`${BASE_DOMAIN}/get_spreadsheets`, {})
      .then(res => {
        this.setState({
          previousProjects: res
        });
      })
      .catch(err => {
        this.setState({
          error: err,
          previousProjects: []
        });
      });
  };

  startAgain = () => {
    this.props.startAgain();
  };

  createSheet = () => {
    let config = {
      filename: this.state.fileName,
      content: this.state.data
    };
    Axios.post(`${BASE_DOMAIN}/add_spreadsheet`, this.props.data);
  };

  render() {
    let previousSheets;
    if (this.state.previousProjects !== []) {
      var prevProjTemp = this.state.previousProjects;
      previousSheets = prevProjTemp.map(e => {
        return (
          <ListGroup.Item key={e.name} action href={e.link}>
            {e.name}
          </ListGroup.Item>
        );
      });
    }
    let AddToGoogleSheet = (
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
    );
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
            style={{
              width: "12rem",
              marginRight: "0.4em",
              padding: "0.3em",
              margin: "auto"
            }}
            className="text-center"
          >
            <Card.Img variant="top" src={CSVLogo} />
            <Card.Body>
              <Card.Title>CSV File</Card.Title>
              {this.state.data !== null ? (
                <CSVLink data={this.state.data}>
                  <Button variant="warning">Download</Button>
                </CSVLink>
              ) : null}
            </Card.Body>
          </Card>
          {this.state.loggedIn ? AddToGoogleSheet : null}
        </div>
        <Button onClick={this.startAgain} variant="danger">
          <span className="glyphicon glyphicon-repeat"></span>Start Over
        </Button>
        <ListGroup defaultActiveKey="/results">{previousSheets}</ListGroup>
      </div>
    );
  }
}
