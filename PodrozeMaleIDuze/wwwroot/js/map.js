const CATS = {
    'Zamki': '#B89C9C',
    'Góry': '#7C93A8',
    'Natura': '#8FA98A',
    'Woda': '#6FA0A8',
    'Miasta': '#E0A865',
    'Muzea': '#9B8AAE',
    'Zabytki': '#C98568'
};

// przykładowe dane (na razie wpisane na stałe; docelowo z bazy)
const places = [
    {
        id: 1,
        name: 'Zamek w Malborku',
        cat: 'Zamki',
        city: 'Malbork',
        region: 'pomorskie',
        lat: 54.0397,
        lon: 19.0280,
        desc: 'Największy ceglany zamek na świecie, dawna siedziba wielkich mistrzów zakonu krzyżackiego.'
    },
    {
        id: 2,
        name: 'Morskie Oko',
        cat: 'Woda',
        city: 'Zakopane',
        region: 'małopolskie',
        lat: 49.1979,
        lon: 20.0708,
        desc: 'Największe jezioro w Tatrach, położone w Tatrzańskim Parku Narodowym.'
    },
    {
        id: 3,
        name: 'Puszcza Białowieska',
        cat: 'Natura',
        city: 'Białowieża',
        region: 'podlaskie',
        lat: 52.7000,
        lon: 23.8667,
        desc: 'Ostatni las pierwotny Europy Środkowej i ostoja żubrów.'
    },
    {
        id: 4,
        name: 'Wawel',
        cat: 'Zamki',
        city: 'Kraków',
        region: 'małopolskie',
        lat: 50.0540,
        lon: 19.9352,
        desc: 'Zamek królewski i katedra, symbol polskiej państwowości.'
    },
    {
        id: 5,
        name: 'Kopalnia Soli w Wieliczce',
        cat: 'Muzea',
        city: 'Wieliczka',
        region: 'małopolskie',
        lat: 49.9833,
        lon: 20.0537,
        desc: 'Zabytkowa kopalnia z podziemnymi komorami i kaplicami wyrzeźbionymi w soli.'
    },
    {
        id: 6,
        name: 'Śnieżka',
        cat: 'Góry',
        city: 'Karpacz',
        region: 'dolnośląskie',
        lat: 50.7360,
        lon: 15.7400,
        desc: 'Najwyższy szczyt Karkonoszy i Sudetów.'
    },
    {
        id: 7,
        name: 'Rynek we Wrocławiu',
        cat: 'Miasta',
        city: 'Wrocław',
        region: 'dolnośląskie',
        lat: 51.1100,
        lon: 17.0326,
        desc: 'Jeden z największych rynków w Europie, z kolorowymi kamienicami.'
    },
    {
        id: 8,
        name: 'Zamek w Pszczynie',
        cat: 'Zamki',
        city: 'Pszczyna',
        region: 'śląskie',
        lat: 49.9786,
        lon: 18.9409,
        desc: 'Pałac z parkiem i zagrodą żubrów.'
    },
    {
        id: 9,
        name: 'Jezioro Śniardwy',
        cat: 'Woda',
        city: 'Mikołajki',
        region: 'warmińsko-mazurskie',
        lat: 53.7500,
        lon: 21.7333,
        desc: 'Największe jezioro w Polsce, w sercu Mazur.'
    },
    {
        id: 10,
        name: 'Stare Miasto w Toruniu',
        cat: 'Zabytki',
        city: 'Toruń',
        region: 'kujawsko-pomorskie',
        lat: 53.0100,
        lon: 18.6040,
        desc: 'Gotycki zespół staromiejski wpisany na listę UNESCO.'
    },
    {
        id: 11,
        name: 'Muzeum Powstania Warszawskiego',
        cat: 'Muzea',
        city: 'Warszawa',
        region: 'mazowieckie',
        lat: 52.2325,
        lon: 20.9810,
        desc: 'Interaktywne muzeum poświęcone powstaniu z 1944 roku.'
    },
    // okolice Białegostoku (pop = umowna popularność, docelowo z bazy)
    {
        id: 12,
        name: 'Pałac Branickich',
        cat: 'Zabytki',
        city: 'Białystok',
        region: 'podlaskie',
        lat: 53.1290,
        lon: 23.1640,
        pop: 98,
        desc: 'Barokowa rezydencja hetmana Jana Klemensa Branickiego, zwana Wersalem Podlasia.'
    },
    {
        id: 13,
        name: 'Muzeum Pamięci Sybiru',
        cat: 'Muzea',
        city: 'Białystok',
        region: 'podlaskie',
        lat: 53.1373,
        lon: 23.1474,
        pop: 81,
        desc: 'Muzeum poświęcone losom Polaków zesłanych na Syberię.'
    },
    {
        id: 14,
        name: 'Rynek Kościuszki i Ratusz',
        cat: 'Miasta',
        city: 'Białystok',
        region: 'podlaskie',
        lat: 53.1323,
        lon: 23.1590,
        pop: 77,
        desc: 'Serce miasta z odbudowanym ratuszem, w którym mieści się Muzeum Podlaskie.'
    },
    {
        id: 15,
        name: 'Tykocin — zamek i synagoga',
        cat: 'Zabytki',
        city: 'Tykocin',
        region: 'podlaskie',
        lat: 53.2050,
        lon: 22.7740,
        pop: 90,
        desc: 'Miasteczko nad Narwią z odbudowanym zamkiem i Wielką Synagogą.'
    },
    {
        id: 16,
        name: 'Monaster w Supraślu',
        cat: 'Zabytki',
        city: 'Supraśl',
        region: 'podlaskie',
        lat: 53.2100,
        lon: 23.3370,
        pop: 64,
        desc: 'Klasztor prawosławny z Muzeum Ikon.'
    },
    {
        id: 17,
        name: 'Narwiański Park Narodowy',
        cat: 'Natura',
        city: 'Kurowo',
        region: 'podlaskie',
        lat: 52.9900,
        lon: 22.6900,
        pop: 72,
        desc: 'Bagienna dolina Narwi nazywana polską Amazonią.'
    },
    {
        id: 18,
        name: 'Puszcza Knyszyńska',
        cat: 'Natura',
        city: 'Supraśl',
        region: 'podlaskie',
        lat: 53.2600,
        lon: 23.4300,
        pop: 55,
        desc: 'Rozległy kompleks leśny z licznymi szlakami pieszymi i rowerowymi.'
    },
    {
        id: 19,
        name: 'Zalew Dojlidy',
        cat: 'Woda',
        city: 'Białystok',
        region: 'podlaskie',
        lat: 53.1100,
        lon: 23.2050,
        pop: 47,
        desc: 'Kąpielisko i tereny rekreacyjne na skraju miasta.'
    },
    {
        id: 20,
        name: 'Pałac w Choroszczy',
        cat: 'Muzea',
        city: 'Choroszcz',
        region: 'podlaskie',
        lat: 53.1450,
        lon: 22.9850,
        pop: 38,
        desc: 'Letnia rezydencja Branickich, dziś Muzeum Wnętrz Pałacowych.'
    }
];

