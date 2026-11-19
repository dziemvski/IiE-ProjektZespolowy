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

// współrzędne miast do wyboru lokalizacji (docelowo z bazy)
const CITIES = {
    'Białystok': {region: 'podlaskie', lat: 53.1325, lon: 23.1688},
    'Gdańsk': {region: 'pomorskie', lat: 54.3520, lon: 18.6466},
    'Kraków': {region: 'małopolskie', lat: 50.0647, lon: 19.9450},
    'Warszawa': {region: 'mazowieckie', lat: 52.2297, lon: 21.0122}
};

// ilustracje z kart na stronie głównej (Home/Index)
const ILL = {
    castle: 'M18 126H202M45 126V57H63V126M157 126V57H175V126M63 126V77H157V126M97 77V28L110 10L123 28V77M97 28H123M103 126V104Q110 90 117 104V126M75 95V104M145 95V104M51 57V49H57V57M163 57V49H169V57M97 52H123',
    peaks: 'M15 113L67 48L93 75L126 32L163 81L183 60L211 113M40 123Q110 104 180 123Q110 139 40 123ZM65 123H85M120 119H150',
    forest: 'M15 126H205M50 126V85M25 85L50 38L75 85H25ZM30 69L50 27L70 69M110 126V93M90 93L110 47L130 93H90ZM95 78L110 38L125 78M170 126V85M140 85L170 28L200 85H140ZM148 68L170 17L192 68'
};
const CAT_ILL = {Góry: 'peaks', Woda: 'peaks', Natura: 'forest'};

// panel admina miasta (istnieje na stronie tylko dla roli CityAdmin)
const caEl = document.getElementById('cityAdmin');
const caMode = !!caEl;

const map = L.map('map', {zoomControl: !caMode}).setView([52.0, 19.4], 6);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);
if (caMode) L.control.zoom({position: 'topright'}).addTo(map);

const listEl = document.getElementById('list');
const countEl = document.getElementById('count');
const chipsEl = document.getElementById('chips');
const qEl = document.getElementById('q');
const markers = {};
let activeCat = '';
let query = '';

// stan widoku admina miasta
const favs = new Set([12]); // TODO(backend): ulubione zalogowanego użytkownika
let origin = null;          // {name, lat, lon}
let radiusKm = 50;
let rangeLayer = null;
let renderManageList = () => {}; // podmieniane w trybie admina miasta

function el(tag, cls, text) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
}

function svgIcon(paths, viewBox = '0 0 24 24', width = 1.7) {
    const ns = 'http://www.w3.org/2000/svg';
    const s = document.createElementNS(ns, 'svg');
    s.setAttribute('viewBox', viewBox);
    s.setAttribute('fill', 'none');
    s.setAttribute('stroke-width', width);
    s.setAttribute('stroke-linecap', 'round');
    s.setAttribute('stroke-linejoin', 'round');
    paths.forEach(d => {
        const p = document.createElementNS(ns, 'path');
        p.setAttribute('d', d);
        s.append(p);
    });
    return s;
}

function plural(n, one, few, many) {
    if (n === 1) return one;
    const d = n % 10, t = n % 100;
    return d >= 2 && d <= 4 && (t < 12 || t > 14) ? few : many;
}

function distKm(p) {
    return map.distance([origin.lat, origin.lon], [p.lat, p.lon]) / 1000;
}

function focusPlace(p) {
    map.flyTo([p.lat, p.lon], 12);
    if (markers[p.id] && map.hasLayer(markers[p.id])) markers[p.id].openPopup();
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
    if (caMode) {
        const fav = el('button', 'fav');
        const sync = () => {
            fav.classList.toggle('on', favs.has(p.id));
            fav.textContent = favs.has(p.id) ? '♥ W ulubionych' : '♡ Dodaj do ulubionych';
        };
        fav.type = 'button';
        fav.onclick = () => {
            favs.has(p.id) ? favs.delete(p.id) : favs.add(p.id);
            sync();
            renderFavs();
        };
        sync();
        box.append(fav);
    }
    return m.bindPopup(box);
}

function dropMarker(id) {
    if (!markers[id]) return;
    map.removeLayer(markers[id]);
    delete markers[id];
}

function matches(p) {
    const t = (p.name + ' ' + p.city + ' ' + p.region + ' ' + p.cat + ' ' + p.desc).toLowerCase();
    const inRange = !caMode || !origin || distKm(p) <= radiusKm;
    return inRange && (!activeCat || p.cat === activeCat) && t.includes(query.toLowerCase());
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

    if (caMode) {
        countEl.textContent = shown.length + ' ' + plural(shown.length, 'miejsce', 'miejsca', 'miejsc') +
            ' w promieniu ' + radiusKm + ' km';
        renderPopular(shown);
        renderFavs();
        renderManageList();
    } else {
        countEl.textContent = shown.length + ' z ' + places.length + ' miejsc w Polsce';
    }
}

