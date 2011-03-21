var WindowNamer = function(){
  var storedWindowNames;  // a map of window ids to names
  var windowIds;          // a map of window refs to ids
  var currentWindow;      // map holding the id and ref of the current window
  var WNSTORAGEKEY = "WindowNamer.storedWindowNames";
  var NAMESEP = " - ";
  var strings;
  var status;

  return {
    init : function(){
      strings = document.getElementById("windownamerdialog-strings");
      status = document.getElementById("status");

      storedWindowNames = WindowNamer.load();
      windowIds = WindowNamer.getWindowIds();

      var textbox = document.getElementById("winName");
      var wName = WindowNamer.getWindowName();
      if(wName){
        textbox.value = wName;
        currentWindow.name = wName;
        textbox.value = wName;
      }else{
        textbox.value = strings.getString("promptNameEntry");
      }
      textbox.select();  
    },

    load : function(){
      var ret;
      if(Application && Application.storage){
        ret = Application.storage.get(WNSTORAGEKEY,{});
      }
      return ret;
    },
    
    getWindowIds : function(){
      var windows={};
      var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"]
                       .getService(Components.interfaces.nsIWindowMediator);
      var windowList = wm.getEnumerator("navigator:browser");
      var currentWin = wm.getMostRecentWindow("navigator:browser");
    
      var i=0;
      while(windowList.hasMoreElements()){
        var win           = windowList.getNext();
        var windowID      = WindowNamer.getWindowId(win,i);
        var thisIsCurrent = false;  //not sure if i'll need it.
    
        if(currentWin == win){
          currentWindow   = {id: windowID, ref: win};
          thisIsCurrent = true;
        }
        windows[windowID] = {ref: win, current: thisIsCurrent};
        i++;
      }
      return windows;
    },
    
    getWindowId : function(win,defaultId){
      var util          = win.QueryInterface(Components.interfaces.nsIInterfaceRequestor).getInterface(Components.interfaces.nsIDOMWindowUtils);
      var windowID      = util.outerWindowID;
      return (windowID)? windowID : defaultId;
    },
  
    getWindowName: function(win){
      var fromStore = storedWindowNames[currentWindow.id];
      return fromStore;
    },

    nameWindow : function(){
      var textbox = document.getElementById("winName");
      var windowName = textbox.value;
      if(!WindowNamer.isValidName(windowName)){
        WindowNamer.updateStatus("Invalid name - only letters and digits allowed. Please try again");
        textbox.select();
        return false;
      }
      var replace = false;
      if(currentWindow.name){ // this window already has a name, so it has to be replaced.
        replace = true;
      }
      WindowNamer.nameAllTabs(windowName,replace);
      //WindowNamer.setupHandlersForEvents(windowName);
      if(!WindowNamer.store(windowName)){
        WindowNamer.updateStatus("Could not store the name. You might have to set it again for tabs created in future");
        return false;
      }
      return true;
    },
    
    isValidName : function(str){
      //only allow names with letters and digits
      var isValid = !/\W+/.test(str)
      alert("val:"+str+" isValid:"+isValid);
      return isValid;
    },
    
    nameAllTabs : function(windowName, replace){
      // change all titles
      var browser = window.opener.gBrowser;
      var numTabs = browser.browsers.length;
      for(var index=0; index < numTabs; index++)
      {
        var b = browser.getBrowserAtIndex(index);
        var oldTitle = b.contentDocument.title
        if(replace){
          oldTitle = oldTitle.substring(currentWindow.name.length + NAMESEP.length);
        }
        b.contentDocument.title = windowName + NAMESEP + oldTitle;
      }
    },
    
    // setupHandlersForEvents : function(windowName){
    //   window.opener.addEventListener("load",function(windowEvt){
    //   // handle (re)loads of the tab
    //     gBrowser.addEventListener("load",function(tabEvt){
    //       alert("some tab reloading");
    //     },true);
    //     gBrowser.tabContainer.addEventListener("TabOpen",function(){alert("newtab")},true);
    //   },false);;
    // },
      //browser.addEventListener("pageshow",function(){alert("reloading")},true);
      // handle new tab automatically
      //browser.tabContainer.addEventListener("TabOpen",function(){alert("reloading")},false);
    
    store : function(windowName){
      //assume already read in, so update and write
      storedWindowNames[currentWindow.id] = windowName;
      if(Application && Application.storage){
        Application.storage.set(WNSTORAGEKEY,storedWindowNames);
        return true;
      }
      return false;
    },

    updateStatus : function(msg){
      status.value = msg;
    },

    ReloadHandler : function(){
        alert("evt");
    },
  
    NewTabHandler : function(){
      function handleEvent(evt){
        alert("new tab" + evt);
      }
    }
  }

}();
/*
util functions from early trial runs of working with xul.
function dir(obj){
  var s="";
  for(a in obj){
    s+=a +"\n";
  }
  return s;
}

function dirBrowsers(list){
  s="";
  for(b in list){
    s+= b.contentTitle + ", ";
  }
  return s;
}
*/

