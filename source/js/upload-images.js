'use strict';
window.uploadImages = (function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var DEFAULT_IMG = 'img/muffin-grey.svg';

  return {
    upload: function (input, img) {
      var fileChooser = document.querySelector(input);
      var preview = document.querySelector(img + ' img');

      fileChooser.addEventListener('change', function () {
        var file = fileChooser.files[0];
        var fileName = file.name.toLowerCase();

        var matches = FILE_TYPES.some(function (item) {
          return fileName.endsWith(item);
        });

        if (matches) {
          var reader = new FileReader();
          reader.readAsDataURL(file);

          reader.addEventListener('load', function () {
            preview.src = reader.result;
          });
          reader.addEventListener('error', function () {
            window.errorSuccessMessage.onErrorMessage('Произошла ошибка при загрузке фотографии');
          });
        } else if (!matches) {
          window.errorSuccessMessage.onErrorMessage('Не верный формат фотографии');
          fileChooser.value = '';
        }
      });
    },
    cleanPreview: function (preview) {
      var img = document.querySelector(preview + ' img');
      img.src = DEFAULT_IMG;
    }
  };
})();
