'use strict';

(function () {
  window.WIDTH_MARK_MAP = 32;
  window.HEIGHT_MARK_MAP = 42;
  window.ESC_KEYCODE = 27;
  var NUMBER_SHOW_PIN = 5;
  var map = document.querySelector('.map');
  window.fragment = document.createDocumentFragment();
  window.mapPinMain = document.querySelector('.map__pin--main');
  window.form = document.querySelector('.notice__form');
  var formFieldsets = window.form.querySelectorAll('fieldset');
  var mapPins = [];
  window.indexEvent = 0;
  var addDisabled = function (arr) {
    arr.forEach(function (item) {
      item.setAttribute('disabled', 'disabled');
      return arr;
    });
  };
  var removeDisabled = function (arr) {
    arr.forEach(function (item) {
      if (item.hasAttribute('disabled') === true) {
        item.removeAttribute('disabled');
      }
      return arr;
    });
  };
  addDisabled(formFieldsets);

  var onMapPinMainMouseup = function (callback) {
    map.classList.remove('map--faded');
    window.form.classList.remove('notice__form--disabled');
    removeDisabled(formFieldsets);
    if (typeof callback === 'function') {
      callback();
    }
  };
  var onFilterChange = function () {
    if (map.querySelector('.popup')) {
      removePopup(mapPins[window.indexEvent]);
    }
    var mapPinElements = document.querySelectorAll('.map__pin');
    mapPins = [].slice.call(mapPinElements);
    mapPins.shift();
    mapPins.forEach(function (item) {
      item.remove();
    });
    window.filterPin();
    onMapPinMainMouseup(window.pin.insertMapPin(window.fragment).addEventListener('click', onMapPinClick));
  };
  window.render = function (data) {
    window.fragment = document.createDocumentFragment();
    var takePart = data.length >= NUMBER_SHOW_PIN ? NUMBER_SHOW_PIN - 1 : data.length - 1;
    for (var i = 0; i <= takePart; i++) {
      window.fragment.appendChild(window.pin.locateAds(data[i]));
    }
    return window.fragment;
  };
  var onMapPinMainMouseupPass = function () {
    var formFilter = document.querySelector('.map__filters');
    onMapPinMainMouseup(window.pin.insertMapPin(window.fragment).addEventListener('click', onMapPinClick));
    formFilter.addEventListener('change', onFilterChange);
    window.mapPinMain.addEventListener('mousedown', window.pinMainHandle);
  };
  var onMapPinClick = function (evt) {
    var mapPinElements = document.querySelectorAll('.map__pin');
    mapPins = [].slice.call(mapPinElements);
    window.pin.searchIndexEvent(evt, mapPins);
    removePinActive(mapPins, window.indexEvent);
    setPinActive(mapPins, window.indexEvent);
  };
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.ESC_KEYCODE) {
      removePopup(mapPins[window.indexEvent]);
      evt.stopPropagation();
    }
  });
  var setPinActive = function (vector, n) {
    if (n !== 0 && vector[n].classList.contains('map__pin--active') !== true) {
      vector[n].classList.add('map__pin--active');
      map.appendChild(window.card.createAdsElement(window.data[n - 1]));
      var popupClose = document.querySelector('.popup__close');
      popupClose.addEventListener('click', function () {
        removePopup(vector[n]);
      });
    }
  };
  var removePinActive = function (vector, n) {
    for (var index = 0; index < vector.length; index++) {
      if (index !== n && vector[index].classList.contains('map__pin--active') === true) {
        removePopup(vector[index]);
      }
    }
  };
  var removePopup = function (arg) {
    arg.classList.remove('map__pin--active');
    var popup = map.querySelector('.popup');
    map.removeChild(popup);
  };
  window.mapPinMain.addEventListener('mouseup', onMapPinMainMouseupPass);
}());
