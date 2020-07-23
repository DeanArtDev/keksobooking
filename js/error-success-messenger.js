'use strict';
window.errorSuccessMessage = (function () {
  var cleanMessagesAndListeners = function () {
    document.querySelector('main').children[0].remove();
    document.removeEventListener('keydown', onMessagePressEsc);
    document.removeEventListener('mouseup', onMessageMouseup);
  };

  var onMessagePressEsc = function (evt) {
    window.util.isEscPress(evt, function () {
      cleanMessagesAndListeners();
    });
  };

  var onMessageMouseup = function () {
    cleanMessagesAndListeners();
  };

  var onButtonMouseup = function (evt) {
    evt.stopPropagation();
    cleanMessagesAndListeners();
  };

  return {
    onErrorMessage: function (message) {
      var errorTemplate = window.util.getFromTemplate('#error', '.error');

      errorTemplate.querySelector('.error__message').textContent = message;
      errorTemplate.querySelector('.error__button').addEventListener('mouseup', onButtonMouseup);

      document.addEventListener('keydown', onMessagePressEsc);
      document.addEventListener('mouseup', onMessageMouseup);
      window.util.drawBeforeElement(errorTemplate, '.promo');
      window.form.buttonSubmit.removeAttribute('disabled');
    },
    onSuccessMessage: function () {
      var successTemplate = window.util.getFromTemplate('#success', '.success');

      document.addEventListener('keydown', onMessagePressEsc);
      document.addEventListener('mouseup', onMessageMouseup);
      window.util.drawBeforeElement(successTemplate, '.promo');
    }
  };
})();
