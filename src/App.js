/**
 * This organizes all the UI component of the GUI
 **the LeftPanel import manages the left side of the GUI (dot languate input and controls)
 **the RightPanel import manages the right side of the GUI (dot graph display and the implementation details)
 */
import React, { useEffect, useState, Component } from "react";
//this panel holds the graph source (user input)
import LeftPanel from './component/LeftPanel';
//this pannel holds the task graph and the implementation details
import RightPanel from './component/RightPanel';
//this import handles the logic of the GUI
import { parseDotLanguageInput, defualt_dedup_input } from "./adapter/homeAdapter";

class App extends Component {

  constructor(props){  
    //TODO: add a file to show how things work on the high level
    super(props); 

    //set the initial GUI state 
    this.state = {
      //the pannel input is for saving the user's source of the graph being navigated
      unprocessed_input: defualt_dedup_input(),
      //the state of the graph being navigated --(updated when the user clicks run for any input change)
      processed_input: "",
      //this handles the display of the task graph -- the task graph is from the user input
      //the task graph can be cleared either by the clear or delete button
      show_task_graph: false,
      //this shows a loading sympbol on the task graph
      isLoadingTaskGraph: false,
      //the implementation detail is for the data retrived when edge or task is clicked
      show_implementation_details: false,
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
   * this function runs the user input to display the task graph
   */
  handleRunGraphClick() {
    //TODO:: check the graph syntax
    //-- ensure that the value of the input is set
    if(this.state.unprocessed_input){

       let externalThis = this;
       let unprocessed_input = this.state.unprocessed_input;
      //set the isLoading to true
       this.setState({
        show_task_graph: false,
        isLoadingTaskGraph: true
       });

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
   * this function resets the source graph input back to the defualt - clear btn clicked
   */
  handleClearButtonClick(){
      this.setState({
      unprocessed_input: defualt_dedup_input(),
      processed_input: defualt_dedup_input(),
      show_task_graph: false,
      isLoadingTaskGraph: false,
      show_implementation_details: false,
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
                unprocessed_input={this.state.unprocessed_input} 
              />
           {/*    The UI component that holds the display for the task graph and implementation details */}
             <RightPanel 
                processed_input = {this.state.processed_input}
                showImplementationDetails = {() => this.showImplementationDetails()} 
                show_task_graph = {this.state.show_task_graph}
                isLoadingTaskGraph = {this.state.isLoadingTaskGraph}
                show_implementation_details = {this.state.show_implementation_details}
                />

        </div>

      </div>
    );//return

  }//render

}//App

export default App;
