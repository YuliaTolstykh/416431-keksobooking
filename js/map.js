'use strict';

(function () {
  window.WIDTH_MARK_MAP = 32;
  window.HEIGHT_MARK_MAP = 42;
  var ESC_KEYCODE = 27;
  var map = document.querySelector('.map');
  var fragment = document.createDocumentFragment();
  window.mapPinMain = document.querySelector('.map__pin--main');
  var form = document.querySelector('.notice__form');
  var formFieldset = form.querySelectorAll('fieldset');
  var mapPins = [];
  window.indexEvent = 0;
  var addDisabled = function (arr) {
    arr.forEach(function (item) {
      item.setAttribute('disabled', 'disabled');
      return arr;
    });
  };
  var removeDisabled = function (arr) {
    arr.forEach(function (item) {
      if (item.hasAttribute('disabled') === true) {
        item.removeAttribute('disabled');
      }
      return arr;
    });
  };
  addDisabled(formFieldset);

  var onMapPinMainMouseup = function (callback) {
    map.classList.remove('map--faded');
    form.classList.remove('notice__form--disabled');
    removeDisabled(formFieldset);
    if (typeof callback === 'function') {
      callback();
    }
  };
  var onMapPinMainMouseupPass = function () {
    onMapPinMainMouseup(window.pin.insertMapPin(fragment).addEventListener('click', onMapPinClick));
    window.mapPinMain.addEventListener('mousedown', window.pinMainHandle);
  };
  var onError = function (message) {
    var div = document.createElement('div');
    div.style = 'z-index: 100; margin: 0 auto; padding: 150px 0; text-align: center; background-color: #f0f0ea;';
    div.style.position = 'absolute';
    div.style.top = '200px';
    div.style.left = '5%';
    div.style.right = '5%';
    div.style.fontSize = '30px';
    div.textContent = message;
    document.body.insertAdjacentElement('afterbegin', div);
  };
  var onLoad = function (data) {
    window.data = data;
    window.data.forEach(function (item) {
      fragment.appendChild(window.pin.locateAds(item));
    });
  };
  var onSave = function () {
    var div = document.createElement('div');
    div.style = 'z-index: 100; margin: 0 auto; padding: 150px 0; text-align: center; background-color: #fafafa;';
    div.style.position = 'absolute';
    div.style.top = '700px';
    div.style.left = '20%';
    div.style.right = '20%';
    div.style.fontSize = '30px';
    div.textContent = 'Форма успешно заполнена';
    form.appendChild(div);
    form.reset();
    var removeDiv = function () {
      form.removeChild(div);
    };
    div.addEventListener('click', removeDiv);
  };
  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), onSave, onError);
    evt.preventDefault();
  });
  window.backend.load(onLoad, onError);
  window.mapPinMain.addEventListener('mouseup', onMapPinMainMouseupPass);
  var onMapPinClick = function () {
    var mapPinElements = document.querySelectorAll('.map__pin');
    mapPins = [].slice.call(mapPinElements);
    window.pin.searchIndexEvent(mapPins);
    removePinActive(mapPins, window.indexEvent);
    setPinActive(mapPins, window.indexEvent);
  };
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      removePopup(mapPins[window.indexEvent]);
    }
  });
  var setPinActive = function (vector, n) {
    if (n !== 0 && vector[n].classList.contains('map__pin--active') !== true) {
      vector[n].classList.add('map__pin--active');
      window.showCard(map, window.data[n - 1]);
      var popupClose = document.querySelector('.popup__close');
      popupClose.addEventListener('click', function () {
        removePopup(vector[n]);
      });
    }
  };
  var removePinActive = function (vector, n) {
    for (var index = 0; index < vector.length; index++) {
      if (index !== n && vector[index].classList.contains('map__pin--active') === true) {
        removePopup(vector[index]);
      }
    }
  };
  var removePopup = function (arg) {
    arg.classList.remove('map__pin--active');
    var popup = map.querySelector('.popup');
    map.removeChild(popup);
  };
  window.mapPinMain.addEventListener('mouseup', onMapPinMainMouseupPass);
}());
