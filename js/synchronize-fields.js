'use strict';

(function () {
  window.synchronizeFields = function (field1, field2, value1, value2, callback) {
    field1.addEventListener('change', (function () {
      callback(field1, field2, value1, value2);
    }));
  };
  window.syncValues = function (field1, field2) {
    field2.options[field1.selectedIndex].selected = true;
  };
  window.syncValueWithMin = function (field1, field2, value1, value2) {
    var minPriceMessage;
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
  window.syncValueWithPersons = function (field1, field2) {
    if (field1.selectedIndex === 0) {
      field2.options[2].selected = true;
    } else if (field1.selectedIndex === 1) {
      field2.options[1].selected = true;
    } else if (field1.selectedIndex === 2) {
      field2.options[0].selected = true;
    } else if (field1.selectedIndex === 3) {
      field2.options[3].selected = true;
    }
  };
}());
