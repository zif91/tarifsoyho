const services = [
  'Настройка аналитики',
  'Аудит коммерческих показателей сайта',
  'Аудит технических показателей сайта',
  'Аудит юзабилити сайта',
  'Анализ конкурентов в поисковой выдаче',
  'Установка мониторинга uptime сайта',
  'Составление семантического ядра',
  'Отслеживание позиций сайта',
  'Устранение ошибок индексации',
  'Оптимизация контента',
  'Оптимизация HTML кода сайта',
  'Составление рекламных объявлений',
  'Проведение A|B тестов',
  'Контекстная реклама',
  'Баннерная реклама',
  'Ретаргетинг',
  'Таргетированная реклама',
  'Управление аудиторией сообществ',
  'Антивирусная защита сайта',
  'Технические часы',
  'Стоимость'
];

const tariffs = {
  'Only Seo': ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '-', '-', '-', '-', '-','-','-','-', '5', '50000'],
  'Only ADS': ['+', '+', '+', '+', '+', '+', '-', '-', '-', '-', '-', '+', '+', '+', '+', '+5000', '+10000','-','-','3', '30000'],
  'Support': ['-', '-', '+', '+', '+', '+', '-', '-', '-', '-', '+', '-', '-', '-', '-', '-', '-', '+','+', '25', '50000'],
  'Minimal': ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '-', '-', '-','-','-','3', '75000'],
  'Optimal': ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '-', '-', '-','3', '90000'],
  'Pro': ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+','+', '3', '150000']
};




// Создание таблицы
const table = document.getElementById('tariffTable');
let headerRow = '<tr><th>Услуги</th>';
for (let tariff in tariffs) {
  headerRow += `<th>${tariff}</th>`;
}
headerRow += '</tr>';
table.innerHTML = headerRow;

services.forEach((service, index) => {
  let row = `<tr><td>${service}</td>`;
  for (let tariff in tariffs) {
    row += `<td>${tariffs[tariff][index]}</td>`;
  }
  row += '</tr>';
  table.innerHTML += row;
});

// Создание чекбоксов
const optionsDiv = document.getElementById('options');
services.forEach((service, index) => {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = `option${index}`;
  checkbox.addEventListener('change', recommendTariff);
  const label = document.createElement('label');
  label.htmlFor = `option${index}`;
  label.innerHTML = service;
  optionsDiv.appendChild(checkbox);
  optionsDiv.appendChild(label);
  //optionsDiv.appendChild(document.createElement('br'));
});

// Рекомендация тарифа
function highlightRecommendedTariff(recommendedTariff) {
  // Сбросим предыдущие выделения
  const previouslyHighlighted = document.querySelectorAll('.highlighted');
  previouslyHighlighted.forEach(cell => cell.classList.remove('highlighted'));

  // Выделение рекомендуемого тарифа в таблице
  const table = document.getElementById('tariffTable');
  const headerCells = Array.from(table.querySelectorAll('th'));
  const recommendedIndex = headerCells.findIndex(cell => cell.innerText === recommendedTariff) + 1;
  
  if (recommendedIndex > 0) {
    table.querySelectorAll(`td:nth-child(${recommendedIndex})`).forEach(cell => cell.classList.add('highlighted'));
  }
}

// Рекомендация тарифа
function recommendTariff() {
  const selectedOptions = [];
  services.forEach((_, index) => {
    const checkbox = document.getElementById(`option${index}`);
    selectedOptions.push(checkbox.checked ? '+' : '-');
  });

  let recommendedTariff = 'Не найдено';
  for (let tariff in tariffs) {
    if (tariffs[tariff].every((value, index) => value === '+' || selectedOptions[index] !== '+')) {
      recommendedTariff = tariff;
      break;
    }
  }
  
  document.getElementById('recommended').innerText = recommendedTariff;
  
  // Вызов функции для выделения рекомендуемого тарифа
  highlightRecommendedTariff(recommendedTariff);
}
