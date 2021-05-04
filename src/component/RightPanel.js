import React, { useState, useEffect, Component } from "react";
import { Graphviz } from 'graphviz-react';
import { select } from 'd3-selection'
import RightPanelNav from './RightPanelNav';
import logo from '../logo.svg';
import '../App.css';

import { getData, baseUrl, sleeper } from "../adapter/homeAdapter";

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

        //console.log(select("svg"));

            //ensure the node/edge is not empty
          if(!node.selectAll('text').empty()){

              var text = node.selectAll('text').text();
              var id = node.attr('id');
              //var class1 = node.attr('class');              
              var dotElement = id.replace(/^a_/, '');

              //console.log(title);
              //document.getElementById("show_implementation").innerHTML = 'You Clicked on :: ' + text
              // this.makeAPICall(text);
              //for nodes
               let nodeUrl = baseUrl()+`/api/v1/operation-task/${text}`;
               
               if(dotElement.includes("node")){

                  getData(nodeUrl)
                  //.then(sleeper(5000))
                  .then(res => {
                   // console.log(res);
                   // console.log(res.data);

                    let taskName = res.data[0].task.name;
                    let operation = "";//res.data.operation.name;
                    let communication = "";//res.data.communication.variableName;

                    let table = "<br><table class='table table-dark table-bordered '>";
                    table += `<tr><thead><th colspan='2'>Funcition: ${text}</th></tr></thead>`;
                    table += "<tr><thead><th>Operation</th><th>Communication</th></tr></thead>";
                    table += "  <tbody>";
                    res.data.forEach(function(value, index){
                     table += `<tr><td>`+value.operation.name+`</td><td><a href="#" onclick="return alert('clicked on the edge ${taskName}')">`+value.communication.variableName+"</a></td></tr>";
                    });
                    table += "  </tbody>";
                    table += "</table>";
                    
                    //let displayData = `Function: ${text}</br> Operation: ${operation}</br> Communication: ${communication}`;
                   // let displayData = `${table}`;
                    document.getElementById("show_implementation").innerHTML = table;
                  
                  })//getData
                  .catch(error => { 
                    //console.log(error);
                    document.getElementById("show_implementation").innerHTML = "";
                      if (error.response) {
                        //console.log(error.response.data);//console.log(error.response.status);//console.log(error.response.headers);
                        document.getElementById("show_implementation").innerHTML = error.response.data.error;
                      }
                  });//catch
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
                //console.log(edgeUrl)

                getData(edgeUrl)
                .then(res => {
                  //console.log(res.data);

                  let table = "<br><table class='table table-dark table-bordered '>";
                  table += `<tr><thead><th>Edge Name: ${text}</th></tr></thead>`;
                  table += "<tr><thead><th>Task</th></tr></thead>";
                  table += "  <tbody>";

                  //TODO: change to the proper code for picking just the two edges involved
                  
                  res.data.forEach(function(value, index){
                   let taskName = value.task.name;

                   //if (index < 2 ) {
                    table += `<tr><td><a href="#" onclick="return alert('clicked on the node ${taskName}')">`+taskName+`</a></td></tr>`;  
                   //}
                               
                  });

                  table += "  </tbody>";
                  table += "</table>";

                   //for edges
                  //document.getElementById("show_implementation").innerHTML = 'You Clicked on the Edge :: ' + text
                  document.getElementById("show_implementation").innerHTML = table;
                  //document.getElementById ("show_implementation").addEventListener ("click", getData, false);
                      
                })//getData
                .catch(error => { 
                  //console.log(error);
                  //document.getElementById("show_implementation").innerHTML = "";
                    if (error.response) {
                      //console.log(error.response.data);//console.log(error.response.status);//console.log(error.response.headers);
                      document.getElementById("show_implementation").innerHTML = error.response.data.error;

                    }
                });//catch
                

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
        getData(`http://128.198.162.140:8085/api/v1/operation-task/${taskName}` )
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
