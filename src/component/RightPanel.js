import React, { useState, useEffect, Component } from "react";
import { Graphviz } from 'graphviz-react';
import { select } from 'd3-selection'
import RightPanelNav from './RightPanelNav';
import logo from '../logo.svg';
import '../App.css';

import { getData, sleeper } from "../adapter/homeAdapter";

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
    this.handleGraphInteractivity();
  }
/**
* handle components update
*/
  componentDidUpdate() {
   this.handleGraphInteractivity()
  }

  /**
   * handle graph click
   */

  handleGraphInteractivity = () =>{

        let nodes = select("g");
        nodes.selectAll("g").on("click", function(){
   
            var node = select(this);

            //ensure the node/edge is not empty
          if(!node.selectAll('text').empty()){

              var text = node.selectAll('text').text();
              var id = node.attr('id');
              var class1 = node.attr('class');
              var dotElement = id.replace(/^a_/, '');

              //console.log(id);
              //document.getElementById("show_implementation").innerHTML = 'You Clicked on :: ' + text
             // this.makeAPICall(text);
             //for nodes
               if(id.includes("node")){

                  getData(`http://localhost:8085/api/v1/operation-task/${text}` )
                  //.then(sleeper(5000))
                  .then(res => {
                    //console.log(res);
                    //console.log(res.data);
                    let taskName = res.data.task.name;
                    let operation = res.data.operation.name;
                    let communication = res.data.communication.variableName;

                    let displayData = `Function: ${text}</br> Operation: ${operation}</br> Communication: ${communication}`;

                    document.getElementById("show_implementation").innerHTML = displayData;
                  
                  })
                  .catch(error => { 
                    //console.log(error);
                    document.getElementById("show_implementation").innerHTML = "";
                      if (error.response) {
                        //console.log(error.response.data);//console.log(error.response.status);//console.log(error.response.headers);
                        document.getElementById("show_implementation").innerHTML = error.response.data.error;
                      }
                  });
               }
               else{

                 //for edges
                 document.getElementById("show_implementation").innerHTML = 'You Clicked on the Edge :: ' + text

               }//else
           
          }
          else{
            document.getElementById("show_implementation").innerHTML = 'The edge/node is empty'
          }//else
       
      
      });

  }//handleGraphInteractivity

  makeAPICall = (taskName) => {
      //for test purpose
      try {
        getData(`http://localhost:8085/api/v1/operation-task/${taskName}` )
          .then(res => {
            //console.log(res);
            console.log(res.data);
          })
          .catch(error => { 
            console.log(error);
          });

      } catch (e) {
        console.log(`Axios request failed: ${e}`);
      }

  }//makeAPICall

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
