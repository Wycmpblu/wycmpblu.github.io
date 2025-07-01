function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent);
}

// Обновленная проверка редиректа
if (isMobileDevice()) {
    if (!window.location.pathname.includes('/mobile')) {
        const newPath = window.location.pathname === '/' ?
            '/mobile' :
            window.location.pathname.replace(/^\//, '/mobile/');
        window.location.href = newPath;
    }
} else {
    if (window.location.pathname.includes('/mobile')) {
        const newPath = window.location.pathname.replace(/^\/mobile/, '');
        window.location.href = newPath || '/';
    }
}


var RuTypes = {
    deff: 'Защита',
    hpmin: 'HP в мин.',
    damage: 'Урон',
    krit: 'Удача',
    hpmax: 'Макс. HP',
    armourmax: 'Макс. Брони',
    oglysh: 'Шанс оглушения',
    opyan: 'Шанс опьянения',
    neoglysh: 'Шанс избежать оглушения',
    otrazh: 'Отражение урона'
};

var RuSlots = {
    head: 'Голова',
    face: 'Лицо',
    hand: 'Рука',
    breast: 'Грудь',
    shoulder: 'Плечо',
    spine: 'Спина',
    armour: 'Бронежилет',
    case: 'Чемодан',
    characters: 'Скин'
}

function getSlotNameFromItem(item) {
    const match = item.getAttribute('src').match(/\.\/imgs\/([^/]+)\//);
    return match ? match[1] : null;
}

class ItemPlacer {
    constructor() {

        this.containers = document.querySelectorAll('.mini-container');
    }

    getSlotNameFromSrc(src) {

        const match = src.match(/\.\/imgs\/([^/]+)\//);
        return match ? match[1] : null;
    }

    createItemElement(imageSrc, stats, upg, yellow) {

        const img = document.createElement('img');
        img.src = imageSrc;
        img.draggable = true;
        img.className = 'main'
        img.setAttribute('data-stats', JSON.stringify(stats));
        img.setAttribute('data-upg', upg);
        img.setAttribute('data-yellow', JSON.stringify(yellow));

        return img;
    }

    placeItem(imageSrc, stats, upg, yellow) {

        const slotName = this.getSlotNameFromSrc(imageSrc);
        if (!slotName) {
            return;
        }


        const container = Array.from(this.containers).find(
            (el) => el.getAttribute('slot-name') === slotName
        );

        if (container) {

            const img = this.createItemElement(imageSrc, stats, upg, yellow);
            container.appendChild(img);
        }
    }
}


const placer = new ItemPlacer();
console.log('Categories loaded:', categories);

Object.entries(categories).forEach(([category, items]) => {
    items.forEach(item => {
        placer.placeItem(item.imageSrc, item.stats, item.upg, item.yellow);
    });
});

function getMultiplier(type) {
    switch (type) {
        case 'deff':
            return 2;
        case 'armour':
            return 5;
        default:
            return 1;
    }
}

function updateStats() {
    const gridItems = document.querySelectorAll('.grid-item');
    var deff = 0;
    var hpmin = 0;
    var damage = 0;
    var krit = 0;
    var hpmax = 0;
    var armourmax = 0;
    var oglysh = 0;
    var opyan = 0;
    var neoglysh = 0;
    var otrazh = 0;

    gridItems.forEach(item => {
        const img = item.querySelector('img.main');
        if (img) {
            const stats = JSON.parse(img.dataset.stats);
            const type = img.dataset.upg;
            const yellow_stats = JSON.parse(img.dataset.yellow);
            if (img.dataset.nashivka == undefined) {
                nashivka = {}
            } else {
                nashivka = JSON.parse(img.dataset.nashivka);
            }

            const upgrader = getMultiplier(type)
            if (type != '') {
                const zatochkaElement = item.querySelector('span');
                const zatochka = parseInt(zatochkaElement.textContent.trim(), 10);

                if (type == 'armour') {
                    stats.armourmax += zatochka * upgrader;
                } else {
                    if (zatochka >= 4) {
                        stats[type] += (zatochka - 3) * upgrader;
                        if (zatochka == 13) {
                            if (stats.armourmax == undefined) {
                                stats.armourmax = 0;
                            }
                            if (stats.hpmax == undefined) {
                                stats.hpmax = 0;
                            }
                            stats.armourmax += 9;
                            stats.hpmax += 4;
                        }
                        if (zatochka == 14) {
                            if (stats.hpmax == undefined) {
                                stats.hpmax = 0;
                            }
                            if (stats.otrazh == undefined) {
                                stats.otrazh = 0;
                            }
                            if (stats.armourmax == undefined) {
                                stats.armourmax = 0;
                            }
                            if (stats.hpmin == undefined) {
                                stats.hpmin = 0;
                            }
                            stats.otrazh += 1;
                            stats.armourmax += 14;
                            stats.hpmin += 3;
                            stats.hpmax += 4;
                        }
                    }
                }
            }

            deff += nashivka.deff || 0;
            damage += nashivka.damage || 0;
            krit += nashivka.krit || 0;
            otrazh += nashivka.otrazh || 0;
            neoglysh += nashivka.neoglysh || 0;

            deff += yellow_stats.deff || 0;
            hpmin += yellow_stats.hpmin || 0;
            damage += yellow_stats.damage || 0;
            krit += yellow_stats.krit || 0;
            hpmax += yellow_stats.hpmax || 0;
            armourmax += yellow_stats.armourmax || 0;
            oglysh += yellow_stats.oglysh || 0;
            opyan += yellow_stats.opyan || 0;
            neoglysh += yellow_stats.neoglysh || 0;
            otrazh += yellow_stats.otrazh || 0;

            deff += stats.deff || 0;
            hpmin += stats.hpmin || 0;
            damage += stats.damage || 0;
            krit += stats.krit || 0;
            hpmax += stats.hpmax || 0;
            armourmax += stats.armourmax || 0;
            oglysh += stats.oglysh || 0;
            opyan += stats.opyan || 0;
            neoglysh += stats.neoglysh || 0;
            otrazh += stats.otrazh || 0;

            if (armourmax >= 160) {
                armourmax = 160;
            }

            if (deff >= 90) {
                deff = 90;
            }
        }
    });
    $('span#deff').text(`[-${deff}% урона]`);
    $('span#hpmin').text(`[${hpmin} HP в мин.]`);
    $('span#damage').text(`[+${damage} урона]`);
    $('span#krit').text(`[шанс ${krit}% крит.урона]`);
    $('span#hpmax').text(`[+${hpmax} макс. HP]`);
    $('span#armourmax').text(`[+${armourmax} макс. Брони]`);
    $('span#oglysh').text(`[+${oglysh}%]`);
    $('span#opyan').text(`[+${opyan}%]`);
    $('span#neoglysh').text(`[+${neoglysh}%]`);
    $('span#otrazh').text(`[-${otrazh}%]`);
}

const gridItems = document.querySelectorAll('.grid-item');

gridItems.forEach(item => {
    const tooltip = item.querySelector('.tooltip');
    const ruName = item.getAttribute('ru-name');

    tooltip.innerHTML = ruName;

    item.addEventListener('mouseover', () => {
        tooltip.style.display = 'block';
    });

    item.addEventListener('mouseout', () => {
        tooltip.style.display = 'none';
    });
});


document.querySelectorAll('.mini-container img').forEach(img => {
    if (!isMobileDevice()) {
        img.setAttribute('draggable', true);
        img.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('slot-name', img.parentElement.getAttribute('slot-name'));
            e.dataTransfer.setData('img-html', img.outerHTML);
            img.classList.add('dragging');
        });

        img.addEventListener('dragend', () => {
            img.classList.remove('dragging');
        });
    } else {
        img.addEventListener('click', function () {
            addAccs(img.parentElement.getAttribute('slot-name'), img.outerHTML)
        })
    }

});

var current_item;
var itemForNashivka;

function addAccs(slot_name, imgHtml) {
    var item = $(`.grid-item#${slot_name}`).get(0);
    if (imgHtml) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = imgHtml.trim();
        const imgElement = tempDiv.querySelector('img.main');
        if (slot_name == item.getAttribute("id")) {
            if (imgElement) {
                const existingImg = item.querySelector('img.main');
                if (existingImg) {
                    existingImg.outerHTML = imgHtml;
                    $(item).find('img.default-accs').remove();
                } else {
                    item.appendChild(imgElement);
                }
                current_item = $(item).find('img')[0]
                current_item.className = 'main'
                $(item).find('.tooltip').text($(item).attr('ru-name'))
                const slot = getSlotNameFromItem(current_item)
                showPereshiv(slot)
            }
        }
        updateStats();
    }

    const img = item.querySelector('img');
    if (img) {
        img.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('img-html', img.outerHTML);
            e.dataTransfer.effectAllowed = "move";
        });
    }
}

