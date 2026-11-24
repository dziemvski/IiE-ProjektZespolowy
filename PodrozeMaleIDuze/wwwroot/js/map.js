const cfg = document.getElementById('mapConfig').dataset;
const LOGIN_URL = cfg.loginUrl;
const session = cfg.authenticated === 'true' ? { username: cfg.username } : null;
const role = cfg.role || 'Guest';                 // Admin | CityAdmin | User | Guest
const isAdmin = role === 'Admin';
const isCityAdmin = role === 'CityAdmin';
const myCities = isCityAdmin && cfg.city ? [cfg.city] : [];
const canEditPlaces = isAdmin || isCityAdmin;

const CATS = {
    'Zamki': { color: '#B89C9C', art: 'castle' },
    'Góry': { color: '#7C93A6', art: 'mountains' },
    'Natura': { color: '#8FA88A', art: 'trees' },
    'Woda': { color: '#6FA3A8', art: 'water' },
    'Miasta': { color: '#E0A96D', art: 'city' },
    'Muzea': { color: '#9B8AA8', art: 'museum' },
    'Zabytki': { color: '#C98B6B', art: 'arch' },
};
const REGIONS = ['dolnośląskie', 'kujawsko-pomorskie', 'lubelskie', 'lubuskie', 'łódzkie', 'małopolskie', 'mazowieckie', 'opolskie', 'podkarpackie', 'podlaskie', 'pomorskie', 'śląskie', 'świętokrzyskie', 'warmińsko-mazurskie', 'wielkopolskie', 'zachodniopomorskie'];

