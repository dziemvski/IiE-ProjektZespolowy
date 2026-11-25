document.addEventListener("DOMContentLoaded", () => {
    const trips = window.__TRIPS_DATA__ || [];
    let activeTab = window.__INITIAL_TAB__ || "todo";
    let selectedId = window.__SELECTED_ID__;
    let mode = "foot";

    const listContainer = document.getElementById("trips-list-container");
    const detailPanel = document.getElementById("trip-detail-panel");
    const tabButtons = document.querySelectorAll(".tab-btn");
    const modeButtons = document.querySelectorAll(".mode-btn");

    const fmt = (n) => String(n).replace(".", ",");

    function getFilteredTrips() {
        return trips.filter((t) => (activeTab === "done") === t.isCompleted);
    }

    function render() {
        const inTab = getFilteredTrips();

        tabButtons.forEach((btn) => {
            btn.classList.toggle("active", btn.dataset.tab === activeTab);
        });

        let sel = inTab.find((t) => t.id === selectedId) || inTab[0];
        if (sel) {
            selectedId = sel.id;
        }

        listContainer.innerHTML = "";
        if (inTab.length === 0) {
            listContainer.innerHTML = `<div class="trips-empty-box">Brak tras w tej zakładce.</div>`;
            detailPanel.style.display = "none";
            return;
        }

        detailPanel.style.display = "flex";

        inTab.forEach((t) => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "trip-list-card" + (t.id === sel.id ? " selected" : "");
            btn.innerHTML = `
                <span class="trip-card-head">
                    <span class="trip-card-name">${escapeHtml(t.name)}</span>
                    <span class="trip-chip ${t.isCompleted ? "done" : "todo"}">
                        ${t.isCompleted ? "Zrobiona" : "Do zrobienia"}
                    </span>
                </span>
                <span class="trip-card-meta">${escapeHtml(t.city)} · ${t.stops.length} miejsca · ${fmt(t.km)} km</span>
                <span class="trip-card-date">${escapeHtml(t.dateLabel)}</span>
            `;
            btn.addEventListener("click", () => {
                selectedId = t.id;
                render();
            });
            listContainer.appendChild(btn);
        });

        document.getElementById("detail-name").textContent = sel.name;
        document.getElementById("detail-desc").textContent = sel.description;

        const speeds = {foot: 5, bike: 15, car: 30};
        const mins = Math.round((sel.km / speeds[mode]) * 60);
        const duration = mins >= 60
            ? `${Math.floor(mins / 60)} h ${mins % 60} min`
            : `${mins} min`;

        document.getElementById("detail-distance-duration").textContent = `${fmt(sel.km)} km · ${duration}`;

        modeButtons.forEach((btn) => {
            btn.classList.toggle("active", btn.dataset.mode === mode);
        });

        const pointsStr = sel.stops.map((s) => `${s.mapX},${s.mapY}`).join(" ");
        document.getElementById("map-line-shadow").setAttribute("points", pointsStr);
        const routeLine = document.getElementById("map-line-route");
        routeLine.setAttribute("points", pointsStr);
        routeLine.setAttribute("stroke-dasharray", mode === "foot" ? "2 8" : "none");

        const pinsLayer = document.getElementById("map-pins-layer");
        pinsLayer.innerHTML = "";
        sel.stops.forEach((s, i) => {
            const pin = document.createElement("span");
            pin.className = "map-pin";
            pin.style.left = `${(s.mapX / 6)}%`;
            pin.style.top = `${(s.mapY / 3.4)}%`;
            pin.textContent = i + 1;
            pinsLayer.appendChild(pin);
        });

        const stopsList = document.getElementById("detail-stops-list");
        stopsList.innerHTML = "";
        sel.stops.forEach((s, i) => {
            const nextText = i < sel.stops.length - 1
                ? `↓ ${fmt((sel.km / Math.max(1, sel.stops.length - 1)).toFixed(1))} km`
                : "meta";

            const li = document.createElement("li");
            li.innerHTML = `
                <span class="stop-num">${i + 1}</span>
                <span class="stop-info">
                    <span class="stop-name">${escapeHtml(s.name)}</span>
                    <span class="stop-cat">${escapeHtml(s.category)}</span>
                </span>
                <span class="stop-next">${nextText}</span>
            `;
            stopsList.appendChild(li);
        });

        const toggleBtn = document.getElementById("btn-toggle-complete");
        if (sel.isCompleted) {
            toggleBtn.textContent = "Przywróć do planów";
            toggleBtn.className = "btn-action-restore";
        } else {
            toggleBtn.textContent = "Oznacz jako zrobioną";
            toggleBtn.className = "btn-action-dark";
        }
    }

    function escapeHtml(str) {
        return String(str ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
    }

    tabButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            activeTab = btn.dataset.tab;
            const first = getFilteredTrips()[0];
            if (first) selectedId = first.id;
            render();
        });
    });

    modeButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            mode = btn.dataset.mode;
            render();
        });
    });

    render();
});