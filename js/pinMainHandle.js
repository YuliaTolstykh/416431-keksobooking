'use strict';

(function () {
  window.pinMainHandle = function () {
    event.preventDefault();
    var startCoords = {
      x: event.clientX,
      y: event.clientY
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      if (moveEvt.clientY >= 100 && moveEvt.clientY <= 500) {
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
        window.mapPinMain.style.left = (pinMainShiftedX) + 'px';
        window.mapPinMain.style.top = (pinMainShiftedY) + 'px';
        window.positionMainPin = 'x: ' + arrowPositionX + ', ' + 'y: ' + arrowPositionY;
        document.forms[1].elements.address.setAttribute('value', window.positionMainPin);
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