const map = L.map('map').setView([52.0, 19.4], 6);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const listEl = document.getElementById('list');
const countEl = document.getElementById('count');
const chipsEl = document.getElementById('chips');
const qEl = document.getElementById('q');
const markers = {};
let activeCat = '';
let query = '';

// punkty zaczepienia dla skryptów rozszerzających mapę (np. map-cityadmin.js)
const hooks = {
    filter: () => true,   // (p) => czy pokazać miejsce (dodatkowy warunek)
    popup: () => {},      // (p, box) => dodatkowe elementy w dymku markera
    count: null,          // (shown) => własny tekst licznika
    afterRender: () => {} // (shown) => wywoływane po każdym odświeżeniu
};

function el(tag, cls, text) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
}

function makeMarker(p) {
    const m = L.circleMarker([p.lat, p.lon], {
        radius: 9,
        color: '#ffffff',
        weight: 2,
        fillColor: CATS[p.cat],
        fillOpacity: 1
    });
    const box = el('div', 'pop');
    box.append(el('b', '', p.name), el('small', '', p.cat + ' · ' + p.city + ' · ' + p.region), el('p', '', p.desc));
    const g = el('a', '', 'Otwórz w Google Maps');
    g.href = 'https://www.google.com/maps?q=' + p.lat + ',' + p.lon;
    g.target = '_blank';
    g.rel = 'noopener';
    box.append(g);
    hooks.popup(p, box);
    return m.bindPopup(box);
}

