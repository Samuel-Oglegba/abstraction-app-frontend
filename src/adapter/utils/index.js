/**
 * This file handles the general api call method
 */
import Axios from "axios";

/**
 * this function returns the Axios instance
 * @returns 
 */
function returnAxiosInstance() {
    //return Axios.create(initializers);
    return Axios.create();
 }//returnAxiosInstance
  
/**
 * this method makes GET http request
 * @param {} url 
 * @returns 
 */
export function get(url){
    const axios = returnAxiosInstance();

    const headers = {
      'Accept':'application/json',
      'Content-Type':'application/json',
      'Authorization': 'JWT fefege...'
    }

    return axios.get(url,headers);

  }//get
  
  /**
   * this method makes POST http request
   * @param {*} url 
   * @param {*} requestData 
   * @returns 
   */
  export function post(url, requestData){
    const axios = returnAxiosInstance();
    const headers = {
      'Accept':'application/json',
      'Content-Type':'application/json',
      'Authorization': 'JWT fefege...'
    }

    return axios.post(url, requestData, headers);

  }//post