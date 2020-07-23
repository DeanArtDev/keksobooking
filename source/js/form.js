'use strict';
window.form = (function () {
  var PriceTypeHousing = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };
  var adForm = document.querySelector('.ad-form');
  var roomNumberSelect = adForm.querySelector('#room_number');
  var capacitySelect = adForm.querySelector('#capacity');
  var roomNumberOptions = roomNumberSelect.querySelectorAll('option');
  var capacityOptions = capacitySelect.querySelectorAll('option');
  var typeSelect = adForm.querySelector('#type');
  var priceInput = adForm.querySelector('#price');
  var timeinSelect = adForm.querySelector('#timein');
  var timeoutSelect = adForm.querySelector('#timeout');
  var filterPins = document.querySelector('.map__filters');

  window.util.setAttributeDisabled(adForm);
  window.util.setAttributeDisabled(filterPins);

  // Присвоить одинаковое значение
  var addEqualValue = function (evt, select) {
    if (evt.target.value !== select.value) {
      select.selectedIndex = evt.target.selectedIndex;
    }
  };

  // Проверка на совпадение комнат и гостей
  var onRoomsGuestsInput = function () {
    var capacityValue = Number(window.util.checkOnSelected(capacityOptions));
    var roomValue = Number(window.util.checkOnSelected(roomNumberOptions));

    if (roomValue === 1 && capacityValue !== 1) {
      capacitySelect.setCustomValidity('Количество допустимых гостей для 1 комнаты, не должно превышать 1');

    } else if (roomValue === 2 && capacityValue <= 0 || roomValue === 2 && capacityValue > 2) {
      capacitySelect.setCustomValidity('Количество допустимых гостей для 2 комнат, не должно превышать 2');

    } else if (roomValue === 3 && capacityValue <= 0 || roomValue === 2 && capacityValue > 3) {
      capacitySelect.setCustomValidity('Количество допустимых гостей для 3 комнат, не должно превышать 3');

    } else if (roomValue === 100 && capacityValue !== 0) {
      capacitySelect.setCustomValidity('100 комнат не для гостей');

    } else {
      capacitySelect.setCustomValidity('');
    }
  };

  // Добавление атрибутов для input price
  var addPlaceholderAndMin = function (value) {
    priceInput.setAttribute('min', value);
    priceInput.setAttribute('placeholder', value);
  };

  // Присвоение цены за жилье
  var onTypeHousingInput = function () {
    switch (window.util.checkOnSelected(typeSelect)) {
      case 'bungalo':
        addPlaceholderAndMin(PriceTypeHousing.BUNGALO);
        break;
      case 'flat':
        addPlaceholderAndMin(PriceTypeHousing.FLAT);
        break;
      case 'house':
        addPlaceholderAndMin(PriceTypeHousing.HOUSE);
        break;
      case 'palace':
        addPlaceholderAndMin(PriceTypeHousing.PALACE);
        break;
    }
  };

  // Синхронизация timein timeout
  var onTimeoutInput = function (evt) {
    addEqualValue(evt, timeinSelect);
  };

  var onTimeinInput = function (evt) {
    addEqualValue(evt, timeoutSelect);
  };

  // Валидация формы
  onRoomsGuestsInput();
  roomNumberSelect.addEventListener('input', onRoomsGuestsInput);
  capacitySelect.addEventListener('input', onRoomsGuestsInput);
  typeSelect.addEventListener('input', onTypeHousingInput);
  timeoutSelect.addEventListener('input', onTimeoutInput);
  timeinSelect.addEventListener('input', onTimeinInput);

  // Очистка форм
  var cleanForms = function () {
    adForm.reset();
    window.util.setAttributeDisabled(filterPins);
    window.mapFilters.mapFilterForm.reset();
    window.mapFilters.mapFilterForm.classList.add('map__filters--faded');
    window.mapFilters.resetFilter();
    window.uploadImages.cleanPreview('.ad-form-header__preview');
    window.uploadImages.cleanPreview('.ad-form__photo');
  };

  // Колбек удачной отпраки фомры
  var onSuccessSendForm = function () {
    window.errorSuccessMessage.onSuccessMessage();
    cleanForms();
    window.common.setInactiveState();
  };

  var buttonSubmit = adForm.querySelector('.ad-form__submit');
  // Отправка формы
  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), onSuccessSendForm, window.errorSuccessMessage.onErrorMessage);
    window.form.buttonSubmit.blur();
    buttonSubmit.setAttribute('disabled', '');
  });

  // Ресет формы
  var resetButton = adForm.querySelector('.ad-form__reset');
  var onResetButton = function (evt) {
    evt.preventDefault();
    cleanForms();
    window.common.setInactiveState();
  };
  var onResetButtonPressEnter = function (evt) {
    window.util.isSpacePress(evt, onResetButton.bind(window.util.isEnterPress, evt));
  };

  resetButton.addEventListener('mousedown', onResetButton);
  resetButton.addEventListener('keydown', onResetButtonPressEnter);

  // Загрузка аватарки
  window.uploadImages.upload('#avatar', '.ad-form-header__preview');

  // Загрузка фото жилья
  window.uploadImages.upload('#images', '.ad-form__photo');

  return {
    adForm: adForm,
    buttonSubmit: buttonSubmit,
    filterPins: filterPins
  };
})();
