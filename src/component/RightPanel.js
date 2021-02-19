import React, { Component } from "react";
import { Graphviz } from 'graphviz-react';
import { select } from 'd3-selection'
import RightPanelNav from './RightPanelNav';

export default class RightPanel extends Component {
    constructor(props){  
        super(props);  
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
        var text = node.selectAll('text').text();
        var id = node.attr('id');
        var class1 = node.attr('class');
        var dotElement = id.replace(/^a_/, '');

        /**
         * TODO::: carry out code abstraction request here
         */
        //temporary display of what you clicked on
        document.getElementById("show_implementation").innerHTML = 'You Clicked on :: ' + text
      
    });

  }//handleGraphInteractivity

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
            <div className="rightPanelButtom" id="show_implementation">{this.props.implementation_details}</div>
                    
        </div>
    );
  }
}
