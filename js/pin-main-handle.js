'use strict';

(function () {
  var MIN_X = 100;
  var MAX_X = 1100;
  var MIN_Y = 100;
  var MAX_Y = 500;
  window.pinMainHandle = function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      var pinMainShiftedX = window.mapPinMain.offsetLeft - shift.x;
      var pinMainShiftedY = window.mapPinMain.offsetTop - shift.y;
      var arrowPositionX = pinMainShiftedX;
      var arrowPositionY = pinMainShiftedY + window.HEIGHT_MARK_MAP;
      if (arrowPositionX >= MIN_X && arrowPositionX <= MAX_X && arrowPositionY >= MIN_Y && arrowPositionY <= MAX_Y) {
        window.mapPinMain.style.left = (pinMainShiftedX) + 'px';
        window.mapPinMain.style.top = (pinMainShiftedY) + 'px';
        window.positionMainPin = 'x: ' + arrowPositionX + ', ' + 'y: ' + arrowPositionY;
        window.addressInput.setAttribute('value', window.positionMainPin);
      }
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
}());
