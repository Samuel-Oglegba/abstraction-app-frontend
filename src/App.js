import React, { Component } from "react";
import LeftPanel from './component/LeftPanel';
import RightPanel from './component/RightPanel';

class App extends React.Component {

  constructor(props){  
    super(props);  
     //set the initial state
      this.state = {

        dot_language_input: "digraph {A ->B [label=a_b]}",
        dot_language: "digraph {A ->B [label=a_b]}",
        implementation_details: "",

      }
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
    
       this.setState({
        dot_language: this.state.dot_language_input
       })   

  }//handleRunGraphClick



  render() {
    return (
          
      <div className="container outerContainer">
        
        <div className="row">
            <LeftPanel 
                handleRunGraphClick = {() => this.handleRunGraphClick()} 
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