let places = [
    {
        id: 1, slug: 'zamek-w-malborku', name: 'Zamek w Malborku', category: 'Zamki', city: 'Malbork', region: 'pomorskie', lat: 54.0397, lon: 19.0280, pop: 98, tags: 'zamek krzyżacy gotyk unesco',
        desc: 'Największy ceglany zamek na świecie, dawna siedziba wielkich mistrzów zakonu krzyżackiego. Wpisany na listę UNESCO.'
    },
    {
        id: 2, slug: 'morskie-oko', name: 'Morskie Oko', category: 'Góry', city: 'Zakopane', region: 'małopolskie', lat: 49.2013, lon: 20.0710, pop: 99, tags: 'tatry jezioro szlak góry natura',
        desc: 'Największe jezioro w Tatrach, otoczone strzelistymi szczytami. Dojście asfaltową drogą z Palenicy Białczańskiej.'
    },
    {
        id: 3, slug: 'puszcza-bialowieska', name: 'Puszcza Białowieska', category: 'Natura', city: 'Białowieża', region: 'podlaskie', lat: 52.7036, lon: 23.8436, pop: 90, tags: 'las żubry park narodowy unesco',
        desc: 'Jeden z ostatnich lasów pierwotnych Europy i ostoja żubra. Wpisana na listę UNESCO.'
    },
    {
        id: 4, slug: 'wawel', name: 'Wzgórze Wawelskie', category: 'Zamki', city: 'Kraków', region: 'małopolskie', lat: 50.0540, lon: 19.9354, pop: 97, tags: 'zamek królewski katedra kraków',
        desc: 'Wzgórze z Zamkiem Królewskim i katedrą — przez wieki siedziba polskich królów.'
    },
    {
        id: 5, slug: 'kopalnia-wieliczka', name: 'Kopalnia Soli „Wieliczka”', category: 'Zabytki', city: 'Wieliczka', region: 'małopolskie', lat: 49.9833, lon: 20.0550, pop: 94, tags: 'kopalnia sól podziemia unesco',
        desc: 'Zabytkowa kopalnia soli z podziemnymi komorami, kaplicami i jeziorami. Lista UNESCO.'
    },
    {
        id: 6, slug: 'zamek-ksiaz', name: 'Zamek Książ', category: 'Zamki', city: 'Wałbrzych', region: 'dolnośląskie', lat: 50.8425, lon: 16.2919, pop: 86, tags: 'zamek podziemia ogrody',
        desc: 'Jeden z największych zamków w Polsce, z tarasami ogrodowymi i tajemniczymi podziemiami.'
    },
    {
        id: 7, slug: 'sniezka', name: 'Śnieżka', category: 'Góry', city: 'Karpacz', region: 'dolnośląskie', lat: 50.7360, lon: 15.7400, pop: 84, tags: 'karkonosze szczyt szlak góry',
        desc: 'Najwyższy szczyt Karkonoszy (1603 m) z charakterystycznym obserwatorium na wierzchołku.'
    },
    {
        id: 8, slug: 'wydmy-leba', name: 'Ruchome wydmy w Łebie', category: 'Natura', city: 'Łeba', region: 'pomorskie', lat: 54.7400, lon: 17.5300, pop: 82, tags: 'wydmy morze bałtyk park narodowy plaża',
        desc: 'Słowiński Park Narodowy: ruchome wydmy nad Bałtykiem — krajobraz jak z pustyni, tuż przy morzu.'
    },
    {
        id: 9, slug: 'gdansk-stare-miasto', name: 'Główne Miasto w Gdańsku', category: 'Miasta', city: 'Gdańsk', region: 'pomorskie', lat: 54.3489, lon: 18.6532, pop: 92, tags: 'starówka długi targ żuraw miasto',
        desc: 'Długi Targ, Żuraw i kamienice nad Motławą — morski charakter starego Gdańska.'
    },
    {
        id: 10, slug: 'rynek-wroclaw', name: 'Rynek we Wrocławiu', category: 'Miasta', city: 'Wrocław', region: 'dolnośląskie', lat: 51.1100, lon: 17.0320, pop: 91, tags: 'rynek ratusz krasnale miasto starówka',
        desc: 'Jeden z największych rynków w Europie, z gotyckim ratuszem i krasnalami na każdym kroku.'
    },
    {
        id: 11, slug: 'zamek-niedzica', name: 'Zamek w Niedzicy', category: 'Zamki', city: 'Niedzica', region: 'małopolskie', lat: 49.4228, lon: 20.3194, pop: 74, tags: 'zamek pieniny jezioro',
        desc: 'Zamek na skale nad Jeziorem Czorsztyńskim, z widokiem na Pieniny.'
    },
    {
        id: 12, slug: 'mikolajki', name: 'Mikołajki i Śniardwy', category: 'Woda', city: 'Mikołajki', region: 'warmińsko-mazurskie', lat: 53.8030, lon: 21.5710, pop: 85, tags: 'mazury jeziora żagle woda natura',
        desc: 'Serce Wielkich Jezior Mazurskich — żagle, pomosty i szlaki wodne.'
    },
    {
        id: 13, slug: 'biebrza', name: 'Biebrzański Park Narodowy', category: 'Natura', city: 'Goniądz', region: 'podlaskie', lat: 53.4500, lon: 22.6000, pop: 70, tags: 'bagna ptaki park narodowy rzeka',
        desc: 'Największy park narodowy w Polsce: rozległe bagna i raj dla obserwatorów ptaków.'
    },
    {
        id: 14, slug: 'kazimierz-dolny', name: 'Kazimierz Dolny', category: 'Miasta', city: 'Kazimierz Dolny', region: 'lubelskie', lat: 51.3220, lon: 21.9480, pop: 80, tags: 'miasteczko wisła wąwozy rynek',
        desc: 'Miasteczko nad Wisłą z renesansowym rynkiem, wąwozami lessowymi i galeriami.'
    },
    {
        id: 15, slug: 'muzeum-powstania', name: 'Muzeum Powstania Warszawskiego', category: 'Muzea', city: 'Warszawa', region: 'mazowieckie', lat: 52.2322, lon: 20.9811, pop: 88, tags: 'muzeum historia warszawa',
        desc: 'Interaktywne muzeum opowiadające historię powstania z 1944 roku.'
    },
    {
        id: 16, slug: 'tarnica', name: 'Tarnica', category: 'Góry', city: 'Wołosate', region: 'podkarpackie', lat: 49.0750, lon: 22.7270, pop: 78, tags: 'bieszczady połoniny szczyt szlak góry',
        desc: 'Najwyższy szczyt polskich Bieszczadów (1346 m), z panoramą połonin.'
    },
    {
        id: 17, slug: 'zamek-ogrodzieniec', name: 'Zamek Ogrodzieniec', category: 'Zamki', city: 'Podzamcze', region: 'śląskie', lat: 50.4530, lon: 19.5280, pop: 76, tags: 'ruiny zamek jura orle gniazda',
        desc: 'Ruiny zamku na Szlaku Orlich Gniazd, wśród wapiennych skał Jury.'
    },
    {
        id: 18, slug: 'palac-branickich', name: 'Pałac Branickich', category: 'Zabytki', city: 'Białystok', region: 'podlaskie', lat: 53.1306, lon: 23.1650, pop: 72, tags: 'pałac barok ogród białystok',
        desc: 'Barokowy pałac zwany Wersalem Podlasia, z ogrodem w stylu francuskim.'
    },
    {
        id: 19, slug: 'rynek-kosciuszki', name: 'Rynek Kościuszki i Ratusz', category: 'Miasta', city: 'Białystok', region: 'podlaskie', lat: 53.1316, lon: 23.1594, pop: 69, tags: 'rynek ratusz starówka miasto białystok',
        desc: 'Serce Białegostoku z odbudowanym ratuszem, w którym mieści się Muzeum Podlaskie.'
    },
    {
        id: 20, slug: 'muzeum-pamieci-sybiru', name: 'Muzeum Pamięci Sybiru', category: 'Muzea', city: 'Białystok', region: 'podlaskie', lat: 53.1268, lon: 23.1717, pop: 66, tags: 'muzeum historia białystok sybir',
        desc: 'Nowoczesne muzeum opowiadające o losach Polaków zesłanych na Syberię.'
    },
    {
        id: 21, slug: 'tykocin', name: 'Tykocin — zamek i synagoga', category: 'Zabytki', city: 'Tykocin', region: 'podlaskie', lat: 53.2054, lon: 22.7724, pop: 71, tags: 'zamek synagoga miasteczko narew',
        desc: 'Klimatyczne miasteczko nad Narwią z odbudowanym zamkiem i jedną z najpiękniejszych synagog w Polsce.'
    },
    {
        id: 22, slug: 'monaster-suprasl', name: 'Monaster w Supraślu', category: 'Zabytki', city: 'Supraśl', region: 'podlaskie', lat: 53.2148, lon: 23.3358, pop: 63, tags: 'klasztor cerkiew ikony muzeum',
        desc: 'Prawosławny monaster z Muzeum Ikon, otoczony lasami Puszczy Knyszyńskiej.'
    },
    {
        id: 23, slug: 'puszcza-knyszynska', name: 'Puszcza Knyszyńska', category: 'Natura', city: 'Supraśl', region: 'podlaskie', lat: 53.3000, lon: 23.4200, pop: 58, tags: 'las szlak rower natura puszcza',
        desc: 'Rozległy kompleks leśny z szlakami pieszymi i rowerowymi tuż za Białymstokiem.'
    },
    {
        id: 24, slug: 'meczet-kruszyniany', name: 'Meczet w Kruszynianach', category: 'Zabytki', city: 'Kruszyniany', region: 'podlaskie', lat: 53.1794, lon: 23.8022, pop: 60, tags: 'meczet tatarzy drewniany szlak tatarski',
        desc: 'Drewniany meczet polskich Tatarów — jeden z najstarszych w kraju, na Szlaku Tatarskim.'
    },
    {
        id: 25, slug: 'narwianski-park', name: 'Narwiański Park Narodowy', category: 'Natura', city: 'Kurowo', region: 'podlaskie', lat: 53.0697, lon: 22.7861, pop: 57, tags: 'rzeka bagna kładki park narodowy narew',
        desc: 'Polska Amazonia — labirynt koryt Narwi, który można przejść po pływających kładkach.'
    },
    {
        id: 26, slug: 'palac-choroszcz', name: 'Muzeum Wnętrz Pałacowych', category: 'Muzea', city: 'Choroszcz', region: 'podlaskie', lat: 53.1458, lon: 22.9839, pop: 52, tags: 'pałac muzeum wnętrza park',
        desc: 'Letnia rezydencja Branickich z zabytkowymi wnętrzami i parkiem.'
    },
    {
        id: 27, slug: 'kanal-augustowski', name: 'Kanał Augustowski — śluza Przewięź', category: 'Woda', city: 'Augustów', region: 'podlaskie', lat: 53.9537, lon: 23.0645, pop: 74, tags: 'kanał śluza kajaki jeziora woda',
        desc: 'Zabytkowa droga wodna z XIX wieku — rejsy, kajaki i działające śluzy.'
    },
    {
        id: 28, slug: 'klasztor-wigry', name: 'Pokamedulski klasztor w Wigrach', category: 'Zabytki', city: 'Wigry', region: 'podlaskie', lat: 54.0700, lon: 23.0650, pop: 68, tags: 'klasztor jezioro wigry kameduli',
        desc: 'Barokowy klasztor na półwyspie jeziora Wigry, z widokiem na Wigierski Park Narodowy.'
    },
    {
        id: 29, slug: 'zalew-siemianowka', name: 'Zalew Siemianówka', category: 'Woda', city: 'Siemianówka', region: 'podlaskie', lat: 52.9200, lon: 23.8200, pop: 45, tags: 'zalew ptaki jezioro woda',
        desc: 'Duży zbiornik na Narwi — miejsce obserwacji ptaków i wędkowania na skraju Puszczy Białowieskiej.'
    },
    {
        id: 30, slug: 'grabarka', name: 'Święta Góra Grabarka', category: 'Zabytki', city: 'Grabarka', region: 'podlaskie', lat: 52.5869, lon: 22.9306, pop: 55, tags: 'sanktuarium krzyże cerkiew pielgrzymka',
        desc: 'Najważniejsze sanktuarium prawosławne w Polsce, z tysiącami krzyży przyniesionych przez pielgrzymów.'
    },
    {
        id: 31, slug: 'drohiczyn', name: 'Drohiczyn nad Bugiem', category: 'Miasta', city: 'Drohiczyn', region: 'podlaskie', lat: 52.3967, lon: 22.6597, pop: 48, tags: 'miasteczko bug skarpa widok',
        desc: 'Dawna stolica Podlasia na wysokiej skarpie z pięknym widokiem na dolinę Bugu.'
    },
];

