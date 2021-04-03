import { get, post } from "../xhr";

export function getData(url){
    return get(url);
}
  
export function setData(url,requestData){
    return post(url, requestData);
}

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