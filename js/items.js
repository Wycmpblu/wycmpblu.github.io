const basePath = window.location.pathname.includes('/mobile/') ? '../' : './';

const categories = {
   face: [                 // Лицо
      {
         imageSrc: `${basePath}imgs/face/netri.png`,
         name: 'Анимированные очки Netrunner',
         stats: { deff: 2, krit: 25 },
         upg: 'deff',
         yellow: {}
      },
      {
         imageSrc: `${basePath}imgs/face/vrglasses.png`,
         name: 'Киберпанковские VR-очки',
         stats: { deff: 2, krit: 25 },
         upg: 'deff',
         yellow: {}
      },
      {
         imageSrc: `${basePath}imgs/face/maskinvisible.png`,
         name: 'Маска-невидимка',
         stats: { deff: 0, oglysh: 3 },
         upg: 'deff',
         yellow: {}
      },
      {
         imageSrc: `${basePath}imgs/face/sphereOnHead.png`,
         name: 'Сфера над головой',
         stats: { deff: 2, damage: 2, krit: 2 },
         upg: 'deff',
         yellow: {}
      },
      {
         imageSrc: `${basePath}imgs/face/respirator.png`,
         name: 'Респиратор',
         stats: { deff: 0 },
         upg: 'deff',
         yellow: { deff: 1, damage: 1 }
      }
   ],
   shoulder: [             // Плечо
      {
         imageSrc: `${basePath}imgs/shoulder/magshar2.png`,
         name: 'Маг. шар',
         stats: { deff: 2, damage: 1, krit: 10, armourmax: 25 },
         upg: 'deff',
         yellow: {}
      },
      {
         imageSrc: `${basePath}imgs/shoulder/energoshar.png`,
         name: 'Энергошар',
         stats: { deff: 4, damage: 4, krit: 24, hpmax: 5, armourmax: 27, neoglysh: 10 },
         upg: 'deff',
         yellow: {}
      },
      {
         imageSrc: `${basePath}imgs/shoulder/delorean.png`,
         name: 'Делориан',
         stats: { deff: 0, krit: 10, armourmax: 20, oglysh: 4 },
         upg: 'deff',
         yellow: {}
      },
      {
         imageSrc: `${basePath}imgs/shoulder/pexpress.png`,
         name: 'Planet Express',
         stats: { deff: 0, krit: 10, armourmax: 20, oglysh: 4 },
         upg: 'deff',
         yellow: {}
      }
   ],
   case: [                 // Чемодан
      {
         imageSrc: `${basePath}imgs/case/enegrochem.png`,
         name: 'Энерг. чемодан',
         stats: { damage: 3, oglysh: 13, neoglysh: 4 },
         upg: '',
         yellow: {}
      },
      {
         imageSrc: `${basePath}imgs/case/chem.png`,
         name: 'Чемодан весны',
         stats: { oglysh: 6 },
         upg: '',
         yellow: {}
      }
   ],
   armour: [               // Бронежилет
      {
         imageSrc: `${basePath}imgs/armour/bronik.png`,
         name: 'Любой культ',
         stats: { deff: 2, krit: 1, armourmax: 0 },
         upg: 'armour',
         yellow: {}
      },
      {
         imageSrc: `${basePath}imgs/armour/genbronik.png`,
         name: 'Ген. броник',
         stats: { deff: 2, damage: 2, krit: 1, armourmax: 35 },
         upg: 'armour',
         yellow: {}
      }
   ],
   hand: [                 // Рука
      {
         imageSrc: `${basePath}imgs/hand/duff.png`,
         name: 'Молот Duff',
         stats: { damage: 4 },
         upg: 'damage',
         yellow: {}
      },
      {
         imageSrc: `${basePath}imgs/hand/vie.png`,
         name: 'Перчатка Вай',
         stats: { damage: 4 },
         upg: 'damage',
         yellow: {}
      },
      {
         imageSrc: `${basePath}imgs/hand/tanos.png`,
         name: 'Рука бесконечности',
         stats: { damage: 4 },
         upg: 'damage',
         yellow: {}
      },
      {
         imageSrc: `${basePath}imgs/hand/fraps.png`,
         name: 'Табличка "Фрапс Пишется"',
         stats: { deff: 2, damage: 2, krit: 2 },
         upg: 'damage',
         yellow: {}
      },
      {
         imageSrc: `${basePath}imgs/hand/azzinoth.png`,
         name: 'Клинки Аззинота',
         stats: { deff: 2, damage: 2, krit: 2 },
         upg: 'damage',
         yellow: {}
      }
   ],
   head: [                 // Голова
      {
         imageSrc: `${basePath}imgs/head/deadinside.png`,
         name: 'Маркер Dead Inside',
         stats: { damage: 1, krit: 10, oglysh: 1 },
         upg: 'krit',
         yellow: {}
      },
      {
         imageSrc: `${basePath}imgs/head/bad.png`,
         name: 'Маркер Bad',
         stats: { krit: 10 },
         upg: 'krit',
         yellow: {}
      },
      {
         imageSrc: `${basePath}imgs/head/ironman.png`,
         name: 'Голова ЖЧ',
         stats: { krit: 2 },
         upg: 'krit',
         yellow: {}
      },
      {
         imageSrc: `${basePath}imgs/head/pepe.png`,
         name: 'Пе-Пе',
         stats: { krit: 1 },
         upg: 'krit',
         yellow: {}
      },
      {
         imageSrc: `${basePath}imgs/head/tikva.png`,
         name: 'Голова "Тыква"',
         stats: { deff: 2, damage: 2, krit: 2, hpmin: 0 },
         upg: 'hpmin',
         yellow: {}
      },
      {
         imageSrc: `${basePath}imgs/head/nimbgearvlast.png`,
         name: 'Нимб кольца Всевластия',
         stats: { hpmin: 0 },
         upg: 'hpmin',
         yellow: { deff: 3, damage: 3, krit: 1, hpmax: 19 }
      },
      {
         imageSrc: `${basePath}imgs/head/tango.png`,
         name: 'Танго',
         stats: { hpmin: 0 },
         upg: 'hpmin',
         yellow: { deff: 2, damage: 1, krit: 1, hpmax: 10 }
      },
      {
         imageSrc: `${basePath}imgs/head/bk.png`,
         name: 'Бойцовский клуб',
         stats: { krit: 10 },
         upg: 'krit',
         yellow: {}
      },
      {
         imageSrc: `${basePath}imgs/head/endercube.png`,
         name: 'Эндер куб',
         stats: { krit: 10, damage: 1, oglysh: 1 },
         upg: 'krit',
         yellow: {}
      }
   ],
   spine: [                // Спина
      {
         imageSrc: `${basePath}imgs/spine/tor.png`,
         name: 'Молот Тора',
         stats: { damage: 4 },
         upg: 'damage',
         yellow: {}
      },
      {
         imageSrc: `${basePath}imgs/spine/rbt.png`,
         name: 'Русский боевой топор',
         stats: { deff: 4 },
         upg: 'deff',
         yellow: {}
      },
      {
         imageSrc: `${basePath}imgs/spine/energoshield.png`,
         name: 'Энергощит',
         stats: { deff: 4, hpmax: 10, opyan: 2 },
         upg: 'deff',
         yellow: {}
      },
      {
         imageSrc: `${basePath}imgs/spine/jasehammer.png`,
         name: 'Молот Джейса',
         stats: { damage: 4 },
         upg: 'damage',
         yellow: {}
      }
   ],
   breast: [               // Грудь
      {
         imageSrc: `${basePath}imgs/breast/mahi.png`,
         name: 'Цепь Махинатор',
         stats: { deff: 2, damage: 1, krit: 10, armourmax: 25 },
         upg: 'damage',
         yellow: {}
      },
      {
         imageSrc: `${basePath}imgs/breast/bitcoin.png`,
         name: 'Цепь Bitcoin',
         stats: { deff: 2, damage: 1, krit: 10, armourmax: 25 },
         upg: 'damage',
         yellow: {}
      },
      {
         imageSrc: `${basePath}imgs/breast/energomahi.png`,
         name: 'Энергомахинатор',
         stats: { deff: 4, damage: 2, krit: 12, armourmax: 25 },
         upg: 'damage',
         yellow: { damage: 2, hpmax: 5 }
      }
   ],
   characters: [           // Скин
      {
         imageSrc: `${basePath}imgs/characters/rilay.png`,
         name: 'Рилай',
         stats: { deff: 8, damage: 4, krit: 4, hpmin: 4, hpmax: 12, armourmax: 12 },
         upg: 'hpmin',
         yellow: { damage: 2, hpmax: 5, oglysh: 5 }
      },
      {
         imageSrc: `${basePath}imgs/characters/void.png`,
         name: 'Войд',
         stats: { deff: 8, damage: 4, krit: 4, hpmin: 4, hpmax: 12, armourmax: 12 },
         upg: 'hpmin',
         yellow: { deff: 2, neoglysh: 5, oglysh: 5 }
      },
      {
         imageSrc: `${basePath}imgs/characters/ct.png`,
         name: 'Спецназовец',
         stats: { deff: 8, damage: 4, krit: 4, hpmin: 4, hpmax: 12, armourmax: 12 },
         upg: 'hpmin',
         yellow: { damage: 2, deff: 2, otrazh: 3 }
      },
      {
         imageSrc: `${basePath}imgs/characters/template.png`,
         name: 'Прочий кастом. скин',
         stats: { deff: 8, damage: 4, krit: 4, hpmin: 4, hpmax: 12, armourmax: 12 },
         upg: 'hpmin',
         yellow: {}
      },
      {
         imageSrc: `${basePath}imgs/characters/gribi1.png`,
         name: 'Грибы 2',
         stats: { deff: 8, damage: 4, krit: 4, hpmin: 4, hpmax: 12, armourmax: 12 },
         upg: 'hpmin',
         yellow: { damage: 2, hpmax: 5, oglysh: 5 }
      }
   ]
};