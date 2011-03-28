var WindowNamer = {
  Overlay : {
    onLoad: function() {
      // initialization code
      this.initialized = true;
      this.strings = document.getElementById("windownamer-strings");
      this.setupHandlersForEvents();
    },
    
    onMenuItemCommand: function(e) {
      window.openDialog('chrome://WindowNamer/content/dialog.xul','','chrome,centerscreen,modal');
    },
    
    onToolbarButtonCommand: function(e) {
      // just reuse the function above.  you can change this, obviously!
      this.onMenuItemCommand(e);
    },
    
    setupHandlersForEvents : function(){
      var gb = gBrowser;
      handler1 = function(tabEvt){
        // this check expression took HOURS of work to come up with. Exasperating to say the least.
          if(tabEvt.eventPhase==1 && tabEvt.originalTarget.documentURI != "about:blank" && tabEvt.originalTarget.documentURI == gb.currentURI.spec){
            // alert("pageshow1: tgt" +tabEvt.originalTarget.nodeName+", ctgt" +tabEvt.currentTarget.nodeName+" uri:" +(tabEvt.originalTarget.documentURI)+" gb:" +(gb.currentURI.spec)+", phase:"+tabEvt.eventPhase);
            alert(tabEvt.target.title+","+gb.selectedBrowser.contentTitle);
            // check if the window is already in the list of named windows
            // if so, replace the name
            // else do nothing
          }
      }
      document.addEventListener("load",handler1,true);
    }
  }
};

window.addEventListener("load", function () { WindowNamer.Overlay.onLoad(); }, false);
// WindowNamer.setupHandlersForEvents();
