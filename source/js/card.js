'use strict';
window.card = (function () {
  var CardImg = {
    WIDTH: 45,
    HEIGHT: 40
  };

  var createFeatures = function (arr) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < arr.length; i++) {
      var newElement = document.createElement('li');
      var featureClass = 'popup__feature--' + arr[i];

      newElement.classList.add('popup__feature');
      newElement.classList.add(featureClass);
      fragment.appendChild(newElement);
    }
    return fragment;
  };

  var removeAllChildren = function (parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  };

  var createPhotos = function (arrayPhotos) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < arrayPhotos.length; i++) {
      var newElement = document.createElement('img');
      newElement.classList.add('popup__photo');
      newElement.src = arrayPhotos[i];
      newElement.width = CardImg.WIDTH;
      newElement.height = CardImg.HEIGHT;
      newElement.alt = 'Фотография жилья';

      fragment.appendChild(newElement);
    }
    return fragment;
  };

  var hidePopup = function () {
    window.util.cardsClean();
    window.util.removeActiveClass(window.pins.mapPins);
    document.removeEventListener('keydown', onButtonPressEsc);
  };

  var onButtonPressEsc = function (evt) {
    window.util.isEscPress(evt, hidePopup);
  };

  var onButtonMousedown = function () {
    hidePopup();
  };

  var addEventsClose = function (element) {
    element.addEventListener('mousedown', onButtonMousedown);
    document.addEventListener('keydown', onButtonPressEsc);
    element.addEventListener('keydown', function (evt) {
      window.util.isEnterPress(evt, hidePopup);
    });
  };

  var checkData = function (renderElement, source) {
    if (source === null || source === undefined || source.length === 0) {
      renderElement.remove();
      return 0;
    }
    return source;
  };

  var describingCard = function (data) {
    var newElement = window.util.getFromTemplate('#card', '.map__card');

    var title = newElement.querySelector('.popup__title');
    var address = newElement.querySelector('.popup__text--address');
    var price = newElement.querySelector('.popup__text--price');
    var type = newElement.querySelector('.popup__type');
    var capacity = newElement.querySelector('.popup__text--capacity');
    var time = newElement.querySelector('.popup__text--time');
    var features = newElement.querySelector('.popup__features');
    var desc = newElement.querySelector('.popup__description');
    var photos = newElement.querySelector('.popup__photos');
    var avatar = newElement.querySelector('.popup__avatar');
    var button = newElement.querySelector('button.popup__close');

    title.textContent = checkData(title, data.offer.title);
    address.textContent = checkData(address, data.offer.address);
    price.textContent = checkData(price, data.offer.price) + '\u20bd/ночь';
    type.textContent = window.util.getTranslateTypeList(checkData(type, data.offer.type));
    capacity.textContent = checkData(capacity, data.offer.rooms) +
      ' комнаты для ' + checkData(capacity, data.offer.guests) + ' гостей';
    time.textContent = 'Заезд после ' + checkData(time, data.offer.checkin) +
      ', выезд до ' + checkData(time, data.offer.checkout);
    removeAllChildren(features);
    features.appendChild(createFeatures(checkData(features, data.offer.features)));
    desc.textContent = checkData(desc, data.offer.description);
    removeAllChildren(photos);
    photos.appendChild(createPhotos(checkData(photos, data.offer.photos)));
    avatar.src = checkData(avatar, data.author.avatar);

    addEventsClose(button);

    return newElement;
  };

  return {
    // Создание и описание карточки объявления
    render: function (data) {
      window.util.cardsClean();
      window.util.drawBeforeElement(describingCard(data), '.map__filters-container');
    }
  };

})();
