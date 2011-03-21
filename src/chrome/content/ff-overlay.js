windownamer.onFirefoxLoad = function(event) {
  document.getElementById("contentAreaContextMenu")
          .addEventListener("popupshowing", function (e){ windownamer.showFirefoxContextMenu(e); }, false);
};

windownamer.showFirefoxContextMenu = function(event) {
  // show or hide the menuitem based on what the context menu is on
  document.getElementById("context-windownamer").hidden = gContextMenu.onImage;
};

window.addEventListener("load", function () { windownamer.onFirefoxLoad(); }, false);
