'use strict';

var ESC_KEYCODE = 27;
window.map = document.querySelector('.map');
var mapPinMain = document.querySelector('.map__pin--main');
var form = document.querySelector('.notice__form');
var formFieldset = form.querySelectorAll('fieldset');
var fragment = document.createDocumentFragment();
var mapPins = [];
var indexEvent;

var addDisabled = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i].setAttribute('disabled', 'disabled');
  }
  return arr;
};
var removeDisabled = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].hasAttribute('disabled') === true) {
      arr[i].removeAttribute('disabled');
    }
  }
  return arr;
};
addDisabled(formFieldset);
var onMapPinMainMouseup = function (callback) {
  window.map.classList.remove('map--faded');
  form.classList.remove('notice__form--disabled');
  removeDisabled(formFieldset);
  if (typeof callback === 'function') {
    callback();
  }
};
for (var j = 0; j < window.data.length; j++) {
  fragment.appendChild(window.pin.locateAds(window.data[j]));
}
var onMapPinMainMouseupPass = function () {
  onMapPinMainMouseup(window.pin.insertMapPin(fragment).addEventListener('click', onMapPinClick));
};
mapPinMain.addEventListener('mouseup', onMapPinMainMouseupPass);
var onMapPinClick = function () {
  var mapPinElements = document.querySelectorAll('.map__pin');
  mapPins = [].slice.call(mapPinElements);
  var target = event.target;
  if (target.tagName === 'BUTTON' || target.tagName === 'IMG') {
    for (var index = 0; index < mapPins.length; index++) {
      if (mapPins[index] === target || mapPins[index] === target.parentElement) {
        indexEvent = index;
        break;
      }
    }
    window.pin.removePinActive(mapPins, indexEvent);
    window.pin.setPinActive(mapPins, indexEvent, window.data);
    // if (index === 0) {
    //   alert('Hello!');
    // }
  }
};
document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    window.pin.removePopup(mapPins[indexEvent]);
  }
});