const LOCATIONS = {
    'Białystok': [53.1325, 23.1688], 'Warszawa': [52.2297, 21.0122], 'Kraków': [50.0647, 19.9450], 'Gdańsk': [54.3520, 18.6466],
    'Wrocław': [51.1079, 17.0385], 'Poznań': [52.4064, 16.9252], 'Łódź': [51.7592, 19.4560], 'Zakopane': [49.2992, 19.9496],
};

const $ = s => document.querySelector(s);
const norm = s => (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ł/g, 'l');
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const store = {
    get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { } },
};

const FAV_KEY = 'pmid-fav-' + (session?.username || 'gosc');
let favs = new Set(store.get(FAV_KEY, []));
const saveFavs = () => store.set(FAV_KEY, [...favs]);

/* odległość w km (wzór haversine) */
function distKm(a, b) {
    const R = 6371, r = Math.PI / 180, dLat = (b[0] - a[0]) * r, dLon = (b[1] - a[1]) * r;
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(a[0] * r) * Math.cos(b[0] * r) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(h));
}
/* punkt w wielokącie (granice miast i województw) */
function inRing(pt, ring) { let c = false; for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) { const [xi, yi] = ring[i], [xj, yj] = ring[j]; if ((yi > pt[1]) !== (yj > pt[1]) && pt[0] < (xj - xi) * (pt[1] - yi) / (yj - yi) + xi) c = !c; } return c; }
function inFeature(pt, f) {
    const polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
    return polys.some(p => inRing(pt, p[0]) && !p.slice(1).some(h => inRing(pt, h)));
}
const cityAt = (lon, lat) => GEO.cities.features.find(f => inFeature([lon, lat], f))?.properties.name || null;
const regionAt = (lon, lat) => GEO.woj.features.find(f => inFeature([lon, lat], f))?.properties.name || null;

function toast(html) {
    const t = $('#toast'); t.innerHTML = html; t.classList.add('show');
    clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('show'), 2600);
}

