import { SERVER_NAMES } from './config.js';

// Вспомогательные функции
export function getServerName(serverId) {
   const servers = [
      "Vice-City", "Phoenix", "Tucson", "Scottdale", "Chandler", "Brainburg",
      "SaintRose", "Mesa", "Red-Rock", "Yuma", "Surprise", "Prescott",
      "Glendale", "Kingman", "Winslow", "Payson", "Gilbert", "Show-Low",
      "Casa-Grande", "Page", "SunCity", "Queen-Creek", "Sedona", "Holiday",
      "Wednesday", "Yava", "Faraway", "Bumble Bee", "Christmas", "Mirage",
      "Love", "Drake", "Space"
   ];

   // защита от undefined / NaN / -1
   const id = Number.isFinite(serverId) && serverId >= 0 && serverId < servers.length
      ? serverId
      : null;

   return id !== null ? servers[id] : "не выбран";
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
      return `<span class="premium-lavka">${lavkaId || 'N/A'}</span>`;
   }
   return `${lavkaId || 'N/A'}`;
}

export function getIconHTML(userStatus) {
   const iconClass = 'fa-solid fa-store';
   const iconHTML = `<i class="${iconClass}"></i>`;

   if (userStatus === 2) {
      // Оборачиваем в <span>, чтобы градиент применился к тексту
      return `<span class="premium-icon">${iconHTML}</span>`;
   }

   return iconHTML;
}

export function getLavkaModalHTML(lavkaId, userStatus) {
   if (userStatus === 2) {
      return `<span class="modal-premium-lavka">Лавка №${lavkaId}</span>`;
   }
   return `Лавка ${lavkaId}`;
}