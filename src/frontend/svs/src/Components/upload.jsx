import React from 'react';
import axios from 'axios';

export default class Upload extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        selectedFile: null
      }
   
  }

  onChangeHandler=event=>{
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
  }

  onClickHandler = () => {
    const data = new FormData() 
    data.append('file', this.state.selectedFile)
    axios.post("http://localhost:8000/upload", data, { // receive two parameter endpoint url ,form data 
      })
      .then(res => { // then print response status
        console.log(res.statusText)
      })
}


  render() {
    return (
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <form method="post" action="#" id="#">
              <div class="form-group files">
                <label>Upload Your File </label>
                <input type="file" class="form-control" multiple=""/>
              </div>
            </form>
          </div>
            <div class="col-md-6">
              <form method="post" action="#" id="#">
                <div class="form-group files color">
                  <label>Upload Your File </label>
                  <input type="file" class="form-control" multiple onChange={this.onChangeHandler}/>
                </div>
              </form>
              <button type="button" class="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>
          </div>
        </div>
      </div>
    );
  }
}