var temp_info = {};

document.querySelectorAll('.grid-item').forEach(item => {
    if (isMobileDevice()) {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            temp_info.html = img.outerHTML
            temp_info.dom = img
            youWannaDelete()
        })
    }
    item.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    item.addEventListener('drop', (e) => {
        e.preventDefault();
        const imgHtml = e.dataTransfer.getData('img-html');
        const slot_name = e.dataTransfer.getData('slot-name');

        if (imgHtml) {

            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = imgHtml.trim();
            const imgElement = tempDiv.querySelector('img.main');
            if (slot_name == item.getAttribute("id")) {
                if (imgElement) {
                    const existingImg = item.querySelector('img.main');
                    if (existingImg) {
                        existingImg.outerHTML = imgHtml;
                        $(item).find('img.default-accs').remove();
                    } else {
                        item.appendChild(imgElement);
                    }
                    current_item = $(item).find('img')[0]
                    current_item.className = 'main'
                    $(item).find('.tooltip').text($(item).attr('ru-name'))
                    const slot = getSlotNameFromItem(current_item)
                    showPereshiv(slot)
                }
            }
            updateStats();
        }

        const img = item.querySelector('img');
        if (img) {
            img.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('img-html', img.outerHTML);
                e.dataTransfer.effectAllowed = "move";
            });
        }
    });
});



