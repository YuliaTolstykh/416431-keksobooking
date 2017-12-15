'use strict';

(function () {
  var adsItem = document.querySelector('.map__pin');
  window.pin = {
    locateAds: function (ad) {
      var similarAds = adsItem.cloneNode(true);
      var avatar = similarAds.querySelector('img');
      avatar.setAttribute('src', ad.author.avatar);
      var positionX = ad.location.x - window.WIDTH_MARK_MAP;
      var positionY = ad.location.y - window.HEIGHT_MARK_MAP;
      var position = 'left: ' + positionX + 'px; top: ' + positionY + 'px;';
      similarAds.setAttribute('style', position);
      return similarAds;
    },
    insertMapPin: function (fragment) {
      adsItem.parentElement.appendChild(fragment);
      return adsItem.parentElement;
    },
    searchIndexEvent: function (mapPins) {
      var target = event.target;
      if (target.tagName === 'BUTTON' || target.tagName === 'IMG') {
        for (var index = 0; index < mapPins.length; index++) {
          if (mapPins[index] === target || mapPins[index] === target.parentElement) {
            window.indexEvent = index;
          }
        }
      }
    }
  };
}());
