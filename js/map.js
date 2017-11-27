'use strict';

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};
var sample = function (vector, n) {
  var number = vector.splice(getRandomInt(0, n), 1);
  return number;
};
var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var types = ['flat', 'house', 'bungalo'];
var times = ['12:00', '13:00', '14:00'];
var getLength = function (arr) {
  var value = arr.length + 1;
  var attributes = [];
  var pp = [];
  var p = 0;
  do {
    pp[p] = getRandomInt(1, value);
    attributes[p] = sample(arr, value - (1 + p));
    p++;
  } while (p < pp[0]);
  return attributes;
};
var k = [1, 2, 3, 4, 5, 6, 7, 8];
var advert = [];
for (var i = 7; i >= 0; i--) {
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  advert[i] = {
    'author': {
      'avatar': 'img/avatars/user0' + sample(k, i) + '.png'
    },
    'offer': {
      'title': sample(titles, i),
      'address': 'location.x, location.y',
      'price': getRandomInt(1000, 1000000),
      'type': types[getRandomInt(0, 3)],
      'rooms': getRandomInt(1, 6),
      'guests': getRandomInt(1, 100),
      'checkin': times[getRandomInt(0, 3)],
      'checkout': times[getRandomInt(0, 3)],
      'features': getLength(features),
      'description': '',
      'photos': []
    },
    'location': {
      'x': getRandomInt(300, 900),
      'y': getRandomInt(100, 500)
    }
  };
}
var map = document.querySelector('.map');
map.classList.remove('map--faded');
var advertItem = document.querySelector('.map__pin');
var locateAdvert = function (ad) {
  var similarAdvert = advertItem.cloneNode(true);
  var avatar = similarAdvert.querySelector('img');
  avatar.setAttribute('src', ad.author.avatar);
  var positionX = ad.location.x - 32;
  var positionY = ad.location.y - 36;
  var position = 'left: ' + positionX + 'px; top: ' + positionY + 'px;';
  similarAdvert.setAttribute('style', position);
  return similarAdvert;
};
var fragment = document.createDocumentFragment();
for (var j = 0; j < advert.length; j++) {
  fragment.appendChild(locateAdvert(advert[j]));
}
advertItem.parentElement.appendChild(fragment);
var similarAdvertTemplate = document.querySelector('template').content;
var advertElement = similarAdvertTemplate.cloneNode(true);
advertElement.querySelector('h3').textContent = advert[0].offer.title;
advertElement.querySelector('p').textContent = advert[0].offer.address;
advertElement.querySelector('.popup__price').innerHTML = advert[0].offer.price + ' &#x20bd;/ночь';
var offerType = function () {
  if (advert[0].offer.type === 'flat') {
    offerType = 'Квартира';
  } else {
    if (advert[0].offer.type === 'bungalo') {
      offerType = 'Бунгало';
    } else {
      offerType = 'Дом';
    }
  }
  return offerType;
};
advertElement.querySelector('h4').textContent = offerType();
advertElement.querySelectorAll('p')[2].textContent = advert[0].offer.rooms + ' для ' + advert[0].offer.guests + ' гостей';
advertElement.querySelectorAll('p')[3].textContent = 'Заезд после ' + advert[0].offer.checkin + ', выезд до ' + advert[0].offer.checkout;
var featuresLength = advert[0].offer.features;
var textHTML = [];
var n = 0;
while (n < featuresLength.length) {
  textHTML[n] = '<li class="feature feature--' + featuresLength[n] + '"></li>';
  n++;
}
advertElement.querySelector('.popup__features').innerHTML = textHTML.join('');
advertElement.querySelectorAll('p')[4].textContent = advert[0].offer.description;
advertElement.querySelector('.popup__avatar').setAttribute('src', advert[0].author.avatar);
map.appendChild(advertElement);
