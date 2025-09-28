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
   modalTitle.innerHTML = `${getLavkaModalHTML(lavkaId, finalUserStatus)} - ${finalUsername} (Сервер: ${getServerName(serverId)})`;

   // Вкладка продажи
   let sellHTML = `<p><strong>Владелец:</strong> ${finalUsername}</p>`;
   sellHTML += `<p><strong>Предметы на продаже:</strong> ${marketplace.items_sell ? marketplace.items_sell.length : 0}</p>`;

   if (marketplace.items_sell && Array.isArray(marketplace.items_sell) &&
      marketplace.price_sell && Array.isArray(marketplace.price_sell) &&
      marketplace.items_sell.length > 0) {

      sellHTML += `
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

      let validSellItems = 0;
      marketplace.items_sell.forEach((item, index) => {
         if (item && marketplace.price_sell[index] !== undefined && marketplace.price_sell[index] !== null) {
            const price = marketplace.price_sell[index];
            const quantity = marketplace.count_sell && marketplace.count_sell[index] !== undefined ? marketplace.count_sell[index] : 1;
            if (price >= 0 && quantity > 0) {
               sellHTML += `
                         <tr>
                             <td>${validSellItems + 1}</td>
                             <td>${item}</td>
                             <td>${price.toLocaleString()}$</td>
                             <td>${quantity} шт.</td>
                         </tr>
                     `;
               validSellItems++;
            }
         }
      });
      sellHTML += '</tbody></table>';
      if (validSellItems === 0) {
         sellHTML = '<div class="no-items">Нет валидных предметов на продаже</div>';
      }
   } else {
      sellHTML += '<div class="no-items">Нет предметов на продаже</div>';
   }

   // Вкладка скупки
   let buyHTML = `<p><strong>Владелец:</strong> ${finalUsername}</p>`;
   buyHTML += `<p><strong>Предметы на скупке:</strong> ${marketplace.items_buy && Array.isArray(marketplace.items_buy) ? marketplace.items_buy.length : 0}</p>`;

   if (marketplace.items_buy && Array.isArray(marketplace.items_buy) &&
      marketplace.price_buy && Array.isArray(marketplace.price_buy) &&
      marketplace.items_buy.length > 0) {

      buyHTML += `
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

      let validBuyItems = 0;
      marketplace.items_buy.forEach((item, index) => {
         if (item && marketplace.price_buy[index] !== undefined && marketplace.price_buy[index] !== null) {
            const price = marketplace.price_buy[index];
            const quantity = marketplace.count_buy && marketplace.count_buy[index] !== undefined ? marketplace.count_buy[index] : 1;
            if (price >= 0 && quantity > 0) {
               buyHTML += `
                         <tr>
                             <td>${validBuyItems + 1}</td>
                             <td>${item}</td>
                             <td>${price.toLocaleString()}$</td>
                             <td>${quantity} шт.</td>
                         </tr>
                     `;
               validBuyItems++;
            }
         }
      });
      buyHTML += '</tbody></table>';
      if (validBuyItems === 0) {
         buyHTML = '<div class="no-items">Нет валидных предметов на скупке</div>';
      }
   } else {
      buyHTML += '<div class="no-items">Нет предметов на скупке</div>';
   }

   document.getElementById('sellTab').innerHTML = sellHTML;
   document.getElementById('buyTab').innerHTML = buyHTML;

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

