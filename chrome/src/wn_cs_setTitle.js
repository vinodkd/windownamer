function checkForName(){
  console.log("checking name for:"+ window);
  chrome.extension.sendRequest({checkForName:true},function(resp){
        if(resp && resp.name && resp.name !=""){
          console.log(resp.name);
          document.title = resp.name + " - " + document.title;
          //document.title += resp.title;
        }
  });
}

// check for an existing name on reload
// this script needs to run at every page reload
checkForName();

// alternate onreq style setting of the name the first time. currently overridden by the execscript in bg.
chrome.extension.onRequest.addListener(function(request,sender,callback){ 
  //console.log(document.title+",req:"+request);
  document.title = request.wname +" - " + document.title;
  callback({});
});