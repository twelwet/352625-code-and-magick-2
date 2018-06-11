'use strict';

// Задаем константы
var WIZARD_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var WIZARD_SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var WIZARD_COAT_COLOR = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rbg(56, 159, 117)',
  'rbg(215, 210, 55)',
  'rbg(0, 0, 0)'
];

var WIZARD_EYES_COLOR = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var WIZARD_QUANTITY = 4;

// Находим DIV всплывающего окна с настройками мага
var userDialog = document.querySelector('.setup');

// Удалим класс 'hidden'
userDialog.classList.remove('hidden');

// Находим пустой DIV списка похожих персонажей
var similarListElement = userDialog.querySelector('.setup-similar-list');

// Находим TEMPLATE похожего персонажа
var similarWizardTemplate = document.getElementById('similar-wizard-template').content;

// Объявляем функцию генерации случайных данных
var getRandomValue = function (x) {
  return x[(Math.random() * (x.length - 1)).toFixed(0)];
};

// Объявляем переменную-массив похожих персонажей
var wizards = new Array(WIZARD_QUANTITY);

// Заполняем в цикле переменную-массив похожих персонажей
// рандомными данными из соответствующих констант
for (var i = 0; i < wizards.length; i++) {
  wizards[i] = {
    name: getRandomValue(WIZARD_NAMES),
    surname: getRandomValue(WIZARD_SURNAMES),
    coatColor: getRandomValue(WIZARD_COAT_COLOR),
    eyesColor: getRandomValue(WIZARD_EYES_COLOR)
  };
}

// Объявляем функцию создания DOM-элемента похожего персонажа
var renderWizard = function (wizard) {
  // Объявляем переменную, в которую клонируем шаблон похожего героя
  var wizardElement = similarWizardTemplate.cloneNode(true);
  // Задаем имя персонажа, цвет мантии, цвет глаз
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name + ' ' + wizard.surname;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

// Объявляем функцию заполнения блока DOM-элементами
var drawAllWizards = function () {
  var fragment = document.createDocumentFragment();
  for (i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
  userDialog.querySelector('.setup-similar').classList.remove('hidden');
};

drawAllWizards();
