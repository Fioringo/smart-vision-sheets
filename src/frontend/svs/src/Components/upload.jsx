import React from "react";
import axios from "axios";

export default class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      loaded: 0,
      loading: false,
      responseSuccess: "",
      response: {},
    };
  }

  onChangeHandler = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0
    });
  };

  onClickHandler = async () => {
    let imageBinary
    const data = new FormData()
    data.append('file', this.state.selectedFile, this.state.selectedFile.name)
    imageBinary = await fetch(this.state.selectedFile)
    // imageBinary = new Buffer.from(imageBinary, 'binary').toString('base64')
    console.log(this.state.selectedFile)
    console.log(imageBinary)
    // console.log(imageBinary)
    return 0
    axios.post('/process_image',{image: imageBinary})
    .then((response) => {
      this.setState({
        loading: false,
        responseSuccess: response.data.success,
        response: response.data
      })
    })

    // axios.post("http://localhost:8000/upload", data, { // receive two parameter endpoint url ,form data
    //   })
    //   .then(res => { // then print response status
    //     console.log(res.statusText)
    // })
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <form method="post" action="#" id="#">
              <div className="form-group files color">
                <label>Upload Your File </label>
                <input
                  type="file"
                  className="form-control"
                  multiple
                  onChange={this.onChangeHandler}
                />
              </div>
            </form>
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
