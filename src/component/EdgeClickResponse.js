/**
 * this handles the node click action (as a result of the edge result displayed in the implementation detail)
 */
import React, { Component } from 'react';  

class EdgeClickResponse extends Component {  
  constructor(props) {  
    super(props);  
    }//constructor

/**
 * this handles the node click action
 * @param {*} taskName 
 */
handNodeClick = (taskName) => {
    this.props.handleNodeClick(taskName);
  };//handNodeClick

  render() {  
      let taskName = this.props.obj.task.name;
    return (         
        <tr>
            <td>
              {this.props.index + 1}
            </td>
            <td>
              <a href="#" onClick={() => this.handNodeClick(taskName)} > {taskName}</a>
          </td>
        </tr>
    ); //render
  }//render
} //EdgeClickResponse 

export default EdgeClickResponse;