import { getServerName, getIconHTML, getLavkaNumberHTML, showElement, hideElement } from './utils.js';

// Функции для работы с лавками
export function displayMarketplaces(allMarketplacesData, serverFilter, marketplacesSection, marketplacesList, showMarketplaceDetailsFn) {
   const selectedServer = parseInt(serverFilter.value);
   if (selectedServer === -1) {
      hideElement(marketplacesSection);
      return;
   }

   const filteredMarketplaces = allMarketplacesData.filter(lot => {
      const lotServerId = lot.serverId !== undefined ? lot.serverId : -1;
      return lotServerId === selectedServer;
   });

   // Удаляем старый блок с количеством, если он уже был
   let existingCountBlock = marketplacesSection.querySelector('.marketplaces-count');
   if (existingCountBlock) {
      existingCountBlock.remove();
   }

   if (filteredMarketplaces.length === 0) {
      marketplacesList.innerHTML = '<div class="no-data">Лавки не найдены на сервере ' + getServerName(selectedServer) + '</div>';
   } else {
      // Добавляем блок с количеством ПЕРЕД списком лавок
      const countBlock = document.createElement('div');
      countBlock.className = 'marketplaces-count';
      countBlock.innerHTML = `
         Найдено лавок: <strong>${filteredMarketplaces.length}</strong>
      `;
      marketplacesSection.insertBefore(countBlock, marketplacesList);

      // Заполняем список лавок
      let marketplacesHTML = '';
      filteredMarketplaces.forEach(lot => {
         marketplacesHTML += `
            <div class="marketplace-card">
               <div class="marketplace-header">
                  <div class="marketplace-icon">
                     ${getIconHTML(lot.userStatus)}
                  </div>
                  <div class="marketplace-info">
                     <h3> ${getLavkaNumberHTML("Лавка №" + lot.LavkaUid, lot.userStatus)}</h3>
                  </div>
               </div>
               <div class="marketplace-details">
                  <div class="marketplace-detail">
                     <span class="detail-label">Владелец:</span>
                     <span class="detail-value">${lot.username || 'Неизвестно'}</span>
                  </div>
               </div>
               <button class="view-marketplace-btn" 
                       data-lavka-id="${lot.LavkaUid}" 
                       data-username="${lot.username || 'Неизвестно'}" 
                       data-server-id="${lot.serverId}" 
                       data-user-status="${lot.userStatus || 0}">
                  Посмотреть лавку
               </button>
            </div>
         `;
      });

      marketplacesList.innerHTML = marketplacesHTML;

      // Добавляем обработчики для кнопок
      marketplacesList.querySelectorAll('.view-marketplace-btn').forEach(button => {
         button.addEventListener('click', function () {
            const lavkaId = this.getAttribute('data-lavka-id');
            const username = this.getAttribute('data-username');
            const serverId = this.getAttribute('data-server-id');
            const userStatus = this.getAttribute('data-user-status');
            showMarketplaceDetailsFn(lavkaId, username, serverId, userStatus);
         });
      });
   }

   showElement(marketplacesSection);
}
