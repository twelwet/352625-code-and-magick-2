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

// Функция удаления у блока 'block' класса 'cssClass'
var addClass = function (block, cssClass) {
  block.classList.remove(cssClass);
};

// Функция показа блока 'block'
var showBlock = function (block) {
  addClass(block, 'hidden');
};

// Находим DIV всплывающего окна с настройками мага
var userDialog = document.querySelector('.setup');

// Показ блока 'userDialog'
showBlock(userDialog);

// Блок похожих персонажей
var similarWizardsBlock = userDialog.querySelector('.setup-similar');

// Находим пустой DIV списка в блоке похожих персонажей
var similarListElement = similarWizardsBlock.querySelector('.setup-similar-list');

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

// Объявим функцию заливки блока цветом
var colorizeBlock = function (block, color) {
  block.style.fill = color;
};

// Объявим функцию заполнения блока текстовым контентом
var addContentToBlock = function (block, content) {
  block.textContent = content;
};

// Объявляем функцию создания DOM-элемента похожего персонажа
var renderWizard = function (wizard) {
  // Объявляем переменную, в которую клонируем шаблон похожего героя
  var wizardElement = similarWizardTemplate.cloneNode(true);
  // Накидка героя
  var wizardCoat = wizardElement.querySelector('.wizard-coat');

  // Глаза героя
  var wizardEyes = wizardElement.querySelector('.wizard-eyes');

  // Блок имени и фамилии героя
  var wizardNameBlock = wizardElement.querySelector('.setup-similar-label');

  // Покрас накидки
  colorizeBlock(wizardCoat, wizard.coatColor);

  // Покрас глаз
  colorizeBlock(wizardEyes, wizard.coatColor);

  // Добавление текстового контента 'Имя + Фамилия'
  addContentToBlock(wizardNameBlock, wizard.name + ' ' + wizard.surname);

  return wizardElement;
};

// Объявляем функцию заполнения блока DOM-элементами
var drawAllWizards = function () {
  var fragment = document.createDocumentFragment();
  for (i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);

  // Показ блока похожих персонажей
  showBlock(similarWizardsBlock);
};

drawAllWizards();
