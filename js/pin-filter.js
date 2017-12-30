'use strict';

(function () {
  var FILTER_TYPE = 0;
  var FILTER_PRICE = 1;
  var FILTER_ROOMS = 2;
  var FILTER_GUESTS = 3;
  var formFilter = document.querySelector('.map__filters');
  var offerPrice = function (arg) {
    var lowPrice = (arg <= 10000);
    var highPrice = (arg >= 50000);
    var middlePrice = (arg >= 10000 && arg <= 50000);
    switch (!!arg) {
      case lowPrice:
        arg = 'low';
        break;
      case highPrice:
        arg = 'high';
        break;
      case middlePrice:
        arg = 'middle';
        break;
      default:
        arg = 'Дом';
        break;
    }
    return arg;
  };
  window.filterPin = function () {
    var getTypeAds = function (ads) {
      if (formFilter.elements[FILTER_TYPE].selectedIndex === 0) {
        return ads;
      } else {
        return ads.offer.type === formFilter.elements[FILTER_TYPE].value;
      }
    };
    var getPriceAds = function (ads) {
      if (formFilter.elements[FILTER_PRICE].selectedIndex === 0) {
        return ads;
      } else {
        return offerPrice(ads.offer.price) === formFilter.elements[FILTER_PRICE].value;
      }
    };
    var getRoomsAds = function (ads) {
      if (formFilter.elements[FILTER_ROOMS].selectedIndex === 0) {
        return ads;
      } else {
        return ads.offer.rooms === +formFilter.elements[FILTER_ROOMS].value;
      }
    };
    var getGuestsAds = function (ads) {
      if (formFilter.elements[FILTER_GUESTS].selectedIndex === 0) {
        return ads;
      } else {
        return ads.offer.guests === +formFilter.elements[FILTER_GUESTS].value;
      }
    };
    var getFeaturesAds = function (ads) {
      var features = formFilter.querySelectorAll('input[type=checkbox]:checked');
      var truthFeatures = true;
      if (features.length === 0) {
        truthFeatures = true;
      } else {
        features.forEach(function (it) {
          if (ads.offer.features.indexOf(it.value) === -1) {
            truthFeatures = false;
          }
        });
      }
      return truthFeatures;
    };
    var dataAds = window.initialData.filter(getTypeAds).filter(getPriceAds).filter(getRoomsAds).filter(getGuestsAds).filter(getFeaturesAds);
    window.data = dataAds;
    window.render(dataAds);
  };
}());
