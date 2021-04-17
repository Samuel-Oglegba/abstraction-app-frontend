import Axios from "axios";

function returnAxiosInstance() {
    //return Axios.create(initializers);
    return Axios.create();
  }
  
  export function get(url){
    const axios = returnAxiosInstance();

    const headers = {
      'Accept':'application/json',
      'Content-Type':'application/json',
      'Authorization': 'JWT fefege...'
    }

    return axios.get(url,headers);

  }
  
  export function post(url, requestData){
    const axios = returnAxiosInstance();
    const headers = {
      'Accept':'application/json',
      'Content-Type':'application/json',
      'Authorization': 'JWT fefege...'
    }

    return axios.post(url, requestData, headers);
  }