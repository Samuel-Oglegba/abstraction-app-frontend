import React, { useState, useEffect, Component } from "react";
import { Graphviz } from 'graphviz-react';
import { select } from 'd3-selection'
import RightPanelNav from './RightPanelNav';
import logo from '../logo.svg';
import '../App.css';

import { baseUrl, handleNodeClick, handleEdgeClick } from "../adapter/homeAdapter";

export default class RightPanel extends Component {
    constructor(props){  
        super(props);

      this.state = {
         isLoading: true
       }
   
    } 

/**
 * handle when the compnents finish loading
 */
  componentDidMount() {
    //loadingState();
    this.handleGraphInteractivity();
    this.handleGraphNodeAndEdgeInteractivity();
  }
/**
* handle components update
*/
  componentDidUpdate() {
   this.handleGraphInteractivity();
   this.handleGraphNodeAndEdgeInteractivity();
  }

  /**
   * handle graph click
   */

  handleGraphInteractivity = () =>{

        let nodes = select("g");
        nodes.selectAll("g").on("click", function(){
   
        var node = select(this);

        //console.log(select("svg"));

            //ensure the node/edge is not empty
          if(!node.selectAll('text').empty()){

              var text = node.selectAll('text').text();
              var id = node.attr('id');
              //var class1 = node.attr('class');              
              var dotElement = id.replace(/^a_/, '');
               
               if(dotElement.includes("node")){

                  //call method to handle node click
                  handleNodeClick(text);

               }//if
               else{

                 //get the title of the edge
                  var title = node.select("title").text();

                  //split the title into respective task
                  let edgeName;
                  if(text.includes(":")){
                    edgeName = text.split(':');
                    edgeName = edgeName[0].trim();
                  }
                  else{
                    edgeName = text;
                  }

                  let taskArray = title.includes("->") ? title.split('->'): title.split('--');

                  let edgeUrl = baseUrl()+`/api/v1/edge-task/${edgeName}/${taskArray[0]}/${taskArray[1]}`;
                
                  //call method to handle edge click action
                  handleEdgeClick(edgeUrl, text);

               }//else
           
          }
          else{
            document.getElementById("show_implementation").innerHTML = 'The edge/node is empty'
          }//else
       
      
      });

  }//handleGraphInteractivity


  handleGraphNodeAndEdgeInteractivity = () =>{

      var elements = document.getElementsByClassName("nodeClick");

      var myFunction = function() {
          var attribute = this.getAttribute("data-myattribute");
          alert(attribute);
      };
      
      for (var i = 0; i < elements.length; i++) {
          elements[i].addEventListener('click', function(){
            alert("test")
          }, false);
      }

  }//handleGraphNodeAndEdgeInteractivity

  render() {
    const options = {"fit":true, "height":"200px", "zoom":false};

    return (
        <div className="col-sm-8">
        <h2>Task Graph</h2>
          <RightPanelNav />

             <div className="rightPanelTop" align="center">
               <object id = "display_graph"> <Graphviz options={options} dot={this.props.dot_language} /> </object>        
            </div>

            <h4>Implementation Details</h4>
            <div className="rightPanelButtom" id="show_implementation">
                {this.props.implementation_details}
                { this.state.isLoading ? <img src={logo} className="App-logo" alt="logo" /> : null}
            </div>
                    
        </div>
    );
  }
}
