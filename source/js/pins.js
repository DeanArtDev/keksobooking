'use strict';
window.pins = (function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var pinMainX = mapPinMain.offsetLeft;
  var pinMainY = mapPinMain.offsetTop;
  var Pin = {
    WIDTH: 50,
    HEIGHT: 70,
    MAIN_PIN_WIDTH: 65,
    ACTIVE_MAIN_PIN_HEIGHT: 84,
    INACTIVE_MAIN_PIN_HEIGHT: 65
  };
  var PinCoordinate = {
    TOP_POINT: 130,
    BOTTOM_POINT: 630,
    LEFT_POINT: (-Pin.MAIN_PIN_WIDTH / 2),
    RIGHT_POINT: map.offsetWidth - (Pin.MAIN_PIN_WIDTH / 2)
  };

  // ====================================
  // ПЕРЕМЕЩЕНИЕ mapPimMain
  // ====================================
  var addValueAddress = function (x, y) {
    var input = document.querySelector('#address');
    input.value = (x + ', ' + y).toString();
  };

  var addInactiveValueMainPin = function () {
    addValueAddress((pinMainX + Math.floor(Pin.MAIN_PIN_WIDTH / 2)), (pinMainY + Math.floor(Pin.INACTIVE_MAIN_PIN_HEIGHT / 2)));
  };
  addInactiveValueMainPin();

  var addActiveValueMainPin = function (x, y) {
    x = parseInt(x.replace(/3{\D+}/g, ''), 10);
    y = parseInt(y.replace(/\D+/g, ''), 10);
    addValueAddress((x + (Math.floor(Pin.MAIN_PIN_WIDTH / 2))), (y + Pin.ACTIVE_MAIN_PIN_HEIGHT));
  };

  var getLimitCoordinateY = function (y) {
    var topLimit = PinCoordinate.TOP_POINT - Pin.ACTIVE_MAIN_PIN_HEIGHT;
    var bottomLimit = PinCoordinate.BOTTOM_POINT - Pin.ACTIVE_MAIN_PIN_HEIGHT;
    if (y <= topLimit) {
      return topLimit;
    } else if (y >= bottomLimit) {
      return bottomLimit;
    }
    return y;
  };

  var getLimitCoordinateX = function (x) {
    if (x <= PinCoordinate.LEFT_POINT) {
      return PinCoordinate.LEFT_POINT;
    } else if (x >= PinCoordinate.RIGHT_POINT) {
      return Math.ceil(PinCoordinate.RIGHT_POINT);
    }
    return x;
  };

  var addAttributeInMapPinMain = function (left, top) {
    mapPinMain.style.left = getLimitCoordinateX(left) + 'px';
    mapPinMain.style.top = getLimitCoordinateY(top) + 'px';
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    var startCoordinates = new window.Coordinate(evt.clientX, evt.clientY);
    var shift = new window.Coordinate(0, 0);

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      shift.setX((startCoordinates._x - moveEvt.clientX));
      shift.setY((startCoordinates._y - moveEvt.clientY));
      startCoordinates.setX(moveEvt.clientX);
      startCoordinates.setY(moveEvt.clientY);

      addAttributeInMapPinMain((mapPinMain.offsetLeft - shift._x), (mapPinMain.offsetTop - shift._y));
      addActiveValueMainPin(mapPinMain.style.left, mapPinMain.style.top);
    };

    var onMouseUp = function () {
      addActiveValueMainPin(mapPinMain.style.left, mapPinMain.style.top);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    if (window.common.isMapPinMainActive) {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  });

  // ====================================
  // ОТРИСОВКА Pins
  // ====================================
  var mapPins = document.querySelector('.map__pins');

  var pinsClean = function () {
    while (mapPinMain.previousElementSibling.classList.contains('map__pin')) {
      mapPinMain.previousElementSibling.remove();
    }
  };

  var onPinActive = function (evt, data) {
    window.util.removeActiveClass(mapPins);
    evt.currentTarget.classList.add('map__pin--active');
    window.card.render(data);
  };

  var setEventsPins = function (eventElement, data) {
    eventElement.addEventListener('mousedown', function (evt) {
      onPinActive(evt, data);
    });
    eventElement.addEventListener('keydown', function (evt) {
      window.util.isEnterPress(evt, onPinActive.bind(null, evt, data));
    });
  };

  var describingPins = function (data) {
    var pin = window.util.getFromTemplate('#pin', '.map__pin');
    var img = pin.querySelector('img');

    img.src = data.author.avatar;
    img.alt = data.offer.description;
    pin.setAttribute('style',
        'left: ' + (data.location.x - (Pin.WIDTH / 2)) + 'px;' +
        'top: ' + (data.location.y - Pin.HEIGHT) + 'px;');
    setEventsPins(pin, data);

    return pin;
  };

  return {
    renderPins: function (data) {
      var fragment = document.createDocumentFragment();

      pinsClean();
      data.forEach(function (element) {
        fragment.appendChild(describingPins(element));
      });
      window.util.drawBeforeElement(fragment, '.map__pin--main');
    },
    addActiveValueMainPin: addActiveValueMainPin,
    addAttributeInMapPinMain: addAttributeInMapPinMain,
    addInactiveValueMainPin: addInactiveValueMainPin,
    pinsClean: pinsClean,
    mapPinMain: mapPinMain,
    map: map,
    pinMainX: pinMainX,
    pinMainY: pinMainY,
    mapPins: mapPins
  };
})();
