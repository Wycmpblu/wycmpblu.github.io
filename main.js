import { loadMarketplacesData } from './modules/dataLoader.js';
import { setupEventHandlers } from './modules/eventHandlers.js';
import { setupModalHandlers, showMarketplaceDetails } from './modules/modal.js';
import { showError, hideElement } from './modules/utils.js';

// Инициализация приложения
document.addEventListener('DOMContentLoaded', async function () {
   // Получаем DOM элементы
   const elements = {
      itemSearch: document.getElementById('itemSearch'),
      serverFilter: document.getElementById('serverFilter'),
      loadingDiv: document.getElementById('loading'),
      errorDiv: document.getElementById('error'),
      marketplacesSection: document.querySelector('.marketplaces-section'),
      resultsSection: document.querySelector('.results-section'),
      marketplacesList: document.getElementById('marketplacesList'),
      resultsTabsContainer: document.querySelector('.results-tabs-container'), // контейнер вкладок
      resultsTabs: document.querySelector('.results-tabs'), // сами вкладки
      sellResults: document.getElementById('sellResults'),
      buyResults: document.getElementById('buyResults')
   };

   let allMarketplacesData = [];

   // Скрываем вкладки при загрузке
   hideElement(elements.resultsTabsContainer);
   hideElement(elements.resultsSection);

   try {
      // Загружаем данные
      allMarketplacesData = await loadMarketplacesData(elements.loadingDiv, elements.errorDiv);

      // Создаем функцию для показа деталей лавки
      const showMarketplaceDetailsFn = (lavkaId, username, serverId, userStatus) => {
         showMarketplaceDetails(allMarketplacesData, lavkaId, username, serverId, userStatus);
      };

      // Настраиваем обработчики событий
      setupEventHandlers(
         allMarketplacesData,
         elements.itemSearch,
         elements.serverFilter,
         elements.loadingDiv,
         elements.errorDiv,
         elements.marketplacesSection,
         elements.resultsSection,
         elements.marketplacesList,
         elements.resultsTabsContainer, // передаем контейнер
         elements.sellResults,
         elements.buyResults,
         showMarketplaceDetailsFn
      );

      // Настраиваем модальное окно
      setupModalHandlers();

   } catch (error) {
      showError(elements.errorDiv, error.message);
   } finally {
      hideElement(elements.loadingDiv);
   }
});