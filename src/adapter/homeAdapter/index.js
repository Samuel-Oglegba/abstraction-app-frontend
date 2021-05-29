import { get, post } from "../xhr";

//this function returns the base url based on the environment
export function baseUrl(){
  let appMode = "TEST";
  
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

//this function calls the get method
export function getData(url){
  return    get(url);   
}//getData
  
//this method calls the post method
export function setData(url,requestData){
    return post(url, requestData);
}//setData

//this mothod handles node click action call
export function handleNodeClick (text){

   let nodeUrl = baseUrl()+`/api/v1/operation-task/${text}`;
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

//this method handles edge click action
export function handleEdgeClick (edgeUrl, text){

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

  