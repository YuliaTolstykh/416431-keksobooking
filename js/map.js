'use strict';

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};
var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var types = ['flat', 'house', 'bungalo'];
var times = ['12:00', '13:00', '14:00'];
// var attributes = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var getLength = function (arr) {
  var value = arr.length;
  arr.length = getRandomInt(0, value);
  return arr;
};
// var k = [1, 2, 3, 4, 5, 6, 7, 8];
var advert = [];
for (var i = 0; i < 8; i++) {
  var attributes = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  advert[i] = {
    'author': 'img/avatars/user0' + getRandomInt(1, 9) + '.png',
    'offer': {
      'title': titles[getRandomInt(0, 8)],
      'address': 'location.x, location.y',
      'price': getRandomInt(1000, 1000000),
      'type': types[getRandomInt(0, 2)],
      'rooms': getRandomInt(1, 5),
      'guests': getRandomInt(1, 100),
      'checkin': times[getRandomInt(0, 2)],
      'checkout': times[getRandomInt(0, 2)],
      'features': getLength(attributes),
      'description': '',
      'photos': []
    },
    'location': {
      'x': getRandomInt(300, 900),
      'y': getRandomInt(100, 500)
    }
  };
}
console.log(advert);
var map = document.querySelector('.map');
map.classList.remove('map--faded');
var advertItem = document.querySelector('.map__pin');
// var renderWizard = function (wizard) {
//   var wizardElement = similarWizardTemplate.cloneNode(true);
//
//   wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
//   wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
//
//   return wizardElement;
// }
//
// var fragment = document.createDocumentFragment();
// for (var i = 0; i < wizards.length; i++) {
//   fragment.appendChild(renderWizard(wizards[i]));
// }
// similarListElement.appendChild(fragment);
//
// userDialog.querySelector('.setup-similar').classList.remove('hidden');
var locateAdvert = function (ad) {
  var similarAdvert = advertItem.cloneNode(true);
  var avatar = similarAdvert.querySelector('img');
  avatar.setAttribute('src', ad.author);
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
