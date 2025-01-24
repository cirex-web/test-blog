// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"npus":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initComponents = initComponents;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function initComponents(elem, APP) {
  var init = function init(elem) {
    var components = elem.getAttribute('data-js-component');

    if (!components) {
      return;
    } else {
      components = components.split(' ');
    }

    for (var i = 0, len = components.length; i < len; i++) {
      var componentName = components[i];

      if (APP.components[componentName]) {
        var component = new APP.components[componentName](elem, APP);

        if (component.init) {
          component.init();
        }
      }
    }
  };

  var childComponents = _toConsumableArray(elem.querySelectorAll('[data-js-component]'));

  if (childComponents) {
    for (var i = 0; i < childComponents.length; i++) {
      init(childComponents[i]);
    }
  }

  init(elem);
}
},{}],"lVhV":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = throttle;

function throttle(func, duration) {
  var shouldWait = false;
  return function () {
    if (!shouldWait) {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      func.apply(this, args);
      shouldWait = true;
      setTimeout(function () {
        shouldWait = false;
      }, duration);
    }
  };
}
},{}],"ILnJ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _throttle = _interopRequireDefault(require("./../utils/throttle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var GlobalHeader = /*#__PURE__*/function () {
  function GlobalHeader(elem, APP) {
    _classCallCheck(this, GlobalHeader);

    this.elem = elem;
    this.isParent = this.elem.querySelectorAll('.is-parent');
    this.mobileTrigger = this.elem.querySelector('.globalHeader__navTrigger button');
    this.mobileClose = this.elem.querySelector('.globalHeader__close');
    this.mobileNavOpen = false; // this.searchTrigger = this.elem.querySelector('.globalHeader__search-button')

    this.searchClose = this.elem.querySelector('.globalHeader__search-close');
    this.search = this.elem.querySelector('input[type="search"]');
    this.searchContainer = this.elem.querySelector('.globalHeader__search');
    this.modal = this.elem.querySelector('.globalHeader__menu');
    this.modalFirstElem = this.elem.querySelector('.js-modal-first');
    this.modalLastElem = this.elem.querySelector('.js-modal-last > a');
    this.modalHeading = this.elem.querySelector('.js-modal-heading');
    this.waypoint = null;
    this.lastScrollTop = 0;
    this.navBarHeight = this.elem.clientHeight + 50; // bit of a buffer space

    this.delta = 10;
    this.viewportWidth = window.innerWidth;
    this.APP = APP;
    this.APP.header = {
      isVisible: true
    };
  }

  _createClass(GlobalHeader, [{
    key: "onScroll",
    value: function onScroll() {
      var st = window.scrollY;

      if (Math.abs(this.lastScrollTop - st) <= this.delta) {
        return;
      } // If we're not past the header, bail


      if (st <= this.navBarHeight) {
        this.elem.classList.remove('js-nav-down');
        this.elem.classList.remove('js-nav-up');
        this.elem.classList.add('js-nav-normal');
        this.lastScrollTop = st;
        this.APP.header.isVisible = true;
        this.setCssVar(document.documentElement, '--dynamic-header-height', this.elem.clientHeight + 'px');
        return;
      }

      if (st > this.lastScrollTop) {
        this.elem.classList.add('js-nav-up');
        this.elem.classList.remove('js-nav-down');
        this.elem.classList.remove('js-nav-normal');
        this.APP.header.isVisible = false;
        this.setCssVar(document.documentElement, '--dynamic-header-height', '0px'); // downscroll code
      } else {
        this.elem.classList.add('js-nav-down');
        this.elem.classList.remove('js-nav-up');
        this.elem.classList.remove('js-nav-normal');
        this.APP.header.isVisible = true;
        this.setCssVar(document.documentElement, '--dynamic-header-height', this.elem.clientHeight + 'px'); // upscroll code
      }

      this.lastScrollTop = st;
    }
  }, {
    key: "initMobileNav",
    value: function initMobileNav() {
      var _this = this;

      this.mobileTrigger.addEventListener('click', function () {
        return _this.toggleMobileNav();
      });
      this.mobileClose.addEventListener('click', function () {
        return _this.closeMobileNav();
      }); // window.addEventListener('keyup', e => {
      //     if(e.key) {
      //         if (['esc', 'escape'].includes(e.key.toLowerCase())) {
      //             this.closeMobileNav()
      //             this.hideSearch()
      //         }
      //     }
      // })

      window.addEventListener('resize', function () {
        return (0, _throttle.default)(_this.onResize(), 200);
      });
    }
  }, {
    key: "showSearch",
    value: function showSearch() {
      document.body.classList.add('js-search-open'); // this.searchTrigger.setAttribute('aria-expanded', 'true');

      this.search.focus();
    }
  }, {
    key: "hideSearch",
    value: function hideSearch() {
      document.body.classList.remove('js-search-open'); // this.searchTrigger.setAttribute('aria-expanded', 'false');

      this.search.value = '';
    }
  }, {
    key: "hideSearchClose",
    value: function hideSearchClose() {
      this.searchClose.style.display = 'none';
      this.searchClose.setAttribute('aria-hidden', 'true');
    }
  }, {
    key: "showSearchClose",
    value: function showSearchClose() {
      this.searchClose.style.display = 'block';
      this.searchClose.setAttribute('aria-hidden', 'false');
    }
  }, {
    key: "initSearch",
    value: function initSearch() {// this.searchTrigger.addEventListener('click', () => this.showSearch())
      // this.searchClose.addEventListener('click', () => this.hideSearch())
      // clear search on searchClose click
      // this.searchClose.addEventListener('click', () => {
      //     if (this.search.value.length > 0) {
      //       this.search.value = '';
      //       this.search.dispatchEvent(new Event('input'));
      //     }
      //     this.hideSearchClose();
      // });
      //   this.search.addEventListener('input', () => {
      //       if (this.search.value.length > 0) {
      //           this.showSearchClose();
      //       } else {
      //           this.hideSearchClose();
      //       }
      //   }
      // );
    }
  }, {
    key: "closeMobileNav",
    value: function closeMobileNav() {
      document.body.classList.remove('js-mobile-nav-open');
      this.mobileNavOpen = false;
      this.mobileTrigger.focus();
      this.navToggleEvent();
    }
  }, {
    key: "toggleMobileNav",
    value: function toggleMobileNav() {
      document.body.classList.toggle('js-mobile-nav-open');
      this.mobileNavOpen = !this.mobileNavOpen;
      this.mobileClose.focus();
      this.navToggleEvent();
    } // desktop only, always visible on mobile

  }, {
    key: "triggerSubnav",
    value: function triggerSubnav() {
      this.isParent.forEach(function (parent) {
        var childLinks = parent.querySelector('.child-links');
        var toggler = parent.querySelector('.globalHeader__toggler');
        parent.addEventListener('mouseover', function () {
          if (!window.matchMedia('(max-width:1024px)').matches) {
            childLinks.classList.add('is-visible');

            if (toggler) {
              toggler.setAttribute("aria-expanded", true);
            }
          }
        });
        parent.addEventListener('mouseout', function () {
          if (!window.matchMedia('(max-width:1024px)').matches) {
            childLinks.classList.remove('is-visible');

            if (toggler) {
              toggler.setAttribute("aria-expanded", false);
            }
          }
        });

        if (toggler) {
          toggler.addEventListener('click', function () {
            childLinks.classList.toggle('is-visible');
            toggler.style.transform = childLinks.classList.contains('is-visible') ? 'rotate(270deg)' : 'rotate(0)';

            if (toggler) {
              toggler.setAttribute("aria-expanded", childLinks.classList.contains('is-visible') ? true : false);
            }
          });
        }
      });
    }
  }, {
    key: "updateSearchContainerLocation",
    value: function updateSearchContainerLocation() {
      if (window.matchMedia('(max-width:1024px)').matches) {
        this.mobileClose.after(this.searchContainer);
      } else {
        this.modal.append(this.searchContainer);
      }
    }
  }, {
    key: "updateAria",
    value: function updateAria() {
      if (window.matchMedia('(max-width:1024px)').matches) {
        this.modal.setAttribute("role", "dialog");
        this.modal.setAttribute("aria-modal", "true");
        this.modal.setAttribute("aria-label", "navigation");
        this.modalHeading.style.display = 'block';
      } else {
        this.modal.removeAttribute("role");
        this.modal.removeAttribute("aria-modal");
        this.modal.removeAttribute("aria-label");
        this.modalHeading.style.display = 'none';
      }
    }
  }, {
    key: "resetSubnav",
    value: function resetSubnav() {
      this.isParent.forEach(function (parent) {
        parent.querySelector('.child-links').classList.remove('is-visible');
        var toggler = parent.querySelector('.globalHeader__toggler');

        if (toggler) {
          toggler.style.transform = 'rotate(0)';
        }
      });
    }
  }, {
    key: "modalTabController",
    value: function modalTabController() {
      var _this2 = this;

      if (this.modal && this.modalFirstElem && this.modalLastElem) {
        this.modal.addEventListener('keydown', function (e) {
          if (window.matchMedia('(max-width:1024px)').matches) {
            if (e.target == _this2.modalFirstElem && e.key == 'Tab' && e.shiftKey) {
              e.preventDefault();

              _this2.modalLastElem.focus();
            } else if (e.target == _this2.modalLastElem && e.key == 'Tab' && !e.shiftKey) {
              e.preventDefault();

              _this2.modalFirstElem.focus();
            }
          }
        });
      }
    }
  }, {
    key: "initSticky",
    value: function initSticky() {
      var _this3 = this;

      window.addEventListener('scroll', function () {
        _this3.onScroll();
      });
    }
  }, {
    key: "onResize",
    value: function onResize() {
      var currentViewportWidth = window.innerWidth;
      var viewportChanged = this.viewportWidth !== currentViewportWidth;

      if (window.matchMedia('(max-width:1024px)').matches && viewportChanged) {
        document.body.classList.remove('js-mobile-nav-open');
      }

      if (viewportChanged) {
        this.resetSubnav();
        this.updateSearchContainerLocation();
        this.updateAria();
      }

      this.viewportWidth = currentViewportWidth;
    } // create a custom event that dispatches when the mobile nav is toggled

  }, {
    key: "navToggleEvent",
    value: function navToggleEvent() {
      document.dispatchEvent(new CustomEvent('nav-toggle', {
        detail: {
          isOpen: this.mobileNavOpen
        }
      }));
    }
  }, {
    key: "setCssVar",
    value: function setCssVar(target, name, value) {
      target.style.setProperty(name, value);
    }
  }, {
    key: "init",
    value: function init() {
      // initialize here - trigger nav, show nav container, toggle search button and childnav, etc.
      this.triggerSubnav();
      this.initMobileNav();
      this.initSearch();
      if (!document.body.classList.contains('entity')) this.initSticky();
      this.modalTabController();
      this.updateSearchContainerLocation();
      this.updateAria();
    }
  }]);

  return GlobalHeader;
}();

