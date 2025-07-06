const basePath = window.location.pathname.includes('/mobile/') ? '../' : './';

const categories = {
   face: [                 // Лицо
      {
         imageSrc: `${basePath}imgs/face/netri.png`,
         stats: { deff: 2, krit: 25 },
         upg: 'deff',
         yellow: {}
      },
      {
         imageSrc: `${basePath}imgs/face/vrglasses.png`,
         stats: { deff: 2, krit: 25 },
         upg: 'deff',
         yellow: {}
      },
      {
         imageSrc: `${basePath}imgs/face/maskinvisible.png`,
         stats: { deff: 0, oglysh: 3 },
         upg: 'deff',
         yellow: {}
      },
      {
         imageSrc: `${basePath}imgs/face/sphereOnHead.png`,
         stats: { deff: 2, damage: 2, krit: 2 },
         upg: 'deff',
         yellow: {}
      },
      {
         imageSrc: `${basePath}imgs/face/respirator.png`,
         stats: { deff: 0 },
         upg: 'deff',
         yellow: { deff: 1, damage: 1 }
      }
   ],
   shoulder: [             // Плечо
      {
         imageSrc: `${basePath}imgs/shoulder/magshar2.png`,
         stats: { deff: 2, damage: 1, krit: 10, armourmax: 25 },
         upg: 'deff',
         yellow: {}
      },
      {
         imageSrc: `${basePath}imgs/shoulder/energoshar.png`,
         stats: { deff: 4, damage: 4, krit: 24, hpmax: 5, armourmax: 27, neoglysh: 10 },
         upg: 'deff',
         yellow: {}
      },
      {
         imageSrc: `${basePath}imgs/shoulder/delorean.png`,
         stats: { deff: 0, krit: 10, armourmax: 20, oglysh: 4 },
         upg: 'deff',
         yellow: {}
      },
      {
         imageSrc: `${basePath}imgs/shoulder/pexpress.png`,
         stats: { deff: 0, krit: 10, armourmax: 20, oglysh: 4 },
         upg: 'deff',
         yellow: {}
      }
   ],
   case: [                 // Чемодан
      {
         imageSrc: `${basePath}imgs/case/enegrochem.png`,
         stats: { damage: 3, oglysh: 13, neoglysh: 4 },
         upg: '',
         yellow: {}
      },
      {
         imageSrc: `${basePath}imgs/case/chem.png`,
         stats: { oglysh: 6 },
         upg: '',
         yellow: {}
      }
   ],
   armour: [               // Бронежилет
      {
         imageSrc: `${basePath}imgs/armour/bronik.png`,
         stats: { deff: 2, krit: 1, armourmax: 0 },
         upg: 'armour',
         yellow: {}
      },
      {
         imageSrc: `${basePath}imgs/armour/genbronik.png`,
         stats: { deff: 2, damage: 2, krit: 1, armourmax: 35 },
         upg: 'armour',
         yellow: {}
      }
   ],
   hand: [                 // Рука
      {
         imageSrc: `${basePath}imgs/hand/duff.png`,
         stats: { damage: 4 },
         upg: 'damage',
         yellow: {}
      },
      {
         imageSrc: `${basePath}imgs/hand/vie.png`,
         stats: { damage: 4 },
         upg: 'damage',
         yellow: {}
      },
      {
         imageSrc: `${basePath}imgs/hand/tanos.png`,
         stats: { damage: 4 },
         upg: 'damage',
         yellow: {}
      },
      {
         imageSrc: `${basePath}imgs/hand/fraps.png`,
         stats: { deff: 2, damage: 2, krit: 2 },
         upg: 'damage',
         yellow: {}
      },
      {
         imageSrc: `${basePath}imgs/hand/azzinoth.png`,
         stats: { deff: 2, damage: 2, krit: 2 },
         upg: 'damage',
         yellow: {}
      }
   ],
   head: [                 // Голова
      {
         imageSrc: `${basePath}imgs/head/deadinside.png`,
         stats: { damage: 1, krit: 10, oglysh: 1 },
         upg: 'krit',
         yellow: {}
      },
      {
         imageSrc: `${basePath}imgs/head/bad.png`,
         stats: { krit: 10 },
         upg: 'krit',
         yellow: {}
      },
      {
         imageSrc: `${basePath}imgs/head/ironman.png`,
         stats: { krit: 2 },
         upg: 'krit',
         yellow: {}
      },
      {
         imageSrc: `${basePath}imgs/head/pepe.png`,
         stats: { krit: 1 },
         upg: 'krit',
         yellow: {}
      },
      {
         imageSrc: `${basePath}imgs/head/tikva.png`,
         stats: { deff: 2, damage: 2, krit: 2, hpmin: 0 },
         upg: 'hpmin',
         yellow: {}
      },
      {
         imageSrc: `${basePath}imgs/head/nimbgearvlast.png`,
         stats: { hpmin: 0 },
         upg: 'hpmin',
         yellow: { deff: 3, damage: 3, krit: 1, hpmax: 19 }
      },
      {
         imageSrc: `${basePath}imgs/head/tango.png`,
         stats: { hpmin: 0 },
         upg: 'hpmin',
         yellow: { deff: 2, damage: 1, krit: 1, hpmax: 10 }
      },
      {
         imageSrc: `${basePath}imgs/head/bk.png`,
         stats: { krit: 10 },
         upg: 'krit',
         yellow: {}
      },
      {
         imageSrc: `${basePath}imgs/head/endercube.png`,
         stats: { krit: 10, damage: 1, oglysh: 1 },
         upg: 'krit',
         yellow: {}
      }
   ],
   spine: [                // Спина
      {
         imageSrc: `${basePath}imgs/spine/tor.png`,
         stats: { damage: 4 },
         upg: 'damage',
         yellow: {}
      },
      {
         imageSrc: `${basePath}imgs/spine/rbt.png`,
         stats: { deff: 4 },
         upg: 'deff',
         yellow: {}
      },
      {
         imageSrc: `${basePath}imgs/spine/energoshield.png`,
         stats: { deff: 4, hpmax: 10, opyan: 2 },
         upg: 'deff',
         yellow: {}
      },
      {
         imageSrc: `${basePath}imgs/spine/jasehammer.png`,
         stats: { damage: 4 },
         upg: 'damage',
         yellow: {}
      }
   ],
   breast: [               // Грудь
      {
         imageSrc: `${basePath}imgs/breast/mahi.png`,
         stats: { deff: 2, damage: 1, krit: 10, armourmax: 25 },
         upg: 'damage',
         yellow: {}
      },
      {
         imageSrc: `${basePath}imgs/breast/bitcoin.png`,
         stats: { deff: 2, damage: 1, krit: 10, armourmax: 25 },
         upg: 'damage',
         yellow: {}
      },
      {
         imageSrc: `${basePath}imgs/breast/energomahi.png`,
         stats: { deff: 4, damage: 2, krit: 12, armourmax: 25 },
         upg: 'damage',
         yellow: { damage: 2, hpmax: 5 }
      }
   ],
   characters: [           // Скин
      {
         imageSrc: `${basePath}imgs/characters/rilay.png`,
         stats: { deff: 8, damage: 4, krit: 4, hpmin: 4, hpmax: 12, armourmax: 12 },
         upg: 'hpmin',
         yellow: { damage: 2, hpmax: 5, oglysh: 5 }
      },
      {
         imageSrc: `${basePath}imgs/characters/ct.png`,
         stats: { deff: 8, damage: 4, krit: 4, hpmin: 4, hpmax: 12, armourmax: 12 },
         upg: 'hpmin',
         yellow: { damage: 2, deff: 2, otrazh: 3 }
      },
      {
         imageSrc: `${basePath}imgs/characters/template.png`,
         stats: { deff: 8, damage: 4, krit: 4, hpmin: 4, hpmax: 12, armourmax: 12 },
         upg: 'hpmin',
         yellow: {}
      },
      {
         imageSrc: `${basePath}imgs/characters/gribi1.png`,
         stats: { deff: 8, damage: 4, krit: 4, hpmin: 4, hpmax: 12, armourmax: 12 },
         upg: 'hpmin',
         yellow: { damage: 2, hpmax: 5, oglysh: 5 }
      }
   ]
};