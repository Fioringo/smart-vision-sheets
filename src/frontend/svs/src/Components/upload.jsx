import React from "react";
import ImageUploader from "react-images-upload";
import "./upload.css";
import FormData from "form-data";
import Loading from "./loading";
import { Alert, Fade } from "react-bootstrap";

export default class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      loaded: 0,
      loading: false,
      responseSuccess: "",
      response: {},
      hasTitle: false,
      disableUpload: false,
      uploaded: null
    };
  }

  onChangeHandler = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0
    });
  };

  endableTitle = e => {
    this.setState({
      hasTitle: true
    });
  };

  onFileLoadEnd = e => {
    const content = e.result;
    console.log("File load ended");
    console.log(content);
  };

  onClickHandler = () => {
    this.setState({
      disableUpload: false,
      loading: true
    });
    const formData = new FormData();
    console.log(this.state.selectedFile);
    if (this.state.selectedFile) {
      formData.append("file0", this.state.selectedFile);
    }

    formData.append("hasTitle", this.state.hasTitle);

    console.log(formData);

    fetch("http://localhost:5000/process_image", {
      method: "POST",
      headers: {
        Accept: "application/json"
        // 'Content-Type': 'multipart/form-data',
      },
      body: formData
    })
      .then(response => response.json())
      .then(responseJson => {
        // Perform success response.
        this.props.update(responseJson);
        this.setState({
          disableUpload: true,
          loading: false
        });
        console.log(responseJson);
      })
      .catch(error => {
        this.setState({
          disableUpload: true,
          loading: false,
          uploaded: false
        });
        console.log(error);
        console.log(["Ops, something Went Wrong."]);
      });
  };

  onDrop = e => {
    let selectIndex;
    if (this.state.selectedFile != null) {
      selectIndex = this.state.selectedFile.length - 1;
    } else {
      selectIndex = 0;
    }
    this.setState({
      selectedFile: e[selectIndex],
      disableUpload: true
    });
  };

  resetAlert = () => {
    this.setState({
      uploaded: null
    });
  };

  render() {
    return (
      <div className="container">
        <div className="title">
          <div className="yellow">U</div>pload <div className="blue">Y</div>our{" "}
          <div className="red"> I</div>mage!
        </div>
        <div className="row">
          <div className="col-md-6">
            <div>
              <input
                type="checkbox"
                onChange={this.endableTitle}
                value={this.state.hasTitle}
                id="hasTitle"
              />
              {"  Has Title"}
            </div>
            <ImageUploader
              className="grey"
              withIcon={true}
              onChange={this.onDrop}
              imgExtension={[".jpg", ".png"]}
              accept={"accept=jpg,png"}
              label={"Max file size: 5mb, accepted: jpg | png"}
              // maxFileSize={5242880}
            />
            <button
              type="button"
              className="btn btn-success btn-block"
              onClick={this.onClickHandler}
              disabled={this.state.disableUpload ? false : true}
            >
              Upload
            </button>
            {this.state.uploaded === null ? null : this.state.uploaded ? (
              <Alert
                variant="success"
                dismissible={true}
                onClose={this.resetAlert}
              >
                File successfully uploaded!
              </Alert>
            ) : (
              <Alert
                variant="danger"
                dismissible={true}
                onClose={this.resetAlert}
              >
                Error: File wasn't uploaded!
              </Alert>
            )}
          </div>
        </div>
        {this.state.loading ? <Loading /> : null}
      </div>
    );
  }
}
