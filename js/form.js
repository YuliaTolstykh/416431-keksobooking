'use strict';

(function () {
  var minLengthTitle = 30;
  var maxLengthTitle = 100;
  var minPrice = 0;
  var maxPrice = 1000000;
  var form = document.forms[1];
  var titleInput = form.elements.title;
  var addressInput = form.elements.address;
  var priceInput = form.elements.price;
  var selectTimein = form.elements.timein;
  var selectTimeout = form.elements.timeout;
  var selectRooms = form.elements.rooms;
  var selectCapacity = form.elements.capacity;
  var selectType = form.elements.type;
  var minPriceMessage;
  var minPricePerNight = [1000, 0, 5000, 10000];
  var apartmentType = ['квартиры', 'лачуги', 'дома', 'дворца'];
  var changeColor = function (atr) {
    atr.setAttribute('style', 'border-color: red');
  };
  var returnColor = function (atr) {
    atr.removeAttribute('style', 'border-color: red');
  };
  titleInput.addEventListener('invalid', function () {
    if (titleInput.validity.tooShort) {
      changeColor(titleInput);
    } else if (titleInput.validity.tooLong) {
      changeColor(titleInput);
    } else if (titleInput.validity.valueMissing) {
      changeColor(titleInput);
    } else {
      titleInput.setCustomValidity('');
      returnColor(titleInput);
    }
  });
  addressInput.addEventListener('invalid', function () {
    if (addressInput.validity.valueMissing) {
      addressInput.setCustomValidity('');
      changeColor(addressInput);
    } else {
      addressInput.setCustomValidity('');
      returnColor(addressInput);
    }
  });
  priceInput.addEventListener('invalid', function () {
    if (priceInput.validity.rangeUnderflow) {
      priceInput.setCustomValidity('Минимальная цена для ' + minPriceMessage + ' руб.');
      changeColor(priceInput);
    } else if (priceInput.validity.rangeOverflow) {
      changeColor(priceInput);
    } else if (priceInput.validity.valueMissing) {
      changeColor(priceInput);
    } else if (priceInput.validity.typeMismatch) {
      changeColor(priceInput);
    } else {
      priceInput.setCustomValidity('');
      returnColor(priceInput);
    }
  });
  window.mapPinMain.addEventListener('click', function () {
    returnColor(titleInput);
    returnColor(priceInput);
  });
  window.synchronizeFields(selectTimein, selectTimeout, '', '', window.syncValues);
  window.synchronizeFields(selectTimeout, selectTimein, '', '', window.syncValues);
  window.synchronizeFields(selectType, priceInput, minPricePerNight, apartmentType, window.syncValueWithMin);
  window.synchronizeFields(selectRooms, selectCapacity, '', '', window.syncValueWithPersons);
  form.addEventListener('submit', function (event) {
    if (titleInput.value.length < minLengthTitle || titleInput.value.length > maxLengthTitle) {
      changeColor(titleInput);
      event.preventDefault();
    }
    if (priceInput.min < minPrice || priceInput.max > maxPrice || priceInput.type !== 'number' || priceInput.value === '') {
      changeColor(priceInput);
      event.preventDefault();
    }
    if (addressInput.value !== window.positionMainPin) {
      addressInput.value = window.positionMainPin;
      addressInput.setAttribute('readonly');
    }
  });
})();
