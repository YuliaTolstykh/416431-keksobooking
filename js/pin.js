'use strict';

(function () {
  var WIDTH_MARK_MAP = 32;
  var HEIGHT_MARK_MAP = 36;
  var adsItem = document.querySelector('.map__pin');
  window.pin = {
    locateAds: function (ad) {
      var similarAds = adsItem.cloneNode(true);
      var avatar = similarAds.querySelector('img');
      avatar.setAttribute('src', ad.author.avatar);
      var positionX = ad.location.x - WIDTH_MARK_MAP;
      var positionY = ad.location.y - HEIGHT_MARK_MAP;
      var position = 'left: ' + positionX + 'px; top: ' + positionY + 'px;';
      similarAds.setAttribute('style', position);
      return similarAds;
    },
    insertMapPin: function (fragment) {
      var mapPinsContainer = document.querySelector('.map__pins');
      adsItem.parentElement.appendChild(fragment);
      return mapPinsContainer;
    },
    setPinActive: function (vector, n, data) {
      if (n !== 0 && vector[n].classList.contains('map__pin--active') !== true) {
        vector[n].classList.add('map__pin--active');
        window.map.appendChild(window.card.createAdsElement(data[n - 1]));
        var popupClose = document.querySelector('.popup__close');
        popupClose.addEventListener('click', function () {
          window.pin.removePopup(vector[n]);
        });
      }
    },
    removePinActive: function (vector, n) {
      for (var index = 0; index < vector.length; index++) {
        if (index !== n && vector[index].classList.contains('map__pin--active') === true) {
          window.pin.removePopup(vector[index]);
        }
      }
    },
    removePopup: function (arg) {
      arg.classList.remove('map__pin--active');
      var popup = window.map.querySelector('.popup');
      window.map.removeChild(popup);
    }
  };
})();
