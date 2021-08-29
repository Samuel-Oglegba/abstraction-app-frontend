/*
*This handles the RightPanel UI component (Task graph display and Implementation details)
**the RightPanelNav handles the navigation UI component and corresponding actions
**the NodeClickResponse and EdgeClickResponse handles the node and edge click action respectively
*/
import React, { useState, useEffect, Component } from "react";
//external libraries
import { Graphviz } from 'graphviz-react';
import { select } from 'd3-selection'
//custom components and utils
import RightPanelNav from './RightPanelNav';
import NodeClickResponse from './NodeClickResponse';  
import EdgeClickResponse from './EdgeClickResponse';  
import { baseUrl, handleNodeClick, handleEdgeClick, splitByColon } from "../adapter/homeAdapter";

export default class RightPanel extends Component {

   constructor(props){  
      super(props);
      //set the initial state
      this.state = {
         isLoading: false,
         showNodeResponse: false,
         showEdgeResponse: false,
         nodeResponse: [],
         nodeName:"",
         edgeResponse: [],
         edgeName: ""
       } 

    }//constructor

/**
 * handle when the compnents finish loading
 */
  componentDidMount() {
    //loadingState();
    this.handleGraphInteractivity();
  }//componentDidMount

/**
* handle components update
*/
  componentDidUpdate() {
    this.handleGraphInteractivity();
  }//componentDidUpdate

  /**
   * this method handles when the implementation details should display
   */
  showImplementationDetails = () => {
    this.props.showImplementationDetails();
  };

/**
 * this function sets the state of the GUI when a node or edge is clicked on
 * @param {*} theThis 
 * @param {*} displayNodeResponse 
 * @param {*} theNodeName 
 * @param {*} nodeResponseData 
 * @param {*} displayEdgeResponse 
 * @param {*} theEdgeName 
 * @param {*} edgeResponseData 
 */
  setStateWhenNodeOrEdgeIsClick = (theThis, 
        displayNodeResponse, theNodeName, nodeResponseData,
        displayEdgeResponse, theEdgeName, edgeResponseData) =>{

    theThis.setState({ 
       isLoading: false,
       showNodeResponse: displayNodeResponse,
       showEdgeResponse: displayEdgeResponse,
       nodeResponse: nodeResponseData,
       nodeName:theNodeName,
       showEdgeResponse:displayEdgeResponse,
       edgeResponse: edgeResponseData,
       edgeName: theEdgeName

     });//setState

 }//setStateWhenNodeOrEdgeIsClick

  /**
   * handle task graph click action/intaraction
   */
  handleGraphInteractivity = () =>{
        //get the component state
        let externalThis = this;
        let nodes = select("g");
        nodes.selectAll("g").on("click", function(){
        let node = select(this);
          //ensure the node/edge is not empty
          if(!node.selectAll('text').empty()){
              let text = node.selectAll('text').text(); //node or edge name
              let id = node.attr('id');//let class1 = node.attr('class');              
              let dotElement = id.replace(/^a_/, '');             
              externalThis.setState({ isLoading: true, showEdgeResponse: false, showNodeResponse: false});  //show loading sign

               if(dotElement.includes("node")){
                  //call method to handle node click
                  externalThis.runNodeClickAction(text)        
               }//if
               else{                                
                  let theEdgeName = splitByColon(text); //split the title into respective task
                  let title = node.select("title").text(); //get the title of the edge and nodes              
                  let taskArray = title.includes("->") ? title.split('->'): title.split('--'); //get the node related to the edge
                  //call the edge click action function
                  externalThis.runEdgeClickAction(theEdgeName,taskArray[0],taskArray[1]);      
               }//else
          }//if
          else{
            document.getElementById("show_implementation").innerHTML = 'The edge/node is empty'
          }//else       
      });//selectAll
  }//handleGraphInteractivity

  /**
   * handle when an edge is clicked on
   * @param {*} edgeName 
   * @param {*} task1 
   * @param {*} task2 
   */
  runEdgeClickAction = (edgeName,task1,task2) =>{
        let edgeUrl = baseUrl()+`/api/v1/edge-task/${edgeName}/${task1}/${task2}`;
        let externalThis = this;        
        externalThis.setState({ isLoading: true, showEdgeResponse: false, showNodeResponse: false}); //show loading sign

      setTimeout(() => { 
        handleEdgeClick(edgeUrl, edgeName).then(data => {
            externalThis.setStateWhenNodeOrEdgeIsClick(externalThis,false,"",[],true,edgeName,data); //set the state 
             externalThis.showImplementationDetails();//show the implementation detail
        })
        .catch(err => console.log(err));}, 500);   
  }//runEdgeClickAction

