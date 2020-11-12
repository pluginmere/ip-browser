"use strict";

(function (factory) {

  // Establish the root object: `window` OR `global`
  if (typeof window == 'object' && window.self === window) {
    var root = window;

    //NOTE: `window.top` throws access error when "same-origin policy" is applicable
    //      (but it changes nothing in this case as it is an exit point anyway).
    if (window.self !== window.top) {
      return;
    }

  } else if (typeof global == 'object' && global.global === global) {
    var root = global;
  };

  if (root.in_page_browser) {
    return;
  }

  // AMD.
  if (typeof define === 'function' && define.amd) {
    define(['jquery', 'exports'], function ($, exports) {
      // Export global even in AMD just in case.
      root.in_page_browser = factory(root, exports, $);
    });

    // Node.js or CommonJS.
  } else if (typeof exports !== 'undefined') {
    var $;
    try { $ = require('jquery'); } catch (e) {}
    factory(root, exports, $);

    // Browser global.
  } else {
    root.in_page_browser = factory(root, Object.create(null), root.jQuery || root.$);
  }

})(function (root, IP_BROWSER, $) {

  let active = false;


  IP_BROWSER._activate = () => {
    //TODO
    console.log("TODO: _activate()");
  };

  IP_BROWSER.activate = () => {

    if (active) {
      return;
    }
    active = !active;
    $(function () {
      IP_BROWSER._activate();
    });
  };


  IP_BROWSER._deactivate = () => {
    //TODO
    console.log("TODO: _deactivate()");
  };

  IP_BROWSER.deactivate = () => {

    if (!active) {
      return;
    }
    active = !active;
    $(function () {
      IP_BROWSER._deactivate();
    });
  };

  // IP_BROWSER.activate();

  // IP_BROWSER.setTimeout(deactivate, 7000);

  return IP_BROWSER;
});
