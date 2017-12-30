'use strict';

(function () {
  var formFilter = document.querySelector('.map__filters');
  var housingPostfixes = ['-type', '-price', '-rooms', '-guests', '-features'];
  var featuresPostfixes = ['-wifi', '-dishwasher', '-parking', '-washer', '-elevator', '-conditioner'];
  var housingFilters = [];
  for (var i = 0; i < housingPostfixes.length; i++) {
    housingFilters[i] = formFilter.elements['housing' + housingPostfixes[i]];
  }
  var features = [];
  for (var j = 0; j <= housingPostfixes.length; j++) {
    features[j] = housingFilters[housingFilters.length - 1].elements['filter' + featuresPostfixes[j]];
  }
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
    var sameTypeAds = window.initialData.filter(function (ads) {
      if (housingFilters[0].selectedIndex === 0) {
        return ads;
      } else {
        return ads.offer.type === housingFilters[0].value;
      }
    });
    window.data = sameTypeAds.filter(function (ads) {
      if (housingFilters[1].selectedIndex === 0) {
        return ads;
      } else {
        return offerPrice(ads.offer.price) === housingFilters[1].value;
      }
    }).filter(function (ads) {
      if (housingFilters[2].selectedIndex === 0) {
        return ads;
      } else {
        return ads.offer.rooms === +housingFilters[2].value;
      }
    }).filter(function (ads) {
      if (housingFilters[3].selectedIndex === 0) {
        return ads;
      } else {
        return ads.offer.guests === +housingFilters[3].value;
      }
    });
    window.render(window.data);
  };
}());
