'use strict';
window.common = (function () {
  var isMapPinMainActive = false;

  var onPinActivePressEnter = function (evt) {
    window.util.isEnterPress(evt, onPinActivate);
  };

  var onPinActivate = function () {
    window.form.adForm.classList.remove('ad-form--disabled');
    window.pins.map.classList.remove('map--faded');
    window.util.removeAttributeDisabled(window.form.adForm);
    window.pins.addActiveValueMainPin((window.pins.mapPinMain.style.left), (window.pins.mapPinMain.style.top));
    window.form.buttonSubmit.removeAttribute('disabled');
    window.backend.load(window.mapFilters.onSuccess, window.errorSuccessMessage.onErrorMessage);

    window.common.isMapPinMainActive = true;
    window.pins.mapPinMain.removeEventListener('mousedown', onPinActivate);
    window.pins.mapPinMain.removeEventListener('keydown', onPinActivePressEnter);
  };

  window.pins.mapPinMain.addEventListener('mousedown', onPinActivate);
  window.pins.mapPinMain.addEventListener('keydown', onPinActivePressEnter);

  return {
    setInactiveState: function () {
      window.form.adForm.classList.add('ad-form--disabled');
      window.pins.map.classList.add('map--faded');
      window.util.setAttributeDisabled(window.form.adForm);
      window.pins.addAttributeInMapPinMain(window.pins.pinMainX, window.pins.pinMainY);
      window.pins.addInactiveValueMainPin();
      window.pins.pinsClean();
      window.util.cardsClean();
      window.common.isMapPinMainActive = false;

      window.pins.mapPinMain.addEventListener('mousedown', onPinActivate);
      window.pins.mapPinMain.addEventListener('keydown', onPinActivePressEnter);
    },
    isMapPinMainActive: isMapPinMainActive
  };
})();
