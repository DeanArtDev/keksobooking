'use strict';
(function () {
  window.Coordinate = function (x, y) {
    this._x = x;
    this._y = y;
  };
  window.Coordinate.prototype.setX = function (x) {
    this._x = x;
  };
  window.Coordinate.prototype.setY = function (y) {
    this._y = y;
  };
})();
