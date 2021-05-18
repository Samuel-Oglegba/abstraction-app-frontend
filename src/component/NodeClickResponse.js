import React, { Component } from 'react';  

class NodeClickResponse extends Component {  
  constructor(props) {  
    super(props);  
    }  
      
handleEdgeClick = (edgeName, task1, task2) => {
    this.props.handleEdgeClick(edgeName,task1,task2);
  };

  render() {  
      let edgeName = this.props.obj.communication.variableName;
      let task1 = this.props.obj.task.name;
      let task2 = this.props.obj.task2.name;
      const connector = "->";

    return (         
        <tr>
           <td>
                <a href="#" onClick={() => this.handleEdgeClick(edgeName, task1, task2)} >
                    {edgeName}
                </a>
            </td>
            <td>
                {task1} {connector} {task2}
            </td>
            <td>
                {this.props.obj.operation.name}
            </td>           
        </tr>
    );  
  }  
}  

export default NodeClickResponse;