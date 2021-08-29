/**
 * This file holds all the helper functions and general utils for the GUI
 */
import { get, post } from "../utils";

/**
 * this function returns the base url based on the environment
 * @returns 
 */
export function baseUrl(){
  let appMode = "DEV";
  
  if(appMode == "DEV"){
    return `http://localhost:8060`;
  }//dev
  else if(appMode == "TEST"){
    return `http://128.198.162.140:8085`;
  }//test environment
  else{
    return `http://localhost:8085`;
  }//production
    
}//baseUrl

/**
 * this function calls the get method
 * @param {*} url 
 * @returns 
 */
export function getData(url){
  return    get(url);   
}//getData
  
/**
 * this method calls the post method
 * @param {*} url 
 * @param {*} requestData 
 * @returns 
 */
export function postData(url,requestData){
    return post(url, requestData);
}//setData

/**
 * this method parses the dot language input when run button is clicked on 
 * @param {*} dotLanguageInput 
 * @returns 
 */
export function parseDotLanguageInput (dotLanguageInput){
   let nodeUrl = baseUrl()+`/api/v1/draw-graph`;
   let dotInput = {"userId":1,"dotInput": dotLanguageInput}

   const theRes = 
   postData(nodeUrl,dotInput)
    .then(res => {
      return res.data;    
    })//getData
    .catch(error => { 
        if (error.response) {
          return error.response.data.error;
        }
    });//catch

    return theRes;
    
}//parseDotLanguageInput

/**
 * this mothod handles node click action call
 * @param {*} nodeName 
 * @returns 
 */
export function handleNodeClick (nodeName){

   let nodeUrl = baseUrl()+`/api/v1/operation-task/${nodeName}`;

   const theRes = 
   getData(nodeUrl)
    //.then(sleeper(5000))
    .then(res => {
      return res.data;    
    })//getData
    .catch(error => { 
      //document.getElementById("show_implementation").innerHTML = "";
        if (error.response) {
          return error.response.data.error;
        }
    });//catch

    return theRes;

}//handleNodeClick

/**
 * this method handles edge click action
 * @param {*} edgeUrl 
 * @param {*} edgeName 
 * @returns 
 */
export function handleEdgeClick (edgeUrl, edgeName){

    const theRes =  getData(edgeUrl)
      .then(res => {
        return res.data;
      })//getData
      .catch(error => { 
          if (error.response) {
            return error.response.data.error;
          }
      });//catch

      return theRes;

}//handleEdgeClick

/**
 * this returns the default dot language for dedup application
 */
export function defualt_dedup_input() {
  return 'digraph G { rankdir="LR";node[shape="box"] '
      +'Fragment -> FragmentRefine[label="refine_que : queue"]'
      +'FragmentRefine -> Deduplicate[label="deduplicate_que : queue"]'
      + 'Deduplicate -> Compress[label="compress_que : queue"]'
      + 'Deduplicate -> Reorder[label="reorder_que : queue"]'
      + 'Reorder -> Compress[label="reorder_que : queue"]} ';  
}//defualt_dedup_input

/**
 * split a text by colon
 * @param {*} text 
 * @returns 
 */
export function splitByColon(text) {
    let res = "";
    if(text.includes(":")){
      res = text.split(':');
      res = res[0].trim();
    }
    else{
      res = text;
    }
    return res.toUpperCase();
}//splitByColon

export function sleeper (ms){
    return function(x) {
      return new Promise(resolve => setTimeout(() => resolve(x), ms));
    };
  }

  export function loadingState (){
    return  this.state = {
        isLoading: false
      };
  }

  