const ART = {
    castle: '<path d="M10 110H190M30 110V50h20v60M30 50v-8h5v6h5v-6h5v6h5v-8M150 110V50h20v60M150 50v-8h5v6h5v-6h5v6h5v-8M50 110V70h100v40M88 70V30h24v40M88 30l12-18 12 18M92 110V92a8 8 0 0 1 16 0v18"/>',
    mountains: '<path d="M5 100 55 30l25 28 32-44 38 48 20-18 25 56M30 106c30-8 110-8 140 0"/>',
    trees: '<path d="M10 110h180M45 110V80M45 20 25 55h10L18 80h54L55 55h10ZM100 110V86M100 34 84 62h8L78 86h44l-14-24h8ZM152 110V78M152 14l-22 36h11l-19 28h60l-19-28h11Z"/>',
    water: '<path d="M10 96c20-8 30 8 50 0s30 8 50 0 30 8 50 0 20 8 30 0M10 110c20-8 30 8 50 0s30 8 50 0 30 8 50 0 20 8 30 0M100 86V20l40 56H100M100 30 72 76h28"/>',
    city: '<path d="M10 110h180M24 110V60h30v50M54 110V40l20-16 20 16v70M94 110V70h28v40M122 110V50h20l10-14 10 14h12v60M34 72h10M34 88h10M66 56h16M66 74h16M66 92h16M132 66h12M132 84h12"/>',
    museum: '<path d="M20 110h160M30 100h140M36 50h128L100 18ZM48 58v40M76 58v40M104 58v40M132 58v40M152 58v40"/>',
    arch: '<path d="M10 110h180M40 110V50a60 60 0 0 1 120 0v60M64 110V58a36 36 0 0 1 72 0v52M100 8v14M93 15h14"/>',
};
const photoCache = new Map();
function photo(p, i, w = 800, h = 520) {
    const key = p.id + '-' + i + '-' + w;
    if (photoCache.has(key)) return photoCache.get(key);
    const c = CATS[p.category]?.color || '#B89C9C';
    const tints = [['#FFFFFF', .55], ['#F7F5F0', .35], ['#FFFFFF', .15], ['#1C2321', .08], ['#F8B97A', .3], ['#FFFFFF', .7]];
    const [tc, ta] = tints[i % tints.length];
    const sc = [1.6, 2.2, 1.3, 2.6, 1.9, 1.5][i % 6], ox = [0, -60, 40, -120, -30, 60][i % 6];
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c}"/><stop offset="1" stop-color="${c}" stop-opacity=".7"/></linearGradient></defs>
    <rect width="100%" height="100%" fill="url(#g)"/><rect width="100%" height="100%" fill="${tc}" opacity="${ta}"/>
    <g transform="translate(${w / 2 - 100 * sc + ox} ${h - 125 * sc}) scale(${sc})" fill="none" stroke="#fff" stroke-opacity=".85" stroke-width="${1.6 / sc * 1.4}" stroke-linecap="round" stroke-linejoin="round">${ART[CATS[p.category]?.art || 'arch']}</g>
    <text x="24" y="${h - 22}" font-family="sans-serif" font-size="14" fill="#fff" fill-opacity=".8">zdjęcie ${i + 1}/6 · ${esc(p.name)}</text></svg>`;
    const url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    photoCache.set(key, url); return url;
}
const gmaps = p => `https://www.google.com/maps/search/?api=1&query=${p.lat},${p.lon}`;

const C = { sea: '#E4ECEB', peach: '#F8B97A', rose: '#B89C9C' };
const PL_BOUNDS = [[49.0, 14.07], [54.84, 24.15]];            // [[lat, lon], [lat, lon]]
const ZOOM_NAMES = [[0, 'Cała Polska'], [7, 'Województwa i miasta'], [9, 'Lasy i drogi'], [12.5, 'Ulice i wsie'], [14, 'Budynki']];

const clamp01 = t => Math.min(1, Math.max(0, t));
const lerp = (z, z0, z1, v0, v1) => v0 + (v1 - v0) * clamp01((z - z0) / (z1 - z0));
// progi poniżej liczone są "po makietowemu": zoom Leaflet minus 1
const mz = () => map.getZoom() - 1;

const map = L.map('map', {
    zoomControl: false,                 // własne przyciski .zoom w widoku
    zoomSnap: 0.25,
    minZoom: 5.5,
    maxZoom: 18,
    maxBounds: [[44, 2], [60, 36]],
    maxBoundsViscosity: 1
});
map.attributionControl.addAttribution('Dane: Natural Earth, polska-geojson');

map.createPane('basePane').style.zIndex = 150;                 // pod kafelkami
map.createPane('labelPane').style.zIndex = 450;                // nad liniami, pod pinezkami
map.getPane('labelPane').style.pointerEvents = 'none';

const geo = (data, opts) => L.geoJSON(data, { interactive: false, ...opts }).addTo(map);
const onlyPoland = f => f.properties.pl === 1;

geo(GEO.land, { pane: 'basePane', style: f => ({ stroke: false, fillColor: f.properties.pl === 1 ? '#FFFDF9' : '#EEEBE4', fillOpacity: 1 }) });

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: 9, maxZoom: 19, opacity: 0,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const grat = geo(GEO.grat, { style: { color: C.peach, weight: 0.7, opacity: 0.45 } });
const mask = geo(GEO.mask, { style: { stroke: false, fillColor: '#F2EFE9', fillOpacity: 0.55 } });
const cities = geo(GEO.cities, { style: { color: C.rose, weight: 0.6, dashArray: '4 3', opacity: 0, fillColor: C.peach, fillOpacity: 0 } });
const woj = geo(GEO.woj, { style: { color: C.peach, weight: 0.8, opacity: 0.85, fill: false } });
geo(GEO.land, { filter: onlyPoland, style: { color: C.peach, weight: 8, opacity: 0.25, fill: false, lineJoin: 'round' } });
const plLine = geo(GEO.land, { filter: onlyPoland, style: { color: C.peach, weight: 1.8, opacity: 1, fill: false, lineJoin: 'round' } });

GEO.wojLabels.features.forEach(f => {
    L.marker([f.geometry.coordinates[1], f.geometry.coordinates[0]], {
        pane: 'labelPane', interactive: false, keyboard: false,
        icon: L.divIcon({ className: 'woj-label', html: '<span>' + esc(f.properties.name) + '</span>', iconSize: [0, 0] })
    }).addTo(map);
});

/* przezroczystość i grubość warstw zależą od przybliżenia */
function updateLayers() {
    const z = mz();
    grat.setStyle({ opacity: lerp(z, 5, 7.5, 0.45, 0) });
    mask.setStyle({ fillOpacity: lerp(z, 5, 10, 0.55, 0.35) });
    cities.setStyle({
        opacity: lerp(z, 6.5, 8, 0, 0.9),
        weight: lerp(z, 7, 12, 0.6, 1.6),
        fillOpacity: z < 8.5 ? lerp(z, 7, 8.5, 0, 0.1) : lerp(z, 8.5, 12, 0.1, 0.04)
    });
    woj.setStyle({ weight: lerp(z, 5, 10, 0.8, 2) });
    plLine.setStyle({ weight: lerp(z, 5, 10, 1.8, 3) });
    map.getPane('labelPane').style.opacity = lerp(z, 7.5, 8.5, 1, 0);
    tiles.setOpacity(lerp(z, 8, 10, 0, 0.85));
    $('#zoomLevel').textContent = ZOOM_NAMES.filter(([m]) => z >= m).pop()[1];
}
map.on('zoomend', updateLayers);
map.fitBounds(PL_BOUNDS, { paddingTopLeft: [40, 80], paddingBottomRight: [40, 70], animate: false });
updateLayers();

