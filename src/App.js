import React, { Component } from "react";
//import logo from './logo.svg';
//import './App.css';
import { Graphviz } from 'graphviz-react';
import { select } from 'd3-selection'

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
 * handle when the compnents finish loading
 */
  componentDidMount() {
     this.handleGraphInteractivity()
   }
/**
 * handle components update
 */
   componentDidUpdate() {
    this.handleGraphInteractivity()
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

  /**
   * handle graph click
   */
  handleGraphInteractivity = () =>{
   
    let nodes = select("g");
    nodes.selectAll("g").on("click", function(){
   
        var node = select(this);
        var text = node.selectAll('text').text();
        var id = node.attr('id');
        var class1 = node.attr('class');
        var dotElement = id.replace(/^a_/, '');
       /*  
       this.super.setState({
          implementation_details: 'You Clicked on :: ' + text
        })   
         */
        document.getElementById("show_implementation").innerHTML = 'You Clicked on :: ' + text
      
    });

  }//handleGraphInteractivity

 


  render() {
    const options = {"fit":true, "height":"200px", "zoom":false};
    return (
          
      <div className="container outerContainer">
        
        <div className="row">

          <div className="col-sm-4">
            <h2>Dot Language</h2>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
            
               <ul className="navbar-nav mr-auto">
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      File
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <a className="dropdown-item" href="#">Open File</a>
                      <a className="dropdown-item" href="#">Open Folder</a>
                      <div className="dropdown-divider"></div>
                      <a className="dropdown-item" href="#">Save</a>
                    </div>
                  </li>
                </ul>
                <ul className="navbar-nav ml-auto"> 
                      <li className="nav-item">
                          <a className="nav-link" id="refresh_input" href="#"><span className="fa fa-repeat"></span></a>
                      </li>  
                      <li className="nav-item">
                          <a className="nav-link" id="run_graph" onClick={() => this.handleRunGraphClick()} href="#"><span className="fa fa-play"></span></a>
                      </li>
                      <li className="nav-item pull-right">
                        <a className="nav-link" id="delete_input" href="#"><span className="fa fa-trash"></span></a>
                      </li>

                </ul>
            </nav>
              <textarea className="letPanel" name="dot_language_input" id="dot_language_input" onChange={this.handleDotLanguageChange} defaultValue={this.state.dot_language_input} ></textarea>      
          
          </div>

          <div className="col-sm-8">
            <h2>Task Graph</h2>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
              <a className="navbar-brand" href="#"></a>
                <ul className="navbar-nav ml-auto">
                  
                  <li className="nav-item">
                    <a className="nav-link" href="#"><span className="fa fa-plus-circle"></span></a>
                  </li>   
                  <li className="nav-item">
                    <a className="nav-link" href="#"><span className="fa fa-minus-circle"></span></a>
                </li>
                </ul>
            </nav>
            <div className="rightPanelTop" align="center">

              <object id = "display_graph"> <Graphviz options={options} dot={this.state.dot_language} end = {()=>this.handleGraphEnd()} /> </object>        
              

            </div>
            <h4>Implementation Details</h4>
            <div className="rightPanelButtom" id="show_implementation">{this.state.implementation_details}</div>
        </div>

        </div>

      </div>
    );
  }
}



export default App;
