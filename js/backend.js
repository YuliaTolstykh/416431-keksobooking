'use strict';

(function () {
  var setup = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case 200:
          break;
        case 400:
          error = 'Неверный запрос';
          break;
        case 404:
          error = 'Ничего не найдено';
          break;
        default:
          error = 'Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText;
      }
      if (error) {
        onError(error);
      }
      if (xhr.response !== null) {
        onLoad(xhr.response);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
      // onLoad(window.initialData)
    });
    xhr.timeout = 10000;
    return xhr;
  };
  window.backend = {
    load: function (onLoad, onError) {
      var xhr = setup(onLoad, onError);
      xhr.open('GET', 'https://1510.dump.academy/keksobooking/data');
      xhr.send();
    },
    save: function (data, onSave, onError) {
      var xhr = setup(onSave, onError);
      xhr.open('POST', 'https://1510.dump.academy/keksobooking');
      xhr.send(data);
    }
  };
}());