if (isMobileDevice()) {
    function youWannaDelete() {
        const modalDelete = document.getElementById('modalDelete');
        modalDelete.style.display = 'block'
        const img = temp_info.dom
        const gridItem = $(img).closest('.grid-item')
        $('#modalDelete .modal h2').text(`Вы уверены что хотите удалить аксессуар из слота ${RuSlots[gridItem.attr('id')]}?`)
    }

    function reallyDelete(imgHtml) {
        if (imgHtml) {
            document.querySelectorAll('.grid-item img').forEach(img => {
                if (img.outerHTML === imgHtml) {
                    var gridItem = $(img).closest('.grid-item');
                    $(gridItem).find('img').remove();
                    $(gridItem).find('.tooltip').text($(gridItem).attr('ru-name'));
                    $(gridItem).find('.tooltip').css('display', 'none');
                }
            });
        }
        updateStats()
    }
} else {
    const trash = document.querySelector('.trash');
    const trashTooltip = document.querySelector('#trashtooltip')

    trash.addEventListener('mouseover', () => {
        trashTooltip.style.display = 'block';
    });

    trash.addEventListener('mouseout', () => {
        trashTooltip.style.display = 'none';
    });
    trash.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    trash.addEventListener('drop', (e) => {
        e.preventDefault();
        const imgHtml = e.dataTransfer.getData('img-html');

        if (imgHtml) {
            document.querySelectorAll('.grid-item img').forEach(img => {
                if (img.outerHTML === imgHtml) {
                    var gridItem = $(img).closest('.grid-item');
                    $(gridItem).find('img').remove();
                    $(gridItem).find('.tooltip').text($(gridItem).attr('ru-name'));
                    $(gridItem).find('.tooltip').css('display', 'none');
                }
            });
        }
        updateStats();
    });
}

function getRandomElement(arr) {
    if (arr.length === 0) {
        throw new Error("Array cannot be empty");
    }
    const randomIndex = window.crypto.getRandomValues(new Uint32Array(1))[0] % arr.length;

    return arr[randomIndex];
}

const myArray = [
    'fenny',
    'pudge',
    'osel',
    'ct',
    'bbt',
    'hitok',
    'homelander',
    'rilay',
    'superman',
    'aura',
    'power',
    'lego',
    'mafia',
    'woozie'
]

