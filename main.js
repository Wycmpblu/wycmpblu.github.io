document.addEventListener('DOMContentLoaded', function () {
   const searchButton = document.getElementById('searchButton');
   const itemSearch = document.getElementById('itemSearch');
   const resultsDiv = document.getElementById('results');
   const loadingDiv = document.getElementById('loading');
   const errorDiv = document.getElementById('error');

   // Скрываем все элементы при загрузке
   hideElement(loadingDiv);
   hideElement(errorDiv);
   resultsDiv.innerHTML = '';

   // Очищаем поле поиска
   itemSearch.value = '';

   // Функция для поиска предметов
   async function searchItemPrices(searchTerm) {
      if (!searchTerm) {
         showError('❌ Введите название предмета для поиска');
         return;
      }

      showElement(loadingDiv);
      hideElement(errorDiv);

      // Очищаем предыдущие результаты
      resultsDiv.innerHTML = '';

      try {
         console.log(`🔍 Поиск лотов содержащих: "${searchTerm}"`);

         const response = await fetch('https://raw.githubusercontent.com/FREYM1337/freym1337.github.io/refs/heads/main/data/markets.json');

         if (!response.ok) {
            throw new Error(`Ошибка загрузки: ${response.status}`);
         }

         const data = await response.json();

         const foundLots = [];

         data.forEach(lot => {
            if (lot.items_sell && Array.isArray(lot.items_sell)) {
               lot.items_sell.forEach((item, index) => {
                  // Ищем частичное совпадение (case insensitive)
                  if (item && item.toLowerCase().includes(searchTerm.toLowerCase()) &&
                     lot.price_sell && lot.price_sell[index] !== undefined) {

                     foundLots.push({
                        itemName: item,
                        price: lot.price_sell[index],
                        quantity: lot.count_sell ? lot.count_sell[index] || 1 : 1,
                        seller: lot.username || 'Неизвестно',
                        marketplaceId: lot.LavkaUid || 'N/A'
                     });
                  }
               });
            }
         });

         // Сортируем по цене (от низкой к высокой)
         foundLots.sort((a, b) => a.price - b.price);

         displayResults(foundLots, searchTerm);

      } catch (error) {
         showError(`❌ Ошибка: ${error.message}`);
      } finally {
         hideElement(loadingDiv);
      }
   }

   // Функция для отображения результатов
   function displayResults(lots, searchTerm) {
      if (lots.length === 0) {
         showError(`❌ Лоты содержащие "${searchTerm}" не найдены`);
         return;
      }

      // Создаем таблицу
      let tableHTML = `
        <table class="results-table">
            <thead>
                <tr>
                    <th>Предмет</th>
                    <th>Цена</th>
                    <th>Кол-во</th>
                    <th>Продавец</th>
                    <th>Лавка</th>
                </tr>
            </thead>
            <tbody>
    `;

      // Выводим все найденные лоты
      lots.forEach((lot, index) => {
         tableHTML += `
            <tr>
                <td class="item-name">${lot.itemName}</td>
                <td class="price">${lot.price.toLocaleString()}</td>
                <td class="quantity">${lot.quantity} шт.</td>
                <td class="seller">${lot.seller}</td>
                <td class="marketplace">${lot.marketplaceId}</td>
            </tr>
        `;
      });

      tableHTML += '</tbody></table>';

      // Добавляем информацию о поиске с оберткой для таблицы
      resultsDiv.innerHTML = `
        <div class="search-info">
            <h3>Найдено по запросу: "${searchTerm}"</h3>
            <p>Найдено лотов: ${lots.length}</p>
        </div>
        <div class="table-container">
            ${tableHTML}
        </div>
    `;

      // Показываем результаты
      resultsDiv.style.display = 'block';
   }

   // Вспомогательные функции для показа/скрытия элементов
   function showElement(element) {
      if (element) {
         element.style.display = 'block';
      }
   }

   function hideElement(element) {
      if (element) {
         element.style.display = 'none';
      }
   }

   function showError(message) {
      if (errorDiv) {
         errorDiv.textContent = message;
         showElement(errorDiv);
      }
   }

   // Обработчики событий
   searchButton.addEventListener('click', () => {
      const searchTerm = itemSearch.value.trim();
      searchItemPrices(searchTerm);
   });

   itemSearch.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
         const searchTerm = itemSearch.value.trim();
         searchItemPrices(searchTerm);
      }
   });

});
