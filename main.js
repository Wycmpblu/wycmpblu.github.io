document.addEventListener('DOMContentLoaded', function () {
   const searchButton = document.getElementById('searchButton');
   const itemSearch = document.getElementById('itemSearch');
   const serverFilter = document.getElementById('serverFilter');
   const resultsDiv = document.getElementById('results');
   const loadingDiv = document.getElementById('loading');
   const errorDiv = document.getElementById('error');
   const loadMoreButton = document.getElementById('loadMoreButton');
   const loadMoreContainer = document.getElementById('loadMoreContainer');

   // Карта названий серверов
   const serverNames = {
      '-1': 'Все серверы',
      '0': 'Vice-City',
      '1': 'Phoenix',
      '2': 'Tucson',
      '3': 'Scottdale',
      '4': 'Chandler',
      '5': 'Brainburg',
      '6': 'SaintRose',
      '7': 'Mesa',
      '8': 'Red-Rock',
      '9': 'Yuma',
      '10': 'Surprise',
      '11': 'Prescott',
      '12': 'Glendale',
      '13': 'Kingman',
      '14': 'Winslow',
      '15': 'Payson',
      '16': 'Gilbert',
      '17': 'Show-Low',
      '18': 'Casa-Grande',
      '19': 'Page',
      '20': 'SunCity',
      '21': 'Queen-Creek',
      '22': 'Sedona',
      '23': 'Holiday',
      '24': 'Wednesday',
      '25': 'Yava',
      '26': 'Faraway',
      '27': 'Bumble Bee',
      '28': 'Christmas',
      '29': 'Mirage',
      '30': 'Love',
      '31': 'Drake',
      '32': 'Space'
   };

   // Переменные для пагинации
   let currentResults = [];
   let currentSearchTerm = '';
   let currentSelectedServer = -1;
   let displayedCount = 0;
   const RESULTS_PER_PAGE = 30;

   // Скрываем все элементы при загрузке
   hideElement(loadingDiv);
   hideElement(errorDiv);
   hideElement(loadMoreContainer);
   resultsDiv.innerHTML = '';

   // Очищаем поле поиска
   itemSearch.value = '';

   // Функция для получения названия сервера
   function getServerName(serverId) {
      return serverNames[serverId.toString()] || `Сервер ${serverId}`;
   }

   // Функция для поиска предметов
   async function searchItemPrices(searchTerm) {
      if (!searchTerm) {
         showError('❌ Введите название предмета для поиска');
         return;
      }

      showElement(loadingDiv);
      hideElement(errorDiv);
      hideElement(loadMoreContainer);

      // Очищаем предыдущие результаты
      resultsDiv.innerHTML = '';

      try {
         console.log(`🔍 Поиск лотов содержащих: "${searchTerm}"`);
         const selectedServer = parseInt(serverFilter.value);

         const response = await fetch('https://raw.githubusercontent.com/FREYM1337/freym1337.github.io/refs/heads/main/data/markets.json');

         if (!response.ok) {
            throw new Error(`Ошибка загрузки: ${response.status}`);
         }

         const data = await response.json();

         const foundLots = [];

         data.forEach(lot => {
            // Проверяем фильтр по серверу
            const lotServerId = lot.serverId !== undefined ? lot.serverId : -1;
            if (selectedServer !== -1 && lotServerId !== selectedServer) {
               return; // Пропускаем лот если не совпадает сервер
            }

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
                        marketplaceId: lot.LavkaUid || 'N/A',
                        serverId: lotServerId,
                        serverName: getServerName(lotServerId)
                     });
                  }
               });
            }
         });

         // Сортируем по цене (от низкой к высокой)
         foundLots.sort((a, b) => a.price - b.price);

         // Сохраняем результаты для пагинации
         currentResults = foundLots;
         currentSearchTerm = searchTerm;
         currentSelectedServer = selectedServer;
         displayedCount = 0;

         displayResults();

      } catch (error) {
         showError(`❌ Ошибка: ${error.message}`);
      } finally {
         hideElement(loadingDiv);
      }
   }

   // Функция для отображения результатов (с пагинацией)
   function displayResults() {
      if (currentResults.length === 0) {
         const serverText = currentSelectedServer === -1 ? '' : ` на сервере ${getServerName(currentSelectedServer)}`;
         showError(`❌ Лоты содержащие "${currentSearchTerm}"${serverText} не найдены`);
         return;
      }

      // Определяем сколько результатов показать
      const nextResults = currentResults.slice(displayedCount, displayedCount + RESULTS_PER_PAGE);
      displayedCount += nextResults.length;

      // Создаем или обновляем таблицу
      let tableHTML = '';

      if (displayedCount > RESULTS_PER_PAGE) {
         // Если это не первая страница, получаем существующую таблицу
         const existingTable = resultsDiv.querySelector('.results-table');
         if (existingTable) {
            const tbody = existingTable.querySelector('tbody');
            nextResults.forEach(lot => {
               tbody.innerHTML += `
                  <tr>
                     <td class="server">${lot.serverName}</td>
                     <td class="item-name">${lot.itemName}</td>
                     <td class="price">${lot.price.toLocaleString()}</td>
                     <td class="quantity">${lot.quantity} шт.</td>
                     <td class="seller">${lot.seller}</td>
                     <td class="marketplace">${lot.marketplaceId}</td>
                  </tr>
               `;
            });
         }
      } else {
         // Первая страница - создаем новую таблицу
         const serverText = currentSelectedServer === -1 ? '' : ` на сервере ${getServerName(currentSelectedServer)}`;

         tableHTML = `
            <div class="search-info">
               <h3>Найдено по запросу: "${currentSearchTerm}"${serverText}</h3>
               <p>Найдено лотов: ${currentResults.length}</p>
               <p class="results-count">Показано: ${displayedCount} из ${currentResults.length}</p>
            </div>
            <div class="table-container">
               <table class="results-table">
                  <thead>
                     <tr>
                        <th>Сервер</th>
                        <th>Предмет</th>
                        <th>Цена</th>
                        <th>Кол-во</th>
                        <th>Продавец</th>
                        <th>Лавка</th>
                     </tr>
                  </thead>
                  <tbody>
         `;

         nextResults.forEach(lot => {
            tableHTML += `
               <tr>
                  <td class="server">${lot.serverName}</td>
                  <td class="item-name">${lot.itemName}</td>
                  <td class="price">${lot.price.toLocaleString()}</td>
                  <td class="quantity">${lot.quantity} шт.</td>
                  <td class="seller">${lot.seller}</td>
                  <td class="marketplace">${lot.marketplaceId}</td>
               </tr>
            `;
         });

         tableHTML += '</tbody></table></div>';
         resultsDiv.innerHTML = tableHTML;
      }

      // Обновляем счетчик показанных результатов
      const resultsCount = resultsDiv.querySelector('.results-count');
      if (resultsCount) {
         resultsCount.textContent = `Показано: ${displayedCount} из ${currentResults.length}`;
      }

      // Показываем или скрываем кнопку "Показать еще"
      if (displayedCount < currentResults.length) {
         showElement(loadMoreContainer);
         loadMoreButton.disabled = false;
      } else {
         hideElement(loadMoreContainer);
      }

      // Показываем результаты
      resultsDiv.style.display = 'block';
   }

   // Обработчик кнопки "Показать еще"
   loadMoreButton.addEventListener('click', () => {
      loadMoreButton.disabled = true;
      loadMoreButton.textContent = 'Загрузка...';

      setTimeout(() => {
         displayResults();
         loadMoreButton.textContent = 'Показать еще 30';
      }, 100);
   });

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