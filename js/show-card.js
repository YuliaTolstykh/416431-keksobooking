'use strict';

(function () {
  window.showCard = function (map, data) {
    map.appendChild(window.card.createAdsElement(data));
  };
}());
