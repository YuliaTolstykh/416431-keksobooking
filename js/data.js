'use strict';

(function () {
  var TOTAL_NUMBER_ADS = 8;
  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };
  var selectRandomElement = function (vector, n) {
    return vector.splice(getRandomInt(0, n), 1);
  };
  var adTitles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var adTypes = ['flat', 'house', 'bungalo'];
  var adTimes = ['12:00', '13:00', '14:00'];
  var getFeatures = function (arr, n) {
    var attributes = [];
    var count = 0;
    do {
      attributes[count] = selectRandomElement(arr, arr.length - count);
      count++;
    } while (count < n);
    return attributes;
  };
  var ads = [];
  for (var i = 0; i < TOTAL_NUMBER_ADS; i++) {
    var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
    var featuresLength = getRandomInt(1, features.length + 1);
    ads[i] = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'title': selectRandomElement(adTitles, Math.abs(i - TOTAL_NUMBER_ADS)),
        'address': '',
        'price': getRandomInt(1000, 1000000),
        'type': adTypes[getRandomInt(0, 3)],
        'rooms': getRandomInt(1, 6),
        'guests': getRandomInt(1, 100),
        'checkin': adTimes[getRandomInt(0, 3)],
        'checkout': adTimes[getRandomInt(0, 3)],
        'features': getFeatures(features, featuresLength),
        'description': '',
        'photos': []
      },
      'location': {
        'x': getRandomInt(300, 900),
        'y': getRandomInt(100, 500)
      }
    };
    ads[i].offer.address = ads[i].location.x.toString() + ', ' + ads[i].location.y.toString();
  }
  window.data = ads;
})();
