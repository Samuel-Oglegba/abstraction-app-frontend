import React, { Component } from "react";

export default class RightPanelNav extends Component {
    constructor(props){  
        super(props);  
      } 

  render() {
    return (
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
            <a className="navbar-brand" href="#"></a>
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a className="nav-link" href="#"><span className="fa fa-plus-circle"></span></a>
                </li>   
                <li className="nav-item">
                    <a className="nav-link" href="#"><span className="fa fa-minus-circle"></span></a>
                </li>
            </ul>
       </nav>          
    );
  }
}
