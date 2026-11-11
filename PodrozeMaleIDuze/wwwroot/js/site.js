(() => {
    const btn = document.getElementById('privacyBtn');
    const wrap = document.getElementById('privacyWrap');
    if (!btn || !wrap) return;

    const toggle = (open) => {
        open = open ?? !wrap.classList.contains('open');
        wrap.classList.toggle('open', open);
        btn.setAttribute('aria-expanded', open);
        if (open) setTimeout(() => btn.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
    };

    btn.addEventListener('click', () => toggle());
    if (location.hash === '#polityka-prywatnosci') toggle(true);
})();

(() => {
    const PEACH = '248,185,122';
    const ROSE = '184,156,156';
    const TILT = .38;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

    const initGlobe = (canvas) => {
        const ctx = canvas.getContext('2d');
        const drawBack = canvas.dataset.back === 'true';
        const marker = canvas.dataset.marker
            ? canvas.dataset.marker.split(',').map(v => parseFloat(v) * Math.PI / 180)
            : null;

        let size, radius, rot = 0, last = performance.now();

        const resize = () => {
            const dpr = Math.min(devicePixelRatio || 1, 2);
            size = canvas.clientWidth;
            canvas.width = canvas.height = size * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            radius = size * .47;
        };

        const project = (lat, lon) => {
            const x = Math.cos(lat) * Math.sin(lon + rot);
            const y = Math.sin(lat);
            const z = Math.cos(lat) * Math.cos(lon + rot);
            return [
                size / 2 + x * radius,
                size / 2 - (y * Math.cos(TILT) - z * Math.sin(TILT)) * radius,
                y * Math.sin(TILT) + z * Math.cos(TILT)
            ];
        };

        const line = (points, front) => {
            ctx.beginPath();
            let pen = false;
            for (const [lat, lon] of points) {
                const [x, y, z] = project(lat, lon);
                if ((z >= 0) === front) {
                    pen ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
                    pen = true;
                } else {
                    pen = false;
                }
            }
            ctx.stroke();
        };

        const grid = (front) => {
            for (let i = 0; i < 24; i++) {
                const lon = i / 24 * Math.PI * 2, pts = [];
                for (let j = 0; j <= 60; j++) pts.push([-Math.PI / 2 + j / 60 * Math.PI, lon]);
                line(pts, front);
            }
            for (let i = 1; i < 12; i++) {
                const lat = -Math.PI / 2 + i / 12 * Math.PI, pts = [];
                for (let j = 0; j <= 96; j++) pts.push([lat, j / 96 * Math.PI * 2]);
                line(pts, front);
            }
        };

        const frame = (now) => {
            const dt = Math.min(now - last, 50);
            last = now;
            if (!reduce) rot += dt * .00008;

            ctx.clearRect(0, 0, size, size);
            ctx.lineWidth = 1;

            if (drawBack) {
                ctx.strokeStyle = `rgba(${PEACH},.18)`;
                grid(false);
            }

            ctx.strokeStyle = `rgba(${PEACH},.75)`;
            grid(true);

            ctx.beginPath();
            ctx.arc(size / 2, size / 2, radius, 0, Math.PI * 2);
            ctx.stroke();

            if (marker) {
                const [x, y, z] = project(marker[0], marker[1]);
                if (z >= 0) {
                    ctx.fillStyle = `rgb(${ROSE})`;
                    ctx.beginPath();
                    ctx.arc(x, y, 3, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.strokeStyle = `rgba(${ROSE},.6)`;
                    ctx.beginPath();
                    ctx.arc(x, y, 7, 0, Math.PI * 2);
                    ctx.stroke();
                }
            }

            requestAnimationFrame(frame);
        };

        resize();
        addEventListener('resize', resize);
        requestAnimationFrame(frame);
    };

    document.querySelectorAll('canvas[data-globe]').forEach(initGlobe);
})();
