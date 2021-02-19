import React, { Component } from "react";
import LeftPanelNav from './LeftPanelNav';

export default class LeftPanel extends Component {
    constructor(props){  
        super(props);  
      } 

  /**
   * handles when the run button is clicked on
   */
  runGraphClick = () => {
    this.props.handleRunGraphClick();
  };

  /**
   * handles when the text input changes for the dot language
   * @param {*} event 
   */
  dotLanguageChange = (event) => {
    this.props.handleDotLanguageChange(event);
  };

  render() {
    return (
        <div className="col-sm-4">
        <h2>Dot Language</h2>
          <LeftPanelNav  handleRunGraphClick = {() => this.runGraphClick()}  />

          <textarea className="letPanel" name="dot_language_input" id="dot_language_input" onChange={this.dotLanguageChange} defaultValue={this.props.dot_language_input} ></textarea>      
      
      </div>
    );
  }
}
