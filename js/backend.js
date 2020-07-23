'use strict';
window.backend = (function () {
  var Error = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    ERROR_NOT_FOUND: 404
  };

  var STATUS_SUCCESS = 200;
  var TIMEOUT_LOAD = 10000;

  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_SAVE = 'https://js.dump.academy/keksobooking';
  var checkOnError = function (evt) {
    var error;
    var target = evt.target;
    var obj;

    switch (target.status) {
      case STATUS_SUCCESS:
        obj = target.response;
        break;
      case Error.BAD_REQUEST:
        error = 'Неверный запрос';
        break;
      case Error.UNAUTHORIZED:
        error = 'Пользователь не авторизован';
        break;
      case Error.ERROR_NOT_FOUND:
        error = 'Ничего не найдено';
        break;

      default:
        error = 'Статус ответа: : ' + target.status + ' ' + target.statusText;
    }

    if (error) {
      return error;
    }
    return obj;
  };

  return {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function (evt) {
        switch (typeof checkOnError(evt)) {
          case 'string':
            onError(checkOnError(evt));
            break;
          case 'object':
            onLoad(checkOnError(evt));
            break;
        }
      });
      xhr.addEventListener('loadend', function () {
        window.mapFilters.mapFilterForm.classList.remove('map__filters--faded');
        window.util.removeAttributeDisabled(window.form.filterPins);

      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения с сервером');
      });

      xhr.timeout = TIMEOUT_LOAD;
      xhr.open('GET', URL_LOAD);
      xhr.send();
    },
    save: function (data, onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function (evt) {
        switch (typeof checkOnError(evt)) {
          case 'string':
            onError(checkOnError(evt));
            break;
          case 'object':
            onSuccess();
            break;
        }
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения с сервером');
      });

      xhr.timeout = TIMEOUT_LOAD;
      xhr.open('POST', URL_SAVE);
      xhr.send(data);
    }
  };
})();
