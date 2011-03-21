var windownamer = {
  onLoad: function() {
    // initialization code
    this.initialized = true;
    this.strings = document.getElementById("windownamer-strings");
  },

  onMenuItemCommand: function(e) {
    window.openDialog('chrome://windownamer/content/windownamer-dialog.xul','','chrome,centerscreen,modal');
  },

  onToolbarButtonCommand: function(e) {
    // just reuse the function above.  you can change this, obviously!
    windownamer.onMenuItemCommand(e);
  },
    setupHandlersForEvents : function(){
      window.addEventListener("load",function(windowEvt){
      // handle (re)loads of the tab
      alert("winEvt:"+windowEvt.target);
        gBrowser.addEventListener("load",function(tabEvt){
          alert("tabevt" +tabEvt.target);
        },true);
        gBrowser.tabContainer.addEventListener("TabOpen",function(evt){alert("newtab"+evt.target)},true);
      },false);;
    }
};

window.addEventListener("load", function () { windownamer.onLoad(); }, false);
windownamer.setupHandlersForEvents();
