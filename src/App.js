/**
 * This organizes all the UI component of the GUI
 **the LeftPanel import manages the left side of the GUI (dot languate input and controls)
 **the RightPanel import manages the right side of the GUI (dot graph display and the implementation details)
 */
import React, { useEffect, useState, Component, useRef } from "react";
//this panel holds the graph source (user input)
import LeftPanel from './component/LeftPanel';
//this pannel holds the task graph and the implementation details
import RightPanel from './component/RightPanel';
//this import handles the logic of the GUI
import { parseDotLanguageInput, handleFileUploadInput } from "./adapter/homeAdapter";

class App extends Component {

  constructor(props){  
    //TODO: add a file to show how things work on the high level
    super(props); 

    //set the initial GUI state 
    this.state = {
      // the pannel input is for saving the user's source of the graph being navigated
      unprocessed_input: "",
      // the state of the graph being navigated --(updated when the user clicks run for any input change)
      processed_input: "",
      // this handles the display of the task graph -- the task graph is from the user input
      // the task graph can be cleared either by the clear or delete button
      show_task_graph: false,
      // this shows a loading sympbol on the task graph
      isLoadingTaskGraph: false,
      //the implementation detail is for the data retrived when edge or task is clicked
      show_implementation_details: false,
      // Initially, no file is selected
      selectedFile: null,
      //VARIABLES FOR VULNERABILITY
      show_vulnerability_info: false,
      vulEdgeName: "",
      vulTask1: "",
      vulTask2: "",

    }//state

  }//constructor

   /**
   * this function handles user graph source changes
   */
  handleUserInputChange = (event) =>{
    this.setState({
      unprocessed_input: event.target.value
     }) 
  }//handleUserInputChange

  /**
   * handle file upload operation
   * @param {*} event 
   */
  handleFileUploadChange = (event) => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });    
  }//handleFileUploadChange

  /**
   * this handles the post button
   */
   handleOnFileUpload = () => {     
        // Create an object of formData
        const formData = new FormData();
        // Update the formData object
        formData.append("file",this.state.selectedFile,this.state.selectedFile.name);//console.log(formData);
        //set the isLoading to true
        this.showTaskGraphIsLoading();
        let externalThis = this; //for state management
        setTimeout(() => { 
          //process the user's dot language input
          handleFileUploadInput(formData).then(data => {
            if(data){
                externalThis.setState({ 
                  processed_input: data,
                  show_task_graph: true,
                  isLoadingTaskGraph: false
                }); 
            }//if              
          }).catch(err => {
          // console.log(err);
            this.setState({
            show_task_graph: false,
            isLoadingTaskGraph: false
            });
            alert("Something went wrong..." +err);
          });  //catch
        }, 500);//setTimeout  

  }//handleOnFileUpload
  
  /**
   * this function runs the user input to display the task graph
   */
  handleRunGraphClick() {
    //TODO:: check the graph syntax
    //-- ensure that the value of the input is set
    if(this.state.unprocessed_input){

       let externalThis = this;
       let unprocessed_input = this.state.unprocessed_input;
      //set the isLoading to true
       this.showTaskGraphIsLoading();

       setTimeout(() => { 
         //process the user's dot language input
        parseDotLanguageInput(unprocessed_input).then(data => {
          //console.log(data);
            if(data){
                externalThis.setState({ 
                  processed_input: unprocessed_input,
                  show_task_graph: true,
                  isLoadingTaskGraph: false
                }); 
            }//if              
         }).catch(err => {
          // console.log(err);
           this.setState({
            show_task_graph: false,
            isLoadingTaskGraph: false
           });
           alert("Something went wrong..." +err);
          });  //catch
       }, 500);//setTimeout
       
    }//if

  }//handleRunGraphClick

  /**
   * this functions displays the the task graph loading operation
   */
   showTaskGraphIsLoading(){
      //set the isLoading to true
      this.setState({
        show_task_graph: false,
        isLoadingTaskGraph: true
       });
  }//showTaskGraphIsLoading

  /**
   * this function resets the source graph input back to the defualt - clear btn clicked
   */
  handleClearButtonClick(){
      this.setState({
      unprocessed_input: "",
      processed_input: "",
      show_task_graph: false,
      isLoadingTaskGraph: false,
      show_implementation_details: false,
      show_vulnerability_info: false,
    })//setState
  }//handleClearButtonClick

  /**
   * this function removes all inputs and results from the interface - delete btn clicke
   */
  handleDeleteButtonClick(){
    this.setState({
      unprocessed_input: "",
      processed_input: "",
      show_task_graph: false,
      isLoadingTaskGraph: false,
      show_implementation_details: false,
      show_vulnerability_info: false,
    })//setState
}//handleDeleteButtonClick

 /**
  * this function allows the implementation details to be displayed to the user after clicking on an edge or node
  */
 showImplementationDetails(){
  this.setState({
    show_implementation_details: true,
  })
}//showImplementationDetails

