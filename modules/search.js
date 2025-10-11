import { getServerName, getLavkaNumberHTML, createElementFromHTML, showElement, hideElement } from './utils.js';

// Функции поиска
export function performSearch(allMarketplacesData, itemSearch, serverFilter, loadingDiv, errorDiv, marketplacesSection) {
   const searchTerm = itemSearch.value.trim().toLowerCase();
   const selectedServer = parseInt(serverFilter.value);

   if (!searchTerm) {
      hideElement(errorDiv);
      return { shouldDisplayMarketplaces: selectedServer !== -1 };
   }

   if (selectedServer === -1) {
      throw new Error('❌ Выберите сервер для поиска');
   }

   showElement(loadingDiv);
   hideElement(errorDiv);
   hideElement(marketplacesSection);

   const serverMarketplaces = allMarketplacesData.filter(lot =>
      (lot.serverId ?? -1) === selectedServer
   );

   const sellResultsData = [];
   const buyResultsData = [];

   // Поиск по продаже
   serverMarketplaces.forEach(lot => {
      if (Array.isArray(lot.items_sell) && Array.isArray(lot.price_sell)) {
         lot.items_sell.forEach((item, i) => {
            const price = lot.price_sell[i];
            const quantity = lot.count_sell?.[i] ?? 1;
            if (item && item.toLowerCase().includes(searchTerm) && price >= 0 && quantity > 0) {
               sellResultsData.push({
                  lavkaId: lot.LavkaUid,
                  username: lot.username || 'Неизвестно',
                  serverId: lot.serverId,
                  userStatus: lot.userStatus || 0,
                  item,
                  price,
                  quantity
               });
            }
         });
      }
   });

   // Поиск по скупке
   serverMarketplaces.forEach(lot => {
      if (Array.isArray(lot.items_buy) && Array.isArray(lot.price_buy)) {
         lot.items_buy.forEach((item, i) => {
            const price = lot.price_buy[i];
            const quantity = lot.count_buy?.[i] ?? 1;
            if (item && item.toLowerCase().includes(searchTerm) && price >= 0 && quantity > 0) {
               buyResultsData.push({
                  lavkaId: lot.LavkaUid,
                  username: lot.username || 'Неизвестно',
                  serverId: lot.serverId,
                  userStatus: lot.userStatus || 0,
                  item,
                  price,
                  quantity
               });
            }
         });
      }
   });

   // Первичная сортировка
   sellResultsData.sort((a, b) => a.price - b.price);
   buyResultsData.sort((a, b) => b.price - a.price);

   return { sellResultsData, buyResultsData, searchTerm, selectedServer };
}


// === Отображение результатов с сортировкой ===
export function displaySearchResults(
   sellData,
   buyData,
   searchTerm,
   selectedServer,
   resultsSection,
   resultsTabsContainer,
   sellResults,
   buyResults,
   loadingDiv
) {
   hideElement(loadingDiv);

   const serverText = ` на сервере ${getServerName(selectedServer)}`;
   const searchInfoHTML = `
      <div class="search-info">
         <h3>Найдено по запросу: "${searchTerm}"${serverText}</h3>
         <p><b>Предметов на продаже:</b> ${sellData.length}</p>
         <p><b>Предметов на скупке:</b> ${buyData.length}</p>
      </div>
   `;

   // Обновляем блок с информацией
   resultsSection.querySelector('.search-info')?.remove();
   resultsSection.insertBefore(createElementFromHTML(searchInfoHTML), resultsTabsContainer);

   // 🔸 функция отрисовки таблицы
   function renderTable(data, type, sortBy = 'priceAsc') {
      if (data.length === 0) {
         return '<div class="no-data">Нет данных</div>';
      }

      // Сортировка
      const sorted = [...data];
      switch (sortBy) {
         case 'priceAsc': sorted.sort((a, b) => a.price - b.price); break;
         case 'priceDesc': sorted.sort((a, b) => b.price - a.price); break;
         case 'name': sorted.sort((a, b) => a.item.localeCompare(b.item)); break;
         case 'quantity': sorted.sort((a, b) => b.quantity - a.quantity); break;
         case 'seller': sorted.sort((a, b) => a.username.localeCompare(b.username)); break;
      }

      let html = `
         <div class="sort-controls">
            <label>Сортировать по:</label>
            <select id="${type}SortSelect">
               <option value="priceAsc" ${sortBy === 'priceAsc' ? 'selected' : ''}>Цене ↑</option>
               <option value="priceDesc" ${sortBy === 'priceDesc' ? 'selected' : ''}>Цене ↓</option>
               <option value="name" ${sortBy === 'name' ? 'selected' : ''}>Названию</option>
               <option value="quantity" ${sortBy === 'quantity' ? 'selected' : ''}>Количеству</option>
               <option value="seller" ${sortBy === 'seller' ? 'selected' : ''}>Владельцу</option>
            </select>
         </div>
         <div class="table-container">
            <table class="results-table">
               <thead>
                  <tr>
                     <th>Лавка</th>
                     <th>Предмет</th>
                     <th>Цена</th>
                     <th>Кол-во</th>
                     <th>Владелец</th>
                  </tr>
               </thead>
               <tbody>
      `;

      sorted.forEach(result => {
         html += `
            <tr>
               <td class="marketplace">${getLavkaNumberHTML(result.lavkaId, result.userStatus)}</td>
               <td class="item-name">${result.item}</td>
               <td class="price">${result.price.toLocaleString()}$</td>
               <td class="quantity">${result.quantity} шт.</td>
               <td class="seller">${result.username}</td>
            </tr>
         `;
      });

      html += '</tbody></table></div>';
      return html;
   }

   // Начальная отрисовка
   sellResults.innerHTML = renderTable(sellData, 'sell', 'priceAsc');
   buyResults.innerHTML = renderTable(buyData, 'buy', 'priceDesc');

   // Навешиваем обработчики на селекторы сортировки
   sellResults.addEventListener('change', (e) => {
      if (e.target.id === 'sellSortSelect') {
         sellResults.innerHTML = renderTable(sellData, 'sell', e.target.value);
      }
   });

   buyResults.addEventListener('change', (e) => {
      if (e.target.id === 'buySortSelect') {
         buyResults.innerHTML = renderTable(buyData, 'buy', e.target.value);
      }
   });

   showElement(resultsSection);
}
