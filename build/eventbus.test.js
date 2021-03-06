/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./tests/executetests.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/eventbus.js":
/*!*************************!*\
  !*** ./lib/eventbus.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _listener = __webpack_require__(/*! ./listener.js */ \"./lib/listener.js\");\n\nvar _listener2 = _interopRequireDefault(_listener);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction EventBus() {\n    this.events = Object.create(null);\n}\n\nEventBus.prototype.getListenerCountOfEvent = function (eventName) {\n    return this.events[eventName].length;\n};\n\nEventBus.prototype.once = function (eventName, listenerFunction) {\n    if (this.events[eventName] === undefined) this.events[eventName] = [];\n\n    if (this.events['addListener'] !== undefined) this.emit('addListener', eventName);\n\n    this.events[eventName].push(new _listener2.default(listenerFunction, true));\n\n    return this;\n};\n\nEventBus.prototype.on = function (eventName, listenerFunction) {\n    if (this.events[eventName] === undefined) this.events[eventName] = [];\n\n    if (this.events['addListener'] !== undefined) this.emit('addListener', eventName);\n\n    this.events[eventName].push(new _listener2.default(listenerFunction));\n\n    return this;\n};\n\nEventBus.prototype.off = function (eventName, listenerFunction) {\n    var listenerIndex = this.events[eventName].findIndex(function (el) {\n        return el.fn === listenerFunction;\n    });\n\n    if (listenerIndex > -1) this.events[eventName].splice(listenerIndex, 1);\n\n    if (this.events['removeListener'] !== undefined) this.emit('removeListener', eventName);\n\n    if (!this.events[eventName].length) this.events[eventName] = undefined;\n\n    return this;\n};\n\nEventBus.prototype.emit = function (eventName) {\n    var listeners = this.events[eventName];\n\n    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {\n        args[_key - 1] = arguments[_key];\n    }\n\n    for (var i = 0; i < listeners.length; i++) {\n        var fn = listeners[i].fn;\n\n        if (listeners[i].isOnce) listeners.splice(i, 1);\n\n        fn.apply(undefined, args);\n    }\n\n    return this;\n};\n\nEventBus.prototype.getAllEventsName = function () {\n    return Object.keys(this.events);\n};\n\nEventBus.prototype.getAllListenersOfEvent = function (eventName) {\n    return this.events[eventName];\n};\n\nEventBus.prototype.removeAllListenersOfEvent = function (eventName) {\n    var listeners = this.getAllListenersOfEvent(eventName);\n\n    if (listeners) {\n        this.off(eventName, listeners[0].fn);\n        this.removeAllListenersOfEvent(eventName);\n    }\n\n    return this;\n};\n\nexports.default = EventBus;\n\n//# sourceURL=webpack:///./lib/eventbus.js?");

/***/ }),

/***/ "./lib/listener.js":
/*!*************************!*\
  !*** ./lib/listener.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nfunction Listener(fn) {\n    var isOnce = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;\n\n    this.fn = fn;\n    this.isOnce = isOnce;\n}\n\nexports.default = Listener;\n\n//# sourceURL=webpack:///./lib/listener.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\n\n// This works in non-strict mode\ng = (function() {\n\treturn this;\n})();\n\ntry {\n\t// This works if eval is allowed (see CSP)\n\tg = g || new Function(\"return this\")();\n} catch (e) {\n\t// This works if the window reference is available\n\tif (typeof window === \"object\") g = window;\n}\n\n// g can still be undefined, but nothing to do about it...\n// We return undefined, instead of nothing here, so it's\n// easier to handle this case. if(!global) { ...}\n\nmodule.exports = g;\n\n\n//# sourceURL=webpack:///(webpack)/buildin/global.js?");

/***/ }),