$(document).ready(function () {
    let previousElement = null;

    function updateCharacterImage() {
        let randomElement;

        do {
            randomElement = getRandomElement(myArray);
        } while (randomElement === previousElement);

        previousElement = randomElement;
        $('#character-image').attr('src', `${basePath}imgs/characters/template.png`);
    }

    updateCharacterImage();

    var character = $('#character')
    var tooltip = character.find('.tooltip');

    character.on('click', function () {
        updateCharacterImage();
    });
    if (!isMobileDevice()) {
        character.on('mouseover', function () {
            tooltip.show();
        });

        character.on('mouseout', function () {
            tooltip.hide();
        });
    }

    $('.btn.plus').on('click', function (e) {
        if (isMobileDevice()) {
            e.stopPropagation();
        }

        let span = $(this).closest('.grid-text').find('span');
        let currentValue = parseInt(span.text().replace('+', ''));
        if (currentValue < 14) {
            span.text(`+${currentValue + 1}`);
            updateStats();
        }
    });


    $('.btn.minus').on('click', function (e) {
        if (isMobileDevice()) {
            e.stopPropagation();
        }

        let span = $(this).closest('.grid-text').find('span');
        let currentValue = parseInt(span.text().replace('+', ''));
        if (currentValue > 0) {
            span.text(`+${currentValue - 1}`);
            updateStats();
        }
    });


    $('.btn.nashivka').on('click', function (e) {
        if (isMobileDevice()) {
            e.stopPropagation();
        }

        var $gridItem = $(this).closest('.grid-item');
        var $buttonContainer = $('<div class="button-container"></div>');
        var buttons = [
            { text: 'ДЕФФ', type: 'deff', value: 6 },
            { text: 'УРОН', type: 'damage', value: 3 },
            { text: 'КРИТ', type: 'krit', value: 3 },
            { text: 'ОТРАЖЕНИЕ', type: 'otrazh', value: 3 }
        ];
        buttons.forEach(function (button) {
            var $button = $('<button class="btn">' + button.text + '</button>');
            $button.on('click', function (e) {
                if (isMobileDevice()) {
                    e.stopPropagation();
                }
                var item = $gridItem.find('img.main')[0]
                var tooltip = $gridItem.find('.tooltip')[0]
                $($gridItem).find('.tooltip').text($($gridItem).attr('ru-name'))
                if (item != undefined) {
                    item.dataset.nashivka = `{"${button.type}": ${button.value}}`
                    if (item.dataset.nashivka != undefined) {
                        var nashivkaType = button.type;
                        var ruName = RuTypes[nashivkaType];

                        if (ruName) {
                            tooltip.innerHTML = `${tooltip.innerHTML}<br>Нашивка: ${ruName}`;
                        }
                    }
                    updateStats()
                }
                $buttonContainer.remove();
            });
            $buttonContainer.append($button);
        });


        $gridItem.append($buttonContainer);
    });


    $('.btn.nashivkabronik').on('click', function (e) {
        if (isMobileDevice()) {
            e.stopPropagation();
        }

        var $gridItem = $(this).closest('.grid-item');
        var item = $gridItem.find('img.main')[0]
        var tooltip = $gridItem.find('.tooltip')[0]
        $($gridItem).find('.tooltip').text($($gridItem).attr('ru-name'))
        if (item != undefined) {
            item.dataset.nashivka = `{"neoglysh": 20}`

            if (item.dataset.nashivka != undefined) {
                tooltip.innerHTML = `${tooltip.innerHTML}<br>Нашивка: Есть`;
            }
            updateStats()
        }
    });

    const closeModalButton = document.getElementById('closeModal');
    const testButton = document.getElementById('addYellowStats');
    const modalOverlay = document.getElementById('modalOverlay');

    if (isMobileDevice()) {
        const modalDelete = document.getElementById('modalDelete');

        const yesDeleteButton = document.getElementById('yesDelete');
        const noDeleteButton = document.getElementById('noDelete');

        yesDeleteButton.addEventListener('click', () => {
            modalDelete.style.display = 'none';
            reallyDelete(temp_info.html)
        });

        noDeleteButton.addEventListener('click', () => {
            modalDelete.style.display = 'none';
        });
    }

    closeModalButton.addEventListener('click', () => {
        modalOverlay.style.display = 'none';

        var modalAccs = document.querySelector('.modal-accs');
        while (modalAccs.firstChild) {
            modalAccs.removeChild(modalAccs.firstChild);
        }
    });
});