/*  lokalizacja użytkownika i promień  */
let userLoc = { name: 'Białystok', lat: LOCATIONS['Białystok'][0], lon: LOCATIONS['Białystok'][1] };
let radiusKm = 50;
const inRadius = p => distKm([userLoc.lat, userLoc.lon], [p.lat, p.lon]) <= radiusKm;
const kmTo = p => Math.round(distKm([userLoc.lat, userLoc.lon], [p.lat, p.lon]));

const radiusCircle = L.circle([userLoc.lat, userLoc.lon], {
    radius: radiusKm * 1000, interactive: false,
    color: '#4A7BD0', weight: 1.5, opacity: 0.7, dashArray: '3 2', fillColor: '#4A7BD0', fillOpacity: 0.05
}).addTo(map);
const meMarker = L.marker([userLoc.lat, userLoc.lon], {
    title: 'Twoja lokalizacja', interactive: false, keyboard: false,
    icon: L.divIcon({ className: 'me', iconSize: [18, 18] })
}).addTo(map);

function fitArea(duration = 900) {
    map.fitBounds(radiusCircle.getBounds(), {
        paddingTopLeft: [40, 70], paddingBottomRight: [40, 60], animate: duration > 0, duration: duration / 1000
    });
}
function updateArea(fly = true) {
    radiusCircle.setLatLng([userLoc.lat, userLoc.lon]).setRadius(radiusKm * 1000);
    meMarker.setLatLng([userLoc.lat, userLoc.lon]);
    $('#locName').textContent = userLoc.name;
    $('#radiusSeg').querySelectorAll('button').forEach(b => b.classList.toggle('on', +b.dataset.r === radiusKm));
    if (fly) fitArea();
    applyFilter(false); renderPopular();
}
$('#locSel').innerHTML = Object.keys(LOCATIONS).map(n => `<option>${n}</option>`).join('');
$('#locSel').onchange = e => { const n = e.target.value; userLoc = { name: n, lat: LOCATIONS[n][0], lon: LOCATIONS[n][1] }; closeSheet(); updateArea(); };
$('#radiusSeg').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; radiusKm = +b.dataset.r; updateArea(); });
$('#geoBtn').onclick = () => {
    if (!navigator.geolocation) return toast('Przeglądarka nie udostępnia lokalizacji');
    toast('Pobieram lokalizację…');
    navigator.geolocation.getCurrentPosition(pos => {
        const { latitude: lat, longitude: lon } = pos.coords;
        userLoc = { name: cityAt(lon, lat) || 'Twoja lokalizacja', lat, lon }; updateArea(); toast('Ustawiono Twoją lokalizację');
    }, () => toast('Nie udało się pobrać lokalizacji — wybierz miasto z listy'), { timeout: 8000 });
};
const PIN = 'M12 0C5.4 0 0 5.3 0 11.9 0 20.6 12 34 12 34s12-13.4 12-22.1C24 5.3 18.6 0 12 0Z';
const markers = new Map();
let activeId = null, firstDrop = true;

function pinIcon(color, extraClass = '') {
    return L.divIcon({
        className: ('pin ' + extraClass).trim(), iconSize: [24, 34], iconAnchor: [12, 34],
        html: `<svg viewBox="0 0 24 34"><path class="shape" d="${PIN}" fill="${color}"/><circle cx="12" cy="11.5" r="4.4" fill="#fff"/></svg>`
    });
}
function renderPins() {
    for (const [id, m] of markers) if (!places.some(p => p.id === id)) { m.remove(); markers.delete(id); }
    places.slice().sort((a, b) => b.lat - a.lat).forEach((p, i) => {
        let m = markers.get(p.id);
        if (!m) {
            m = L.marker([p.lat, p.lon], { icon: pinIcon(CATS[p.category]?.color, firstDrop ? 'drop' : ''), title: p.name, keyboard: false }).addTo(map);
            if (firstDrop) m.getElement().querySelector('svg').style.animationDelay = (0.5 + i * 0.04) + 's';
            m.on('click', () => { if (!picking) select(p.id); });
            markers.set(p.id, m);
        } else {
            m.setLatLng([p.lat, p.lon]);
            m.getElement().querySelector('.shape').setAttribute('fill', CATS[p.category]?.color);
            m.getElement().title = p.name;
        }
    });
    firstDrop = false;
    applyFilter(false); markActive();
}
function markActive() {
    for (const [id, m] of markers) {
        const el = m.getElement(), p = places.find(x => x.id === id);
        el.classList.toggle('active', id === activeId);
        el.classList.toggle('out', !(p && inRadius(p)) && id !== activeId);
    }
}

function flyTo(p) {
    const sheetH = $('#sheet').offsetHeight;
    const zoom = Math.max(map.getZoom(), 11.5);
    // środek mapy przesuwamy w dół, żeby pinezka była nad kartą miejsca
    const target = map.project([p.lat, p.lon], zoom).add([0, sheetH / 2]);
    map.flyTo(map.unproject(target, zoom), zoom, { duration: 1.1 });
}
$('#zIn').onclick = () => map.zoomIn();
$('#zOut').onclick = () => map.zoomOut();
$('#zReset').onclick = () => { closeSheet(); fitArea(); };

/* =====================================================================
   KARTA MIEJSCA
   ===================================================================== */
const ICON = {
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.7" stroke-linejoin="round"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"/></svg>',
    grid: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.6"><rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/></svg>',
    ext: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>',
    edit: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4L19 9l-4-4L4 16v4ZM13.5 6.5l4 4"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 7h14M10 7V5h4v2M7 7l1 13h8l1-13"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>',
};
const canManage = p => isAdmin || (isCityAdmin && myCities.includes(p.city));

