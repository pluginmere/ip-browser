"use strict";



function init_ip_browser($) {
  console.log(">>>>> [?] INIT In Page Browser [?] <<<<<");

  if (window.in_page_browser || window.self !== window.top) { //NOTE: throws access error when "same-origin policy" is applicable (but it changes nothing in this case).
    return;
  }
  window.in_page_browser = Object.create(null);
  console.log(">>>>> [!] INIT In Page Browser [!] <<<<<");


  //TODO some day



  const activate = window.in_page_browser.activate = () => {
    $(function () {
      //TODO
      console.log("TODO: activate()");
    });
  };



  const deactivate = window.in_page_browser.deactivate = () => {
    $(function () {
      //TODO
      console.log("TODO: deactivate()");
    });
  };

  // activate();

  // setTimeout(deactivate, 7000);

}