  /**
  * handle when a node is clicked on
  * @param {*} nodeName 
  */
  runNodeClickAction = (nodeName) =>{
      let externalThis = this;
      externalThis.setState({ isLoading: true, showEdgeResponse: false, showNodeResponse: false}); //show loading sign
      
    setTimeout(() => { 
      handleNodeClick(nodeName)
      .then(data => {
          externalThis.setStateWhenNodeOrEdgeIsClick(externalThis,true,nodeName,data,false,"",[]);//set the state  
            //show the implementation detail
            externalThis.showImplementationDetails();
      })
      .catch(err => console.log(err));}, 500);   

  }//runNodeClickAction
  
  /**
   * this method display node result
   * @returns 
   */
  displayNodeResult(){
    let externalThis = this;
    return (<table className='table table-dark table-bordered'>
       <thead>
        <tr>
            <th colSpan='3'>
                <h4>{externalThis.state.nodeName} <small>(function name)</small></h4>
            </th>
        </tr>
        <tr>
          <th>Communication</th><th>Task Link</th><th>Abstract Type</th>
        </tr>
      </thead>
      <tbody>
        {  externalThis.state.nodeResponse ? externalThis.state.nodeResponse.map(function(object, i){  
            return <NodeClickResponse key={i} handleEdgeClick = {(edgeName,task1, task2) => externalThis.runEdgeClickAction(edgeName,task1,task2)} 
            handleNodeClick = {(nodeName) => externalThis.runNodeClickAction(nodeName)}
            obj={object} index={i} />;  
          }) : "Something went south..."
        }
      </tbody>
    </table>
     )//return
  }//displayNodeResult

    /**
     * this method display's edge result
     * @returns 
     */
    displayEdgeResult(){  
      let externalThis = this;
      return (<table className='table table-dark table-bordered'>
        <thead>
           <tr>
              <th colSpan="2">
                  <h4> {externalThis.state.edgeName} <small>(Edge Name)</small></h4>
              </th>
            </tr>
          <tr>
              <th>#</th><th>Task Connected</th>
          </tr>
        </thead>
        <tbody>
          {  externalThis.state.edgeResponse ? externalThis.state.edgeResponse.map(function(object, i){  
              return <EdgeClickResponse key={i} handleNodeClick = {(nodeName) => externalThis.runNodeClickAction(nodeName)} obj={object} index={i} />;  
            }) : "Something went south..."
          }
        </tbody>
      </table>
      )//return      
    }//displayNodeResult


  render() {
    const options = { "fit":false, scale:1, "height":"200px", width: null, "zoom":false, "zoomScaleExtent":[0,1,10] };
    let show_implementation_detail = this.props.show_implementation_details;
    let show_task_graph = this.props.show_task_graph;
    let isLoadingTaskGraph = this.props.isLoadingTaskGraph;

    return (
        <div className="col-sm-8">
        <h2>Task Graph</h2>
          <RightPanelNav />

             <div className="rightPanelTop" align="center">
               {
                isLoadingTaskGraph 
                ? "loading..." 
                : (show_task_graph ? <object id = "display_graph"> <Graphviz options={options} dot={this.props.processed_input} /></object>: "" )

                }
            </div>

            <h4>Implementation Details</h4>
            <div className="rightPanelButtom table-dark" id="show_implementation">

                { this.state.isLoading ? "Loading..." : null}
                
                {/*  for node respons */}
                {
                  this.state.showNodeResponse && show_implementation_detail ?  this.displayNodeResult()  : ""                
                }

                 {/*  for edge respons */}
                 {
                  this.state.showEdgeResponse && show_implementation_detail ?  this.displayEdgeResult()  : ""                
                 }

               {/* { this.state.isLoading ? <img src={logo} className="App-logo" alt="logo" /> : null} */}
               
            </div>
                    
        </div>

    );//return

  }//render

}//RightPanel