function select(id) {
    const p = places.find(x => x.id === id); if (!p) return;
    activeId = id; markActive();
    const sheet = $('#sheet');
    const fill = () => {
        $('#sheetPhotos').innerHTML = [0, 1, 2].map(i =>
            `<button data-i="${i}" aria-label="Zdjęcie ${i + 1}"><img src="${photo(p, i, i ? 400 : 800, i ? 300 : 560)}" alt="${esc(p.name)} — zdjęcie ${i + 1}">${i === 2 ? '<span class="more">+3</span>' : ''}</button>`).join('');
        const c = CATS[p.category]?.color;
        $('#sheetInfo').innerHTML = `
      <div class="top"><span class="tag"><i style="background:${c}"></i>${esc(p.category)}</span><span>${p.lat.toFixed(4)}, ${p.lon.toFixed(4)}</span></div>
      <h2>${esc(p.name)}</h2>
      <p class="where">${esc(p.city)} · ${esc(p.region)} · ${kmTo(p)} km od: ${esc(userLoc.name)}</p>
      <p class="desc">${esc(p.desc)}</p>
      <div class="actions">
        <button class="btn dark" id="aGallery">${ICON.grid}Pełna galeria</button>
        <a class="btn" href="${gmaps(p)}" target="_blank" rel="noopener">${ICON.ext}Google Maps</a>
        <button class="btn fav ${favs.has(p.id) ? 'on' : ''}" id="aFav">${ICON.heart}${favs.has(p.id) ? 'W ulubionych' : 'Do ulubionych'}</button>
        ${canManage(p) ? `<button class="btn" id="aEdit">${ICON.edit}Edytuj</button><button class="btn danger" id="aDel">${ICON.trash}Usuń</button>` : ''}
      </div>`;
        $('#sheetPhotos').querySelectorAll('button').forEach(b => b.onclick = () => openGallery(p, +b.dataset.i));
        $('#aGallery').onclick = () => openGallery(p, 0);
        $('#aFav').onclick = () => toggleFav(p.id);
        if ($('#aEdit')) { $('#aEdit').onclick = () => openForm(p); armDelete($('#aDel'), p, 'Potwierdź usunięcie'); }
    };
    if (sheet.classList.contains('open')) {
        sheet.classList.remove('open');
        setTimeout(() => { fill(); sheet.classList.add('open'); }, 180);
    } else { fill(); requestAnimationFrame(() => sheet.classList.add('open')); }
    sheet.setAttribute('aria-hidden', 'false');
    flyTo(p);
    history.replaceState(null, '', '?miejsce=' + p.slug);
}
function closeSheet() {
    $('#sheet').classList.remove('open'); $('#sheet').setAttribute('aria-hidden', 'true');
    activeId = null; markActive(); history.replaceState(null, '', location.pathname);
}
$('#sheetClose').onclick = closeSheet;
map.on('click', e => { if (picking) return pickAt(e.latlng); closeSheet(); });

function toggleFav(id) {
    if (!session) return toast('Zaloguj się, żeby zapisywać ulubione · <a href="' + LOGIN_URL + '">Zaloguj</a>');
    favs.has(id) ? favs.delete(id) : favs.add(id); saveFavs(); renderFavs();
    const b = $('#aFav'); if (b && activeId === id) { const on = favs.has(id); b.classList.toggle('on', on); b.innerHTML = ICON.heart + (on ? 'W ulubionych' : 'Do ulubionych'); }
    toast(favs.has(id) ? 'Dodano do ulubionych' : 'Usunięto z ulubionych');
}

let gPlace, gIdx = 0;
function openGallery(p, i) {
    gPlace = p; $('#gTitle').textContent = p.name;
    $('#gThumbs').innerHTML = [0, 1, 2, 3, 4, 5].map(n => `<button data-n="${n}"><img src="${photo(p, n, 160, 110)}" alt=""></button>`).join('');
    $('#gThumbs').querySelectorAll('button').forEach(b => b.onclick = () => showG(+b.dataset.n));
    $('#gallery').classList.add('open'); $('#gallery').setAttribute('aria-hidden', 'false'); showG(i);
}
function showG(i) {
    gIdx = (i + 6) % 6; const img = $('#gImg'); img.classList.remove('in');
    setTimeout(() => { img.src = photo(gPlace, gIdx, 1200, 800); img.alt = `${gPlace.name} — zdjęcie ${gIdx + 1}`; requestAnimationFrame(() => img.classList.add('in')); }, 120);
    $('#gCount').textContent = `${gIdx + 1} / 6`;
    $('#gThumbs').querySelectorAll('button').forEach((b, n) => b.classList.toggle('on', n === gIdx));
}
const closeGallery = () => { $('#gallery').classList.remove('open'); $('#gallery').setAttribute('aria-hidden', 'true'); };
$('#gClose').onclick = closeGallery; $('#gPrev').onclick = () => showG(gIdx - 1); $('#gNext').onclick = () => showG(gIdx + 1);
document.addEventListener('keydown', e => {
    if ($('#gallery').classList.contains('open')) {
        if (e.key === 'Escape') closeGallery(); if (e.key === 'ArrowLeft') showG(gIdx - 1); if (e.key === 'ArrowRight') showG(gIdx + 1); return;
    }
    if (e.key === 'Escape') { if (picking) stopPick(); else closeSheet(); }
});

let activeCat = null;
const chipsEl = $('#chips');
chipsEl.innerHTML = `<button class="chip on" data-cat="">Wszystkie</button>` +
    Object.entries(CATS).map(([n, c]) => `<button class="chip" data-cat="${n}"><i style="background:${c.color}"></i>${n}</button>`).join('');
chipsEl.addEventListener('click', e => {
    const b = e.target.closest('.chip'); if (!b) return;
    activeCat = b.dataset.cat || null;
    chipsEl.querySelectorAll('.chip').forEach(c => c.classList.toggle('on', c === b));
    applyFilter(true);
});
$('#legend').innerHTML = Object.entries(CATS).map(([n, c]) => `<span><i style="background:${c.color}"></i>${n}</span>`).join('');

const qEl = $('#q');
qEl.addEventListener('input', () => { $('#qClear').classList.toggle('show', !!qEl.value); applyFilter(true); });
$('#qClear').onclick = () => { qEl.value = ''; $('#qClear').classList.remove('show'); applyFilter(true); qEl.focus(); };

