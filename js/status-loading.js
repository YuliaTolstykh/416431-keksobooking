'use strict';

(function () {
  var ORIGIN_COORD_TOP = 375;
  var ORIGIN_COORD_LEFT = 50;
  var ERROR_TOP_INDENT = 200;
  var ERROR_INDENT = 5;
  var ERROR_COLOR = '#f0f0ea;';
  var SAVE_TOP_INDENT = 700;
  var SAVE_INDENT = 20;
  var SAVE_COLOR = '#fafafa;';
  var drawMessageWindow = function (color, message, indentTop, indent, parentDiv) {
    var div = document.createElement('div');
    div.style = 'z-index: 100; margin: 0 auto; padding: 150px 0; text-align: center; background-color: ' + color;
    div.style.position = 'absolute';
    div.style.top = indentTop + 'px';
    div.style.left = indent + '%';
    div.style.right = indent + '%';
    div.style.fontSize = '30px';
    div.textContent = message;
    div.addEventListener('click', function () {
      removeDiv(div);
    });
    var removeDiv = function () {
      parentDiv.removeChild(div);
    };
    document.body.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.ESC_KEYCODE) {
        removeDiv(div);
        evt.stopPropagation();
      }
    });
    return div;
  };
  var onLoad = function (data) {
    window.data = data;
    window.data.forEach(function (item) {
      window.fragment.appendChild(window.pin.locateAds(item));
    });
  };
  var onError = function (message) {
    var div = drawMessageWindow(ERROR_COLOR, message, ERROR_TOP_INDENT, ERROR_INDENT, document.body);
    document.body.insertAdjacentElement('afterbegin', div);
  };
  var onSave = function () {
    var div = drawMessageWindow(SAVE_COLOR, 'Форма успешно заполнена', SAVE_TOP_INDENT, SAVE_INDENT, window.form);
    window.form.appendChild(div);
    window.form.reset();
    window.mapPinMain.style.top = (ORIGIN_COORD_TOP) + 'px';
    window.mapPinMain.style.left = (ORIGIN_COORD_LEFT) + '%';
    window.addressInput.setAttribute('value', '');
    window.form.querySelectorAll('input').forEach(function (item) {
      if (item.getAttribute('style', 'border-color: red')) {
        item.removeAttribute('style', 'border-color: red');
      }
    });
  };
  var sendForm = function () {
    window.backend.save(new FormData(window.form), onSave, onError);
  };
  window.form.addEventListener('submit', function (evt) {
    evt = evt || event;
    window.checkForm(evt, sendForm);
  });
  window.backend.load(onLoad, onError);
}());
