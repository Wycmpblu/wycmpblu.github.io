function showPereshiv(slot) {
   var items = [];
   switch (slot) {
      case 'head':
         items = [
            {
               name: 'nimbgearvlast',
               yellow: { deff: 3, damage: 3, krit: 1, hpmax: 19 }
            },
            {
               name: 'tango',
               yellow: { deff: 2, damage: 1, krit: 1, hpmax: 10 }
            },
            {
               name: 'shlyapa4',
               yellow: { damage: 1, hpmax: 5 }
            },
            {
               name: 'shlyapa3',
               yellow: { deff: 1, hpmax: 5 }
            },
            {
               name: 'shlyapa2',
               yellow: { krit: 1, hpmax: 5 }
            },
            {
               name: 'shlyapa1',
               yellow: { damage: 1, hpmax: 5 }
            },
            {
               name: 'tact',
               yellow: { deff: 2, armourmax: 10 }
            }
         ]
         break;
      case 'face':
         items = [
            {
               name: 'cherep',
               yellow: { damage: 2, armourmax: 10 }
            },
            {
               name: 'frontman',
               yellow: { damage: 1, hpmax: 5 }
            },
            {
               name: 'kvadrat',
               yellow: { krit: 1, hpmax: 5 }
            },
            {
               name: 'krug',
               yellow: { deff: 1, hpmax: 5 }
            },
            {
               name: 'treugolnik',
               yellow: { damage: 1, hpmax: 5 }
            },
            {
               name: 'loki',
               yellow: { damage: 1, hpmax: 5 }
            },
            {
               name: 'neonmask',
               yellow: { damage: 1, hpmax: 5 }
            },
            {
               name: 'wrench',
               yellow: { deff: 1, hpmax: 5 }
            },
            {
               name: 'respirator',
               yellow: { deff: 1, damage: 1 }
            }
         ]
         break;
      case 'hand':
         items = [
            {
               name: 'bumblebee',
               yellow: { deff: 1, damage: 1 }
            },
            {
               name: 'energowatch',
               yellow: { deff: 2, damage: 2, hpmax: 5, armourmax: 5, otrazh: 6 }
            },
            {
               name: 'watch1',
               yellow: { krit: 1, hpmax: 5 }
            },
            {
               name: 'watch2',
               yellow: { deff: 1, hpmax: 5 }
            },
            {
               name: 'watch3',
               yellow: { deff: 1, hpmax: 5 }
            },
            {
               name: 'watch4',
               yellow: { damage: 1, hpmax: 5 }
            },
            {
               name: 'watch5',
               yellow: { krit: 1, hpmax: 5 }
            },
            {
               name: 'watch6',
               yellow: { deff: 1, hpmax: 5 }
            },
            {
               name: 'watch7',
               yellow: { damage: 1, hpmax: 5 }
            }
         ]
         break;
      case 'breast':
         items = [
            {
               name: 'illuminate',
               yellow: { deff: 1, damage: 1 }
            }
         ]
         break;
      case 'shoulder':
         items = [
            {
               name: 'arkanaio',
               yellow: { deff: 2, damage: 1, krit: 1, hpmax: 10 }
            }
         ]
         break;
      case 'spine':
         items = [
            {
               name: 'bloodywings',
               yellow: { deff: 2, damage: 2 }
            },
            {
               name: 'spiderlegs',
               yellow: { deff: 1, damage: 1 }
            },
            {
               name: 'battlefury',
               yellow: { deff: 5, krit: 5, hpmax: 5 }
            },
            {
               name: 'desolator',
               yellow: { damage: 2, krit: 4, neoglysh: 3, otrazh: 1 }
            },
            {
               name: 'firepickaxe',
               yellow: { damage: 1, hpmax: 5 }
            },
            {
               name: 'creeper',
               yellow: { deff: 1, hpmax: 5 }
            },
            {
               name: 'aegis',
               yellow: { damage: 2, hpmax: 8, armourmax: 8, otrazh: 1 }
            },
            {
               name: 'trax',
               yellow: { damage: 2, hpmax: 7, armourmax: 7, otrazh: 1 }
            },
            {
               name: 'sunduk',
               yellow: { damage: 1, deff: 1, krit: 1, oglysh: 1 }
            },
         ]
         break;
      case 'armour':
         items = []
         break;
      default:
         break;
   }
   if (items.length != 0) {
      var modalAccs = document.querySelector('.modal-accs');

      var tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      modalAccs.appendChild(tooltip);
      items.forEach(item => {
         var img = document.createElement('img');
         img.src = `${basePath}imgs/${slot}/${item.name}.png`;
         img.setAttribute('data-yellow', JSON.stringify(item.yellow));
         img.style.position = 'relative';

         img.addEventListener('click', function () {
            current_item.dataset.yellow = this.getAttribute('data-yellow');
            var img_temp = document.createElement('img');
            img_temp.src = current_item.src;
            img_temp.className = "default-accs"
            current_item.src = `${basePath}imgs/${slot}/${item.name}.png`;
            $(current_item).closest('.grid-item').append(img_temp)
            modalOverlay.style.display = 'none';
            tooltip.style.display = 'none';
            updateStats();

            while (modalAccs.firstChild) {
               modalAccs.removeChild(modalAccs.firstChild);
            }
         });

         img.addEventListener('mouseenter', function (event) {
            var yellowData = JSON.parse(this.getAttribute('data-yellow'));


            var tooltipText = '';
            for (var key in yellowData) {
               if (RuTypes[key]) {
                  tooltipText += `${RuTypes[key]}: ${yellowData[key]}<br>`;
               }
            }
            tooltip.innerHTML = tooltipText;
            tooltip.style.display = 'block';
         });

         img.addEventListener('mouseleave', function () {
            tooltip.style.display = 'none';
         });

         modalAccs.appendChild(img);
      });
      modalOverlay.style.display = 'flex';
   }
}