//////////////////////// VULNERABILITY INFORMATION //////////////////

showVulnerabilityInformation = (theVulEdgeName,theVulTask1,theVulTask2) => {     
  this.setState({
    show_vulnerability_info: true,
    vulEdgeName: theVulEdgeName,
    vulTask1: theVulTask1,
    vulTask2: theVulTask2
  })
  
}//showVulnerabilityInformation

/**
 * This formats the vulnerability information to display
 * @returns 
 */
displayVulInfoResult(){  
  let externalThis = this;
  return (<table className='table table-bordered table-dark'>
    <thead>
       <tr>
          <th colSpan="2">
              <h6> Exploit Requirement(s) Associated with {externalThis.state.vulTask1}, {externalThis.state.vulTask2}, {externalThis.state.vulEdgeName} </h6>
          </th>
        </tr>
    </thead>
    <tbody>
        <tr>
           <th>Exploit Title</th>
           <td>Dokany Stack-based Buffer Overflow Privilege Escalation</td>
        </tr>
        <tr>
           <th>Tested Software Version</th>
           <td>1.2.0.1000</td>
        </tr>
        <tr>
           <th>Affected Version</th>
           <td>{"<="} 1.2.0.1000</td>
        </tr>
        <tr>
           <th>Vulnerable files</th>
           <td>stdio.h, windows.h, </td>
        </tr>
        <tr>
           <th>Triggering the Bug </th>
           <td>#define BUFSIZE 896 -- modifying the buffer size <br/> <br/> 
               <p>Connecting to the device handle “dokan_1” and sending inputted buffer of more than 776 bytes to IOCTL 0x00222010 is enough to corrupt the stack cookie and BSOD the box </p>
            </td>
        </tr>
        <tr>
           <th>Vendor Fix URL </th>
           <td><a target="_blank" href="https://github.com/dokan-dev/dokany/releases/tag/v1.2.1.1000"> https://github.com/dokan-dev/dokany/releases/tag/v1.2.1.1000 </a> </td>
        </tr>
    </tbody>
  </table>
  )//return      
}//displayVulInfoResult

//////////////////////// END VULNERABILITY INFORMATION //////////////////


/**
 * displays the UI component for the LeftPanel and RightPanel
 * @returns 
 */
render() {
    return (
          
      <div className="container outerContainer">
        
        <div className="row">
         {/*    The UI component that holds the dot languague input  */}
            <LeftPanel 
                handleRunGraphClick = {() => this.handleRunGraphClick()} 
                handleClearButtonClick = {() => this.handleClearButtonClick()} 
                handleDeleteButtonClick = {() => this.handleDeleteButtonClick()} 
                handleUserInputChange={this.handleUserInputChange}
                handleFileUploadChange = {this.handleFileUploadChange} 
                handleOnFileUpload = {() => this.handleOnFileUpload()} 
                unprocessed_input={this.state.unprocessed_input} 
              />
           {/*    The UI component that holds the display for the task graph and implementation details */}
             <RightPanel 
                processed_input = {this.state.processed_input}
                showImplementationDetails = {() => this.showImplementationDetails()} 
                show_task_graph = {this.state.show_task_graph}
                isLoadingTaskGraph = {this.state.isLoadingTaskGraph}
                show_implementation_details = {this.state.show_implementation_details}

                showVulnerabilityInformation = {this.showVulnerabilityInformation} 
              />

             <h2>Vulnerability Information</h2>
            <div className="vulnerabilityClass table-dark" id="show_vulnerability_info">

                
                {/*  for edge respons */}
                {
                  this.state.show_vulnerability_info ?  this.displayVulInfoResult()  : "the vulnerability details go here..."                
                }
               
            </div>

        </div>

      </div>
    );//return

  }//render

}//App

export default App;
