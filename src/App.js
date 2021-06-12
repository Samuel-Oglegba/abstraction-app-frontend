import React, { useEffect, useState, Component } from "react";
//this panel holds the graph source (user input)
import LeftPanel from './component/LeftPanel';
//this pannel holds the task graph and the implementation details
import RightPanel from './component/RightPanel';

class App extends Component {

  constructor(props){  
    //TODO: add a file to show how things work on the high level
    super(props); 

    //set the initial state  
    this.state = {
      //the pannel input is for saving the user's source of the graph being navigated
      user_input_graph: this.defualt_input(),
      //the state of the graph being navigated --(updated when the user runs any input change)
      source_of_graph: this.defualt_input(),
      //the task graph is from the user input - 
      //the task graph can be cleared either by the clear or delete button
      show_task_graph: true,
      //the implementation detail is for the data retrived value when edge or task is clicked
      show_implementation_details: false,
    }//state

  }//constructor

    /**
     * this function returns the default graph input for the dedup application
     * @returns
     */
    defualt_input = () =>{
      return 'digraph G {rankdir="LR";node[shape="box"]; '
      + ' Fragment -> FragmentRefine[label="refine_que : queue"];'
      + ' FragmentRefine -> Deduplicate[label="deduplicate_que : queue"]'
      + ' Deduplicate -> Compress[label="compress_que : queue"]'
      + ' Deduplicate -> Reorder[label="reorder_que : queue"]'
      + ' Reorder -> Compress[label="reorder_que : queue"]'
      + ' }';
    }//defualt_input

   /**
   * this function handles user graph source changes
   */
  handleUserInputChange = (event) =>{
    this.setState({
      user_input_graph: event.target.value
     }) 
  }//handleUserInputChange
  
  /**
   * this function runs the user input to display the task graph
   */
  handleRunGraphClick() {
    //TODO:: check the graph syntax
    //-- ensure that the value of the input is set
    if(this.state.user_input_graph){
      this.setState({
        source_of_graph: this.state.user_input_graph,
        show_task_graph: true,
       })  
    }//if

  }//handleRunGraphClick

  /**
   * this function resets the source graph input back to the defualt - clear btn clicked
   */
  handleClearButtonClick(){
      this.setState({
      user_input_graph: this.defualt_input(),
      source_of_graph: this.defualt_input(),
      show_task_graph: false,
      show_implementation_details: false,
    })
  }//handleClearButtonClick

  /**
   * this function removes all inputs and results from the interface - delete btn clicke
   */
  handleDeleteButtonClick(){
    this.setState({
      user_input_graph: "",
      source_of_graph: "",
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
                user_input_graph={this.state.user_input_graph} 
              />

             <RightPanel 
                source_of_graph = {this.state.source_of_graph}
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
