import { get, post } from "../xhr";

export function getData(url){
    return get(url);
}
  
export function setData(url,requestData){
    return post(url, requestData);
}