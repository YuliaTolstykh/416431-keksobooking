'use strict';

(function () {
  var formFilter = document.querySelector('.map__filters');
  var housingPostfix = ['-type', '-price', '-rooms', '-guests', '-features'];
  var featuresPostfix = ['-wifi', '-dishwasher', '-parking', '-washer', '-elevator', '-conditioner'];
  var housingFilters = [];
  for (var i = 0; i < housingPostfix.length; i++) {
    housingFilters[i] = formFilter.elements['housing' + housingPostfix[i]];
  }
  var features = [];
  for (var j = 0; j < housingPostfix.length; j++) {
    features[j] = housingFilters[4].elements['filter' + featuresPostfix[j]];
  }

  var offerPrice = function (it) {
    if (it.offer.price <= 10000) {
      return 'low';
    }
    if (it.offer.price >= 10000 && it.offer.price <= 50000) {
      return 'middle';
    }
    if (it.offer.price >= 50000) {
      return 'high';
    } else {
      return 'any';
    }
  };
  var getRating = function (ads) {
    var point = 0;
    if (housingFilters[0].selectedIndex === 0) {
      point += 0.5;
    }
    if (ads.offer.type === housingFilters[0].value) {
      point += 5;
    }
    if (housingFilters[1].selectedIndex === 0) {
      point += 0.5;
    }
    if (offerPrice(ads) === housingFilters[1].value) {
      point += 4;
    }
    if (housingFilters[2].selectedIndex === 0) {
      point += 0.5;
    }
    if (ads.offer.rooms === housingFilters[2].value) {
      point += 3;
    }
    if (housingFilters[3].selectedIndex === 0) {
      point += 0.5;
    }
    if (ads.offer.guests === housingFilters[3].value) {
      point += 2;
    }
//     var pn = 0;
//     ads.offer.features.forEach(function (itFeatures) {
//       console.log(itFeatures);
//       [].slice.call(housingFilters[4].elements).forEach(function (item) {
// console.log(item);
//         if (item.checked === itFeatures) {
//           point += 0.5;
//           pn += 1;
//         }
//         console.log('pn ' + pn)
//       });
//     });
    console.log(point)
    return point;
  };
  window.filterPin = function () {
    var pxpx = window.initialData.forEach(function (p) {
      getRating(p)
    })
    console.log(pxpx)
    window.data = window.initialData.sort(function (left, right) {
      return getRating(right) - getRating(left);
    });
    window.render(window.data);
  };
}());
