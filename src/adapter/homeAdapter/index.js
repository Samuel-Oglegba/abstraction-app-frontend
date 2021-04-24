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
  return get(url);
}//getData
  
//this method calls the post method
export function setData(url,requestData){
    return post(url, requestData);
}//setData

export function sleeper (ms){
    return function(x) {
      return new Promise(resolve => setTimeout(() => resolve(x), ms));
    };
  }

  export function loadingState (theState){
    return  this.state = {
        isLoading: theState
      };
  }

  