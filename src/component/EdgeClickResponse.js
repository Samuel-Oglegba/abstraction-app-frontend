import React, { Component } from 'react';  

class EdgeClickResponse extends Component {  
  constructor(props) {  
    super(props);  
    }  
      
handNodeClick = (taskName) => {
    this.props.handleNodeClick(taskName);
  };

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
    );  
  }  
}  

export default EdgeClickResponse;