function matches(p) {
    if (activeCat && p.category !== activeCat) return false;
    const q = norm(qEl.value).trim(); if (!q) return true;
    const hay = norm([p.name, p.city, p.region, p.category, p.tags].join(' '));
    return q.split(/\s+/).every(t => hay.includes(t) || (t.length > 4 && hay.includes(t.slice(0, -1))));
}
function plMiejsc(n) { const d = n % 10, t = n % 100; return n === 1 ? 'miejsce' : (d >= 2 && d <= 4 && (t < 12 || t > 14)) ? 'miejsca' : 'miejsc'; }
function applyFilter(animate) {
    const filtering = !!(activeCat || qEl.value.trim());
    const near = places.filter(inRadius);
    const hits = near.filter(matches);
    for (const [id, m] of markers) {
        const el = m.getElement(), hit = hits.some(p => p.id === id);
        const p = places.find(x => x.id === id);
        el.classList.toggle('out', !(p && inRadius(p)) && id !== activeId);   // poza promieniem — nie pokazujemy
        el.classList.toggle('dim', filtering && !hit);
        el.classList.toggle('match', !!(animate && filtering && hit));
    }
    if (animate) setTimeout(() => markers.forEach(m => m.getElement().classList.remove('match')), 520);

    $('#count').textContent = filtering ? `Znaleziono ${hits.length} z ${near.length} miejsc w promieniu ${radiusKm} km` : `${near.length} ${plMiejsc(near.length)} w promieniu ${radiusKm} km`;
    $('#results').classList.toggle('show', filtering);
    $('#resultList').innerHTML = hits.length
        ? hits.sort((a, b) => kmTo(a) - kmTo(b)).map(p => `<li class="row" data-id="${p.id}"><i style="background:${CATS[p.category].color}"></i><span class="grow"><b>${esc(p.name)}</b><small>${esc(p.city)} · ${esc(p.category)} · ${kmTo(p)} km</small></span></li>`).join('')
        : `<li class="empty">Nic nie znaleziono w promieniu ${radiusKm} km.${radiusKm < 50 ? ' Spróbuj 50 km.' : ''}</li>`;
    $('#resultList').querySelectorAll('.row').forEach(r => r.onclick = () => select(+r.dataset.id));
}
const mini = p => `<button class="mini" data-id="${p.id}"><img src="${photo(p, 0, 300, 172)}" alt=""><div><b>${esc(p.name)}</b><small>${esc(p.city)}</small></div></button>`;
function bindMini(el) { el.querySelectorAll('.mini').forEach(m => m.onclick = () => select(+m.dataset.id)); }
function renderPopular() {
    const el = $('#popular'), list = places.filter(inRadius).sort((a, b) => b.pop - a.pop).slice(0, 6);
    el.innerHTML = list.length ? list.map(mini).join('') : `<p class="empty">Brak miejsc w promieniu ${radiusKm} km.</p>`; bindMini(el);
}
function renderFavs() {
    const el = $('#favs');
    if (!session) { $('#favCount').textContent = ''; el.innerHTML = `<p class="empty"><a href="${LOGIN_URL}">Zaloguj się</a>, żeby zapisywać ulubione miejsca.</p>`; return; }
    const list = places.filter(p => favs.has(p.id));
    $('#favCount').textContent = list.length ? list.length + ' ' + plMiejsc(list.length) : '';
    el.innerHTML = list.length ? list.map(mini).join('') : `<p class="empty">Kliknij „Do ulubionych” przy miejscu, a pojawi się tutaj.</p>`;
    bindMini(el);
}

function renderWho() {
    document.body.classList.toggle('is-admin', canEditPlaces);
    $('#scopeNote').textContent = isAdmin ? 'wszystkie miejsca' : 'miasto: ' + (myCities.join(', ') || '—');
}
let editingId = null, picking = false, ghost = null;
$('#fCat').innerHTML = Object.keys(CATS).map(c => `<option>${c}</option>`).join('');
$('#fRegion').innerHTML = REGIONS.map(r => `<option>${r}</option>`).join('');

