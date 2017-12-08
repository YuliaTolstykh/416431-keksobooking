'use strict';

var WIDTH_MARK_MAP = 32;
var HEIGHT_MARK_MAP = 36;
var TOTAL_NUMBER_ADS = 8;
var ESC_KEYCODE = 27;
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
var adsItem = document.querySelector('.map__pin');
var fragment = document.createDocumentFragment();
for (var j = 0; j < ads.length; j++) {
  fragment.appendChild(locateAds(ads[j]));
}
var similarAdsTemplate = document.querySelector('template').content;
var createAdsElement = function (arr) {
  var adsElement = similarAdsTemplate.cloneNode(true);
  adsElement.querySelector('h3').textContent = arr.offer.title;
  adsElement.querySelector('p').textContent = arr.offer.address;
  adsElement.querySelector('.popup__price').innerHTML = arr.offer.price + ' &#x20bd;/ночь';
  adsElement.querySelector('h4').textContent = getType(arr.offer.type);
  adsElement.querySelectorAll('p')[2].textContent = arr.offer.rooms + ' для ' + arr.offer.guests + ' гостей';
  adsElement.querySelectorAll('p')[3].textContent = 'Заезд после ' + arr.offer.checkin + ', выезд до ' + arr.offer.checkout;
  adsElement.querySelector('.popup__features').innerHTML = getTextHTML(arr.offer.features).join('');
  adsElement.querySelectorAll('p')[4].textContent = arr.offer.description;
  adsElement.querySelector('.popup__avatar').setAttribute('src', arr.author.avatar);
  var templateButton = adsElement.querySelectorAll('button');
  templateButton[1].parentNode.removeChild(templateButton[1]);
  return adsElement;
};
var mapPinMain = document.querySelector('.map__pin--main');
var form = document.querySelector('.notice__form');
var formFieldset = form.querySelectorAll('fieldset');
var addDisabled = function (arr) {
  var n = 0;
  while (n < arr.length) {
    if (arr[n].hasAttribute('disabled') === true) {
      arr[n].removeAttribute('disabled');
    } else {
      arr[n].setAttribute('disabled', 'disabled');
    }
    n++;
  }
  return arr;
};
addDisabled(formFieldset);
var onMapPinMainMouseup = function (callback) {
  map.classList.remove('map--faded');
  form.classList.remove('notice__form--disabled');
  addDisabled(formFieldset);
  if (typeof callback === 'function') {
    callback();
  }
};
var mapPins = [];
var insertMapPin = function () {
  var mapPinsContainer = document.querySelector('.map__pins');
  adsItem.parentElement.appendChild(fragment);
  mapPinsContainer.addEventListener('click', onMapPinClick);
};
var indexEvent;
var onMapPinClick = function () {
  var mapPinElements = document.querySelectorAll('.map__pin');
  mapPins = [].slice.call(mapPinElements);
  var target = event.target;
  if (target.tagName === 'BUTTON' || target.tagName === 'IMG') {
    for (var index = 0; index < mapPins.length; index++) {
      if (mapPins[index] === target || mapPins[index] === target.parentElement) {
        indexEvent = index;
        break;
      }
    }
    for (index = 0; index < mapPins.length; index++) {
      if (index !== indexEvent && mapPins[index].classList.contains('map__pin--active') === true) {
        removePopup(mapPins[index]);
      }
    }
    if (indexEvent !== 0 && mapPins[indexEvent].classList.contains('map__pin--active') !== true) {
      mapPins[indexEvent].classList.add('map__pin--active');
      map.appendChild(createAdsElement(ads[indexEvent - 1]));
      var popupClose = document.querySelector('.popup__close');
      popupClose.addEventListener('click', function () {
        removePopup(mapPins[indexEvent]);
      });
    }
    // if (index === 0) {
    //   alert('Hello!');
    // }
  }
};
document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    removePopup(mapPins[indexEvent]);
  }
});
var removePopup = function (arg) {
  arg.classList.remove('map__pin--active');
  var popup = map.querySelector('.popup');
  map.removeChild(popup);
};
var onMapPinMainMouseupPass = function () {
  onMapPinMainMouseup(insertMapPin);
};
mapPinMain.addEventListener('mouseup', onMapPinMainMouseupPass);
