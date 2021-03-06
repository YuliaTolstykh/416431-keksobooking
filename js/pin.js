'use strict';

(function () {
  var WIDTH_MARK_MAP = 23;
  var HEIGHT_MARK_MAP = 62;
  var adsItem = document.querySelector('.map__pin');
  window.pin = {
    locateAds: function (ad) {
      var similarAds = adsItem.cloneNode(true);
      similarAds.classList.remove('map__pin--main');
      var svg = similarAds.querySelector('svg');
      similarAds.removeChild(svg);
      var avatar = similarAds.querySelector('img');
      avatar.setAttribute('src', ad.author.avatar);
      var positionX = ad.location.x - WIDTH_MARK_MAP;
      var positionY = ad.location.y - HEIGHT_MARK_MAP;
      var position = 'left: ' + positionX + 'px; top: ' + positionY + 'px; ';
      similarAds.setAttribute('style', position + 'width: 38px; height: 48px; transform: translate(-60%, -40%);');
      return similarAds;
    },
    insertMapPin: function (fragment) {
      adsItem.parentElement.appendChild(fragment);
      return adsItem.parentElement;
    },
    searchIndexEvent: function (evt, mapPins) {
      var target = evt.target;
      if (target.tagName === 'BUTTON' || target.tagName === 'IMG') {
        for (var index = 0; index < mapPins.length; index++) {
          if (mapPins[index] === target || mapPins[index] === target.parentElement) {
            window.indexEvent = index;
            break;
          }
        }
      }
    }
  };
}());
