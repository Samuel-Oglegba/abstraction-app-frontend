import React, { useEffect, useState, Component } from "react";
import LeftPanel from './component/LeftPanel';
import RightPanel from './component/RightPanel';

class App extends Component {

  constructor(props){  
    super(props);  
     //set the initial state
  
      this.state = {
       // dot_language_input: "digraph {A ->B [label=a_b]}",
        dot_language_input: this.dot_language_default(),
       // dot_language: "digraph {A ->B [label=a_b]}",
        dot_language: this.dot_language_default(),
        implementation_details: "",
      }
  }  

  /**
   * this function returnsthe default dot language for the dedup application
   * @returns
   */
  dot_language_default = () =>{
    return 'digraph G {rankdir="LR";node[shape="box"]; '
    + ' Fragment -> FragmentRefine[label="refine_que : queue"];'
    + ' FragmentRefine -> Deduplicate[label="deduplicate_que : queue"]'
    + ' Deduplicate -> Compress[label="compress_que : queue"]'
    + ' Deduplicate -> Reorder[label="reorder_que : queue"]'
    + ' Reorder -> Compress[label="reorder_que : queue"]'
    + ' }';
  }

   /**
   * handle text change input
   */
  handleDotLanguageChange = (event) =>{
    this.setState({
      dot_language_input: event.target.value
     })  

  }//handleDotLanguageChange
  
  /**
   * handle run graph click
   */
  handleRunGraphClick() {
    //ensure that the value of the input is set
    if(this.state.dot_language_input){
      this.setState({
        dot_language: this.state.dot_language_input
       })  
    }
      

  }//handleRunGraphClick

  /**
   * handle when the user clickes on the clear button
   */
  handleClearButtonClick(){
      this.setState({
       dot_language_input: this.dot_language_default(),
       dot_language: this.dot_language_default(),
       implementation_details: "",
     })   
  }

  render() {
    return (
          
      <div className="container outerContainer">
        
        <div className="row">
            <LeftPanel 
                handleRunGraphClick = {() => this.handleRunGraphClick()} 
                handleClearButtonClick = {() => this.handleClearButtonClick()} 
                handleDotLanguageChange={this.handleDotLanguageChange}
                dot_language_input={this.state.dot_language_input} 
              />

             <RightPanel 
                dot_language = {this.state.dot_language}
                implementation_details = {this.state.implementation_details}
                />

        </div>

      </div>
    );
  }
}

export default App;
