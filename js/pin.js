'use strict';

(function () {
  var WIDTH_MARK_MAP = 32;
  var HEIGHT_MARK_MAP = 36;
  var ESC_KEYCODE = 27;
  var mapPins = [];
  var indexEvent;
  var map = document.querySelector('.map');
  var adsItem = document.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();
  var locateAds = function (ad) {
    var similarAds = adsItem.cloneNode(true);
    var avatar = similarAds.querySelector('img');
    avatar.setAttribute('src', ad.author.avatar);
    var positionX = ad.location.x - WIDTH_MARK_MAP;
    var positionY = ad.location.y - HEIGHT_MARK_MAP;
    var position = 'left: ' + positionX + 'px; top: ' + positionY + 'px;';
    similarAds.setAttribute('style', position);
    return similarAds;
  };
  for (var j = 0; j < window.data.length; j++) {
    fragment.appendChild(locateAds(window.data[j]));
  }
  window.pin = {
    insertMapPin: function () {
      var mapPinsContainer = document.querySelector('.map__pins');
      adsItem.parentElement.appendChild(fragment);
      mapPinsContainer.addEventListener('click', onMapPinClick);
    }
  };
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
      removePinActive(mapPins, indexEvent);
      setPinActive(mapPins, indexEvent);
      // if (index === 0) {
      //   alert('Hello!');
      // }
    }
  };
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      removePopup(mapPins[indexEvent]);
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
})();
