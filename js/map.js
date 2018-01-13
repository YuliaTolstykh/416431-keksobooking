'use strict';

(function () {
  window.ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var SPACEBAR_KEYCODE = 32;
  var NUMBER_SHOW_PIN = 5;
  var map = document.querySelector('.map');
  window.fragment = document.createDocumentFragment();
  window.mapPinMain = document.querySelector('.map__pin--main');
  var formFieldsets = window.form.querySelectorAll('fieldset');
  var mapPins = [];
  var addDisabled = function (fieldsets) {
    fieldsets.forEach(function (item) {
      item.setAttribute('disabled', 'disabled');
    });
    window.mapPinMain.setAttribute('tabindex', '1');
  };
  var removeDisabled = function (fieldsets) {
    fieldsets.forEach(function (item) {
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
  window.render = function (ads) {
    window.fragment = document.createDocumentFragment();
    var takePart = ads.length >= NUMBER_SHOW_PIN ? NUMBER_SHOW_PIN - 1 : ads.length - 1;
    for (var i = 0; i <= takePart; i++) {
      window.fragment.appendChild(window.pin.locateAds(ads[i]));
    }
    return window.fragment;
  };
  var updateMapPin = function () {
    window.pin.insertMapPin(window.fragment).addEventListener('click', onMapPinClick);
  };
  var onMapPinMainMouseupPass = function () {
    if (window.initialAds) {
      var formFilter = document.querySelector('.map__filters');
      onMapPinMainMouseup(updateMapPin);
      formFilter.addEventListener('change', function () {
        window.debounce(onFilterChange);
      });
    }
  };
  var onMapPinClick = function (evt) {
    window.indexEvent = 0;
    var mapPinElements = document.querySelectorAll('.map__pin');
    mapPins = [].slice.call(mapPinElements);
    window.pin.searchIndexEvent(evt, mapPins);
    removePinActive(mapPins, window.indexEvent);
    setPinActive(mapPins, window.indexEvent);
  };
  var onPopupKeydown = function (evt) {
    if (evt.keyCode === window.ESC_KEYCODE) {
      removePopup(mapPins[window.indexEvent]);
      evt.stopPropagation();
      document.removeEventListener('keydown', onPopupKeydown);
    }
  };
  var setPinActive = function (pins, n) {
    if (n !== 0 && pins[n].classList.contains('map__pin--active') !== true) {
      pins[n].classList.add('map__pin--active');
      map.appendChild(window.card.createAdsElement(window.ads[n - 1]));
      var popupClose = document.querySelector('.popup__close');
      var onPopupCloseClick = function () {
        removePopup(pins[n]);
        popupClose.removeEventListener('click', onPopupCloseClick);
      };
      document.addEventListener('keydown', onPopupKeydown);
      popupClose.addEventListener('click', onPopupCloseClick);
    }
  };
  var removePinActive = function (pins, n) {
    for (var index = 0; index < pins.length; index++) {
      if (index !== n && pins[index].classList.contains('map__pin--active')) {
        removePopup(pins[index]);
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
  window.mapPinMain.addEventListener('mousedown', window.onPinMainMousedown);
  window.mapPinMain.addEventListener('mouseup', onMapPinMainMouseupPass);
  window.mapPinMain.addEventListener('keydown', onMapPinMainKeydown);
}());
