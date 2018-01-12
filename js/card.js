'use strict';

(function () {
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
  var getTextHTML = function (items) {
    var textsHTML = [];
    var i = 0;
    while (i < items.length) {
      textsHTML[i] = '<li class="feature feature--' + items[i] + '"></li>';
      i++;
    }
    return textsHTML;
  };
  var similarAdsTemplate = document.querySelector('template').content;
  window.card = {
    createAdsElement: function (arr) {
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
    }
  };
})();
