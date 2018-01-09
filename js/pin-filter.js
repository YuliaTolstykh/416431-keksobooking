'use strict';

(function () {
  var FILTER_TYPE = 0;
  var FILTER_PRICE = 1;
  var FILTER_ROOMS = 2;
  var FILTER_GUESTS = 3;
  var MAX_LOW_PRICE = 10000;
  var MIN_HIGH_PRICE = 50000;
  var OPTION_ANY = 0;
  var formFilter = document.querySelector('.map__filters');
  var offerPrice = function (arg) {
    var lowPrice = (arg < MAX_LOW_PRICE);
    var highPrice = (arg >= MIN_HIGH_PRICE);
    var middlePrice = (arg >= MAX_LOW_PRICE && arg < MIN_HIGH_PRICE);
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
      return (formFilter.elements[FILTER_TYPE].selectedIndex === OPTION_ANY) ? ads : ads.offer.type === formFilter.elements[FILTER_TYPE].value;
    };
    var getPriceAds = function (ads) {
      return (formFilter.elements[FILTER_PRICE].selectedIndex === OPTION_ANY) ? ads : offerPrice(ads.offer.price) === formFilter.elements[FILTER_PRICE].value;
    };
    var getRoomsAds = function (ads) {
      return (formFilter.elements[FILTER_ROOMS].selectedIndex === OPTION_ANY) ? ads : ads.offer.rooms >= +formFilter.elements[FILTER_ROOMS].value;
    };
    var sortRooms = function (left, right) {
      return (formFilter.elements[FILTER_ROOMS].selectedIndex > OPTION_ANY) ? left.offer.rooms - right.offer.rooms : false;
    };
    var getGuestsAds = function (ads) {
      return (formFilter.elements[FILTER_GUESTS].selectedIndex === OPTION_ANY) ? ads : ads.offer.guests === +formFilter.elements[FILTER_GUESTS].value;
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
    var dataAds = window.initialData.filter(getTypeAds).filter(getPriceAds).filter(getRoomsAds).sort(sortRooms).filter(getGuestsAds).filter(getFeaturesAds);
    window.data = dataAds;
    window.render(dataAds);
  };
}());
