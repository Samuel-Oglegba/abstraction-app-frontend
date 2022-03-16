/**
 * this handles node and edge click actions in the implementation details panel
 */
import React, { Component } from 'react';  

class NodeClickResponse extends Component {  
  constructor(props) {  
    super(props);  
    }//constructor
      
/**
 * handle edge click action
 * @param {*} edgeName 
 * @param {*} task1 
 * @param {*} task2 
 */
handleEdgeClick = (edgeName, task1, task2) => {
    this.props.handleEdgeClick(edgeName,task1,task2);
  };//handleEdgeClick

  /**
   * handle node click action
   * @param {*} taskName 
   */
  handNodeClick = (taskName) => {
    this.props.handleVulInfoClick(taskName);
  };//handNodeClick

  /**
   * handles when abstract type is clicked on
   * TODO: implement the dynamic response
   * @param {*} operation 
   */
  handleAbstractTypeClick = (operation) => {
    let operation_reverse = operation == "POP" ? "PUSH" : "POP";
    alert("Abstract-Type-Operation:: " + operation + " -> " + operation_reverse );
  };//handleAbstractTypeClick

  //////////// VULNERABILITY INFORMATION //////////////////////
  /**
   * handles when vulnerability information is clicked on
   * @param {*} edgeName 
   * @param {*} task1 
   * @param {*} task2 
   */
  handleVulInfoClick = (edgeName, task1, task2) =>{
    this.props.handleVulInfoClick(edgeName,task1,task2);
  };//handleVulInfoClick

  //////////////////////// END VULNERABILITY INFORMATION //////////////////


  /**
   * displays the UI component
   * @returns 
   */
  render() {  
      let data = this.props.obj;
      let edgeName = data.communication.variableName;
      let task1 = data.task.name;
      let task2 = data.task2.name;
      let operation = data.operation.name;
      const connector = "->";

    return (         
        <tr>
           <td>
                <a href="#" onClick={() => this.handleEdgeClick(edgeName, task1, task2)} >
                    {edgeName}
                </a>
            </td>
            <td>
                <a href="#" onClick={() => this.handNodeClick(task1)} > {task1} </a> 
                {connector} 
                <a href="#" onClick={() => this.handNodeClick(task2)} >{task2} </a>
            </td>
           <td>
                <a href="#" onClick={() => this.handleAbstractTypeClick(operation)} > {data.abstractType.name} </a>
            </td> 
            <td>
                <button type="button" class="btn btn-danger" onClick={() => this.handleVulInfoClick(edgeName, task1, task2)}  >vul. info</button>
            </td>           
        </tr>
    );//return
  }//render
}//NodeClickResponse

export default NodeClickResponse;