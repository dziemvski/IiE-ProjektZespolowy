// Sekcja Polityki Prywatności w stopce
(() => {
    const btn = document.getElementById('privacyBtn');
    const wrap = document.getElementById('privacyWrap');
    if (!btn || !wrap) return;
    const toggle = (open) => {
        open = open ?? !wrap.classList.contains('open');
        wrap.classList.toggle('open', open);
        btn.setAttribute('aria-expanded', open);
        if (open) setTimeout(() => btn.scrollIntoView({behavior: 'smooth', block: 'start'}), 120);
    };
    btn.addEventListener('click', () => toggle());
    if (location.hash === '#polityka-prywatnosci') toggle(true);
})();

// Animacja kuli ziemskiej w tle (Canvas)
(() => {
    const c = document.getElementById('bgGlobe');
    if (!c) return;
    const ctx = c.getContext('2d');
    const PEACH = '248,185,122', TILT = .38, reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let s, r, rot = 0, last = performance.now();
    const resize = () => {
        const d = Math.min(devicePixelRatio || 1, 2);
        s = c.clientWidth;
        c.width = c.height = s * d;
        ctx.setTransform(d, 0, 0, d, 0, 0);
        r = s * .47;
    };
    const P = (la, lo) => {
        const x = Math.cos(la) * Math.sin(lo + rot), y = Math.sin(la), z = Math.cos(la) * Math.cos(lo + rot);
        return [s / 2 + x * r, s / 2 - (y * Math.cos(TILT) - z * Math.sin(TILT)) * r, y * Math.sin(TILT) + z * Math.cos(TILT)];
    };
    const line = pts => {
        ctx.beginPath();
        let pen = false;
        for (const [la, lo] of pts) {
            const [x, y, z] = P(la, lo);
            if (z >= 0) {
                pen ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
                pen = true;
            } else pen = false;
        }
        ctx.stroke();
    };
    const frame = now => {
        const dt = Math.min(now - last, 50);
        last = now;
        if (!reduce) rot += dt * .00008;
        ctx.clearRect(0, 0, s, s);
        ctx.strokeStyle = `rgba(${PEACH},.55)`;
        ctx.lineWidth = 1;
        for (let i = 0; i < 24; i++) {
            const lo = i / 24 * Math.PI * 2, p = [];
            for (let j = 0; j <= 60; j++) p.push([-Math.PI / 2 + j / 60 * Math.PI, lo]);
            line(p);
        }
        for (let i = 1; i < 12; i++) {
            const la = -Math.PI / 2 + i / 12 * Math.PI, p = [];
            for (let j = 0; j <= 96; j++) p.push([la, j / 96 * Math.PI * 2]);
            line(p);
        }
        ctx.beginPath();
        ctx.arc(s / 2, s / 2, r, 0, Math.PI * 2);
        ctx.stroke();
        requestAnimationFrame(frame);
    };
    resize();
    addEventListener('resize', resize);
    requestAnimationFrame(frame);
})();