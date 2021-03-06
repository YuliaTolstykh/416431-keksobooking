'use strict';

(function () {
  var ERROR_TOP_INDENT = 200;
  var ERROR_INDENT = 5;
  var ERROR_COLOR = '#f0f0ea;';
  window.form = document.querySelector('.notice__form');
  var drawMessageWindow = function (color, message, indentTop, indent, parentDiv) {
    var div = document.createElement('div');
    div.style = 'z-index: 100; margin: 0 auto; padding: 150px 0; text-align: center; background-color: ' + color;
    div.style.position = 'absolute';
    div.style.top = indentTop + 'px';
    div.style.left = indent + '%';
    div.style.right = indent + '%';
    div.style.fontSize = '30px';
    div.textContent = message;
    var removeDiv = function () {
      parentDiv.removeChild(div);
      document.body.removeEventListener('keydown', onDivKeydown);
      div.removeEventListener('click', onDivClick);
    };
    var onDivClick = function () {
      removeDiv(div);
    };
    var onDivKeydown = function (evt) {
      if (evt.keyCode === window.ESC_KEYCODE) {
        removeDiv(div);
        evt.stopPropagation();
      }
    };
    div.addEventListener('click', onDivClick);
    document.body.addEventListener('keydown', onDivKeydown);
    return div;
  };
  var onLoad = function (ads) {
    window.initialAds = ads;
    window.filterPin();
  };
  var onError = function (message) {
    var div = drawMessageWindow(ERROR_COLOR, message, ERROR_TOP_INDENT, ERROR_INDENT, document.body);
    document.body.insertAdjacentElement('afterbegin', div);
  };
  var onSave = function () {
    window.form.reset();
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
    window.checkForm(evt, sendForm);
  });
  window.backend.load(onLoad, onError);
}());
