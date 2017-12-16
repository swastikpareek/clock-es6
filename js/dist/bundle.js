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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _buildingClock = __webpack_require__(1);

// Starting the clock;
_buildingClock.Clock.start();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Clock = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _compose = __webpack_require__(2);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// const compose = (...fns) => (args) => fns.reduce((composed, fn) => fn(composed), args);
// get current CLock time
// Searlise clock
// update the clock time for AM PM version
// Add double digit

var Clock = exports.Clock = Clock || {};

Clock.oneSecond = function () {
  return 1000;
};
Clock.getCurrentTime = function () {
  return new Date();
};
Clock.clearScreen = function () {
  return console.clear();
};
Clock.log = function (message) {
  console.log(message);return message;
};
Clock.print = function (message) {
  document.querySelector('.clock-digital').innerHTML = message;
};
Clock.updateClock = function (clock) {
  document.querySelector('.clock-hour-tick').style.transform = 'rotateZ(' + (parseInt(clock.hours, 10) * 30 + parseInt(clock.mins, 10) * 6 / 12 - 90) + 'deg)';
  document.querySelector('.clock-min-tick').style.transform = 'rotateZ(' + (parseInt(clock.mins, 10) * 6 + parseInt(clock.secs, 10) * 6 / 60 - 90) + 'deg)';
  document.querySelector('.clock-secs-tick').style.transform = 'rotateZ(' + (parseInt(clock.secs, 10) * 6 - 90) + 'deg)';
  return clock;
};

Clock.searliseClock = function (date) {
  return { hours: date.getHours(), mins: date.getMinutes(), secs: date.getSeconds() };
};
Clock.get12HrTime = function (clock) {
  return _extends({}, clock, { hours: clock.hours > 12 ? clock.hours - 12 : clock.hours });
};
Clock.setAMPM = function (clock) {
  return _extends({}, clock, { ampm: clock.hours > 12 ? 'PM' : 'AM' });
};

// Higher order function 
// display the target fn with passed message.
Clock.display = function (target) {
  return function (time) {
    return target(time);
  };
};
Clock.addDoubleDigit = function (key) {
  return function (clock) {
    return _extends({}, clock, _defineProperty({}, key, clock[key] < 10 ? '0' + clock[key] : clock[key]));
  };
};

// Get functions for outputting time
Clock.getTimeString = function (format) {
  return function (clock) {
    return format.replace('hh', clock.hours).replace('mm', clock.mins).replace('ss', clock.secs).replace('tt', clock.ampm);
  };
};

Clock.getDoubleDigitTime = (0, _compose.compose)(Clock.addDoubleDigit('hours'), Clock.addDoubleDigit('mins'), Clock.addDoubleDigit('secs'));

// Final Fn for start Clock ticking
Clock.start = function () {
  return setInterval((0, _compose.compose)(Clock.clearScreen, Clock.getCurrentTime, Clock.searliseClock, Clock.setAMPM, Clock.updateClock, Clock.get12HrTime, Clock.getDoubleDigitTime, Clock.getTimeString('hh : mm : ss tt'), Clock.display(Clock.print)), Clock.oneSecond());
};

exports.default = Clock;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var compose = exports.compose = function compose() {
  for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return function (args) {
    return fns.reduce(function (composed, fn) {
      return fn(composed);
    }, args);
  };
};

/***/ })
/******/ ]);