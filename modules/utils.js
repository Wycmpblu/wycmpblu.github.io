import { SERVER_NAMES } from './config.js';

// Вспомогательные функции
export function getServerName(serverId) {
   return SERVER_NAMES[serverId] || `Сервер ${serverId}`;
}

export function showElement(element) {
   if (element) element.style.display = 'block';
}

export function hideElement(element) {
   if (element) element.style.display = 'none';
}

export function showError(errorDiv, message) {
   if (errorDiv) {
      errorDiv.textContent = message;
      showElement(errorDiv);
   }
}

export function createElementFromHTML(htmlString) {
   const div = document.createElement('div');
   div.innerHTML = htmlString.trim();
   return div.firstChild;
}

export function getLavkaNumberHTML(lavkaId, userStatus) {
   if (userStatus === 2) {
      return `<span class="premium-lavka">№${lavkaId || 'N/A'}</span>`;
   }
   return `№${lavkaId || 'N/A'}`;
}

export function getIconHTML(userStatus) {
   const iconSize = '24px';
   if (userStatus === 2) {
      return `<img src="/src/images/shop-premium.svg" alt="Премиум лавка" title="Премиум лавка" class="premium-icon" style="width: ${iconSize}; height: ${iconSize}">`;
   }
   return `<img src="/src/images/shop.svg" alt="Лавка" title="Лавка" style="width: ${iconSize}; height: ${iconSize}">`;
}

export function getLavkaModalHTML(lavkaId, userStatus) {
   if (userStatus === 2) {
      return `<span class="modal-premium-lavka">Лавка №${lavkaId}</span>`;
   }
   return `Лавка №${lavkaId}`;
}