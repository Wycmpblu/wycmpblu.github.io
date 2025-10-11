import { getServerName, getLavkaModalHTML, showElement, hideElement } from './utils.js';

// Функции модального окна
export function showMarketplaceDetails(allMarketplacesData, lavkaId, username, serverId, userStatus) {
   const marketplace = allMarketplacesData.find(lot =>
      lot.LavkaUid == lavkaId && lot.serverId == serverId
   );

   if (!marketplace) {
      const fallbackMarketplace = allMarketplacesData.find(lot => lot.LavkaUid == lavkaId);
      if (fallbackMarketplace) {
         console.warn('Найдена лавка по fallback:', fallbackMarketplace);
         alert('Внимание: найдена лавка с таким номером, но с другого сервера!');
      } else {
         alert('Лавка не найдена!');
         return;
      }
   }

   const finalUserStatus = userStatus !== undefined ? userStatus : (marketplace.userStatus || 0);
   const finalUsername = username || marketplace.username || 'Неизвестно';

   const modalTitle = document.getElementById('modalTitle');
   modalTitle.innerHTML = `${getLavkaModalHTML(lavkaId, finalUserStatus)} - ${finalUsername}`;

   // Контейнеры вкладок
   const sellTab = document.getElementById('sellTab');
   const buyTab = document.getElementById('buyTab');

   // Вспомогательная функция для отрисовки таблицы
   function renderItems(type, sortBy = 'name') {
      const items = type === 'sell' ? marketplace.items_sell : marketplace.items_buy;
      const prices = type === 'sell' ? marketplace.price_sell : marketplace.price_buy;
      const counts = type === 'sell' ? marketplace.count_sell : marketplace.count_buy;

      if (!items || !Array.isArray(items) || !prices || !Array.isArray(prices) || items.length === 0) {
         return '<div class="no-items">Нет предметов</div>';
      }

      // Собираем валидные предметы
      const data = [];
      items.forEach((item, i) => {
         const price = prices[i];
         const quantity = counts && counts[i] !== undefined ? counts[i] : 1;
         if (item && price >= 0 && quantity > 0) {
            data.push({ item, price, quantity });
         }
      });

      // Сортировка
      if (sortBy === 'price') {
         data.sort((a, b) => a.price - b.price);
      } else if (sortBy === 'name') {
         data.sort((a, b) => a.item.localeCompare(b.item));
      }

      if (data.length === 0) return '<div class="no-items">Нет валидных предметов</div>';

      let html = `
         <div class="sort-controls">
            <label>Сортировать по:</label>
            <select id="${type}SortSelect">
               <option value="name" ${sortBy === 'name' ? 'selected' : ''}>Названию</option>
               <option value="price" ${sortBy === 'price' ? 'selected' : ''}>Цене</option>
            </select>
         </div>
         <table class="modal-items-table">
             <thead>
                 <tr>
                     <th>№</th>
                     <th>Предмет</th>
                     <th>Цена</th>
                     <th>Количество</th>
                 </tr>
             </thead>
             <tbody>
      `;

      data.forEach((d, index) => {
         html += `
             <tr>
                 <td>${index + 1}</td>
                 <td>${d.item}</td>
                 <td style="font-weight: bold;
   color: #28a745 !important;">${d.price.toLocaleString()}$</td>
                 <td>${d.quantity} шт.</td>
             </tr>`;
      });

      html += '</tbody></table>';
      return html;
   }

   // Начальная отрисовка
   sellTab.innerHTML = renderItems('sell');
   buyTab.innerHTML = renderItems('buy');

   // Навешиваем обработчики сортировки
   sellTab.addEventListener('change', (e) => {
      if (e.target.id === 'sellSortSelect') {
         sellTab.innerHTML = renderItems('sell', e.target.value);
      }
   });

   buyTab.addEventListener('change', (e) => {
      if (e.target.id === 'buySortSelect') {
         buyTab.innerHTML = renderItems('buy', e.target.value);
      }
   });

   // Показываем модалку
   const marketplaceModal = document.getElementById('marketplaceModal');
   showElement(marketplaceModal);
}


export function setupModalHandlers() {
   const closeModal = document.querySelector('.close');
   const marketplaceModal = document.getElementById('marketplaceModal');

   closeModal.addEventListener('click', () => {
      hideElement(marketplaceModal);
   });

   window.addEventListener('click', (e) => {
      if (e.target === marketplaceModal) {
         hideElement(marketplaceModal);
      }
   });

   // Вкладки модального окна
   document.querySelectorAll('.tab-button').forEach(button => {
      button.addEventListener('click', function () {
         document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
         document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
         this.classList.add('active');
         document.getElementById(this.dataset.tab + 'Tab').classList.add('active');
      });
   });
}