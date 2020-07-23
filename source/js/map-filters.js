'use strict';
window.mapFilters = (function () {
  var LimitPrice = {
    MIDDLE: 10000,
    HIGH: 50000
  };
  var START_SLICE_PINS = 0;
  var QUANTITY_RENDER_PINS = 5;
  var mapFilterForm = document.querySelector('.map__filters');
  var containerFeaturesCheckboxes = mapFilterForm.querySelector('#housing-features');
  var pins;
  var featuresForCompare = [];

  var addFeature = function (feature) {
    if (featuresForCompare.indexOf(feature) === -1) {
      featuresForCompare.push(feature);
    }
  };

  var removeFeature = function (feature) {
    var idx = featuresForCompare.indexOf(feature);
    featuresForCompare.splice(idx, 1);
  };

  var compareFeaturesWithData = function (arr) {
    for (var i = 0; i < featuresForCompare.length; i++) {
      if (arr.indexOf(featuresForCompare[i]) < 0) {
        return false;
      }
    }
    return true;
  };

  var checkOnChecked = function () {
    var inputs = containerFeaturesCheckboxes.querySelectorAll('input:checked');
    return inputs.length <= 0;
  };

  var onCheckboxFeaturesChange = function (evt) {
    switch (evt.target.checked) {
      case true:
        addFeature(evt.target.value);
        updatePins();
        break;
      case false:
        removeFeature(evt.target.value);
        updatePins();
        break;
    }
  };

  var checkOnPropertyOffer = function (array) {
    return array.filter(function (item) {
      return item.offer !== undefined;
    });
  };

  var hostingTypeSelect = mapFilterForm.querySelector('#housing-type');
  var hostingPriceSelect = mapFilterForm.querySelector('#housing-price');
  var hostingRoomsSelect = mapFilterForm.querySelector('#housing-rooms');
  var hostingGuestsSelect = mapFilterForm.querySelector('#housing-guests');
  var hostingType = hostingTypeSelect.value;
  var hostingPrice = hostingPriceSelect.value;
  var hostingRooms = hostingRoomsSelect.value;
  var hostingGuests = hostingGuestsSelect.value;

  hostingTypeSelect.addEventListener('change', function (evt) {
    hostingType = evt.target.value;
    updatePins();
  });
  hostingPriceSelect.addEventListener('change', function (evt) {
    hostingPrice = evt.target.value;
    updatePins();
  });
  hostingRoomsSelect.addEventListener('change', function (evt) {
    hostingRooms = evt.target.value;
    updatePins();
  });
  hostingGuestsSelect.addEventListener('change', function (evt) {
    hostingGuests = evt.target.value;
    updatePins();
  });
  containerFeaturesCheckboxes.addEventListener('change', onCheckboxFeaturesChange);

  var isPrice = function (range, item) {
    var price = item.offer.price;
    return (
      range === 'any' ||
      range === 'middle' && price <= LimitPrice.HIGH && price >= LimitPrice.MIDDLE ||
      range === 'low' && price < LimitPrice.MIDDLE ||
      range === 'high' && price > LimitPrice.HIGH
    );
  };

  var isHosting = function (item) {
    return (hostingType === 'any') || item.offer.type === hostingType;
  };
  var isRooms = function (item) {
    return (hostingRooms === 'any') || item.offer.rooms === parseInt(hostingRooms, 10);
  };
  var isGuests = function (item) {
    return (hostingGuests === 'any') || item.offer.guests === parseInt(hostingGuests, 10);
  };
  var isFeatures = function (item) {
    return checkOnChecked() || compareFeaturesWithData(item.offer.features);
  };

  var updatePins = window.debounce(function () {
    window.util.cardsClean();
    var checkedPins = checkOnPropertyOffer(pins);

    var filteredPins = checkedPins
      .filter(function (item) {
        return isHosting(item) && isPrice(hostingPrice, item) && isRooms(item) && isGuests(item) && isFeatures(item);
      })
      .slice(START_SLICE_PINS, QUANTITY_RENDER_PINS);

    window.pins.renderPins(filteredPins);
  });

  return {
    onSuccess: function (data) {
      pins = window.util.shuffle(data);
      updatePins();
    },
    resetFilter: function () {
      hostingType = hostingTypeSelect.value;
      hostingPrice = hostingPriceSelect.value;
      hostingRooms = hostingRoomsSelect.value;
      hostingGuests = hostingGuestsSelect.value;
    },
    mapFilterForm: mapFilterForm
  };
})();
