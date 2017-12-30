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
  for (var j = 0; j < housingPostfixes.length; j++) {
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
  var getRating = function (ads) {
    var point = 0;
    for (var n = 0; n < housingFilters.length - 1; n++) {
      if (housingFilters[n].selectedIndex === 0) {
        point += 0;
      }
    }
    if (ads.offer.type === housingFilters[0].value) {
      point += 5;
    }
    if (offerPrice(ads.offer.price) === housingFilters[1].value) {
      point += 4;
    }
    if (ads.offer.rooms === +housingFilters[2].value) {
      point += 3;
    }
    if (ads.offer.guests === +housingFilters[3].value) {
      point += 2;
    }
    ads.offer.features.forEach(function (itm) {
      var currentItem = itm;
      var feature = [].slice.call(housingFilters[4].elements);
      feature.forEach(function (item) {
        if (item.checked && item.value === currentItem) {
          point += 0.2;
        }
      });
    });
    ads['point'] = point;
    return point;
  };
  window.filterPin = function () {
    window.data = window.initialData.sort(function (left, right) {
      return getRating(right) - getRating(left);
    });
    if (window.data.every(function (it) {
      return it.point === 0;
    })) {
      window.data = window.initialData;
    }
    if (window.data.some(function (it) {
      return it.point !== 0;
    })) {
      window.data = window.data.filter(function (it) {
        return it.point !== 0;
      });
    }
    window.render(window.data);
  };
}());
