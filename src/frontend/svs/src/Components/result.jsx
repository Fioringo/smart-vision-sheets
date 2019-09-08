import React from "react";
import "../App.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import CSVLogo from "../images/csv-file-format-extension.svg";
import GoogleSheets from "../images/Google sheets.svg";
import Axios from "axios";
import { CSVLink } from "react-csv";
const ListGroup = require("react-bootstrap").ListGroup;
const Alert = require("react-bootstrap").Alert;
const Form = require("react-bootstrap").Form;
const BASE_DOMAIN =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";

export default class SheetResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previousProjects: [],
      data: [],
      fileName: "",
      loggedIn: false,
      sheetCreated: null,
      googleName: "",
      csvName: ""
    };
  }

  componentDidMount = () => {
    if (window.localStorage.getItem("accessToken") !== null) {
      this.setState({
        userId: window.localStorage.getItem("userId"),
        loggedIn: true
      });
    }
    if (this.props.data) {
      this.setState({
        data: this.props.data
      });
    }
    Axios.post(`${BASE_DOMAIN}/get_spreadsheets`, {
      userId: window.localStorage.getItem("userId")
    })
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
      filename: this.state.googleName,
      content: this.state.data,
      userId: window.localStorage.getItem("userId")
    };
    Axios.post(`${BASE_DOMAIN}/add_spreadsheet`, config)
      .then(res => {
        this.setState({
          sheetCreated: true
        })
      })
      .catch(err => {
        this.setState({
          sheetCreated: false,
        })
        console.log(err)
      });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    // let previousSheets;
    // if (this.state.previousProjects !== []) {
    //   var prevProjTemp = this.state.previousProjects;
    //   previousSheets = prevProjTemp.map(e => {
    //     return (
    //       <ListGroup.Item key={e.name} action href={e.link}>
    //         {e.name}
    //       </ListGroup.Item>
    //     );
    //   });
    // }

    let AddToGoogleSheet = (
      <Card
        bg="primary"
        style={{ width: "12rem", margin: "0.4em", padding: "0.2em" }}
        className="text-center"
      >
        <Card.Img variant="top" src={GoogleSheets} />
        <Card.Body>
          <Card.Title>Google Sheets</Card.Title>
          <Form.Control
            type="text"
            placeholder="Sheet Name"
            onChange={this.handleChange}
            name="googleName"
            value={this.state.googleName}
            style={{ marginBottom: "0.2em" }}
          />
          <Button variant="warning" onClick={this.createSheet}>
            Add to Sheets
          </Button>
        </Card.Body>
      </Card>
    );

    let GoogleSuccessAlert = (
      <Alert variant="success">
        <Alert.Heading
          style={{
            width: "12rem",
            height: "25rem",
            margin: "0.4em",
            padding: "0.2em"
          }}
        >
          Success!
        </Alert.Heading>
        <p>
          A Google Spreadsheet has been created with the name{" "}
          {this.state.fileName}.
        </p>
      </Alert>
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
              
            }}
            className="text-center"
          >
            <Card.Img
              variant="top"
              src={CSVLogo}
              style={{ marginTop: "0.0em" }}
            />
            <Card.Body>
              <Card.Title>CSV File</Card.Title>
              <Form.Control
                type="text"
                placeholder="File Name"
                onChange={this.handleChange}
                name="csvName"
                value={this.state.csvName}
                style={{ marginBottom: "0.2em", marginTop: "0.2em" }}
              />
              {this.state.data !== null ? (
                <CSVLink data={this.state.data} filename={this.state.csvName + ".csv"}>
                  <Button variant="warning">Download CSV</Button>
                </CSVLink>
              ) : null}
            </Card.Body>
          </Card>
          {this.state.loggedIn
            ? this.state.sheetCreated
              ? GoogleSuccessAlert
              : AddToGoogleSheet
            : null}
        </div>
        <Button onClick={this.startAgain} variant="danger">
          <span className="glyphicon glyphicon-repeat"></span>Start Over
        </Button>
        {/* <ListGroup defaultActiveKey="/results">{previousSheets}</ListGroup> */}
        {this.state.sheetCreated === false ? (
          <Alert variant="danger" dismissible>
            Error: Sheet wasn't created!
          </Alert>
        ) : null}
      </div>
    );
  }
}
