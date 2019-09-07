import React from "react";
import axios from "axios";
import ImageUploader from "react-images-upload"
import "./upload.css"

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
      selectedFile: event,
      // selectedFile: event.target.files[0],
      loaded: 0
    });
  };

  endableTitle = e => {
    this.setState({
      hasTitle: true
    });
  };

  onFileLoadEnd = e => {
    const content = e.result
    console.log("File load ended")
    console.log(content)
  }

  onClickHandler = async () => {
    const formData = new FormData()
console.log(this.state.selectedFile)
    this.state.selectedFile.forEach((file, i) => {
      formData.append("file[]", file)
    })

    console.log(formData)

    this.setState({
      selectedFile: []
    })
    // let fr = new FileReader()

    // fr.addEventListener("load", function () {
      // preview.src = fr.result;
    // }, false);
  
    // if (this.state.selectedFile) {
    //   fr.readAsDataURL(this.state.selectedFile);
    //   console.log(fr)
    // }

    // console.log(this.state.selectedFile)
    // fr.onloadend(this.onFileLoadEnd)
    // fr.readAsArrayBuffer(this.state.selectedFile)
    // fr.readAsDataURL(this.state.selectedFile)
    // let imageBinary
    // console.log(imageBinary)
    // const data = new FormData();
    // data.append("file", this.state.selectedFile, this.state.selectedFile.name);
    // data.append("hasTitle", this.state.hasTitle);
    // imageBinary = await fetch(this.state.selectedFile);
    // imageBinary = new Buffer.from(imageBinary, 'binary').toString('base64')



    // axios.post("/process_image", { image: imageBinary }).then(response => {
    //   this.setState({
    //     loading: false,
    //     responseSuccess: response.data.success,
    //     response: response.data,
    //     pictures: []
    //   });
    // });



    // axios.post("http://localhost:8000/upload", data, { // receive two parameter endpoint url ,form data
    //   })
    //   .then(res => { // then print response status
    //     console.log(res.statusText)
    // })
  };

  onDrop = (e) => {
    console.log(e)
    // let tempPictures = this.state.pictures
    // tempPictures.concat(e)
    this.setState({
      selectedFile: e
    })
  }

  render() {
    return (
      <div className="container">
        <div className="title">Upload Your Image!</div>
        <div className="row">
          <div className="col-md-6">
            <div>
              <input
                type="checkbox"
                onChange={this.endableTitle}
                value={this.state.hasTitle}
                id="hasTitle"
              />
              {/* <label>{"     Has Title"}</label> */}
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
                  onChange={this.onChangeHandler}
                />
              </div>
            </form> */}
            <ImageUploader
              withIcon={true}
              onChange={this.onDrop}
              imgExtension={['.jpg', '.png']}
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
