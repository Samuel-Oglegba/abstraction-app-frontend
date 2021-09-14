/**
 * this handles the navigation buttons and associated action
 */
import React, { useRef, Component } from "react";

export default class LeftPanelNav extends Component {
   
  constructor(props){  
      super(props);  
  }//constructor

  /**
   * handles when the run button is clicked on
   */
  runGraphClick = () => {
    this.props.handleRunGraphClick();
  };//runGraphClick

  /**
   * handles when the clear button is clicked on
   */
  runClearGraphClick = () => {
    this.props.handleClearButtonClick();
  };//runClearGraphClick

  /**
   * handle when the delete button is clicked on
   */
  runDeleteGraphClick = () => {
    this.props.handleDeleteButtonClick();
  };//runDeleteGraphClick

  /**
   * handle file upload
   * @returns 
   */
   onFileChange = (event) => {
    this.props.handleOnFileChange(event);
   };//onFileChange

   onFileUpload = () => {
    this.props.handleOnFileUpload();
   };//runDeleteGraphClick

  render() {
    return (
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
           <ul className="navbar-nav mr-auto">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  File
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {/* <a className="dropdown-item custom-file-upload" for="file" href="#">Open File </a>  */}
               
                      <input type="file" id="file" onChange={this.onFileChange} />
                    
                      <button onClick={this.onFileUpload}>Upload</button>
                              

                 {/*   <a className="dropdown-item" href="#">Open Folder</a>   */}
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">Save</a>
                </div>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto"> 
                  <li className="nav-item">
                      <a className="nav-link" id="refresh_input" onClick={() => this.runClearGraphClick()} href="#" title="Reset Dot Input To Default"><span className="fa fa-repeat"></span></a>
                  </li>  
                  <li className="nav-item">
                      <a className="nav-link" id="run_graph" onClick={() => this.runGraphClick()} href="#" title="Run Dot Input"><span className="fa fa-play"></span></a>
                  </li>
                  <li className="nav-item pull-right">
                    <a className="nav-link" id="delete_input" onClick={() => this.runDeleteGraphClick()} href="#"><span className="fa fa-trash" title="Delete All results"></span></a>
                  </li>
            </ul>
        </nav>
          
    );//return

  }//render

}//LeftPanelNav
