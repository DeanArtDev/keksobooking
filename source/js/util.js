'use strict';
window.util = (function () {
  var Code = {
    ENTER: 13,
    ESC: 27,
    SPACE: 32
  };

  return {
    getTranslateTypeList: function (item) {
      switch (item) {
        case 'palace':
          return 'Дворец';
        case 'flat':
          return 'Квартира';
        case 'house':
          return 'Дом';
        case 'bungalo':
          return 'Бунгало';
        case 'any':
          return 'Любой тип жилья';

        default:
          return item;
      }
    },

    cardsClean: function () {
      while (window.pins.mapPins.nextElementSibling.classList.contains('map__card')) {
        window.pins.mapPins.nextElementSibling.remove();
      }
    },

    checkOnSelected: function (arr) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].selected) {
          return arr[i].value;
        }
      }
      return false;
    },

    drawBeforeElement: function (descriptionElement, beforeElement) {
      var element = document.querySelector(beforeElement);
      element.parentNode.insertBefore(descriptionElement, element);
    },

    shuffle: function (array) {
      var j;
      var x;

      for (var i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = array[i];
        array[i] = array[j];
        array[j] = x;
      }
      return array;
    },

    getFromTemplate: function (idTemplate, element) {
      var template = document.querySelector(idTemplate)
        .content
        .querySelector(element);
      return template.cloneNode(true);
    },

    setAttributeDisabled: function (element) {
      var arr = element.children;
      for (var i = 0; i < arr.length; i++) {
        arr[i].setAttribute('disabled', '');
      }
    },

    removeAttributeDisabled: function (element) {
      var arr = element.children;
      for (var i = 0; i < arr.length; i++) {
        arr[i].removeAttribute('disabled');
      }
    },

    removeActiveClass: function (element) {
      for (var i = 0; i < element.children.length; i++) {
        element.children[i].classList.remove('map__pin--active');
      }
    },

    isEnterPress: function (evt, action) {
      if (evt.keyCode === Code.ENTER) {
        action();
      }
    },

    isEscPress: function (evt, action) {
      if (evt.keyCode === Code.ESC) {
        action();
      }
    },

    isSpacePress: function (evt, action) {
      if (evt.keyCode === Code.SPACE) {
        action();
      }
    }
  };
})();
