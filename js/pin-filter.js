'use strict';

(function () {
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
    var sameTypeAds = window.initialData.filter(function (ads) {
      if (formFilter.elements[0].selectedIndex === 0) {
        return ads;
      } else {
        return ads.offer.type === formFilter.elements[0].value;
      }
    });
    var dataAds = sameTypeAds.filter(function (ads) {
      if (formFilter.elements[1].selectedIndex === 0) {
        return ads;
      } else {
        return offerPrice(ads.offer.price) === formFilter.elements[1].value;
      }
    }).filter(function (ads) {
      if (formFilter.elements[2].selectedIndex === 0) {
        return ads;
      } else {
        return ads.offer.rooms === +formFilter.elements[2].value;
      }
    }).filter(function (ads) {
      if (formFilter.elements[3].selectedIndex === 0) {
        return ads;
      } else {
        return ads.offer.guests === +formFilter.elements[3].value;
      }
    }).filter(getFeaturesAds);
    window.data = dataAds;
    window.render(dataAds);
  };
}());
