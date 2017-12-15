'use strict';

(function () {
  var minX = 100;
  var maxX = 1100;
  var minY = 100;
  var maxY = 500;
  window.pinMainHandle = function () {
    event.preventDefault();
    var startCoords = {
      x: event.clientX,
      y: event.clientY
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      if (moveEvt.clientY >= minY && moveEvt.clientY <= maxY) {
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
        if (arrowPositionX >= minX && arrowPositionX <= maxX) {
          window.mapPinMain.style.left = (pinMainShiftedX) + 'px';
          window.mapPinMain.style.top = (pinMainShiftedY) + 'px';
          window.positionMainPin = 'x: ' + arrowPositionX + ', ' + 'y: ' + arrowPositionY;
          document.forms[1].elements.address.setAttribute('value', window.positionMainPin);
        }
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