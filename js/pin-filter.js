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
  // console.log(housingFilters[0].value)
  // console.log(features)
  window.filterPin = function () {
    formFilter.addEventListener('change', (function () {
      // window.ppp = window.data.filter(function (it) {
      //   console.log(it.offer.type === housingFilters[0].value);
      //   return it.offer.type === housingFilters[0].value;
      // });
      console.log('Hello')
      // window.render(window.data);
    }));
    // console.log(window.ppp)
  //
  //
  //
  //
  };
}());
