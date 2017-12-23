'use strict';

(function () {
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
      window.fragment.appendChild(window.pin.locateAds(item));
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
    window.form.appendChild(div);
    window.form.reset();
    var removeDiv = function () {
      window.form.removeChild(div);
    };
    div.addEventListener('click', removeDiv);
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