function setCat(c) {
    activeCat = c;
    chipsEl.querySelectorAll('.chip').forEach(b => b.classList.toggle('on', b.dataset.cat === c));
    render();
}

function addChip(label, cat) {
    const b = el('button', 'chip' + (cat === '' ? ' on' : ''));
    b.type = 'button';
    b.dataset.cat = cat;
    if (caMode && cat) {
        const dot = el('i');
        dot.style.background = CATS[cat];
        b.append(dot);
    }
    b.append(label);
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

// ===== widok admina miasta =====

function miniCard(p) {
    const card = el('button', 'mini-card');
    card.type = 'button';
    const ill = el('span', 'ill');
    ill.append(svgIcon([ILL[CAT_ILL[p.cat] || 'castle']], '0 0 220 140', 3));
    const body = el('span', 'body');
    body.append(el('b', '', p.name), el('small', '', p.city));
    card.append(ill, body);
    card.onclick = () => focusPlace(p);
    return card;
}

function renderPopular(shown) {
    const rail = document.getElementById('popular');
    const top = [...shown].sort((a, b) => (b.pop || 0) - (a.pop || 0)).slice(0, 8);
    rail.replaceChildren(...top.map(miniCard));
    if (!top.length) rail.append(el('p', 'rail-empty', 'Brak miejsc w tym promieniu.'));
}

function renderFavs() {
    const rail = document.getElementById('favs');
    const list = places.filter(p => favs.has(p.id));
    document.getElementById('favCount').textContent =
        list.length + ' ' + plural(list.length, 'miejsce', 'miejsca', 'miejsc');
    rail.replaceChildren(...list.map(miniCard));
    if (!list.length) rail.append(el('p', 'rail-empty', 'Nie masz jeszcze ulubionych miejsc.'));
}

function setOrigin(o) {
    origin = o;
    document.getElementById('locName').textContent = o.name;
    drawRange();
    render();
    map.flyToBounds(rangeLayer.getBounds(), {padding: [30, 30], duration: .8});
}

function drawRange() {
    if (rangeLayer) map.removeLayer(rangeLayer);
    rangeLayer = L.featureGroup([
        L.circle([origin.lat, origin.lon], {
            radius: radiusKm * 1000,
            color: '#4A7BD0',
            weight: 1.5,
            dashArray: '6 6',
            fillColor: '#4A7BD0',
            fillOpacity: .04,
            interactive: false
        }),
        L.circleMarker([origin.lat, origin.lon], {
            radius: 7,
            color: '#ffffff',
            weight: 3,
            fillColor: '#4A7BD0',
            fillOpacity: 1,
            interactive: false
        })
    ]).addTo(map);
}

if (caMode) {
    const managed = JSON.parse(caEl.dataset.cities || '[]');
    const legend = document.getElementById('legend');
    Object.entries(CATS).forEach(([c, color]) => {
        const s = el('span');
        const dot = el('i');
        dot.style.background = color;
        s.append(dot, c);
        legend.append(s);
    });

    // lokalizacja i promień
    const citySel = document.getElementById('citySel');
    Object.keys(CITIES).forEach(c => citySel.append(new Option(c, c)));
    const fromCity = name => ({name, lat: CITIES[name].lat, lon: CITIES[name].lon});
    citySel.onchange = () => setOrigin(fromCity(citySel.value));

    document.querySelectorAll('#radius button').forEach(b => b.onclick = () => {
        radiusKm = Number(b.dataset.km);
        document.querySelectorAll('#radius button').forEach(x => x.classList.toggle('on', x === b));
        setOrigin(origin);
    });

    const myLoc = document.getElementById('myLoc');
    myLoc.onclick = () => {
        if (!navigator.geolocation) {
            document.getElementById('locName').textContent = 'Lokalizacja niedostępna';
            return;
        }
        myLoc.disabled = true;
        navigator.geolocation.getCurrentPosition(pos => {
            myLoc.disabled = false;
            setOrigin({name: 'Twoja lokalizacja', lat: pos.coords.latitude, lon: pos.coords.longitude});
        }, () => {
            myLoc.disabled = false;
            document.getElementById('locName').textContent = 'Brak dostępu do lokalizacji';
        }, {timeout: 10000});
    };

    // zarządzanie miejscami w mieście admina
    const caForm = document.getElementById('caForm');
    const addBtn = document.getElementById('addPlace');
    const submitBtn = document.getElementById('caSubmit');
    const caMsg = document.getElementById('caMsg');
    const manageList = document.getElementById('manageList');
    const f = caForm.elements;
    let editingId = null;
    let picking = false;

    Object.keys(CATS).forEach(c => f.cat.append(new Option(c, c)));
    managed.forEach(c => f.city.append(new Option(c, c)));
    const syncRegion = () => f.region.value = (CITIES[f.city.value] || {}).region || '';
    f.city.onchange = syncRegion;
    addBtn.disabled = managed.length === 0;

    function openForm(p) {
        editingId = p ? p.id : null;
        caForm.reset();
        caMsg.textContent = '';
        if (p) {
            f.pname.value = p.name;
            f.cat.value = p.cat;
            f.city.value = p.city;
            f.desc.value = p.desc;
            f.lat.value = p.lat.toFixed(4);
            f.lon.value = p.lon.toFixed(4);
        }
        syncRegion();
        submitBtn.textContent = p ? 'Zapisz' : 'Dodaj';
        caForm.hidden = false;
        addBtn.hidden = true;
        renderManageList();
        f.pname.focus();
    }

    function closeForm() {
        editingId = null;
        picking = false;
        map.getContainer().style.cursor = '';
        caForm.hidden = true;
        addBtn.hidden = false;
        renderManageList();
    }

    addBtn.onclick = () => openForm(null);
    document.getElementById('caCancel').onclick = closeForm;

    document.getElementById('caPick').onclick = () => {
        picking = true;
        map.getContainer().style.cursor = 'crosshair';
        caMsg.textContent = 'Kliknij na mapie, aby wskazać lokalizację.';
    };
    map.on('click', e => {
        if (!picking) return;
        picking = false;
        map.getContainer().style.cursor = '';
        f.lat.value = e.latlng.lat.toFixed(4);
        f.lon.value = e.latlng.lng.toFixed(4);
        caMsg.textContent = '';
    });

    caForm.onsubmit = e => {
        e.preventDefault();
        const lat = parseFloat(f.lat.value.replace(',', '.'));
        const lon = parseFloat(f.lon.value.replace(',', '.'));
        if (!f.pname.value.trim()) {
            caMsg.textContent = 'Podaj nazwę miejsca.';
            return;
        }
        if (!managed.includes(f.city.value)) {
            caMsg.textContent = 'Możesz dodawać miejsca tylko w swoim mieście.';
            return;
        }
        if (Number.isNaN(lat) || Number.isNaN(lon) || Math.abs(lat) > 90 || Math.abs(lon) > 180) {
            caMsg.textContent = 'Podaj poprawną szerokość i długość.';
            return;
        }
        const data = {
            name: f.pname.value.trim(),
            cat: f.cat.value,
            city: f.city.value,
            region: f.region.value || '-',
            lat: lat,
            lon: lon,
            desc: f.desc.value.trim()
        };
        // TODO(backend): zapis przez API
        if (editingId !== null) {
            Object.assign(places.find(p => p.id === editingId), data);
            dropMarker(editingId);
        } else {
            places.push({id: Date.now(), pop: 0, ...data});
        }
        closeForm();
        render();
        map.flyTo([lat, lon], 12);
    };

    renderManageList = function () {
        const mine = places.filter(p => managed.includes(p.city));
        manageList.replaceChildren();
        if (!mine.length) {
            manageList.append(el('li', 'manage-empty', 'Brak miejsc w Twoim mieście. Dodaj pierwsze.'));
            return;
        }
        mine.forEach(p => {
            const li = el('li', p.id === editingId ? 'editing' : '');
            const dot = el('span', 'dot');
            dot.style.background = CATS[p.cat];
            const info = el('div', 'info');
            info.append(el('b', '', p.name), el('small', '', p.city + ' · ' + p.region));
            info.onclick = () => focusPlace(p);

            const edit = el('button', 'icon-btn');
            edit.type = 'button';
            edit.title = 'Edytuj';
            edit.append(svgIcon(['M4 20h4L19 9l-4-4L4 16v4Z', 'm13.5 6.5 4 4']));
            edit.onclick = () => openForm(p);

            const del = el('button', 'icon-btn');
            del.type = 'button';
            del.title = 'Usuń';
            del.append(svgIcon(['M4 7h16', 'M10 11v6M14 11v6', 'M6 7l1 13h10l1-13', 'M9 7V4h6v3']));
            del.onclick = () => {
                // pierwsze kliknięcie pyta, drugie usuwa (bez okna confirm)
                if (!del.classList.contains('confirm')) {
                    del.classList.add('confirm');
                    del.title = 'Kliknij ponownie, aby usunąć';
                    setTimeout(() => {
                        del.classList.remove('confirm');
                        del.title = 'Usuń';
                    }, 3000);
                    return;
                }
                // TODO(backend): usuwanie przez API
                places.splice(places.indexOf(p), 1);
                favs.delete(p.id);
                dropMarker(p.id);
                if (editingId === p.id) closeForm();
                render();
            };
            li.append(dot, info, edit, del);
            manageList.append(li);
        });
    };

    const start = CITIES[managed[0]] ? managed[0] : Object.keys(CITIES)[0];
    citySel.value = start;
    setOrigin(fromCity(start));
} else {
    render();
}
