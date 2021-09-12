/**
 * This handles the actions of the user input (dot language input)
 **the LeftPanelNav imported handles all of the LeftPanel menu and actions 
 */
import React, { Component } from "react";
import LeftPanelNav from './LeftPanelNav';

export default class LeftPanel extends Component {
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
   * handle the clear button click
   * @param {*} event 
   */
  clearButtonClick = () => {
    this.props.handleClearButtonClick();
  };//clearButtonClick

  /**
   * this method handles the delete button click
   */
  deleteButtonClick = () => {
    this.props.handleDeleteButtonClick();
  };//deleteButtonClick
  
  /**
   * handles when the text input changes for the dot language
   * @param {*} event 
   */
   userInputChanged = (event) => {
    this.props.handleUserInputChange(event);
  };

/**
 * displays the UI component for the LeftPanel
 * @returns 
 */
  render() {

    return (
      <div className="col-sm-4">
        <h2>Dot Language</h2>
          <LeftPanelNav  handleRunGraphClick = {() => this.runGraphClick()} 
          handleClearButtonClick = {() => this.clearButtonClick()} 
          handleDeleteButtonClick = {() => this.deleteButtonClick()} 
           />

          <textarea className="letPanel" name="unprocessed_input" id="unprocessed_input" 
          onChange={this.userInputChanged} value={this.props.unprocessed_input} ></textarea>      
      
      </div>

    );//return

  }//render

}//LeftPanel
