import React from "react";
import axios from "axios";
import ImageUploader from "react-images-upload";
import "./upload.css";
import FormData from 'form-data'

export default class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      loaded: 0,
      loading: false,
      responseSuccess: "",
      response: {},
      hasTitle: false
    };
  }

  onChangeHandler = event => {
    this.setState({
      // selectedFile: event,
      selectedFile: event.target.files[0],
      loaded: 0
    });
  };

  endableTitle = e => {
    this.setState((prevState) => ({
      hasTitle: !prevState.hasTitle
    }));
  };

  onFileLoadEnd = e => {
    const content = e.result;
    console.log("File load ended");
    console.log(content);
  };

  onClickHandler = () => {
    const formData = new FormData();
    console.log(this.state.selectedFile);
    // this.state.selectedFile.forEach((file, i) => {
    // formData.append('file', this.state.selectedFile, this.state.selectedFile.name);
    // });

    if (this.state.selectedFile) {
      formData.append('file0', this.state.selectedFile);
      formData.append('hasTitle', this.state.hasTitle);
    }

    console.log(formData)

    fetch('http://localhost:5000/process_image', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      body: formData
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // Perform success response.
        console.log(responseJson);
      })
      .catch((error) => {
        console.log(error)
        console.log("Ops, something Went Wrong.");
      });
  };

  onDrop = e => {
    console.log(e);
    this.setState({
      selectedFile: e[0]
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
              withIcon={true}
              onChange={this.onDrop}
              imgExtension={[".jpg", ".png"]}
              accept={'accept=jpg,png'}
              label={'Max file size: 5mb, accepted: jpg | png'}
            // maxFileSize={5242880}
            />
            <button
              type="button"
              className="btn btn-success btn-block"
              onClick={this.onClickHandler}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    );
  }
}