/***/ "./tests/cacau-1.1.0.js":
/*!******************************!*\
  !*** ./tests/cacau-1.1.0.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\n!function (t) {\n  var e = {};function n(r) {\n    if (e[r]) return e[r].exports;var o = e[r] = { i: r, l: !1, exports: {} };return t[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports;\n  }n.m = t, n.c = e, n.d = function (t, e, r) {\n    n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: r });\n  }, n.r = function (t) {\n    \"undefined\" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: \"Module\" }), Object.defineProperty(t, \"__esModule\", { value: !0 });\n  }, n.t = function (t, e) {\n    if (1 & e && (t = n(t)), 8 & e) return t;if (4 & e && \"object\" == (typeof t === \"undefined\" ? \"undefined\" : _typeof(t)) && t && t.__esModule) return t;var r = Object.create(null);if (n.r(r), Object.defineProperty(r, \"default\", { enumerable: !0, value: t }), 2 & e && \"string\" != typeof t) for (var o in t) {\n      n.d(r, o, function (e) {\n        return t[e];\n      }.bind(null, o));\n    }return r;\n  }, n.n = function (t) {\n    var e = t && t.__esModule ? function () {\n      return t.default;\n    } : function () {\n      return t;\n    };return n.d(e, \"a\", e), e;\n  }, n.o = function (t, e) {\n    return Object.prototype.hasOwnProperty.call(t, e);\n  }, n.p = \"\", n(n.s = 0);\n}([function (t, e, n) {\n  \"use strict\";\n  (function (e) {\n    var r = \"function\" == typeof Symbol && \"symbol\" == _typeof(Symbol.iterator) ? function (t) {\n      return typeof t === \"undefined\" ? \"undefined\" : _typeof(t);\n    } : function (t) {\n      return t && \"function\" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? \"symbol\" : typeof t === \"undefined\" ? \"undefined\" : _typeof(t);\n    };var o = new (function (t) {\n      return t && t.__esModule ? t : { default: t };\n    }(n(2)).default)();var u = function u(t) {\n      for (var e = arguments.length, n = Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++) {\n        n[r - 1] = arguments[r];\n      }var o = [],\n          u = [],\n          i = performance.now(),\n          l = !0,\n          f = !1,\n          E = void 0;try {\n        for (var d, s = n[Symbol.iterator](); !(l = (d = s.next()).done); l = !0) {\n          var _ = d.value;!0 === _.result ? o.push(_) : u.push(_);\n        }\n      } catch (t) {\n        f = !0, E = t;\n      } finally {\n        try {\n          !l && s.return && s.return();\n        } finally {\n          if (f) throw E;\n        }\n      }var p = performance.now() - i,\n          y = o.length,\n          T = u.length,\n          C = { fileName: t, duration: p, passing: o, failing: u, lenPassing: y, lenFailing: T },\n          N = T > 0 ? a(C) : c(C);console.log(\"%c\" + N.text, N.color);\n    },\n        i = function i(t, e) {\n      e(function (e) {\n        return u(t, E(t, e));\n      });\n    },\n        a = function a(t) {\n      return { text: l(t) + f(t), color: \"color:#B03A2E;\" };\n    },\n        l = function l(t) {\n      return \"Failing in \" + t.fileName + \":\\n\\nPassing: \" + t.lenPassing + \" (\" + t.duration.toFixed(2) + \"ms)\\nFailing: \" + t.lenFailing + \"\\n\\n\";\n    },\n        f = function f(t) {\n      for (var e = \"\", n = 0; n < t.lenFailing; n++) {\n        e += n + \") \" + t.failing[n].name + \" (\" + t.failing[n].duration.toFixed(2) + \"ms)\\n       CheckError: \" + t.failing[n].actual + \" \" + t.failing[n].checkType + \" \" + t.failing[n].expected + \"\\n\\n       ✓ Actual: \" + t.failing[n].actual + \"\\n       ✓ Expected: \" + t.failing[n].expected + \"\\n\\n\";\n      }return e += \"\\n\";\n    },\n        c = function c(t) {\n      return { text: \"✓ Passing \" + t.fileName + \"\\n\", color: \"color:#27AE60;\" };\n    },\n        E = function E(t, e, n) {\n      var r = performance.now(),\n          o = void 0;try {\n        return d(n) ? e(n()) : e(), { name: t, duration: o = performance.now() - r, result: !0 };\n      } catch (e) {\n        if (o = performance.now() - r, \"AssertionError\" === e.name) return s(t, o, e);throw e;\n      }\n    },\n        d = function d(t) {\n      return \"function\" == typeof t;\n    },\n        s = function s(t, e, n) {\n      return { name: t, duration: e, result: n.result, actual: n.actual, expected: n.expected, checkType: n.operator };\n    },\n        _ = function _() {\n      return p.apply(void 0, arguments);\n    },\n        p = function p() {\n      for (var t = arguments.length, e = Array(t), n = 0; n < t; n++) {\n        e[n] = arguments[n];\n      }var r = {},\n          o = !0,\n          u = !1,\n          i = void 0;try {\n        for (var a, l = e[Symbol.iterator](); !(o = (a = l.next()).done); o = !0) {\n          var f = a.value;y(f, r);\n        }\n      } catch (t) {\n        u = !0, i = t;\n      } finally {\n        try {\n          !o && l.return && l.return();\n        } finally {\n          if (u) throw i;\n        }\n      }return r;\n    },\n        y = function t(e, n) {\n      for (var r = Object.keys(e), o = void 0, u = void 0, i = 0; i < r.length; i++) {\n        u = e[o = r[i]], T(n[o]) ? n[o] = n[o] : n[o] = {}, T(u) ? t(u, n[o]) : n[o] = u;\n      }\n    },\n        T = function T(t) {\n      return \"object\" === (void 0 === t ? \"undefined\" : r(t)) && null !== t;\n    };e.TEST = u, e.TEST_ASYNC = i, e.TEST_F = E, e.CREATE_MOCK = _, e.CHECK_TRUE = o.isTrue, e.CHECK_NOT_TRUE = o.isNotTrue, e.CHECK_FALSE = o.isFalse, e.CHECK_NOT_FALSE = o.isNotFalse, e.CHECK_UNDEFINED = o.isUndefined, e.CHECK_NOT_UNDEFINED = o.isNotUndefined, e.CHECK_NULL = o.isNull, e.CHECK_NOT_NULL = o.isNotNull, e.CHECK_ACTUAL_EQUAL_EXPECTED = o.actualEqualExpected, e.CHECK_ACTUAL_DIFFERENT_EXPECTED = o.actualNotEqualExpected, e.CHECK_ACTUAL_EQUAL_EXPECTED_OBJECT = o.actualDeepEqualExpected, e.cacau = { TEST: u, TEST_ASYNC: i, TEST_F: E, CREATE_MOCK: _, CHECK_TRUE: o.isTrue, CHECK_NOT_TRUE: o.isNotTrue, CHECK_FALSE: o.isFalse, CHECK_NOT_FALSE: o.isNotFalse, CHECK_UNDEFINED: o.isUndefined, CHECK_NOT_UNDEFINED: o.isNotUndefined, CHECK_NULL: o.isNull, CHECK_NOT_NULL: o.isNotNull, CHECK_ACTUAL_EQUAL_EXPECTED: o.actualEqualExpected, CHECK_ACTUAL_DIFFERENT_EXPECTED: o.actualNotEqualExpected, CHECK_ACTUAL_EQUAL_EXPECTED_OBJECT: o.actualDeepEqualExpected }, t.exports = e;\n  }).call(this, n(1));\n}, function (t, e) {\n  var n;n = function () {\n    return this;\n  }();try {\n    n = n || Function(\"return this\")() || (0, eval)(\"this\");\n  } catch (t) {\n    \"object\" == (typeof window === \"undefined\" ? \"undefined\" : _typeof(window)) && (n = window);\n  }t.exports = n;\n}, function (t, e, n) {\n  \"use strict\";\n  Object.defineProperty(e, \"__esModule\", { value: !0 });var r = i(n(3)),\n      o = i(n(5)),\n      u = i(n(6));function i(t) {\n    return t && t.__esModule ? t : { default: t };\n  }function a() {}a.prototype.isTrue = function (t) {\n    new r.default(t, !0, u.default.IS_TRUE, o.default.EQUAL);\n  }, a.prototype.isNotTrue = function (t) {\n    new r.default(t, !1, u.default.IS_NOT_TRUE, o.default.NOT_EQUAL);\n  }, a.prototype.isFalse = function (t) {\n    new r.default(t, !1, u.default.IS_FALSE, o.default.EQUAL);\n  }, a.prototype.isNotFalse = function (t) {\n    new r.default(t, !0, u.default.IS_NOT_FALSE, o.default.NOT_EQUAL);\n  }, a.prototype.isUndefined = function (t) {\n    new r.default(t, void 0, u.default.IS_UNDEFINED, o.default.EQUAL);\n  }, a.prototype.isNotUndefined = function (t) {\n    new r.default(t, !0, u.default.IS_NOT_UNDEFINED, o.default.NOT_EQUAL);\n  }, a.prototype.isNull = function (t) {\n    new r.default(t, null, u.default.IS_NULL, o.default.EQUAL);\n  }, a.prototype.isNotNull = function (t) {\n    new r.default(t, !0, u.default.IS_NOT_NULL, o.default.NOT_EQUAL);\n  }, a.prototype.actualEqualExpected = function (t, e) {\n    new r.default(t, e, u.default.ACTUAL_EQUAL_EXPECTED, o.default.EQUAL);\n  }, a.prototype.actualNotEqualExpected = function (t, e) {\n    new r.default(t, e, u.default.ACTUAL_NOT_EQUAL_EXPECTED, o.default.NOT_EQUAL);\n  }, a.prototype.actualDeepEqualExpected = function (t, e) {\n    new r.default(t, e, u.default.ACTUAL_DEEP_EQUAL_EXPECTED, o.default.EQUAL);\n  }, e.default = a;\n}, function (t, e, n) {\n  \"use strict\";\n  Object.defineProperty(e, \"__esModule\", { value: !0 });var r = function (t) {\n    return t && t.__esModule ? t : { default: t };\n  }(n(4));function o(t, e, n, r) {\n    this.assert(t, e, n, r);\n  }o.prototype.assert = function (t, e, n, o) {\n    var u = n(t, e),\n        i = { actual: t, expected: e, result: u, operator: o },\n        a = \"actual: \" + t + \" \" + o + \" expected: \" + e;if (!u) throw new r.default(a, i);\n  }, e.default = o;\n}, function (t, e, n) {\n  \"use strict\";\n  Object.defineProperty(e, \"__esModule\", { value: !0 });var r = \"function\" == typeof Symbol && \"symbol\" == _typeof(Symbol.iterator) ? function (t) {\n    return typeof t === \"undefined\" ? \"undefined\" : _typeof(t);\n  } : function (t) {\n    return t && \"function\" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? \"symbol\" : typeof t === \"undefined\" ? \"undefined\" : _typeof(t);\n  };function o(t, e, n) {\n    if (this.message = t || \"AssertionError message not specified\", u(e = e || {}, this), n = n || o, Error.captureStackTrace) Error.captureStackTrace(this, n);else try {\n      throw new Error();\n    } catch (t) {\n      this.stack = t.stack;\n    }\n  }o.prototype = Object.create(Error.prototype), o.prototype.constructor = o, o.prototype.name = \"AssertionError\";var u = function t(e, n) {\n    for (var r = Object.keys(e), o = void 0, u = void 0, a = 0; a < r.length; a++) {\n      u = e[o = r[a]], n[o] = i(n[o]) ? n[o] : {}, i(u) ? t(u, n[o]) : n[o] = u;\n    }\n  },\n      i = function i(t) {\n    return \"object\" === (void 0 === t ? \"undefined\" : r(t)) && null !== t;\n  };e.default = o;\n}, function (t, e, n) {\n  \"use strict\";\n  Object.defineProperty(e, \"__esModule\", { value: !0 });e.default = { EQUAL: \"===\", NOT_EQUAL: \"!==\" };\n}, function (t, e, n) {\n  \"use strict\";\n  Object.defineProperty(e, \"__esModule\", { value: !0 });var r = function (t) {\n    return t && t.__esModule ? t : { default: t };\n  }(n(7));var o = { IS_TRUE: function IS_TRUE(t) {\n      return !0 === t;\n    }, IS_NOT_TRUE: function IS_NOT_TRUE(t) {\n      return !0 !== t;\n    }, IS_FALSE: function IS_FALSE(t) {\n      return !1 === t;\n    }, IS_NOT_FALSE: function IS_NOT_FALSE(t) {\n      return !1 !== t;\n    }, IS_UNDEFINED: function IS_UNDEFINED(t) {\n      return void 0 === t;\n    }, IS_NOT_UNDEFINED: function IS_NOT_UNDEFINED(t) {\n      return void 0 !== t;\n    }, IS_NULL: function IS_NULL(t) {\n      return null === t;\n    }, IS_NOT_NULL: function IS_NOT_NULL(t) {\n      return null !== t;\n    }, ACTUAL_EQUAL_EXPECTED: function ACTUAL_EQUAL_EXPECTED(t, e) {\n      return t === e;\n    }, ACTUAL_NOT_EQUAL_EXPECTED: function ACTUAL_NOT_EQUAL_EXPECTED(t, e) {\n      return t !== e;\n    }, ACTUAL_DEEP_EQUAL_EXPECTED: function ACTUAL_DEEP_EQUAL_EXPECTED(t, e) {\n      return r.default.deepEquals(t, e);\n    } };e.default = o;\n}, function (t, e, n) {\n  \"use strict\";\n  Object.defineProperty(e, \"__esModule\", { value: !0 });var r = { deepEquals: function (t) {\n      return t && t.__esModule ? t : { default: t };\n    }(n(8)).default };e.default = r;\n}, function (t, e, n) {\n  \"use strict\";\n  Object.defineProperty(e, \"__esModule\", { value: !0 });var r = \"function\" == typeof Symbol && \"symbol\" == _typeof(Symbol.iterator) ? function (t) {\n    return typeof t === \"undefined\" ? \"undefined\" : _typeof(t);\n  } : function (t) {\n    return t && \"function\" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? \"symbol\" : typeof t === \"undefined\" ? \"undefined\" : _typeof(t);\n  },\n      o = function t(e, n) {\n    var o = void 0,\n        l = void 0,\n        f = void 0,\n        c = void 0;if (i(e) || i(n)) return !1;if ((void 0 === e ? \"undefined\" : r(e)) !== (void 0 === n ? \"undefined\" : r(n))) return !1;if (\"function\" == typeof e) return e.toString() === n.toString();if (a(e) ? (o = Object.keys(e), l = Object.keys(n), f = o.length, c = l.length) : (f = 0, c = 0), f !== c) return !1;if (0 === f) return !(e !== n && !u(e, n));for (var E = 0; E < f; E++) {\n      var d = o[E];if (e[d] !== n[d]) {\n        if (t(e[d], n[d])) continue;return !1;\n      }\n    }return !0;\n  },\n      u = function u(t, e) {\n    var n = Array.isArray(t) && Array.isArray(e),\n        r = a(t) && a(e);return !(!n && (Array.isArray(t) || Array.isArray(e))) && !(!n && !r);\n  },\n      i = function i(t) {\n    return void 0 === t || null === t;\n  },\n      a = function a(t) {\n    return \"object\" === (void 0 === t ? \"undefined\" : r(t)) && null !== t;\n  };e.default = function (t, e) {\n    return a(t) || a(e) ? !(!a(t) || !a(e)) && o(t, e) : t === e;\n  };\n}]);\n\n//# sourceURL=webpack:///./tests/cacau-1.1.0.js?");

/***/ }),

