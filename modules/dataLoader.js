import { showElement, hideElement, showError } from './utils.js';

// Загрузка данных
export async function loadMarketplacesData(loadingDiv, errorDiv) {
   showElement(loadingDiv);
   hideElement(errorDiv);

   try {
      const response = await fetch('https://raw.githubusercontent.com/FREYM1337/freym1337.github.io/main/data/markets.json');
      if (!response.ok) throw new Error(`Ошибка загрузки: ${response.status}`);
      return await response.json();
   } catch (error) {
      showError(errorDiv, `❌ Ошибка загрузки данных: ${error.message}`);
      throw error;
   } finally {
      hideElement(loadingDiv);
   }
}