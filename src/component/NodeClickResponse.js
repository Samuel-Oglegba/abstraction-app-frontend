import React, { Component } from 'react';  

class NodeClickResponse extends Component {  
  constructor(props) {  
    super(props);  
    }  
      
    //handle edge click action
handleEdgeClick = (edgeName, task1, task2) => {
    this.props.handleEdgeClick(edgeName,task1,task2);
  };//handleEdgeClick

  //handle node click action
  handNodeClick = (taskName) => {
    this.props.handleNodeClick(taskName);
  };//handNodeClick

  handleAbstractTypeClick = (operation) => {
    alert("Abstract-Type-Operation::" + operation);
  };//handleAbstractTypeClick

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
        </tr>
    );  
  }  
}  

export default NodeClickResponse;