function dropMarker(id) {
    if (!markers[id]) return;
    map.removeLayer(markers[id]);
    delete markers[id];
}

function matches(p) {
    const t = (p.name + ' ' + p.city + ' ' + p.region + ' ' + p.cat + ' ' + p.desc).toLowerCase();
    return (!activeCat || p.cat === activeCat) && t.includes(query.toLowerCase()) && hooks.filter(p);
}

function render() {
    const shown = places.filter(matches);
    Object.values(markers).forEach(m => map.removeLayer(m));
    shown.forEach(p => {
        if (!markers[p.id]) markers[p.id] = makeMarker(p);
        markers[p.id].addTo(map);
    });

    if (listEl) {
        listEl.replaceChildren();
        shown.forEach(p => {
            const li = el('li', 'item');
            const dot = el('span', 'dot');
            dot.style.background = CATS[p.cat];
            const box = el('div');
            box.append(el('b', '', p.name), el('small', '', p.city + ' · ' + p.region));
            li.append(dot, box);
            li.onclick = () => {
                map.flyTo([p.lat, p.lon], 9);
                markers[p.id].openPopup();
            };
            listEl.append(li);
        });
    }

    countEl.textContent = hooks.count
        ? hooks.count(shown)
        : shown.length + ' z ' + places.length + ' miejsc w Polsce';
    hooks.afterRender(shown);
}

function setCat(c) {
    activeCat = c;
    chipsEl.querySelectorAll('.chip').forEach(b => b.classList.toggle('on', b.dataset.cat === c));
    render();
}

function addChip(label, cat) {
    const b = el('button', 'chip' + (cat === '' ? ' on' : ''), label);
    b.type = 'button';
    b.dataset.cat = cat;
    b.onclick = () => setCat(cat);
    chipsEl.append(b);
}

addChip('Wszystkie', '');
Object.keys(CATS).forEach(c => addChip(c, c));
qEl.oninput = () => {
    query = qEl.value;
    render();
};

// panel administratora (istnieje na stronie tylko dla roli Admin)
const form = document.getElementById('placeForm');
if (form) {
    const msg = document.getElementById('msg');
    const f = form.elements;
    Object.keys(CATS).forEach(c => f.cat.append(new Option(c, c)));
    let picking = false;

    document.getElementById('pickBtn').onclick = () => {
        picking = true;
        map.getContainer().style.cursor = 'crosshair';
        msg.textContent = 'Kliknij na mapie, aby wskazać lokalizację.';
    };
    map.on('click', e => {
        if (!picking) return;
        picking = false;
        map.getContainer().style.cursor = '';
        f.lat.value = e.latlng.lat.toFixed(4);
        f.lon.value = e.latlng.lng.toFixed(4);
        msg.textContent = '';
    });
    form.onsubmit = e => {
        e.preventDefault();
        const lat = parseFloat(f.lat.value.replace(',', '.'));
        const lon = parseFloat(f.lon.value.replace(',', '.'));
        if (!f.pname.value.trim() || !f.city.value.trim()) {
            msg.textContent = 'Podaj nazwę i miasto.';
            return;
        }
        if (Number.isNaN(lat) || Number.isNaN(lon) || Math.abs(lat) > 90 || Math.abs(lon) > 180) {
            msg.textContent = 'Podaj poprawną szerokość i długość.';
            return;
        }
        places.push({
            id: Date.now(),
            name: f.pname.value.trim(),
            cat: f.cat.value,
            city: f.city.value.trim(),
            region: f.region.value.trim() || '-',
            lat: lat,
            lon: lon,
            desc: f.desc.value.trim()
        });
        form.reset();
        msg.textContent = 'Dodano (na razie tylko w tej przeglądarce).';
        render();
        map.flyTo([lat, lon], 9);
    };
}

// udostępnione dla map-cityadmin.js
window.MapApp = {map, places, CATS, markers, hooks, el, render, dropMarker};

// pierwsze rysowanie po wczytaniu wszystkich skryptów, żeby rozszerzenia
// zdążyły ustawić swoje hooks
document.addEventListener('DOMContentLoaded', render);