exports.default = GlobalHeader;
},{"./../utils/throttle":"lVhV"}],"pBGv":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};
},{}],"LxiQ":[function(require,module,exports) {
var define;
var process = require("process");
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("Typewriter",[],t):"object"==typeof exports?exports.Typewriter=t():e.Typewriter=t()}("undefined"!=typeof self?self:this,(()=>(()=>{var e={75:function(e){(function(){var t,n,r,o,a,i;"undefined"!=typeof performance&&null!==performance&&performance.now?e.exports=function(){return performance.now()}:"undefined"!=typeof process&&null!==process&&process.hrtime?(e.exports=function(){return(t()-a)/1e6},n=process.hrtime,o=(t=function(){var e;return 1e9*(e=n())[0]+e[1]})(),i=1e9*process.uptime(),a=o-i):Date.now?(e.exports=function(){return Date.now()-r},r=Date.now()):(e.exports=function(){return(new Date).getTime()-r},r=(new Date).getTime())}).call(this)},4087:(e,t,n)=>{for(var r=n(75),o="undefined"==typeof window?n.g:window,a=["moz","webkit"],i="AnimationFrame",s=o["request"+i],u=o["cancel"+i]||o["cancelRequest"+i],l=0;!s&&l<a.length;l++)s=o[a[l]+"Request"+i],u=o[a[l]+"Cancel"+i]||o[a[l]+"CancelRequest"+i];if(!s||!u){var c=0,p=0,d=[];s=function(e){if(0===d.length){var t=r(),n=Math.max(0,16.666666666666668-(t-c));c=n+t,setTimeout((function(){var e=d.slice(0);d.length=0;for(var t=0;t<e.length;t++)if(!e[t].cancelled)try{e[t].callback(c)}catch(e){setTimeout((function(){throw e}),0)}}),Math.round(n))}return d.push({handle:++p,callback:e,cancelled:!1}),p},u=function(e){for(var t=0;t<d.length;t++)d[t].handle===e&&(d[t].cancelled=!0)}}e.exports=function(e){return s.call(o,e)},e.exports.cancel=function(){u.apply(o,arguments)},e.exports.polyfill=function(e){e||(e=o),e.requestAnimationFrame=s,e.cancelAnimationFrame=u}}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var a=t[r]={exports:{}};return e[r].call(a.exports,a,a.exports,n),a.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var r={};return(()=>{"use strict";n.d(r,{default:()=>C});var e=n(4087),t=n.n(e);const o=function(e){return new RegExp(/<[a-z][\s\S]*>/i).test(e)},a=function(e,t){return Math.floor(Math.random()*(t-e+1))+e};var i="TYPE_CHARACTER",s="REMOVE_CHARACTER",u="REMOVE_ALL",l="REMOVE_LAST_VISIBLE_NODE",c="PAUSE_FOR",p="CALL_FUNCTION",d="ADD_HTML_TAG_ELEMENT",f="CHANGE_DELETE_SPEED",v="CHANGE_DELAY",h="CHANGE_CURSOR",m="PASTE_STRING",y="HTML_TAG";function g(e){return g="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},g(e)}function E(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function w(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?E(Object(n),!0).forEach((function(t){A(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):E(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function b(e){return function(e){if(Array.isArray(e))return T(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return T(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?T(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function T(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function S(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,N(r.key),r)}}function A(e,t,n){return(t=N(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function N(e){var t=function(e,t){if("object"!==g(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==g(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"===g(t)?t:String(t)}const C=function(){function n(r,g){var E=this;if(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n),A(this,"state",{cursorAnimation:null,lastFrameTime:null,pauseUntil:null,eventQueue:[],eventLoop:null,eventLoopPaused:!1,reverseCalledEvents:[],calledEvents:[],visibleNodes:[],initialOptions:null,elements:{container:null,wrapper:document.createElement("span"),cursor:document.createElement("span")}}),A(this,"options",{strings:null,cursor:"|",delay:"natural",pauseFor:1500,deleteSpeed:"natural",loop:!1,autoStart:!1,devMode:!1,skipAddStyles:!1,wrapperClassName:"Typewriter__wrapper",cursorClassName:"Typewriter__cursor",stringSplitter:null,onCreateTextNode:null,onRemoveNode:null}),A(this,"setupWrapperElement",(function(){E.state.elements.container&&(E.state.elements.wrapper.className=E.options.wrapperClassName,E.state.elements.cursor.className=E.options.cursorClassName,E.state.elements.cursor.innerHTML=E.options.cursor,E.state.elements.container.innerHTML="",E.state.elements.container.appendChild(E.state.elements.wrapper),E.state.elements.container.appendChild(E.state.elements.cursor))})),A(this,"start",(function(){return E.state.eventLoopPaused=!1,E.runEventLoop(),E})),A(this,"pause",(function(){return E.state.eventLoopPaused=!0,E})),A(this,"stop",(function(){return E.state.eventLoop&&((0,e.cancel)(E.state.eventLoop),E.state.eventLoop=null),E})),A(this,"pauseFor",(function(e){return E.addEventToQueue(c,{ms:e}),E})),A(this,"typeOutAllStrings",(function(){return"string"==typeof E.options.strings?(E.typeString(E.options.strings).pauseFor(E.options.pauseFor),E):(E.options.strings.forEach((function(e){E.typeString(e).pauseFor(E.options.pauseFor).deleteAll(E.options.deleteSpeed)})),E)})),A(this,"typeString",(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(o(e))return E.typeOutHTMLString(e,t);if(e){var n=(E.options||{}).stringSplitter,r="function"==typeof n?n(e):e.split("");E.typeCharacters(r,t)}return E})),A(this,"pasteString",(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return o(e)?E.typeOutHTMLString(e,t,!0):(e&&E.addEventToQueue(m,{character:e,node:t}),E)})),A(this,"typeOutHTMLString",(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2?arguments[2]:void 0,r=function(e){var t=document.createElement("div");return t.innerHTML=e,t.childNodes}(e);if(r.length>0)for(var o=0;o<r.length;o++){var a=r[o],i=a.innerHTML;a&&3!==a.nodeType?(a.innerHTML="",E.addEventToQueue(d,{node:a,parentNode:t}),n?E.pasteString(i,a):E.typeString(i,a)):a.textContent&&(n?E.pasteString(a.textContent,t):E.typeString(a.textContent,t))}return E})),A(this,"deleteAll",(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"natural";return E.addEventToQueue(u,{speed:e}),E})),A(this,"changeDeleteSpeed",(function(e){if(!e)throw new Error("Must provide new delete speed");return E.addEventToQueue(f,{speed:e}),E})),A(this,"changeDelay",(function(e){if(!e)throw new Error("Must provide new delay");return E.addEventToQueue(v,{delay:e}),E})),A(this,"changeCursor",(function(e){if(!e)throw new Error("Must provide new cursor");return E.addEventToQueue(h,{cursor:e}),E})),A(this,"deleteChars",(function(e){if(!e)throw new Error("Must provide amount of characters to delete");for(var t=0;t<e;t++)E.addEventToQueue(s);return E})),A(this,"callFunction",(function(e,t){if(!e||"function"!=typeof e)throw new Error("Callback must be a function");return E.addEventToQueue(p,{cb:e,thisArg:t}),E})),A(this,"typeCharacters",(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(!e||!Array.isArray(e))throw new Error("Characters must be an array");return e.forEach((function(e){E.addEventToQueue(i,{character:e,node:t})})),E})),A(this,"removeCharacters",(function(e){if(!e||!Array.isArray(e))throw new Error("Characters must be an array");return e.forEach((function(){E.addEventToQueue(s)})),E})),A(this,"addEventToQueue",(function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return E.addEventToStateProperty(e,t,n,"eventQueue")})),A(this,"addReverseCalledEvent",(function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return E.options.loop?E.addEventToStateProperty(e,t,n,"reverseCalledEvents"):E})),A(this,"addEventToStateProperty",(function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=arguments.length>3?arguments[3]:void 0,o={eventName:e,eventArgs:t||{}};return E.state[r]=n?[o].concat(b(E.state[r])):[].concat(b(E.state[r]),[o]),E})),A(this,"runEventLoop",(function(){E.state.lastFrameTime||(E.state.lastFrameTime=Date.now());var e=Date.now(),n=e-E.state.lastFrameTime;if(!E.state.eventQueue.length){if(!E.options.loop)return;E.state.eventQueue=b(E.state.calledEvents),E.state.calledEvents=[],E.options=w({},E.state.initialOptions)}if(E.state.eventLoop=t()(E.runEventLoop),!E.state.eventLoopPaused){if(E.state.pauseUntil){if(e<E.state.pauseUntil)return;E.state.pauseUntil=null}var r,o=b(E.state.eventQueue),g=o.shift();if(!(n<=(r=g.eventName===l||g.eventName===s?"natural"===E.options.deleteSpeed?a(40,80):E.options.deleteSpeed:"natural"===E.options.delay?a(120,160):E.options.delay))){var T=g.eventName,S=g.eventArgs;switch(E.logInDevMode({currentEvent:g,state:E.state,delay:r}),T){case m:case i:var A=S.character,N=S.node,C=document.createTextNode(A),_=C;E.options.onCreateTextNode&&"function"==typeof E.options.onCreateTextNode&&(_=E.options.onCreateTextNode(A,C)),_&&(N?N.appendChild(_):E.state.elements.wrapper.appendChild(_)),E.state.visibleNodes=[].concat(b(E.state.visibleNodes),[{type:"TEXT_NODE",character:A,node:_}]);break;case s:o.unshift({eventName:l,eventArgs:{removingCharacterNode:!0}});break;case c:var O=g.eventArgs.ms;E.state.pauseUntil=Date.now()+parseInt(O);break;case p:var L=g.eventArgs,D=L.cb,M=L.thisArg;D.call(M,{elements:E.state.elements});break;case d:var x=g.eventArgs,P=x.node,j=x.parentNode;j?j.appendChild(P):E.state.elements.wrapper.appendChild(P),E.state.visibleNodes=[].concat(b(E.state.visibleNodes),[{type:y,node:P,parentNode:j||E.state.elements.wrapper}]);break;case u:var R=E.state.visibleNodes,k=S.speed,Q=[];k&&Q.push({eventName:f,eventArgs:{speed:k,temp:!0}});for(var F=0,H=R.length;F<H;F++)Q.push({eventName:l,eventArgs:{removingCharacterNode:!1}});k&&Q.push({eventName:f,eventArgs:{speed:E.options.deleteSpeed,temp:!0}}),o.unshift.apply(o,Q);break;case l:var I=g.eventArgs.removingCharacterNode;if(E.state.visibleNodes.length){var U=E.state.visibleNodes.pop(),q=U.type,G=U.node,Y=U.character;E.options.onRemoveNode&&"function"==typeof E.options.onRemoveNode&&E.options.onRemoveNode({node:G,character:Y}),G&&G.parentNode.removeChild(G),q===y&&I&&o.unshift({eventName:l,eventArgs:{}})}break;case f:E.options.deleteSpeed=g.eventArgs.speed;break;case v:E.options.delay=g.eventArgs.delay;break;case h:E.options.cursor=g.eventArgs.cursor,E.state.elements.cursor.innerHTML=g.eventArgs.cursor}E.options.loop&&(g.eventName===l||g.eventArgs&&g.eventArgs.temp||(E.state.calledEvents=[].concat(b(E.state.calledEvents),[g]))),E.state.eventQueue=o,E.state.lastFrameTime=e}}})),r)if("string"==typeof r){var T=document.querySelector(r);if(!T)throw new Error("Could not find container element");this.state.elements.container=T}else this.state.elements.container=r;g&&(this.options=w(w({},this.options),g)),this.state.initialOptions=w({},this.options),this.init()}var r,g;return r=n,(g=[{key:"init",value:function(){var e,t;this.setupWrapperElement(),this.addEventToQueue(h,{cursor:this.options.cursor},!0),this.addEventToQueue(u,null,!0),!window||window.___TYPEWRITER_JS_STYLES_ADDED___||this.options.skipAddStyles||(e=".Typewriter__cursor{-webkit-animation:Typewriter-cursor 1s infinite;animation:Typewriter-cursor 1s infinite;margin-left:1px}@-webkit-keyframes Typewriter-cursor{0%{opacity:0}50%{opacity:1}100%{opacity:0}}@keyframes Typewriter-cursor{0%{opacity:0}50%{opacity:1}100%{opacity:0}}",(t=document.createElement("style")).appendChild(document.createTextNode(e)),document.head.appendChild(t),window.___TYPEWRITER_JS_STYLES_ADDED___=!0),!0===this.options.autoStart&&this.options.strings&&this.typeOutAllStrings().start()}},{key:"logInDevMode",value:function(e){this.options.devMode&&console.log(e)}}])&&S(r.prototype,g),Object.defineProperty(r,"prototype",{writable:!1}),n}()})(),r.default})()));

},{"process":"pBGv"}],"O6M3":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const De = (...n) => {},
      fe = n => n.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"),
      ne = n => n !== null && n?.constructor.name === "Object",
      he = n => typeof n == "string",
      S = (n, l) => {
  let m = n;
  const A = l.split(".");

  for (const C of A) {
    if (!ne(m) || !(C in m)) return "";
    m = m[C];
  }

  return `${m}`;
},
      K = (n = "") => n.normalize("NFD").replace(/\p{Diacritic}/gu, ""),
      _ = (n, l) => {
  if (!n.length) return [];

  if (ne(n[0])) {
    for (const m of n) if (!S(m, l)) throw new Error("e03");

    return n;
  }

  return n.map(m => ({
    [l]: he(m) ? m : JSON.stringify(m)
  }));
},
      me = n => n.split(/\s+/),
      Ne = async function (n, l) {
  const m = await fetch(n, l || {
    method: "GET"
  });
  return Fe(m);
},
      Fe = async function (n) {
  const l = await n.text(),
        m = l && JSON.parse(l);
  return n.ok ? m : Promise.reject(m && m.message || n.statusText);
},
      pe = {
  get: Ne
},
      $e = (n = {}) => {
  const {
    hasDiacritics: l,
    tokenizer: m
  } = n;
  let A = {};
  const C = "\0";

  function z(a = "") {
    return a = `${a}`.trim(), l && (a = K(a)), (m || me)(a.toLowerCase());
  }

  function H(a, w = "", x) {
    if (!a) return;
    let y;
    a = Array.isArray(a) ? a : [a];
    const h = he(a[0]);

    for (const T of a) {
      const v = z(h ? T : S(T, w));

      for (const g of v) {
        if (!g) continue;
        y = A;

        for (const D of g) y = y[D] || (y[D] = {});

        const d = h ? T : x && x(T) || JSON.stringify(T),
              Q = y[C] ?? (y[C] = {});
        Q[d] = T;
      }
    }
  }

  function i(a) {
    let w = A;
    const x = {};

    for (const h of a) if (w = w?.[h], typeof w > "u") return {};

    const y = [{
      node: w,
      prefix: a
    }];

    for (; y.length;) {
      const {
        node: h,
        prefix: T
      } = y.pop();

      for (const v in h) if (v === C) {
        const g = h[C];

        for (const d in g) x[d] = g[d];
      } else y.push({
        node: h[v],
        prefix: T + v
      });
    }

    return x;
  }

  const L = (a, w) => {
    const x = {};

    for (const y in a) y in w && (x[y] = a[y]);

    return x;
  };

  function F(a, w) {
    const x = z(a),
          y = x.length <= 20 ? x.length : 20;
    let h = i(x[0]);

    for (let v = 1; v < y && (h = L(h, i(x[v])), !!Object.keys(h).length); v++);

    h = Object.values(h);
    const T = h.length;
    return w && T > w && (h.length = w), {
      suggestions: h,
      count: T
    };
  }

  function I() {
    A = {};
  }

  return {
    add: H,
    clear: I,
    search: F
  };
},
      ze = n => {
  if (!n.input) throw new Error("e01");
  if (!ne(n.source)) throw new Error("e02");

  const l = document.createElement("div"),
        m = n.preventSubmit || !1,
        A = n.minLength || 1,
        C = n.hint !== !1,
        z = n.autoSelect || !1,
        H = n.tokenizer || me,
        i = n.templates,
        L = Array.isArray(n.source.keys) ? n.source.keys : ["label"],
        F = n.source.groupKey || "",
        I = e => S(e, L[0]),
        a = n.display || I,
        w = n.source.identity || I,
        x = n.onSubmit || De,
        y = n.source.transform || (e => e),
        h = n.source.local || null,
        T = typeof n.source.remote?.url,
        v = T === "function" || T === "string" && n.source.remote.wildcard ? n.source.remote : null,
        g = n.source.prefetch?.url ? {
    when: "onInit",
    done: !1,
    ...n.source.prefetch
  } : null,
        d = {
    wrapper: "typeahead-standalone",
    input: "tt-input",
    hint: "tt-hint",
    highlight: "tt-highlight",
    hide: "tt-hide",
    show: "tt-show",
    list: "tt-list",
    selected: "tt-selected",
    header: "tt-header",
    footer: "tt-footer",
    loader: "tt-loader",
    suggestion: "tt-suggestion",
    group: "tt-group",
    empty: "tt-empty",
    notFound: "tt-notFound",
    ...(n.classNames || {})
  },
        Q = {
    block: "nearest",
    ...(n.listScrollOptions || {})
  };

  if (!h && !g && !v) throw new Error("e02");
  const D = $e({
    hasDiacritics: n.diacritics,
    tokenizer: H
  }),
        $ = document.createElement("div");
  $.className = d.wrapper;
  const r = {
    query: "",
    hits: [],
    // suggestions
    count: 0,
    limit: n.limit || 5,
    wrapper: $
  };
  let j = {},
      P = {},
      f,
      M,
      R = !1,
      W = "";
  i && (i.header = typeof i.header == "function" ? i.header : void 0, i.footer = typeof i.footer == "function" ? i.footer : void 0, i.notFound = typeof i.notFound == "function" ? i.notFound : void 0, i.group = typeof i.group == "function" ? i.group : void 0, i.suggestion = typeof i.suggestion == "function" ? i.suggestion : void 0, i.loader = typeof i.loader == "function" ? i.loader : void 0, i.empty = typeof i.empty == "function" ? i.empty : void 0);

  const U = (e = []) => {
    te(_(e, L[0]));
  };

  h && U(h);
  const c = n.input;
  c.classList.add(d.input);
  const re = window.getComputedStyle(c),
        B = c.parentNode,
        ye = [...B.children].indexOf(c);
  B.removeChild(c), $.appendChild(c), B.insertBefore($, B.children[ye]);
  const J = c.cloneNode();
  C && qe(J), l.classList.add(d.list, d.hide), l.setAttribute("aria-label", "menu-options"), l.setAttribute("role", "listbox"), l.style.position = "absolute", l.style.width = `${c.offsetWidth}px`, l.style.marginTop = `${c.offsetHeight + parseInt(re.marginTop)}px`, new ResizeObserver(e => {
    for (const t of e) l.style.width = `${t.target.offsetWidth}px`;
  }).observe(c), $.appendChild(l), g && g.when === "onInit" && oe();

  function oe() {
    if (!g || g.done) return;
    let e = [];
    pe.get(typeof g.url == "function" ? g.url() : g.url, g?.requestOptions).then(t => {
      e = y(t), e = _(e, L[0]), te(e);
    }, t => {
      console.error("e04", t);
    }).finally(() => {
      typeof g.process == "function" && g.process(e);
    }), g.done = !0;
  }

  const X = () => {
    l.classList.remove(d.hide);
  },
        ge = () => {
    l.classList.add(d.hide);
  },
        ve = () => !l.classList.contains(d.hide) && !!Array.from(l.children).find(e => e.classList.contains(d.suggestion)),
        se = () => M && clearTimeout(M),
        O = () => {
    r.hits = [], J.value = "", W = "", ge();
  },
        ie = () => {
    c.dispatchEvent(new InputEvent("input", {
      bubbles: !0,
      inputType: "insertCompositionText",
      data: c.value
    }));
  },
        Y = (e = !1) => {
    if (!r.hits.length && r.query) {
      O(), Z();
      const t = i?.notFound?.(r);
      if (!t) return !0;

      const o = p => {
        const s = document.createElement("div");
        s.classList.add(d.notFound), N(s, p), l.appendChild(s);
      };

      return v ? (j[JSON.stringify(r.query)] || e && !R) && o(t) : o(t), X(), !0;
    }
  },
        Z = () => {
    for (; l.firstChild;) l.firstChild.remove();
  },
        le = () => {
    if (!i?.loader) return;

    if (!R) {
      const t = l.querySelector(`.${d.loader}`);
      t && l.removeChild(t);
      return;
    }

    const e = document.createElement("div");
    e.classList.add(d.loader), N(e, i.loader()), i?.footer ? l.insertBefore(e, l.querySelector(`.${d.footer}`)) : l.appendChild(e);
  },
        V = () => {
    if (Y()) return;
    Z();

    const e = s => {
      const u = document.createElement("div");
      return u.classList.add(d.suggestion), u.setAttribute("role", "option"), u.setAttribute("aria-selected", "false"), u.setAttribute("aria-label", a(s)), i?.suggestion ? N(u, i.suggestion(s, r)) : u.textContent = S(s, L[0]), u;
    },
          t = s => {
      const u = document.createElement("div");
      return u.classList.add(d.group), u.setAttribute("role", "group"), u.setAttribute("aria-label", s), i?.group ? N(u, i.group(s, r)) : u.textContent = s || "", u;
    },
          o = document.createDocumentFragment(),
          p = [];

    if (i?.header) {
      const s = document.createElement("div");
      s.classList.add(d.header), s.setAttribute("role", "presentation"), N(s, i.header(r)) && o.appendChild(s);
    }

    for (const [s, u] of r.hits.entries()) {
      if (s === r.limit) break;
      const E = S(u, F);

      if (E && !p.includes(E)) {
        p.push(E);
        const k = t(E);
        o.appendChild(k);
      }

      const b = e(u);
      b.addEventListener("click", k => {
        O(), f = u, c.value = a(u, k), ie();
      }), u === f && (b.classList.add(d.selected), b.setAttribute("aria-selected", "true")), o.appendChild(b), n.highlight !== !1 && Le(b, r.query);
    }

    if (i?.footer) {
      const s = document.createElement("div");
      s.classList.add(d.footer), s.setAttribute("role", "presentation"), N(s, i.footer(r)) && o.appendChild(s);
    }

    l.appendChild(o), C && Se(f || r.hits[0]), l.querySelector(`.${d.selected}`)?.scrollIntoView(Q), X();
  },
        be = e => {
    typeof e.inputType > "u" || e.inputType === "insertCompositionText" && !e.isComposing || (W = c.value, ce());
  },
        Ee = e => {
    const t = r.hits.length >= r.limit ? r.limit : r.hits.length;

    if (f === r.hits[0]) {
      f = void 0, c.value = W;
      return;
    }

    if (!f) f = r.hits[t - 1];else for (let o = t - 1; o > 0; o--) if (f === r.hits[o] || o === 1) {
      f = r.hits[o - 1];
      break;
    }
    c.value = a(f, e);
  },
        we = e => {
    const t = r.hits.length >= r.limit ? r.limit : r.hits.length;

    if (!f) {
      f = r.hits[0], c.value = a(f, e);
      return;
    }

    if (f === r.hits[t - 1]) {
      f = void 0, c.value = W;
      return;
    }

    for (let o = 0; o < t - 1; o++) if (f === r.hits[o]) {
      f = r.hits[o + 1];
      break;
    }

    c.value = a(f, e);
  },
        xe = e => {
    if (e.key === "Escape" || !c.value.length && !r.hits.length) return O();

    if (e.key === "Backspace" && (f = void 0), r.hits.length && (e.key === "ArrowUp" || e.key === "ArrowDown")) {
      e.key === "ArrowDown" ? we(e) : Ee(e), V(), e.preventDefault(), e.stopPropagation();
      return;
    }

    if (!r.query && !c.value.length) return;

    const t = (o = !1) => {
      if (!f && o && r.hits.length && (f = r.hits[0]), f) return O(), c.value = a(f, e), ie(), f;
    };

    if (e.key === "Enter") {
      m && e.preventDefault(), x(e, t());
      return;
    }

    e.key === "Tab" && ve() && (n.retainFocus !== !1 && e.preventDefault(), t(!0));
  },
        Te = () => {
    g?.when === "onFocus" && oe(), ce();
  },
        ce = () => {
    se();
    const e = c.value.replace(/\s{2,}/g, " ").trim();

    if (i?.empty && !e.length) {
      const t = i.empty(r);
      if (r.query = "", Array.isArray(t) && t.length) return r.hits = _(t, L[0]), V();

      if (O(), Z(), t) {
        const o = document.createElement("div");
        o.classList.add(d.empty), N(o, `${t}`), l.appendChild(o);
      }

      return X();
    }

    if (e.length >= A) {
      r.query = e, ee();
      const t = JSON.stringify(r.query);
      v && r.hits.length < r.limit && P[t]?.length && ee(P[t]), V(), M = setTimeout(() => {
        r.hits.length < r.limit && !R && ue();
      }, v?.debounce || 200);
    } else r.query = "", O();
  },
        ae = (e = "") => (n.diacritics && (e = K(e)), e.toLowerCase()),
        ee = e => {
    let {
      suggestions: t,
      count: o
    } = D.search(r.query, r.limit);

    if (e?.length) {
      e.push(...t);
      const p = {};

      for (const s of e) p[w(s)] = s;

      t = Object.values(p), o = t.length;
    }

    ke(t), F && Ce(t), r.hits = t, r.count = o, f = void 0, z && r.hits.length && (f = r.hits[0]);
  },
        ue = () => {
    if (!v) return;
    R = !0;
    const e = r.query,
          t = JSON.stringify(e);

    if (j[t] || !r.query.length) {
      R = !1, Y(!0);
      return;
    }

    le();
    let o = [];
    pe.get(typeof v.url == "function" ? v.url(e) : v.url.replace(v.wildcard, e), v.requestOptions).then(p => {
      o = y(p), o = _(o, L[0]), te(o);
    }, p => {
      console.error("e05", p);
    }).finally(() => {
      j[t] = !0, P[t] = o || [], R = !1, le(), o.length && r.query.length && (ee(o), V()), r.query.length && e !== r.query && ue(), Y(!0);
    });
  };

  function te(e) {
    if (e.length) for (const t of L) D.add(e, t, w);
  }

  const ke = e => {
    const t = r.query.toLowerCase();
    e.sort((o, p) => {
      const s = S(o, L[0]).toLowerCase(),
            u = S(p, L[0]).toLowerCase(),
            E = s.startsWith(t),
            b = u.startsWith(t);
      return E && b ? s.length - u.length : E ? -1 : b ? 1 : 0;
    });
  },
        Ce = e => {
    e.sort((t, o) => {
      const p = S(t, F),
            s = S(o, F);
      return !p && !s ? 0 : p ? s ? p < s ? -1 : p > s ? 1 : 0 : 1 : -1;
    });
  },
        Le = (e, t) => {
    if (!t) return;

    const p = (E => {
      const b = H(E.trim()).map(k => fe(k)).sort((k, q) => q.length - k.length);
      return new RegExp(`(${b.join("|")})`, "i");
    })(t),
          s = E => {
      let b = p.exec(E.data);

      if (n.diacritics && !b && (b = p.exec(K(E.data))), b) {
        const k = document.createElement("span");
        k.className = d.highlight;
        const q = E.splitText(b.index);
        return q.splitText(b[0].length), k.appendChild(q.cloneNode(!0)), E.parentNode?.replaceChild(k, q), !0;
      }

      return !1;
    },
          u = (E, b) => {
      let q;

      for (let G = 0; G < E.childNodes.length; G++) q = E.childNodes[G], q.nodeType === 3 ? G += b(q) ? 1 : 0 : u(q, b);
    };

    u(e, s);
  };

  function qe(e) {
    ["id", "name", "placeholder", "required", "aria-label"].forEach(t => e.removeAttribute(t)), e.setAttribute("readonly", "true"), e.setAttribute("aria-hidden", "true"), e.style.marginTop = `-${c.offsetHeight + parseInt(re.marginBottom)}px`, e.tabIndex = -1, e.className = d.hint, c.after(e);
  }

  const Se = e => {
    const t = c.value;
    if (!t || a(e) === t || // if input string is exactly the same as selectedItem
    ae(a(e)).indexOf(ae(t).replace(/\s{2,}/g, " ").trimStart()) !== 0) J.value = "";else {
      const o = a(e),
            p = new RegExp(fe(r.query), "i");
      let s = p.exec(o);
      n.diacritics && !s && (s = p.exec(K(o))), s && (J.value = t.replace(/\s?$/, "") + o.substring(s[0].length));
    }
  },
        N = (e, t) => {
    const o = document.createElement("template");
    return o.innerHTML = t, e.appendChild(o.content), t;
  },
        Oe = () => {
    setTimeout(() => {
      document.activeElement !== c && O();
    }, 50);
  };

  l.addEventListener("mousedown", function (e) {
    e.stopPropagation(), e.preventDefault();
  });

  const de = e => {
    O(), D.clear(), h && !e && U(h), j = {}, P = {}, g && (g.done = !1);
  },
        Ae = () => {
    se(), de(), $.replaceWith(c.cloneNode());
  };

  return c.addEventListener("keydown", xe), c.addEventListener("input", be), c.addEventListener("blur", Oe), c.addEventListener("focus", Te), {
    addToIndex: U,
    reset: de,
    destroy: Ae // trie, // trie exposed only for local tests

  };
};

