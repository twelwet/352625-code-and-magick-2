'use strict';

var CLOUD_HEIGHT = 270; // Высота облака
var CLOUD_WIDTH = 420; // Ширина облака
var CLOUD_X = 100; // Координата X облака
var CLOUD_Y = 10; // Координата Y облака
var CLOUD_HEADER_X = 120; // Координата X заголовка облака
var CLOUD_HEADER_Y = 40; // Координата Y заголовка облака
var CLOUD_HEADER_Y_GAP = 20; // Отступ Y второй строчки заголовка облака
var GAP = 10; // Отступ тени от облака
var MIN_OPACITY = 0.1; // Минимальная прозрачность столбца
var MAX_OPACITY = 1; // Максимальная прозрачность столбца
var BAR_HEIGHT = 150; // Высота столбца гистограммы
var BAR_WIDTH = 40; // Ширина столбца гистограммы
var INDENT = 50; // Расстояние между столбцами
var INITIAL_X = 180; // Начальная координата X столбца
var INITIAL_Y = 240; // Начальная координата Y столбца
var NAME_X = 140; // Координата Х текста имени игрока
var NAME_Y = 260; // Координата Y текста имени игрока
var TIME_X = 140; // Координата X текста времени игрока
var TIME_Y = 230; // Координата Y текста времени игрока

var barDistanceX = 0; // Шаг смещения между столбцами

// Функция отрисовки облака
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

// Функция отрисовки заголовка статистики
var writeCloudHeader = function (ctx, x, y, yGap, color) {
  ctx.fillStyle = color;
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', x, y);
  ctx.fillText('Список результатов:', x, y + yGap);
};

// Функция поиска максимального значения в массиве
var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

// Функция получения случайной прозрачности rgba
var getRandomOpacity = function (min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
};

// Функция отрисовки столбца гистограммы
var drawBar = function (ctx, stepX, index, names, times, timeStep) {
  if (names[index] === 'Вы') {
    ctx.fillStyle = 'rgb(255, 0, 0)'; // Красный цвет столбца для игрока 'Вы'
  } else {
    ctx.fillStyle = 'rgba(0, 0, 255,' + getRandomOpacity(MIN_OPACITY, MAX_OPACITY) + ')'; // Цвет столбцов гистограммы
  }
  ctx.fillRect(INITIAL_X + stepX, INITIAL_Y, -BAR_WIDTH, -times[index] * timeStep); // Рисуем столбец гистограммы
  ctx.fillStyle = 'rgb(0, 0, 0)'; // Цвет текста
  ctx.fillText(Math.round(times[index]), TIME_X + stepX, TIME_Y - times[index] * timeStep); // Рисуем времена игроков
  ctx.fillText(names[index], NAME_X + stepX, NAME_Y); // Рисуем имена игроков
};


window.renderStatistics = function (ctx, names, times) {
  // Рисуем тень облака
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');

  // Рисуем облако
  renderCloud(ctx, CLOUD_X, CLOUD_Y, 'rgb(255, 255, 255)');

  // Рисуем текст окна статистики
  writeCloudHeader(ctx, CLOUD_HEADER_X, CLOUD_HEADER_Y, CLOUD_HEADER_Y_GAP, 'rgb(0, 0, 0)');

  // Вычисляем шаг нормирования высоты столбца
  var timeStep = BAR_HEIGHT / getMaxElement(times);

  // Запускаем в цикле отрисовку гистограммы
  for (var i = 0; i < times.length; i++) {
    barDistanceX = i * (BAR_WIDTH + INDENT); // Увеличиваем шаг смещения между результатами
    drawBar(ctx, barDistanceX, i, names, times, timeStep);
  }
};
