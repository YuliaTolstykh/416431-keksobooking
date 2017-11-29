'use strict';

var WIDTH_MARK_MAP = 32;
var HEIGHT_MARK_MAP = 36;
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
      'title': selectRandomElement(adTitles, i),
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
var locateAds = function (ad) {
  var similarAds = adsItem.cloneNode(true);
  var avatar = similarAds.querySelector('img');
  avatar.setAttribute('src', ad.author.avatar);
  var positionX = ad.location.x - WIDTH_MARK_MAP;
  var positionY = ad.location.y - HEIGHT_MARK_MAP;
  var position = 'left: ' + positionX + 'px; top: ' + positionY + 'px;';
  similarAds.setAttribute('style', position);
  return similarAds;
};
var getType = function (offerType) {
  switch (offerType) {
    case 'flat':
      offerType = 'Квартира';
      break;
    case 'bungalo':
      offerType = 'Бунгало';
      break;
    default:
      offerType = 'Дом';
      break;
  }
  return offerType;
};
var getTextHTML = function (arr) {
  var textHTML = [];
  var n = 0;
  while (n < arr.length) {
    textHTML[n] = '<li class="feature feature--' + arr[n] + '"></li>';
    n++;
  }
  return textHTML;
};
var map = document.querySelector('.map');
map.classList.remove('map--faded');
var adsItem = document.querySelector('.map__pin');
var fragment = document.createDocumentFragment();
for (var j = 0; j < ads.length; j++) {
  fragment.appendChild(locateAds(ads[j]));
}
adsItem.parentElement.appendChild(fragment);
var similaradsTemplate = document.querySelector('template').content;
var createAdsElement = function (arr) {
  createAdsElement = similaradsTemplate.cloneNode(true);
  createAdsElement.querySelector('h3').textContent = arr.offer.title;
  createAdsElement.querySelector('p').textContent = arr.offer.address;
  createAdsElement.querySelector('.popup__price').innerHTML = arr.offer.price + ' &#x20bd;/ночь';
  createAdsElement.querySelector('h4').textContent = getType(arr.offer.type);
  createAdsElement.querySelectorAll('p')[2].textContent = arr.offer.rooms + ' для ' + arr.offer.guests + ' гостей';
  createAdsElement.querySelectorAll('p')[3].textContent = 'Заезд после ' + arr.offer.checkin + ', выезд до ' + arr.offer.checkout;
  createAdsElement.querySelector('.popup__features').innerHTML = getTextHTML(arr.offer.features).join('');
  createAdsElement.querySelectorAll('p')[4].textContent = arr.offer.description;
  createAdsElement.querySelector('.popup__avatar').setAttribute('src', arr.author.avatar);
  return createAdsElement;
};
map.appendChild(createAdsElement(ads[0]));