/***/ "./tests/executetests.js":
/*!*******************************!*\
  !*** ./tests/executetests.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n__webpack_require__(/*! ./unit/eventbus_test */ \"./tests/unit/eventbus_test.js\");\n\n//# sourceURL=webpack:///./tests/executetests.js?");

/***/ }),

/***/ "./tests/unit/eventbus_test.js":
/*!*************************************!*\
  !*** ./tests/unit/eventbus_test.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(global) {\n\nvar _cacau = __webpack_require__(/*! ../cacau-1.1.0.js */ \"./tests/cacau-1.1.0.js\");\n\nvar cacau = _interopRequireWildcard(_cacau);\n\nvar _eventbus = __webpack_require__(/*! LIB/eventbus.js */ \"./lib/eventbus.js\");\n\nvar _eventbus2 = _interopRequireDefault(_eventbus);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nconsole.log(global); //require('../cacau-1.1.0.js');\n\n\nTEST('EventBus', TEST_F('TestGetListenerCountOfEventCheckEventListenersLength', function () {\n    var eventBus = new _eventbus2.default();\n\n    var expectedQuantityListeners = 1;\n\n    var listener1 = function listener1() {};\n    eventBus.events['event1'] = [listener1];\n\n    var actualQuantityListeners = eventBus.getListenerCountOfEvent('event1');\n\n    CHECK_ACTUAL_EQUAL_EXPECTED(actualQuantityListeners, expectedQuantityListeners);\n}), TEST_F('TestOnceCheckListenerCountOfEvent', function () {\n    var eventBus = new _eventbus2.default();\n\n    var expectedQuantityListeners = 1;\n\n    eventBus.once('event1', function () {});\n\n    var actualQuantityListeners = eventBus.getListenerCountOfEvent('event1');\n\n    CHECK_ACTUAL_EQUAL_EXPECTED(actualQuantityListeners, expectedQuantityListeners);\n}), TEST_F('TestOnCheckListenerCountOfEvent', function () {\n    var eventBus = new _eventbus2.default();\n\n    var expectedQuantityListeners = 1;\n\n    eventBus.on('event1', function () {});\n\n    var actualQuantityListeners = eventBus.getListenerCountOfEvent('event1');\n\n    CHECK_ACTUAL_EQUAL_EXPECTED(actualQuantityListeners, expectedQuantityListeners);\n}), TEST_F('TestOffCheckListenerCountOfEvent', function () {\n    var eventBus = new _eventbus2.default();\n\n    var expectedQuantityListeners = 1;\n\n    var listener1 = function listener1() {};\n    var listener2 = function listener2() {};\n\n    eventBus.on('event1', listener1);\n    eventBus.on('event1', listener2);\n\n    eventBus.off('event1', listener1);\n\n    var actualQuantityListeners = eventBus.getListenerCountOfEvent('event1');\n\n    CHECK_ACTUAL_EQUAL_EXPECTED(actualQuantityListeners, expectedQuantityListeners);\n}), TEST_F('TestOnAndEmitWithoutArgsCheckChangeMockObjInListenerFunction', function () {\n    var eventBus = new _eventbus2.default();\n    var mockX = { x: 0 };\n\n    var expectedX = mockX.x + 1;\n\n    eventBus.on('event1', function () {\n        mockX.x++;\n    });\n    eventBus.emit('event1');\n\n    var actualX = mockX.x;\n\n    CHECK_ACTUAL_EQUAL_EXPECTED(actualX, expectedX);\n}), TEST_F('TestOnceAndEmitWithoutArgsCheckChangeMockObjInListenerFunction', function () {\n    var eventBus = new _eventbus2.default();\n    var mockX = { x: 0 };\n\n    var expectedX = mockX.x + 1;\n\n    eventBus.once('event1', function () {\n        mockX.x++;\n    });\n    eventBus.emit('event1');\n    eventBus.emit('event1');\n\n    var actualX = mockX.x;\n\n    CHECK_ACTUAL_EQUAL_EXPECTED(actualX, expectedX);\n}), TEST_F('TestOnAndEmitWithOneArgCheckChangeMockObjInListenerFunction', function () {\n    var eventBus = new _eventbus2.default();\n    var mockX = { x: 0 };\n\n    var expectedX = mockX.x + 1;\n\n    eventBus.on('event1', function (obj) {\n        obj.x++;\n    });\n    eventBus.emit('event1', mockX);\n\n    var actualX = mockX.x;\n\n    CHECK_ACTUAL_EQUAL_EXPECTED(actualX, expectedX);\n}), TEST_F('TestOnAndEmitWithThreeArgsCheckSumMocksObjInListenerFunction', function () {\n    var eventBus = new _eventbus2.default();\n    var x = 1;\n    var y = 1;\n    var mockSum = { sum: 0 };\n\n    var expectedSumXY = x + y;\n\n    eventBus.on('event1', function (_x, _y, sum) {\n        sum.sum = _x + _y;\n    });\n    eventBus.emit('event1', x, y, mockSum);\n\n    var actualSumXY = mockSum.sum;\n\n    CHECK_ACTUAL_EQUAL_EXPECTED(actualSumXY, expectedSumXY);\n}), TEST_F('TestEventAddListenerOnCheckChangeMockObjInListenerFunction', function () {\n    var eventBus = new _eventbus2.default();\n    var mockX = { x: 0 };\n\n    var expectedX = mockX.x + 1;\n\n    eventBus.on('addListener', function () {\n        mockX.x++;\n    });\n    eventBus.on('event1', function () {});\n\n    var actualX = mockX.x;\n\n    CHECK_ACTUAL_EQUAL_EXPECTED(actualX, expectedX);\n}), TEST_F('TestEventAddListenerOnCheckEventName', function () {\n    var eventBus = new _eventbus2.default();\n    var eventName = '';\n\n    var expectedEventName = 'event1';\n\n    eventBus.on('addListener', function (_eventName) {\n        eventName = _eventName;\n    });\n    eventBus.on('event1', function () {});\n\n    var actualEventName = eventName;\n\n    CHECK_ACTUAL_EQUAL_EXPECTED(actualEventName, expectedEventName);\n}), TEST_F('TestEventAddListenerOnceCheckChangeMockObjInListenerFunction', function () {\n    var eventBus = new _eventbus2.default();\n    var mockX = { x: 0 };\n\n    var expectedX = mockX.x + 1;\n\n    eventBus.once('addListener', function () {\n        mockX.x++;\n    });\n    eventBus.on('event1', function () {});\n    eventBus.on('event1', function () {});\n\n    var actualX = mockX.x;\n\n    CHECK_ACTUAL_EQUAL_EXPECTED(actualX, expectedX);\n}), TEST_F('TestEventAddListenerOnceAndEvent1OnceCheckChangeMockObjInListenerFunction', function () {\n    var eventBus = new _eventbus2.default();\n    var mockX = { x: 0 };\n\n    var expectedX = mockX.x + 1;\n\n    eventBus.once('addListener', function () {\n        mockX.x++;\n    });\n    eventBus.once('event1', function () {});\n\n    var actualX = mockX.x;\n\n    CHECK_ACTUAL_EQUAL_EXPECTED(actualX, expectedX);\n}), TEST_F('TestEventRemoveListenerOnCheckChangeMockObjInListenerFunction', function () {\n    var eventBus = new _eventbus2.default();\n    var mockX = { x: 0 };\n\n    var expectedX = mockX.x + 1;\n\n    eventBus.on('removeListener', function () {\n        mockX.x++;\n    });\n    eventBus.on('event1', function () {});\n    eventBus.off('event1', function () {});\n\n    var actualX = mockX.x;\n\n    CHECK_ACTUAL_EQUAL_EXPECTED(actualX, expectedX);\n}), TEST_F('TestGetAllEventsNameCheckArrayNames', function () {\n    var eventBus = new _eventbus2.default();\n\n    var expectedArrayNames = ['event1', 'event2'];\n\n    eventBus.on('event1', function () {});\n    eventBus.on('event2', function () {});\n\n    var actualArrayNames = eventBus.getAllEventsName();\n\n    CHECK_ACTUAL_EQUAL_EXPECTED_OBJECT(actualArrayNames, expectedArrayNames);\n}), TEST_F('TestGetAllListenersOfEventCheckArrayListenersLength', function () {\n    var eventBus = new _eventbus2.default();\n\n    var expectedListenersLength = 2;\n\n    eventBus.on('event1', function () {});\n    eventBus.on('event1', function () {});\n\n    var actualListenersLength = eventBus.getAllListenersOfEvent('event1').length;\n\n    CHECK_ACTUAL_EQUAL_EXPECTED(actualListenersLength, expectedListenersLength);\n}), TEST_F('TestRemoveAllListenersOfEventCheckGetAllListenersOfEventReturnUndefined', function () {\n    var eventBus = new _eventbus2.default();\n\n    eventBus.on('event1', function () {});\n    eventBus.once('event1', function () {});\n    eventBus.on('event1', function () {});\n\n    eventBus.removeAllListenersOfEvent('event1');\n\n    var actualQuantityListeners = eventBus.getAllListenersOfEvent('event1');\n\n    CHECK_UNDEFINED(actualQuantityListeners);\n}));\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///./tests/unit/eventbus_test.js?");

/***/ })

/******/ });