exports.default = ze;
},{}],"apCt":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = _interopRequireDefault(require("typewriter-effect/dist/core"));

var _typeaheadStandalone = _interopRequireDefault(require("typeahead-standalone"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/**
 * SearchTeasers class initializes and manages typewriter effects,
 * typeahead suggestions, and form actions for search functionality.
 */
var SearchTeasers = /*#__PURE__*/function () {
  /**
   * Constructs a SearchTeasers instance.
   * @param {HTMLElement} elem - The root element containing search components.
   * @param {Object} APP - The global application context with configurations.
   */
  function SearchTeasers(elem, APP) {
    _classCallCheck(this, SearchTeasers);

    this.elem = elem;
    this.APP = APP; // DOM elements and data attributes

    this.termContainer = this.elem.querySelector('.js-st-term-container');
    this.searchInput = this.elem.querySelector('input[type="search"]');
    this.searchButton = this.elem.querySelector('.js-st-search');
    this.teasersMap = JSON.parse(this.elem.dataset.teasersMap);
    this.terms = this.teasersMap.map(function (term) {
      return term.term;
    });
    this.tabIcon = this.elem.querySelector('.js-st-tab-icon');
    this.closeButton = this.elem.querySelector('.js-st-close');
    this.suggestionContainer = null;
    this.previousInputValue = ''; // Typewriter configuration

    this.typeWriter = {
      instance: null,
      isRunning: true,
      activeTeaser: null
    }; // Typeahead configuration

    this.typeAhead = {
      instance: null,
      hintInput: null
    };
    this.classes = {
      hasSuggestion: 'searchTeasers--has-suggestion',
      hasFocus: 'searchTeasers--has-focus'
    };
    this.flags = {
      isSearchFocused: false,
      isHintNotEmpty: false,
      isSearchEmpty: true,
      isMobile: window.matchMedia('(max-width:1024px)').matches,
      isGlobalAnimationsPaused: document.cookie.includes('ts_ac_animation=false'),
      isEntity: document.body.classList.contains('entity')
    };
  }
  /**
   * Initializes the typewriter effect with terms and corresponding actions.
   */


  _createClass(SearchTeasers, [{
    key: "initTypeWriter",
    value: function initTypeWriter() {
      var _this = this;

      if (this.flags.isGlobalAnimationsPaused) return;
      if (this.typeWriter.instance) return; // console.log('initTypeWriter');

      this.typeWriter.instance = new _core.default(this.termContainer, {
        autoStart: false,
        loop: true,
        delay: 50,
        deleteSpeed: 50
      });
      this.teasersMap.forEach(function (teaser) {
        var term = teaser.term;

        _this.typeWriter.instance.callFunction(function () {
          return _this.setFormAction(teaser);
        }).typeString(term).pauseFor(1500) // after typewriter ends
        .callFunction(function () {
          if (!_this.typeWriter.isRunning) return; // if the user is focused on the input, pause the typewriter until they're done

          if (_this.flags.isSearchFocused) {
            _this.stopTypewriter(false);
          } else {
            _this.startTypewriter(false);
          }
        }).pauseFor(1500).deleteAll().pauseFor(1700);
      });
      this.typeWriter.instance.start();
    }
    /**
     * Initializes typeahead functionality for the search input.
     */

  }, {
    key: "initTypeAhead",
    value: function initTypeAhead() {
      if (this.typeAhead.instance) return; // console.log('initTypeAhead');

      this.typeAhead.instance = (0, _typeaheadStandalone.default)({
        input: this.searchInput,
        source: {
          local: this.terms
        }
      });
      this.typeAhead.hintInput = this.elem.querySelector('.tt-hint');
    }
    /**
     * Toggles typewriter activity based on the header's visibility on scroll.
     */

  }, {
    key: "onScroll",
    value: function onScroll() {
      if (!this.typeWriter.instance) return;
      var isVisible = this.APP.header.isVisible;
      if (isVisible === this.typeWriter.isRunning) return;

      if (isVisible) {
        this.typeWriter.instance.start();
      } else {
        this.typeWriter.instance.stop();
      }

      this.typeWriter.isRunning = isVisible;
    }
    /**
     * Handles input changes and updates form action based on input value.
     * @param {Event} e - The input event.
     */

  }, {
    key: "onInputChange",
    value: function onInputChange(e) {
      var _this$typeAhead$hintI, _this$typeAhead$hintI2;

      var value = e.target.value;
      if (value === this.previousInputValue) return;
      this.previousInputValue = value;
      this.flags.isSearchEmpty = value.length === 0;
      this.isHintNotEmpty = ((_this$typeAhead$hintI = this.typeAhead.hintInput) === null || _this$typeAhead$hintI === void 0 ? void 0 : (_this$typeAhead$hintI2 = _this$typeAhead$hintI.value) === null || _this$typeAhead$hintI2 === void 0 ? void 0 : _this$typeAhead$hintI2.length) > 0 || false; // console.log('onInputChange', value);

      if (this.flags.isSearchEmpty) {
        this.searchInput.removeAttribute('name');
        this.startTypewriter();
        this.resetFormAction();

        if (this.flags.isGlobalAnimationsPaused) {
          this.toggleTabIcon(false);
        } else {
          this.toggleTabIcon(true);
        }
      } else {
        this.toggleTermContainer(false);
        this.stopTypewriter();
        this.updateFormAction(value);
        this.toggleTabIcon(this.isHintNotEmpty);
        this.toggleCloseButton(true); // hide the hint input if the entered value is longer than 31 characters, as it will clash with the search input content

        var maxChars = this.flags.isMobile ? 27 : 31;

        if (this.isHintNotEmpty && value.length > maxChars) {
          var _this$typeAhead$hintI3;

          (_this$typeAhead$hintI3 = this.typeAhead.hintInput) === null || _this$typeAhead$hintI3 === void 0 ? void 0 : _this$typeAhead$hintI3.setAttribute('hidden', true);
        } else {
          var _this$typeAhead$hintI4;

          (_this$typeAhead$hintI4 = this.typeAhead.hintInput) === null || _this$typeAhead$hintI4 === void 0 ? void 0 : _this$typeAhead$hintI4.removeAttribute('hidden');
        }
      }
    }
    /**
     * Sets form action and method based on the active teaser.
     * @param {Object} teaser - The teaser object containing term and landing_page.
     */

  }, {
    key: "setFormAction",
    value: function setFormAction(teaser) {
      if (!teaser) return;
      this.typeWriter.activeTeaser = teaser;
      this.elem.setAttribute('action', teaser.landing_page);
      this.elem.setAttribute('method', 'post');
    }
    /**
     * Updates form action based on the input value and hides term container if no match.
     * @param {string} value - The current value in the search input.
     */

  }, {
    key: "updateFormAction",
    value: function updateFormAction(value) {
      var matchingTeaser = this.teasersMap.find(function (teaser) {
        return teaser.term === value;
      });

      if (matchingTeaser) {
        this.searchInput.removeAttribute('name');
        this.elem.setAttribute('action', matchingTeaser.landing_page);
        this.elem.setAttribute('method', 'post');
      } else {
        this.searchInput.setAttribute('name', 's');
        this.elem.setAttribute('action', window.location.origin);
        this.elem.setAttribute('method', 'get');
      }
    }
    /**
     * Resets form action to the active teaser's action and shows term container.
     */

  }, {
    key: "resetFormAction",
    value: function resetFormAction() {
      if (this.typeWriter.activeTeaser) {
        this.setFormAction(this.typeWriter.activeTeaser);
      }
    }
    /**
     * Stops the typewriter and keeps active teaser intact.
     */

  }, {
    key: "stopTypewriter",
    value: function stopTypewriter() {
      var hideTerm = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      if (!this.typeWriter.instance || !this.typeWriter.isRunning) return;
      this.typeWriter.instance.stop();
      this.typeWriter.isRunning = false;
      this.toggleTermContainer(!hideTerm);
    }
  }, {
    key: "startTypewriter",
    value: function startTypewriter() {
      var showTerm = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      if (!this.typeWriter.instance || this.typeWriter.isRunning) return;
      this.typeWriter.instance.start();
      this.typeWriter.isRunning = true;
      this.toggleTermContainer(showTerm);
    }
  }, {
    key: "toggleTabIcon",
    value: function toggleTabIcon(bool) {
      if (bool) {
        this.elem.classList.add(this.classes.hasSuggestion);
        if (this.flags.isGlobalAnimationsPaused && this.flags.isSearchEmpty) return;
        this.tabIcon.removeAttribute('hidden');
      } else {
        this.elem.classList.remove(this.classes.hasSuggestion);
        this.tabIcon.setAttribute('hidden', true);
      }
    }
  }, {
    key: "toggleCloseButton",
    value: function toggleCloseButton(bool) {
      if (bool) {
        this.closeButton.style.display = 'block';
        this.closeButton.setAttribute('aria-hidden', 'false');
      } else {
        this.closeButton.style.display = 'none';
        this.closeButton.setAttribute('aria-hidden', 'true');
      }
    }
  }, {
    key: "toggleTermContainer",
    value: function toggleTermContainer(bool) {
      this.termContainer.hidden = !bool;
    }
  }, {
    key: "onInputFocus",
    value: function onInputFocus() {
      // console.log('onInputFocus');
      this.flags.isSearchFocused = true;
      this.elem.classList.add(this.classes.hasFocus);
      if (!this.flags.isSearchEmpty) return;
      this.toggleCloseButton(true);
      this.toggleTabIcon(true);
    }
  }, {
    key: "onInputBlur",
    value: function onInputBlur(e) {
      this.elem.classList.remove(this.classes.hasFocus); // console.log('onInputBlur');

      this.flags.isSearchFocused = false;

      if (this.flags.isSearchEmpty) {
        this.startTypewriter();
        this.toggleCloseButton(false);
      } else {
        this.toggleCloseButton(true);
      }

      this.toggleTabIcon(false);
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(e) {
      // console.log('onKeyDown', e.key);
      // if the user presses escape, blur the input and hide the close button and tab icon
      if (e.key === 'Escape' || e.key === 'Esc') {
        this.searchInput.blur();
      } // if the user presses tab and the search input is empty, populate it with the current term


      if (e.key === 'Tab' && this.flags.isSearchEmpty) {
        if (!this.typeWriter.activeTeaser) return;
        e.preventDefault();
        if (this.searchInput.value === this.typeWriter.activeTeaser.term) return;
        this.searchInput.value = this.typeWriter.activeTeaser.term;
        this.searchInput.dispatchEvent(new Event('input'));
      }
    }
  }, {
    key: "onCloseClick",
    value: function onCloseClick() {
      // console.log('onCloseClick');
      if (this.flags.isSearchEmpty) return;
      this.flags.isSearchEmpty = true;
      this.searchInput.value = '';
      this.previousInputValue = '';
      this.searchInput.dispatchEvent(new Event('input'));
      this.searchInput.focus();
      this.startTypewriter();
    }
    /* a11y */

  }, {
    key: "updateAnimation",
    value: function updateAnimation() {
      if (document.cookie.includes("ts_ac_animation=false")) {
        this.flags.isGlobalAnimationsPaused = true; // destroy the typewriter instance if it exists

        if (this.typeWriter.instance) {
          this.typeWriter.instance.stop();
          this.typeWriter.instance = null; // clear the term container

          this.termContainer.innerHTML = "";
        }
      } else {
        this.flags.isGlobalAnimationsPaused = false;
        this.typeWriter.instance = null;
        this.initTypeWriter();
      }
    } // /* a11y */

  }, {
    key: "setupAccessibilityControls",
    value: function setupAccessibilityControls() {
      var _this2 = this;

      window.addEventListener("AC_animation", function () {
        _this2.updateAnimation();
      });
    }
    /**
     * Initializes all components and event listeners.
     */

  }, {
    key: "init",
    value: function init() {
      var _this3 = this;

      this.setupAccessibilityControls();

      if (!this.flags.isMobile && !this.flags.isEntity) {
        this.initTypeWriter();
        this.initTypeAhead();
      } // slide nav on entity pages


      document.addEventListener('slide-nav-toggle', function (e) {
        if (_this3.flags.isMobile) return;

        if (e.detail.isOpen) {
          _this3.initTypeWriter();

          _this3.initTypeAhead();

          _this3.startTypewriter();
        } else {
          _this3.stopTypewriter(false);
        }
      }); // watch for mobile-nav-toggle custom event to initialize the typewriter and typeahead

      document.addEventListener('nav-toggle', function (e) {
        // // stop the typewriter if the mobile nav is open
        if (e.detail.isOpen) {
          _this3.initTypeWriter();

          _this3.initTypeAhead();

          _this3.startTypewriter();
        } else {
          _this3.stopTypewriter(false);
        }
      });

      if (!this.flags.isEntity) {
        window.addEventListener('scroll', this.onScroll.bind(this));
      }

      this.searchInput.addEventListener('input', this.onInputChange.bind(this));
      this.searchInput.addEventListener('focus', this.onInputFocus.bind(this));
      this.searchInput.addEventListener('blur', this.onInputBlur.bind(this));
      this.searchInput.addEventListener('keydown', this.onKeyDown.bind(this));
      this.closeButton.addEventListener('click', this.onCloseClick.bind(this));
    }
  }]);

  return SearchTeasers;
}();

exports.default = SearchTeasers;
},{"typewriter-effect/dist/core":"LxiQ","typeahead-standalone":"O6M3"}],"NrxP":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _initComponents2 = require("./../utils/initComponents");

var _GlobalHeader2 = _interopRequireDefault(require("./../components/GlobalHeader"));

var _SearchTeasers2 = _interopRequireDefault(require("./../components/SearchTeasers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Utilities
// ---------------------------------------------
// Components
// ---------------------------------------------
var APP = {}; // Helpers
// ---------------------------------------------

APP.helpers = {
  initComponents: function initComponents($elem) {
    return (0, _initComponents2.initComponents)($elem, APP);
  }
}; // Header

APP.header = {
  isVisible: true
};
APP.components = {
  GlobalHeader: function GlobalHeader(elem) {
    return new _GlobalHeader2.default(elem, APP).init();
  },
  SearchTeasers: function SearchTeasers(elem) {
    return new _SearchTeasers2.default(elem, APP).init();
  }
};
var _default = APP;
exports.default = _default;
},{"./../utils/initComponents":"npus","./../components/GlobalHeader":"ILnJ","./../components/SearchTeasers":"apCt"}],"aKYQ":[function(require,module,exports) {
"use strict";

var _avatureObj = _interopRequireDefault(require("./app/avatureObj"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Document Ready
// ---------------------------------------------
document.addEventListener("DOMContentLoaded", function (event) {
  _avatureObj.default.helpers.initComponents(document.body, _avatureObj.default);
});
},{"./app/avatureObj":"NrxP"}]},{},["aKYQ"], null)
//# sourceMappingURL=avature.js.map