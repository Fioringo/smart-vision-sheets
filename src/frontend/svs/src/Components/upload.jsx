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
    const formData = new FormData();
    console.log(this.state.selectedFile);
    // this.state.selectedFile.forEach((file, i) => {
    // formData.append('file', this.state.selectedFile, this.state.selectedFile.name);
    // });

    if (this.state.selectedFile) {
      var photo = {
        uri: this.state.selectedFile.uri,
        type: this.state.selectedFile.type,
        name: this.state.selectedFile.fileName,
      };
      formData.append('file0', this.state.selectedFile);
    }

    console.log(formData)

    fetch( 'http://localhost:5000/process_image', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        // 'Content-Type': 'multipart/form-data',
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
        console.log(["Ops, something Went Wrong."]);
    });

/*
    console.log('formData = ' + JSON.stringify(formData));

    this.setState({
      selectedFile: []
    });

    axios.post('http://localhost:5000/process_image', {data: formData}, {config: {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }})
    .then((resp)=>{
      console.log(`Response from file upload = ${JSON.stringify(resp)}`)
    }).catch((err)=>{
      console.log(err);
    });
*/
    // axios({
    //   method: "post",
    //   processData: false,
    //   contentType: "multipart/form-data",
    //   cache: false,
    //   url: "http://localhost:5000/process_image",
    //   // url: "http://localhost:3000/process_image",
    //   data: formData,
    //   //add
    //   config: { headers: formData.get(Headers) }
    // }).then((resp)=>{
    //   console.log(`Response from file upload = ${JSON.stringify(resp)}`)
    // }).catch((err)=>{
    //   console.log(err);
    // });
  };

  onDrop = e => {
    console.log(e);
    // let tempPictures = this.state.pictures
    // tempPictures.concat(e)
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
            {/* <form method="post" action="#" id="#">
              <div className="form-group files color">
                <label>Upload Your File </label>
                <input
                  type="file"
                  className="form-control"
                  id="file"
                  multiple
                  onChange={this.onDrop}
                />
              </div>
            </form> */}
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
