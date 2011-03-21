WindowNamer.Overlay.onFirefoxLoad = function(event) {
  document.getElementById("contentAreaContextMenu")
          .addEventListener("popupshowing", function (e){ WindowNamer.Overlay.showFirefoxContextMenu(e); }, false);
};

WindowNamer.Overlay.showFirefoxContextMenu = function(event) {
  // show or hide the menuitem based on what the context menu is on
  document.getElementById("context-WindowNamer.Overlay").hidden = gContextMenu.onImage;
};

window.addEventListener("load", function () { WindowNamer.Overlay.onFirefoxLoad(); }, false);
