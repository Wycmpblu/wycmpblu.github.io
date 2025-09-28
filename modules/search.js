import { getServerName, getLavkaNumberHTML, createElementFromHTML, showElement, hideElement } from './utils.js';

// Функции поиска
export function performSearch(allMarketplacesData, itemSearch, serverFilter, loadingDiv, errorDiv, marketplacesSection) {
   const searchTerm = itemSearch.value.trim().toLowerCase();
   const selectedServer = parseInt(serverFilter.value);

   // Если строка поиска пустая, показываем все лавки сервера
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

   const serverMarketplaces = allMarketplacesData.filter(lot => {
      const lotServerId = lot.serverId !== undefined ? lot.serverId : -1;
      return lotServerId === selectedServer;
   });

   // Поиск в продаже
   const sellResultsData = [];
   serverMarketplaces.forEach(lot => {
      if (lot.items_sell && Array.isArray(lot.items_sell) && lot.price_sell && Array.isArray(lot.price_sell)) {
         lot.items_sell.forEach((item, index) => {
            if (item && item.toLowerCase().includes(searchTerm) &&
               lot.price_sell[index] !== undefined && lot.price_sell[index] !== null) {
               const price = lot.price_sell[index];
               const quantity = lot.count_sell && lot.count_sell[index] !== undefined ? lot.count_sell[index] : 1;
               if (price >= 0 && quantity > 0) {
                  sellResultsData.push({
                     lavkaId: lot.LavkaUid,
                     username: lot.username || 'Неизвестно',
                     serverId: lot.serverId,
                     userStatus: lot.userStatus || 0,
                     item: item,
                     price: price,
                     quantity: quantity
                  });
               }
            }
         });
      }
   });

   // Поиск в скупке
   const buyResultsData = [];
   serverMarketplaces.forEach(lot => {
      if (lot.items_buy && Array.isArray(lot.items_buy) && lot.price_buy && Array.isArray(lot.price_buy)) {
         lot.items_buy.forEach((item, index) => {
            if (item && item.toLowerCase().includes(searchTerm) &&
               lot.price_buy[index] !== undefined && lot.price_buy[index] !== null) {
               const price = lot.price_buy[index];
               const quantity = lot.count_buy && lot.count_buy[index] !== undefined ? lot.count_buy[index] : 1;
               if (price >= 0 && quantity > 0) {
                  buyResultsData.push({
                     lavkaId: lot.LavkaUid,
                     username: lot.username || 'Неизвестно',
                     serverId: lot.serverId,
                     userStatus: lot.userStatus || 0,
                     item: item,
                     price: price,
                     quantity: quantity
                  });
               }
            }
         });
      }
   });

   // Сортировка
   sellResultsData.sort((a, b) => a.price - b.price);
   buyResultsData.sort((a, b) => b.price - a.price);

   return { sellResultsData, buyResultsData, searchTerm, selectedServer };
}

export function displaySearchResults(sellData, buyData, searchTerm, selectedServer, resultsSection, resultsTabsContainer, sellResults, buyResults, loadingDiv) {
   hideElement(loadingDiv);

   const serverText = ` на сервере ${getServerName(selectedServer)}`;

   // Создаем блок с информацией о поиске (выше контейнера вкладок)
   const searchInfoHTML = `
      <div class="search-info">
         <h3>Найдено по запросу: "${searchTerm}"${serverText}</h3>
         <p><b>Предметов на продаже</b>: ${sellData.length}</p>
         <p><b>Предметов на скупке</b>: ${buyData.length}</p>
      </div>
   `;

   // Вставляем информацию о поиске перед контейнером вкладок
   if (resultsSection.querySelector('.search-info')) {
      resultsSection.querySelector('.search-info').remove();
   }
   resultsSection.insertBefore(createElementFromHTML(searchInfoHTML), resultsTabsContainer);

   // Продажа - табличный вид
   if (sellData.length === 0) {
      sellResults.innerHTML = '<div class="no-data">Предметы на продаже не найдены</div>';
   } else {
      let sellHTML = `
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

      sellData.forEach(result => {
         sellHTML += `
            <tr>
               <td class="marketplace">${getLavkaNumberHTML(result.lavkaId, result.userStatus)}</td>
               <td class="item-name">${result.item}</td>
               <td class="price">${result.price.toLocaleString()}$</td>
               <td class="quantity">${result.quantity} шт.</td>
               <td class="seller">${result.username}</td>
            </tr>
         `;
      });

      sellHTML += '</tbody></table></div>';
      sellResults.innerHTML = sellHTML;
   }

   // Скупка - табличный вид
   if (buyData.length === 0) {
      buyResults.innerHTML = '<div class="no-data">Предметы на скупке не найдены</div>';
   } else {
      let buyHTML = `
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

      buyData.forEach(result => {
         buyHTML += `
            <tr>
               <td class="marketplace">${getLavkaNumberHTML(result.lavkaId, result.userStatus)}</td>
               <td class="item-name">${result.item}</td>
               <td class="price">${result.price.toLocaleString()}$</td>
               <td class="quantity">${result.quantity} шт.</td>
               <td class="seller">${result.username}</td>
            </tr>
         `;
      });

      buyHTML += '</tbody></table></div>';
      buyResults.innerHTML = buyHTML;
   }

   showElement(resultsSection);
}