function renderManage() {
    if (!canEditPlaces) return;
    const list = places.filter(canManage).sort((a, b) => a.name.localeCompare(b.name, 'pl'));
    if (isCityAdmin && !myCities.length) { $('#addBtn').style.display = 'none'; $('#manageList').innerHTML = '<li class="empty">Nie masz przypisanego miasta. Poproś administratora w panelu admina.</li>'; return; }
    $('#manageList').innerHTML = list.length ? '' : '<li class="empty">Brak miejsc w Twoim mieście — dodaj pierwsze.</li>';
    if (list.length) $('#manageList').innerHTML = list.map(p => `
    <li class="row" data-id="${p.id}"><i style="background:${CATS[p.category].color}"></i>
      <span class="grow"><b>${esc(p.name)}</b><small>${esc(p.city)} · ${esc(p.region)}</small></span>
      <span class="tools"><button class="tool ed" title="Edytuj">${ICON.edit}</button><button class="tool del" title="Usuń">${ICON.trash}</button></span></li>`).join('');
    $('#manageList').querySelectorAll('.row').forEach(r => {
        const p = places.find(x => x.id === +r.dataset.id);
        r.querySelector('.grow').onclick = () => select(p.id);
        r.querySelector('.ed').onclick = () => openForm(p);
        armDelete(r.querySelector('.del'), p);
    });
}
function armDelete(btn, p, confirmText) {
    const orig = btn.innerHTML;
    btn.onclick = () => {
        if (!btn.classList.contains('confirm')) {
            btn.classList.add('confirm'); if (confirmText) btn.innerHTML = ICON.trash + confirmText; btn.title = 'Kliknij ponownie, aby usunąć';
            clearTimeout(btn._t); btn._t = setTimeout(() => { btn.classList.remove('confirm'); btn.innerHTML = orig; btn.title = 'Usuń'; }, 2600);
            return;
        }
        places = places.filter(x => x.id !== p.id); favs.delete(p.id); saveFavs();
        if (activeId === p.id) closeSheet();
        refreshAll(); toast(`Usunięto: ${esc(p.name)}`);
    };
}
function openForm(p) {
    const f = $('#placeForm'); editingId = p ? p.id : null; f.reset(); $('#formErr').textContent = '';
    setupCityField();
    if (p) { f.name.value = p.name; f.category.value = p.category; f.region.value = p.region; f.city.value = p.city; f.desc.value = p.desc; f.lat.value = p.lat; f.lon.value = p.lon; }
    else if (isCityAdmin) { f.city.value = myCities[0]; const c = LOCATIONS[myCities[0]] || cityCenter(myCities[0]); if (c) f.region.value = regionAt(c[1], c[0]) || f.region.value; }
    f.region.disabled = isCityAdmin;
    $('#saveBtn').textContent = p ? 'Zapisz zmiany' : 'Dodaj';
    $('#formWrap').classList.add('open'); $('#addBtn').style.display = 'none';
    setGhost(p ? [p.lon, p.lat] : null);
    $('#formWrap').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    setTimeout(() => f.name.focus(), 300);
}
/* admin miasta: zamiast wolnego tekstu lista jego miast */
function cityCenter(name) {
    const f = GEO.cities.features.find(x => x.properties.name === name); if (!f) return null;
    const ring = (f.geometry.type === 'Polygon' ? f.geometry.coordinates : f.geometry.coordinates[0])[0];
    const xs = ring.map(p => p[0]), ys = ring.map(p => p[1]);
    return [(Math.min(...ys) + Math.max(...ys)) / 2, (Math.min(...xs) + Math.max(...xs)) / 2];
}
function setupCityField() {
    const lab = $('#cityLabel'), old = lab.querySelector('[name=city]');
    if (isCityAdmin && old.tagName !== 'SELECT') {
        const sel = document.createElement('select'); sel.name = 'city';
        sel.innerHTML = myCities.map(c => `<option>${esc(c)}</option>`).join('');
        old.replaceWith(sel);
    }
}
function closeForm() { $('#formWrap').classList.remove('open'); $('#addBtn').style.display = ''; editingId = null; stopPick(); setGhost(null); }
$('#addBtn').onclick = () => openForm(null);
$('#cancelBtn').onclick = closeForm;
$('#placeForm').addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target, err = $('#formErr');
    const lat = parseFloat(String(f.lat.value).replace(',', '.')), lon = parseFloat(String(f.lon.value).replace(',', '.'));
    if (!f.name.value.trim()) return (err.textContent = 'Podaj nazwę miejsca.', f.name.focus());
    if (!f.city.value.trim()) return (err.textContent = 'Podaj miasto.', f.city.focus());
    if (!(lat >= 49 && lat <= 54.9 && lon >= 14.1 && lon <= 24.2)) return (err.textContent = 'Współrzędne muszą wskazywać miejsce w Polsce — użyj „Wskaż na mapie”.');
    const city = f.city.value.trim();
    if (isCityAdmin) {
        if (!myCities.includes(city)) return (err.textContent = 'Możesz dodawać miejsca tylko w swoim mieście.');
        const cf = GEO.cities.features.find(x => x.properties.name === city);
        if (cf && !inFeature([lon, lat], cf)) return (err.textContent = `To miejsce leży poza granicą miasta ${city}. Wskaż punkt w jego obrębie.`);
    }
    const data = { name: f.name.value.trim(), category: f.category.value, region: isCityAdmin ? (regionAt(lon, lat) || f.region.value) : f.region.value, city, desc: f.desc.value.trim() || 'Brak opisu.', lat, lon };
    if (editingId) { Object.assign(places.find(p => p.id === editingId), data); toast('Zapisano zmiany'); }
    else {
        const id = Math.max(0, ...places.map(p => p.id)) + 1;
        places.push({ id, slug: norm(data.name).replace(/[^a-z0-9]+/g, '-'), pop: 50, tags: '', ...data });
        editingId = id; toast('Dodano miejsce');
    }
    const id = editingId; closeForm(); refreshAll(); select(id);
});
$('#pickBtn').onclick = () => picking ? stopPick() : startPick();
function startPick() {
    if (isCityAdmin) { const c = cityCenter($('#placeForm').city.value); if (c) map.flyTo([c[0], c[1]], 12); }
    picking = true; $('#map').classList.add('picking'); $('#pickHint').classList.add('show'); $('#pickBtn').classList.add('dark'); $('#sheet').classList.remove('open');
}
function stopPick() { picking = false; $('#map').classList.remove('picking'); $('#pickHint').classList.remove('show'); $('#pickBtn').classList.remove('dark'); }
function pickAt(ll) {
    const f = $('#placeForm'); f.lat.value = ll.lat.toFixed(4); f.lon.value = ll.lng.toFixed(4);
    const reg = regionAt(ll.lng, ll.lat); if (reg) f.region.value = reg;
    const c = cityAt(ll.lng, ll.lat);
    if (isCityAdmin) { $('#formErr').textContent = c && myCities.includes(c) ? '' : `Uwaga: ten punkt jest poza granicą miasta ${f.city.value}.`; }
    else if (c && !f.city.value.trim()) f.city.value = c;
    setGhost([ll.lng, ll.lat]); stopPick();
}
function setGhost(lonlat) {
    if (ghost) { ghost.remove(); ghost = null; }
    if (!lonlat) return;
    ghost = L.marker([lonlat[1], lonlat[0]], { icon: pinIcon('none', 'ghost'), interactive: false, keyboard: false }).addTo(map);
}
['lat', 'lon'].forEach(n => $('#placeForm')[n].addEventListener('input', () => {
    const f = $('#placeForm'), la = parseFloat(f.lat.value), lo = parseFloat(f.lon.value);
    if (la && lo) setGhost([lo, la]);
}));

function refreshAll() { renderPins(); renderPopular(); renderFavs(); renderManage(); }
renderWho(); refreshAll(); updateArea(false);
const start = new URLSearchParams(location.search).get('miejsce');
fitArea(0);
if (start) { const p = places.find(x => x.slug === start); if (p) setTimeout(() => select(p.id), 400); }