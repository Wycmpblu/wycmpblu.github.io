import { SEARCH_DELAY } from './config.js';
import { performSearch, displaySearchResults } from './search.js';
import { displayMarketplaces } from './marketplaces.js';
import { showElement, hideElement } from './utils.js';

// Обработчики событий
export function setupEventHandlers(
   allMarketplacesData,
   itemSearch,
   serverFilter,
   loadingDiv,
   errorDiv,
   marketplacesSection,
   resultsSection,
   marketplacesList,
   resultsTabsContainer, // контейнер вкладок
   sellResults,
   buyResults,
   showMarketplaceDetailsFn
) {
   let searchTimeout;

   function handleSearch() {
      try {
         const result = performSearch(
            allMarketplacesData,
            itemSearch,
            serverFilter,
            loadingDiv,
            errorDiv,
            marketplacesSection
         );

         if (result.shouldDisplayMarketplaces) {
            // Показываем лавки, скрываем вкладки
            hideElement(resultsTabsContainer);
            hideElement(resultsSection);
            displayMarketplaces(allMarketplacesData, serverFilter, marketplacesSection, marketplacesList, showMarketplaceDetailsFn);
         } else if (result.sellResultsData) {
            // Показываем результаты поиска и вкладки
            showElement(resultsTabsContainer);
            displaySearchResults(
               result.sellResultsData,
               result.buyResultsData,
               result.searchTerm,
               result.selectedServer,
               resultsSection,
               resultsTabsContainer, // передаем контейнер
               sellResults,
               buyResults,
               loadingDiv
            );
         }
      } catch (error) {
         errorDiv.textContent = error.message;
         errorDiv.style.display = 'block';
         hideElement(resultsTabsContainer);
      }
   }

   // Обработчик изменения сервера
   serverFilter.addEventListener('change', function () {
      const searchTerm = itemSearch.value.trim();
      if (this.value !== '-1') {
         if (!searchTerm) {
            // Если строка поиска пустая, показываем лавки, скрываем вкладки
            hideElement(resultsTabsContainer);
            hideElement(resultsSection);
            displayMarketplaces(allMarketplacesData, serverFilter, marketplacesSection, marketplacesList, showMarketplaceDetailsFn);
         } else {
            // Если есть текст поиска, выполняем поиск
            handleSearch();
         }
      } else {
         // Если сервер не выбран, скрываем всё
         hideElement(marketplacesSection);
         hideElement(resultsSection);
         hideElement(resultsTabsContainer);
      }
   });

   // Поиск в реальном времени с задержкой
   itemSearch.addEventListener('input', function () {
      const selectedServer = parseInt(serverFilter.value);
      if (selectedServer === -1) {
         hideElement(resultsTabsContainer);
         hideElement(resultsSection);
         return;
      }

      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
         handleSearch();
      }, SEARCH_DELAY);
   });

   // Обработчик Enter
   itemSearch.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
         clearTimeout(searchTimeout);
         handleSearch();
      }
   });

   // Вкладки результатов - используем правильный селектор
   const resultsTabs = document.querySelector('.results-tabs');
   if (resultsTabs) {
      resultsTabs.querySelectorAll('.results-tab-button').forEach(button => {
         button.addEventListener('click', function () {
            resultsTabs.querySelectorAll('.results-tab-button').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.results-tab-content').forEach(content => content.classList.remove('active'));
            this.classList.add('active');
            document.getElementById(this.dataset.tab).classList.add('active');
         });
      });
   }
}