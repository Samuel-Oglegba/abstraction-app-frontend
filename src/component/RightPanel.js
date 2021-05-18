import React, { useState, useEffect, Component } from "react";
import { Graphviz } from 'graphviz-react';
import { select } from 'd3-selection'
import RightPanelNav from './RightPanelNav';
import NodeClickResponse from './NodeClickResponse';  
import EdgeClickResponse from './EdgeClickResponse';  
import logo from '../logo.svg';
import '../App.css';
import { baseUrl, handleNodeClick, handleEdgeClick } from "../adapter/homeAdapter";

export default class RightPanel extends Component {
    constructor(props){  
        super(props);

      this.state = {
         isLoading: false,
         showNodeResponse: false,
         showEdgeResponse: false,
         nodeResponse: [],
         nodeName:"",
         edgeResponse: [],
         edgeName: ""
       }
       //this.handleGraphInteractivity = this.handleGraphInteractivity.bind(this);   
    } 

/**
 * handle when the compnents finish loading
 */
  componentDidMount() {
    //loadingState();
    this.handleGraphInteractivity();
  }
/**
* handle components update
*/
  componentDidUpdate() {
   this.handleGraphInteractivity();
  }

  /**
   * handle graph click
   */
  handleGraphInteractivity = () =>{
        //get the component state
        let externalThis = this;

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
               
              externalThis.setState({ isLoading: true, showEdgeResponse: false, showNodeResponse: false}); //show loading sign

               if(dotElement.includes("node")){
                  //call method to handle node click
                setTimeout(() => { 
                  handleNodeClick(text)
                  .then(data => {
                      externalThis.setState({ 
                        isLoading: false,
                        showNodeResponse: true,
                        showEdgeResponse: false,
                        nodeResponse: data,
                        nodeName:text
                      }); 
                   })
                   .catch(err => console.log(err));   
                 }, 500);
                          

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
                  setTimeout(() => { 
                      handleEdgeClick(edgeUrl, text)
                      .then(data => {
                        //console.log(data);
                          externalThis.setState({ 
                            isLoading: false,
                            showNodeResponse: false,
                            showEdgeResponse: true,
                            nodeResponse: [],
                            edgeResponse: data,
                            edgeName:text
                          }); 
                      })
                      .catch(err => console.log(err));  
                    }, 500);        

               }//else

          }
          else{
            document.getElementById("show_implementation").innerHTML = 'The edge/node is empty'
          }//else       
      
      });

  }//handleGraphInteractivity

  /////////////////////// NODE OPERAION /////////////////////
  //this method display node result
  displayNodeResult(){

    let externalThis = this;
    return <table className='table table-dark table-bordered'>
       <thead>
        <tr><th colSpan='3'><h4>{externalThis.state.nodeName} <small>(function name)</small></h4></th></tr>
        <tr>
            <th>Communication</th>
            <th>Link</th>
            <th>Operation</th>
        </tr>
      </thead>
      <tbody>
        {  externalThis.state.nodeResponse.map(function(object, i){  
            return <NodeClickResponse handleEdgeClick = {(edgeName,task1, task2) => externalThis.runEdgeClickAction(edgeName,task1,task2)} obj={object} index={i} />;  
          })
        }
      </tbody>
    </table>
     
  }//displayNodeResult

  //handle when an edge is clicked from the node result
  runEdgeClickAction = (edgeName,task1,task2) =>{
        let edgeUrl = baseUrl()+`/api/v1/edge-task/${edgeName}/${task1}/${task2}`;
        let externalThis = this;
        handleEdgeClick(edgeUrl, edgeName)
        .then(data => {
            externalThis.setState({ 
              isLoading: false,
              showNodeResponse: false,
              showEdgeResponse: true,
              nodeResponse: [],
              edgeResponse: data,
              edgeName:edgeName
            }); 
        })
        .catch(err => console.log(err));  
  }//runEdgeClickAction

  /////////////////////// END NODE OPERATION///////////////////////////


  ///////////////////// EDGE OPERATION /////////////////////////
    //this method display's edge result
    displayEdgeResult(){  

      let externalThis = this;
      return <table className='table table-dark table-bordered'>
        <thead>
           <tr>
              <th colSpan="2">
                  <h4> {externalThis.state.edgeName} <small>(Edge Name)</small></h4>
              </th>
            </tr>
          <tr>
              <th>#</th>
              <th>Task Connected</th>
          </tr>
        </thead>
        <tbody>
          {  externalThis.state.edgeResponse.map(function(object, i){  
              return <EdgeClickResponse handleNodeClick = {(nodeName) => externalThis.runNodeClickAction(nodeName)} obj={object} index={i} />;  
            })
          }
        </tbody>
      </table>
      
    }//displayNodeResult

     //handle when a node is clicked from the edge result
     runNodeClickAction = (nodeName) =>{
          // console.log("you clicke on an edge " +nodeName);
          let externalThis = this;
          handleNodeClick(nodeName)
          .then(data => {
              externalThis.setState({ 
                isLoading: false,
                showNodeResponse: true,
                showEdgeResponse: false,
                nodeResponse: data,
                edgeResponse: [],
                nodeName:nodeName
              }); 
          })
          .catch(err => console.log(err)); 
    }//runNodeClickAction


 ///////////////////// END EDGE OPERATION ////////////////////

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
            <div className="rightPanelButtom table-dark" id="show_implementation">
                {/*      {this.props.implementation_details} */}

                {/*  for node respons */}
                {
                  this.state.showNodeResponse ?  this.displayNodeResult()  : ""                
                }

                 {/*  for edge respons */}
                 {
                  this.state.showEdgeResponse ?  this.displayEdgeResult()  : ""                
                }

            {/*     { this.state.isLoading ? <img src={logo} className="App-logo" alt="logo" /> : null} */}
                { this.state.isLoading ? "Loading..." : null}
            </div>
                    
        </div>
    );
  }
}
