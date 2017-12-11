'use strict';

var map = document.querySelector('.map');
var mapPinMain = document.querySelector('.map__pin--main');
var form = document.querySelector('.notice__form');
var formFieldset = form.querySelectorAll('fieldset');
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
  map.classList.remove('map--faded');
  form.classList.remove('notice__form--disabled');
  removeDisabled(formFieldset);
  if (typeof callback === 'function') {
    callback();
  }
};
var onMapPinMainMouseupPass = function () {
  onMapPinMainMouseup(window.pin.insertMapPin);
};
mapPinMain.addEventListener('mouseup', onMapPinMainMouseupPass);
