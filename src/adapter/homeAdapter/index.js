import { get, post } from "../xhr";

//this function returns the base url based on the environment
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

//this function calls the get method
export function getData(url){
  return get(url);
}//getData
  
//this method calls the post method
export function setData(url,requestData){
    return post(url, requestData);
}//setData

//this mothod handles node click action call
export function handleNodeClick (text){

   let nodeUrl = baseUrl()+`/api/v1/operation-task/${text}`;

    getData(nodeUrl)
    //.then(sleeper(5000))
    .then(res => {
    // console.log(res);
    // console.log(res.data);

      let taskName = res.data[0].task.name;
      let operation = "";//res.data.operation.name;
      let communication = "";//res.data.communication.variableName;

      let table = "<br><table class='table table-dark table-bordered '>";
      table += `<tr><thead><th colspan='2'>Funcition: ${text}</th></tr></thead>`;
      table += "<tr><thead><th>Operation</th><th>Communication</th></tr></thead>";
      table += "  <tbody>";
      res.data.forEach(function(value, index){
      table += `<tr><td>`+value.operation.name+`</td><td><a href="#" onclick="return alert('clicked on the edge ${taskName}')">`+value.communication.variableName+"</a></td></tr>";
      });
      table += "  </tbody>";
      table += "</table>";
      
      //let displayData = `Function: ${text}</br> Operation: ${operation}</br> Communication: ${communication}`;
    // let displayData = `${table}`;
      document.getElementById("show_implementation").innerHTML = table;
    
    })//getData
    .catch(error => { 
      //console.log(error);
      document.getElementById("show_implementation").innerHTML = "";
        if (error.response) {
          //console.log(error.response.data);//console.log(error.response.status);//console.log(error.response.headers);
          document.getElementById("show_implementation").innerHTML = error.response.data.error;
        }
    });//catch

}//handleNodeClick

//this method handles edge click action
export function handleEdgeClick (edgeUrl, text){

      getData(edgeUrl)
      .then(res => {
        //console.log(res.data);

        let table = "<br><table class='table table-dark table-bordered '>";
        table += `<tr><thead><th>Edge Name: ${text}</th></tr></thead>`;
        table += "<tr><thead><th>Task</th></tr></thead>";
        table += "  <tbody>";

        //TODO: change to the proper code for picking just the two edges involved
        
        res.data.forEach(function(value, index){
         let taskName = value.task.name;

          table += `<tr><td><a href="#" onClick={handleNodeClick('${taskName}').bind(this)}>${taskName}</a></td></tr>`;  
         // table += `<tr><td><a href="#" class='nodeClick'>${taskName}</a></td></tr>`;  
       
                     
        });

        table += "  </tbody>";
        table += "</table>";

        document.getElementById("show_implementation").innerHTML = table;

      })//getData
      .catch(error => { 
          if (error.response) {
            //console.log(error.response.data);//console.log(error.response.status);//console.log(error.response.headers);
            document.getElementById("show_implementation").innerHTML = error.response.data.error;

          }
      });//catch

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

  