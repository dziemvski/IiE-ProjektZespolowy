// Widok mapy dla admina miasta (ładowany po map.js, tylko dla roli CityAdmin).
// Korzysta ze wspólnej mapy przez window.MapApp i jej punkty zaczepienia (hooks).
(() => {
    const caEl = document.getElementById('cityAdmin');
    if (!caEl || !window.MapApp) return;

    const {map, places, CATS, markers, hooks, el, render, dropMarker} = window.MapApp;

    // jeden admin = jedno miasto (ApplicationUser.ManagedCityId)
    const managedCity = caEl.dataset.city || null;

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

    const favs = new Set([12]); // TODO(backend): ulubione zalogowanego użytkownika
    let origin = null;          // {name, lat, lon}
    let radiusKm = 50;
    let rangeLayer = null;
    let editingId = null;

    // ===== pomocnicze =====

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

    // ===== podpięcie pod wspólną mapę =====

    hooks.filter = p => !origin || distKm(p) <= radiusKm;
    hooks.count = shown => shown.length + ' ' + plural(shown.length, 'miejsce', 'miejsca', 'miejsc') +
        ' w promieniu ' + radiusKm + ' km';
    hooks.afterRender = shown => {
        renderPopular(shown);
        renderFavs();
        renderManageList();
    };
    hooks.popup = (p, box) => {
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
    };

    map.zoomControl.setPosition('topright');

    // kolorowe kropki na filtrach kategorii
    document.querySelectorAll('#chips .chip').forEach(b => {
        if (!b.dataset.cat) return;
        const dot = el('i');
        dot.style.background = CATS[b.dataset.cat];
        b.prepend(dot);
    });

    // legenda na mapie
    const legend = document.getElementById('legend');
    Object.entries(CATS).forEach(([c, color]) => {
        const s = el('span');
        const dot = el('i');
        dot.style.background = color;
        s.append(dot, c);
        legend.append(s);
    });

    // ===== najpopularniejsze i ulubione =====

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

    // ===== lokalizacja i promień =====

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

    // ===== zarządzanie miejscami w mieście admina =====

    const caForm = document.getElementById('caForm');
    const addBtn = document.getElementById('addPlace');
    const submitBtn = document.getElementById('caSubmit');
    const caMsg = document.getElementById('caMsg');
    const manageList = document.getElementById('manageList');
    const f = caForm.elements;
    let picking = false;

    Object.keys(CATS).forEach(c => f.cat.append(new Option(c, c)));
    addBtn.disabled = !managedCity;

    function openForm(p) {
        editingId = p ? p.id : null;
        caForm.reset();
        caMsg.textContent = '';
        // miasto i województwo są stałe - wynikają z miasta przypisanego adminowi
        f.city.value = managedCity;
        f.region.value = (CITIES[managedCity] || {}).region || '';
        if (p) {
            f.pname.value = p.name;
            f.cat.value = p.cat;
            f.desc.value = p.desc;
            f.lat.value = p.lat.toFixed(4);
            f.lon.value = p.lon.toFixed(4);
        }
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
        if (!managedCity) {
            caMsg.textContent = 'Nie masz przypisanego miasta.';
            return;
        }
        if (!f.pname.value.trim()) {
            caMsg.textContent = 'Podaj nazwę miejsca.';
            return;
        }
        if (Number.isNaN(lat) || Number.isNaN(lon) || Math.abs(lat) > 90 || Math.abs(lon) > 180) {
            caMsg.textContent = 'Podaj poprawną szerokość i długość.';
            return;
        }
        const data = {
            name: f.pname.value.trim(),
            cat: f.cat.value,
            city: managedCity,
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

    function renderManageList() {
        const mine = places.filter(p => p.city === managedCity);
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
    }

    // start: lokalizacja = miasto admina
    const start = CITIES[managedCity] ? managedCity : Object.keys(CITIES)[0];
    citySel.value = start;
    setOrigin(fromCity(start));
})();
