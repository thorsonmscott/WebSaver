(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _baseLoop = require('./modules/base-loop');

var _baseLoop2 = _interopRequireDefault(_baseLoop);

var _slice = require('./modules/slice');

var _slice2 = _interopRequireDefault(_slice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var W = document.getElementById('application').offsetWidth;
var H = document.getElementById('application').offsetHeight;

var canvas = document.getElementById('canvas');
canvas.width = W;
canvas.height = H;
var ctx = canvas.getContext('2d');

var App = new _baseLoop2.default();
var slice = new _slice2.default(ctx);

App.setup = function () {};

App.update = function () {
  slice.update();
};

App.draw = function () {
  slice.draw(0, 0);
};

slice.setup().then(function () {
  App.start();
});

},{"./modules/base-loop":2,"./modules/slice":3}],2:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseLoop = (function () {
  function BaseLoop() {
    _classCallCheck(this, BaseLoop);

    this._setup = null;
    this._update = null;
    this._draw = null;

    this._isRunning = false;
    this._isSetup = false;

    this._frameCount = 0;

    this._boundFrame = this._frame.bind(this);
  }

  _createClass(BaseLoop, [{
    key: 'start',
    value: function start() {
      if (!this._isSetup && this._setup) {
        this._setup();
        this._isSetup = true;
      }
      this._isRunning = true;
      window.requestAnimationFrame(this._boundFrame);
    }
  }, {
    key: 'stop',
    value: function stop() {
      this._isRunning = false;
    }
  }, {
    key: '_frame',
    value: function _frame() {
      if (this._update) {
        this._update();
      }

      if (this._draw) {
        this._draw();
      }

      this._frameCount++;
      if (this._isRunning) {
        window.requestAnimationFrame(this._boundFrame);
      }
    }
  }, {
    key: 'setup',
    set: function set(func) {
      if (typeof func !== 'function') {
        throw new Error('setup property must be of type function');
      } else {
        this._setup = func;
      }
    }
  }, {
    key: 'update',
    set: function set(func) {
      if (typeof func !== 'function') {
        throw new Error('update property must be of type function');
      } else {
        this._update = func;
      }
    }
  }, {
    key: 'draw',
    set: function set(func) {
      if (typeof func !== 'function') {
        throw new Error('draw property must be of type function');
      } else {
        this._draw = func;
      }
    }
  }]);

  return BaseLoop;
})();

exports.default = BaseLoop;

},{}],3:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vec2f = require('./vec2f');

var _vec2f2 = _interopRequireDefault(_vec2f);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WIDTH_FACTOR = 0.1;
var SPEED_FACTOR = 0.0025;

var Slice = (function () {
  function Slice(ctx) {
    _classCallCheck(this, Slice);

    this._ctx = ctx;
    this._position = new _vec2f2.default();
    this._motion = new _vec2f2.default(this._ctx.canvas.width * SPEED_FACTOR, this._ctx.canvas.width * SPEED_FACTOR);
  }

  _createClass(Slice, [{
    key: 'setup',
    value: function setup() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var image = document.createElement('img');
        image.onload = function () {
          _this._image = image;
          _this._w = _this._ctx.canvas.width * WIDTH_FACTOR;
          _this._h = image.naturalHeight / image.naturalWidth * _this._w;
          _this._position.x = Math.random() * (_this._ctx.canvas.width - _this._w);
          _this._position.y = Math.random() * (_this._ctx.canvas.height - _this._h);
          resolve();
        };
        image.onerror = function (e) {
          reject(e);
        };

        image.src = 'assets/slice.png';
      });
    }
  }, {
    key: 'update',
    value: function update() {
      this._position.add(this._motion);

      if (this._position.x < 0) {
        this._position.x = 0;
        this._motion.x *= -1;
      }
      if (this._position.x + this._w > this._ctx.canvas.width) {
        this._position.x -= 1;
        this._motion.x *= -1;
      }
      if (this._position.y < 0) {
        this._position.y = 0;
        this._motion.y *= -1;
      }
      if (this._position.y + this._h > this._ctx.canvas.height) {
        this._position.y -= 1;
        this._motion.y *= -1;
      }
    }
  }, {
    key: 'draw',
    value: function draw(x, y, w, h) {
      this._ctx.drawImage(this._image, this._position.x, this._position.y, this._w, this._h);
    }
  }, {
    key: 'position',
    set: function set(position) {
      this._position = position;
    },
    get: function get() {
      return this._position;
    }
  }]);

  return Slice;
})();

exports.default = Slice;

},{"./vec2f":4}],4:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vec2f = (function () {
  function Vec2f() {
    var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
    var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

    _classCallCheck(this, Vec2f);

    this._x = x;
    this._y = y;
  }

  _createClass(Vec2f, [{
    key: "add",
    value: function add(vec2f) {
      this._x += vec2f.x;
      this._y += vec2f.y;
    }
  }, {
    key: "x",
    set: function set(x) {
      this._x = x;
    },
    get: function get() {
      return this._x;
    }
  }, {
    key: "y",
    set: function set(y) {
      this._y = y;
    },
    get: function get() {
      return this._y;
    }
  }]);

  return Vec2f;
})();

exports.default = Vec2f;

},{}]},{},[1])


//# sourceMappingURL=application.js.map
