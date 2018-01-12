'use strict';

(function () {
  var MIN_LENGTH_TITLE = 30;
  var MAX_LENGTH_TITLE = 100;
  var MIN_PRICE = 0;
  var MAX_PRICE = 1000000;
  var MIN_PRICES_PER_NIGHT = [1000, 0, 5000, 10000];
  var APARTMENT_TYPES = ['квартиры', 'лачуги', 'дома', 'дворца'];
  var ACTIVE_OPTIONS = [
    [2],
    [1, 2],
    [0, 1, 2],
    [3]
  ];
  var titleInput = window.form.elements.title;
  window.addressInput = window.form.elements.address;
  var priceInput = window.form.elements.price;
  var selectTimein = window.form.elements.timein;
  var selectTimeout = window.form.elements.timeout;
  var selectRooms = window.form.elements.rooms;
  var selectCapacity = window.form.elements.capacity;
  var selectType = window.form.elements.type;
  var minPriceMessage = 'квартиры 1000';
  var changeColor = function (atr) {
    atr.setAttribute('style', 'border-color: red');
  };
  var returnColor = function (atr) {
    atr.removeAttribute('style', 'border-color: red');
  };
  titleInput.addEventListener('invalid', function () {
    if (titleInput.validity.tooShort || titleInput.validity.tooLong || titleInput.validity.valueMissing) {
      changeColor(titleInput);
    } else {
      titleInput.setCustomValidity('');
      returnColor(titleInput);
    }
  });
  titleInput.addEventListener('input', function () {
    if (titleInput.validity.valid) {
      returnColor(titleInput);
    }
  });
  window.addressInput.addEventListener('invalid', function () {
    if (window.addressInput.validity.valueMissing) {
      window.addressInput.setCustomValidity('');
      changeColor(window.addressInput);
    } else {
      window.addressInput.setCustomValidity('');
      returnColor(window.addressInput);
    }
  });
  priceInput.addEventListener('invalid', function () {
    if (priceInput.validity.rangeUnderflow) {
      priceInput.setCustomValidity('Минимальная цена для ' + minPriceMessage + ' руб.');
      changeColor(priceInput);
    } else if (priceInput.validity.rangeOverflow || priceInput.validity.valueMissing || priceInput.validity.typeMismatch) {
      changeColor(priceInput);
    } else {
      priceInput.setCustomValidity('');
      returnColor(priceInput);
    }
  });
  priceInput.addEventListener('input', function () {
    if (priceInput.validity.valid) {
      returnColor(priceInput);
    }
  });
  window.mapPinMain.addEventListener('click', function () {
    if (titleInput.validity.valid) {
      returnColor(titleInput);
    }
    if (priceInput.validity.valid) {
      returnColor(priceInput);
    }
    if (window.addressInput.value) {
      returnColor(window.addressInput);
    }
  });
  var syncValues = function (field1, field2) {
    field2.options[field1.selectedIndex].selected = true;
  };
  var syncValueWithMin = function (fields1, fields2, values1, values2) {
    for (var j = 0; j < fields1.length; j++) {
      if (fields1.selectedIndex === j) {
        fields2.value = values1[j];
        fields2.min = values1[j];
        minPriceMessage = values2[j] + ' ' + values1[j];
        break;
      }
    }
    return minPriceMessage;
  };
  var syncValueWithPersons = function (fields1, fields2) {
    for (var i = 0; i < fields2.length; i++) {
      fields2.options[i].setAttribute('disabled', 'disabled');
    }
    for (var j = 0; j < fields2.length; j++) {
      if (fields1.selectedIndex === j) {
        fields2.options[ACTIVE_OPTIONS[j][0]].selected = true;
        for (var n = 0; n < ACTIVE_OPTIONS[j].length; n++) {
          fields2.options[ACTIVE_OPTIONS[j][n]].removeAttribute('disabled', 'disabled');
        }
      }
    }
  };
  syncValueWithPersons(selectRooms, selectCapacity);
  window.synchronizeFields(selectTimein, selectTimeout, '', '', syncValues);
  window.synchronizeFields(selectTimeout, selectTimein, '', '', syncValues);
  window.synchronizeFields(selectType, priceInput, MIN_PRICES_PER_NIGHT, APARTMENT_TYPES, syncValueWithMin);
  window.synchronizeFields(selectRooms, selectCapacity, '', '', syncValueWithPersons);
  window.checkForm = function (evt, cb) {
    if (titleInput.value.length < MIN_LENGTH_TITLE || titleInput.value.length > MAX_LENGTH_TITLE) {
      changeColor(titleInput);
      evt.preventDefault();
    }
    if (priceInput.min < MIN_PRICE || priceInput.max > MAX_PRICE || priceInput.type !== 'number' || priceInput.value === '') {
      changeColor(priceInput);
      evt.preventDefault();
    }
    if (window.addressInput.value === '' || window.addressInput.value === 'undefined') {
      changeColor(window.addressInput);
      evt.preventDefault();
      return;
    }
    if (window.addressInput.value !== window.positionMainPin) {
      window.addressInput.value = window.positionMainPin;
      window.addressInput.setAttribute('readonly', 'readonly');
      evt.preventDefault();
    }
    syncValueWithPersons(selectRooms, selectCapacity);
    evt.preventDefault();
    cb();
  };
})();
