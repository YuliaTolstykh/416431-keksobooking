'use strict';

(function () {
  var titleInput = document.getElementById('title');
  var addressInput = document.getElementById('address');
  var priceInput = document.getElementById('price');
  var mapPin = document.querySelector('.map__pin');
  var form = document.forms[1];
  var selectTimein = form.elements.timein;
  var selectTimeout = form.elements.timeout;
  var selectRooms = form.elements.rooms;
  var selectCapacity = form.elements.capacity;
  var selectType = form.elements.type;
  var minPrice;
  var changeColor = function (atr) {
    atr.setAttribute('style', 'border-color: red');
  };
  var returnColor = function (atr) {
    atr.removeAttribute('style', 'border-color: red');
  };
  var positionMainPin = mapPin.getBoundingClientRect().x.toFixed(1) + ' ' + mapPin.getBoundingClientRect().y.toFixed(1);
  addressInput.setAttribute('value', positionMainPin);

  titleInput.addEventListener('invalid', function () {
    if (titleInput.validity.tooShort) {
      titleInput.setCustomValidity('');
      changeColor(titleInput);
    } else if (titleInput.validity.tooLong) {
      titleInput.setCustomValidity('');
      changeColor(titleInput);
    } else if (titleInput.validity.valueMissing) {
      titleInput.setCustomValidity('');
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
      priceInput.setCustomValidity('Минимальная цена для ' + minPrice + ' руб.');
      changeColor(priceInput);
    } else if (priceInput.validity.rangeOverflow) {
      priceInput.setCustomValidity('');
      changeColor(priceInput);
    } else if (priceInput.validity.valueMissing) {
      priceInput.setCustomValidity('');
      changeColor(priceInput);
    } else if (priceInput.validity.typeMismatch) {
      changeColor(priceInput);
    } else {
      priceInput.setCustomValidity('');
      returnColor(priceInput);
    }
  });
  mapPin.addEventListener('click', function () {
    returnColor(titleInput);
    returnColor(priceInput);
  });
  var correlateSelect = function (select1, select2) {
    select1.addEventListener('change', (function () {
      select2.options[select1.selectedIndex].selected = true;
    }));
  };
  correlateSelect(selectTimein, selectTimeout);
  correlateSelect(selectTimeout, selectTimein);
  selectRooms.addEventListener('change', (function () {
    if (selectRooms.selectedIndex === 0) {
      selectCapacity.options[2].selected = true;
    } else if (selectRooms.selectedIndex === 1) {
      selectCapacity.options[1].selected = true;
    } else if (selectRooms.selectedIndex === 2) {
      selectCapacity.options[0].selected = true;
    } else if (selectRooms.selectedIndex === 3) {
      selectCapacity.options[3].selected = true;
    }
  }));
  selectType.addEventListener('change', (function () {
    if (selectType.selectedIndex === 0) {
      priceInput.value = 1000;
      priceInput.min = 1000;
      minPrice = 'квартиры 1000';
    } else if (selectType.selectedIndex === 1) {
      priceInput.value = 0;
      priceInput.min = 0;
      minPrice = 'лачуги 0';
    } else if (selectType.selectedIndex === 2) {
      priceInput.value = 5000;
      priceInput.min = 5000;
      minPrice = 'дома 5000';
    } else if (selectType.selectedIndex === 3) {
      priceInput.value = 10000;
      priceInput.min = 10000;
      minPrice = 'дворца 10000';
    }
  }));
})();
