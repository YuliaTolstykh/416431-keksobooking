'use strict';

(function () {
  window.WIDTH_MARK_MAP = 32;
  window.HEIGHT_MARK_MAP = 42;
  window.ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var SPACEBAR_KEYCODE = 32;
  var NUMBER_SHOW_PIN = 5;
  var map = document.querySelector('.map');
  window.fragment = document.createDocumentFragment();
  window.mapPinMain = document.querySelector('.map__pin--main');
  var formFieldsets = window.form.querySelectorAll('fieldset');
  var mapPins = [];
  var addDisabled = function (arr) {
    arr.forEach(function (item) {
      item.setAttribute('disabled', 'disabled');
    });
    window.mapPinMain.setAttribute('tabindex', '1');
  };
  var removeDisabled = function (arr) {
    arr.forEach(function (item) {
      if (item.hasAttribute('disabled')) {
        item.removeAttribute('disabled');
      }
    });
  };
  addDisabled(formFieldsets);
  var onMapPinMainMouseup = function (callback) {
    map.classList.remove('map--faded');
    window.form.classList.remove('notice__form--disabled');
    removeDisabled(formFieldsets);
    window.mapPinMain.removeEventListener('mouseup', onMapPinMainMouseupPass);
    window.mapPinMain.removeEventListener('keydown', onMapPinMainKeydown);
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
    updateMapPin();
  };
  window.render = function (data) {
    window.fragment = document.createDocumentFragment();
    var takePart = data.length >= NUMBER_SHOW_PIN ? NUMBER_SHOW_PIN - 1 : data.length - 1;
    for (var i = 0; i <= takePart; i++) {
      window.fragment.appendChild(window.pin.locateAds(data[i]));
    }
    return window.fragment;
  };
  var updateMapPin = function () {
    window.pin.insertMapPin(window.fragment).addEventListener('click', onMapPinClick);
  };
  var onMapPinMainMouseupPass = function () {
    if (window.initialData) {
      var formFilter = document.querySelector('.map__filters');
      onMapPinMainMouseup(updateMapPin);
      formFilter.addEventListener('change', function () {
        window.debounce(onFilterChange);
      });
      window.mapPinMain.addEventListener('mousedown', window.onPinMainMousedown);
    }
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.ESC_KEYCODE) {
        removePopup(mapPins[window.indexEvent]);
        evt.stopPropagation();
      }
    });
  };
  var onMapPinClick = function (evt) {
    window.indexEvent = 0;
    var mapPinElements = document.querySelectorAll('.map__pin');
    mapPins = [].slice.call(mapPinElements);
    window.pin.searchIndexEvent(evt, mapPins);
    removePinActive(mapPins, window.indexEvent);
    setPinActive(mapPins, window.indexEvent);
  };
  var setPinActive = function (vector, n) {
    if (n !== 0 && vector[n].classList.contains('map__pin--active') !== true) {
      vector[n].classList.add('map__pin--active');
      map.appendChild(window.card.createAdsElement(window.data[n - 1]));
      var popupClose = document.querySelector('.popup__close');
      var onPopupCloseClick = function () {
        removePopup(vector[n]);
        popupClose.removeEventListener('click', onPopupCloseClick);
      };
      popupClose.addEventListener('click', onPopupCloseClick);
    }
  };
  var removePinActive = function (vector, n) {
    for (var index = 0; index < vector.length; index++) {
      if (index !== n && vector[index].classList.contains('map__pin--active')) {
        removePopup(vector[index]);
        break;
      }
    }
  };
  var removePopup = function (arg) {
    arg.classList.remove('map__pin--active');
    var popup = map.querySelector('.popup');
    if (popup) {
      map.removeChild(popup);
    }
  };
  var onMapPinMainKeydown = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE || evt.keyCode === SPACEBAR_KEYCODE) {
      onMapPinMainMouseupPass();
    }
  };
  window.mapPinMain.addEventListener('mouseup', onMapPinMainMouseupPass);
  window.mapPinMain.addEventListener('keydown', onMapPinMainKeydown);
}());
