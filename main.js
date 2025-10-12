import { loadMarketplacesData } from './modules/dataLoader.js';
import { setupEventHandlers } from './modules/eventHandlers.js';
import { setupModalHandlers, showMarketplaceDetails } from './modules/modal.js';
import { showError, hideElement } from './modules/utils.js';

// Инициализация приложения
document.addEventListener('DOMContentLoaded', async function () {
   const elements = {
      itemSearch: document.getElementById('itemSearch'),
      serverFilter: document.getElementById('serverFilter'),
      loadingDiv: document.getElementById('loading'),
      errorDiv: document.getElementById('error'),
      marketplacesSection: document.querySelector('.marketplaces-section'),
      resultsSection: document.querySelector('.results-section'),
      marketplacesList: document.getElementById('marketplacesList'),
      resultsTabsContainer: document.querySelector('.results-tabs-container'),
      resultsTabs: document.querySelector('.results-tabs'),
      sellResults: document.getElementById('sellResults'),
      buyResults: document.getElementById('buyResults')
   };

   // 🧩 Создаём скрытый input вместо select
   let serverFilter = elements.serverFilter;
   if (!serverFilter) {
      serverFilter = document.createElement('input');
      serverFilter.type = 'hidden';
      serverFilter.id = 'serverFilter';
      serverFilter.value = '-1';
      document.body.appendChild(serverFilter);
   }
   elements.serverFilter = serverFilter;

   let allMarketplacesData = [];

   hideElement(elements.resultsTabsContainer);
   hideElement(elements.resultsSection);

   try {
      allMarketplacesData = await loadMarketplacesData(elements.loadingDiv, elements.errorDiv);

      const showMarketplaceDetailsFn = (lavkaId, username, serverId, userStatus) => {
         showMarketplaceDetails(allMarketplacesData, lavkaId, username, serverId, userStatus);
      };

      setupEventHandlers(
         allMarketplacesData,
         elements.itemSearch,
         elements.serverFilter,
         elements.loadingDiv,
         elements.errorDiv,
         elements.marketplacesSection,
         elements.resultsSection,
         elements.marketplacesList,
         elements.resultsTabsContainer,
         elements.sellResults,
         elements.buyResults,
         showMarketplaceDetailsFn
      );

      setupModalHandlers();
   } catch (error) {
      showError(elements.errorDiv, error.message);
   } finally {
      hideElement(elements.loadingDiv);
   }

   // === 🎯 Кастомный выбор сервера ===
   const select = document.querySelector('.custom-select');
   const selected = select?.querySelector('.select-selected');
   const itemsContainer = select?.querySelector('.select-items');

   if (select && selected && itemsContainer) {
      selected.addEventListener('click', () => {
         select.classList.toggle('open');
      });

      itemsContainer.addEventListener('click', (e) => {
         const item = e.target.closest('[data-value]');
         if (!item) return;

         const valueAttr = item.dataset.value;
         const parsedId = Number(valueAttr);
         const selectedServerId = Number.isFinite(parsedId) ? parsedId : -1;

         selected.childNodes[0].textContent = item.textContent.trim();
         select.classList.remove('open');

         window.selectedServerId = selectedServerId;
         elements.serverFilter.value = String(selectedServerId);

         console.log('✅ Выбран сервер:', selectedServerId, item.textContent);
         console.log('📦 serverFilter.value =', elements.serverFilter.value);

         // Отправляем событие для eventHandlers
         const changeEvent = new Event('change', { bubbles: true });
         elements.serverFilter.dispatchEvent(changeEvent);
      });

      document.addEventListener('click', (e) => {
         if (!select.contains(e.target)) {
            select.classList.remove('open');
         }
      });
   }
});
