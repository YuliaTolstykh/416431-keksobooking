'use strict';

(function () {
  var MIN_LENGTH_TITLE = 30;
  var MAX_LENGTH_TITLE = 100;
  var MIN_PRICE = 0;
  var MAX_PRICE = 1000000;
  var titleInput = window.form.elements.title;
  window.addressInput = window.form.elements.address;
  var priceInput = window.form.elements.price;
  var selectTimein = window.form.elements.timein;
  var selectTimeout = window.form.elements.timeout;
  var selectRooms = window.form.elements.rooms;
  var selectCapacity = window.form.elements.capacity;
  var selectType = window.form.elements.type;
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
  var syncValues = function (field1, field2) {
    field2.options[field1.selectedIndex].selected = true;
  };
  var syncValueWithMin = function (field1, field2, value1, value2) {
    if (field1.selectedIndex === 0) {
      field2.value = value1[0];
      field2.min = value1[0];
      minPriceMessage = value2[0] + ' ' + value1[0];
    } else if (field1.selectedIndex === 1) {
      field2.value = value1[1];
      field2.min = value1[1];
      minPriceMessage = value2[1] + ' ' + value1[1];
    } else if (field1.selectedIndex === 2) {
      field2.value = value1[2];
      field2.min = value1[2];
      minPriceMessage = value2[2] + ' ' + value1[2];
    } else if (field1.selectedIndex === 3) {
      field2.value = value1[3];
      field2.min = value1[3];
      minPriceMessage = value2[3] + ' ' + value1[3];
    }
    return minPriceMessage;
  };
  var syncValueWithPersons = function (field1, field2) {
    if (field1.selectedIndex === 0) {
      field2.options[2].selected = true;
      field2.options[0].setAttribute('disabled', 'disabled');
      field2.options[1].setAttribute('disabled', 'disabled');
      field2.options[2].removeAttribute('disabled', 'disabled');
      field2.options[3].setAttribute('disabled', 'disabled');
    } else if (field1.selectedIndex === 1) {
      field2.options[1].selected = true;
      field2.options[0].setAttribute('disabled', 'disabled');
      field2.options[1].removeAttribute('disabled', 'disabled');
      field2.options[2].removeAttribute('disabled', 'disabled');
      field2.options[3].setAttribute('disabled', 'disabled');
    } else if (field1.selectedIndex === 2) {
      field2.options[0].selected = true;
      field2.options[0].removeAttribute('disabled', 'disabled');
      field2.options[1].removeAttribute('disabled', 'disabled');
      field2.options[2].removeAttribute('disabled', 'disabled');
      field2.options[3].setAttribute('disabled', 'disabled');
    } else if (field1.selectedIndex === 3) {
      field2.options[3].selected = true;
      field2.options[0].setAttribute('disabled', 'disabled');
      field2.options[1].setAttribute('disabled', 'disabled');
      field2.options[2].setAttribute('disabled', 'disabled');
      field2.options[3].removeAttribute('disabled', 'disabled');
    }
  };
  syncValueWithPersons(selectRooms, selectCapacity);
  window.synchronizeFields(selectTimein, selectTimeout, '', '', syncValues);
  window.synchronizeFields(selectTimeout, selectTimein, '', '', syncValues);
  window.synchronizeFields(selectType, priceInput, minPricePerNight, apartmentType, syncValueWithMin);
  window.synchronizeFields(selectRooms, selectCapacity, '', '', syncValueWithPersons);

  window.checkForm = function (evt, cbk) {
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
    evt.preventDefault();
    cbk();
  };
})();
