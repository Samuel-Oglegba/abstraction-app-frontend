import React, { useEffect, useState, Component } from "react";
//this panel holds the graph source (user input)
import LeftPanel from './component/LeftPanel';
//this pannel holds the task graph and the implementation details
import RightPanel from './component/RightPanel';
import { parseDotLanguageInput } from "./adapter/homeAdapter";

class App extends Component {

  constructor(props){  
    //TODO: add a file to show how things work on the high level
    super(props); 

    //set the initial state  
    this.state = {
      //the pannel input is for saving the user's source of the graph being navigated
      unprocessed_input: this.defualt_input(),
      //the state of the graph being navigated --(updated when the user runs any input change)
      processed_input: "",//this.defualt_input(),
      //the task graph is from the user input - 
      //the task graph can be cleared either by the clear or delete button
      show_task_graph: false,
      //the implementation detail is for the data retrived value when edge or task is clicked
      show_implementation_details: false,
    }//state

  }//constructor

    /**
     * this function returns the default graph input for the dedup application
     * @returns
     */
    defualt_input = () =>{
      return 'digraph G { rankdir="LR";node[shape="box"] '
      +'Fragment -> FragmentRefine[label="refine_que : queue"]'
      +'FragmentRefine -> Deduplicate[label="deduplicate_que : queue"]'
      + 'Deduplicate -> Compress[label="compress_que : queue"]'
      + 'Deduplicate -> Reorder[label="reorder_que : queue"]'
      + 'Reorder -> Compress[label="reorder_que : queue"]} ';
    }//defualt_input

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
     /*  this.setState({
        processed_input: this.state.unprocessed_input,
        show_task_graph: true,
       })  */
       let externalThis = this;
       let unprocessed_input = this.state.unprocessed_input;

       setTimeout(() => { 
        parseDotLanguageInput(unprocessed_input)
        .then(data => {
            if(data){
                externalThis.setState({ 
                  processed_input: unprocessed_input,
                  show_task_graph: true,
                }); 
            }//if          
         })
         .catch(err => console.log(err));   
       }, 500);
       
    }//if

  }//handleRunGraphClick

  /**
   * this function resets the source graph input back to the defualt - clear btn clicked
   */
  handleClearButtonClick(){
      this.setState({
      unprocessed_input: this.defualt_input(),
      processed_input: this.defualt_input(),
      show_task_graph: false,
      show_implementation_details: false,
    })
  }//handleClearButtonClick

  /**
   * this function removes all inputs and results from the interface - delete btn clicke
   */
  handleDeleteButtonClick(){
    this.setState({
      unprocessed_input: "",
      processed_input: "",
      show_task_graph: false,
      show_implementation_details: false,
    })
}//handleDeleteButtonClick

 /**
  * this function allows the implementation details to be displayed to the user after clicking on an edge or node
  */
 showImplementationDetails(){
  this.setState({
    show_implementation_details: true,
  })
}//showImplementationDetails

render() {
    return (
          
      <div className="container outerContainer">
        
        <div className="row">
            <LeftPanel 
                handleRunGraphClick = {() => this.handleRunGraphClick()} 
                handleClearButtonClick = {() => this.handleClearButtonClick()} 
                handleDeleteButtonClick = {() => this.handleDeleteButtonClick()} 
                handleUserInputChange={this.handleUserInputChange}
                unprocessed_input={this.state.unprocessed_input} 
              />

             <RightPanel 
                processed_input = {this.state.processed_input}
                showImplementationDetails = {() => this.showImplementationDetails()} 
                show_task_graph = {this.state.show_task_graph}
                show_implementation_details = {this.state.show_implementation_details}
                />

        </div>

      </div>
    );
  }
}

export default App;
