const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

$$('.tabs button').forEach(btn => btn.addEventListener('click', () => {
    $$('.tabs button').forEach(b => b.classList.toggle('on', b === btn));
    $('#tabUsers').hidden = btn.dataset.tab !== 'tabUsers';
    $('#tabCities').hidden = btn.dataset.tab !== 'tabCities';
}));

let roleFilter = '';
function applyFilter() {
    const query = $('#q').value.trim().toLowerCase();
    let visible = 0;
    $$('.table .tr').forEach(row => {
        const show = (!roleFilter || row.dataset.role === roleFilter)
            && row.querySelector('.user').textContent.toLowerCase().includes(query);
        row.hidden = !show;
        if (show) visible++;
    });
    $('#empty').hidden = visible > 0;
}
$('#q').addEventListener('input', applyFilter);
$$('#filter button').forEach(btn => btn.addEventListener('click', () => {
    $$('#filter button').forEach(b => b.classList.toggle('on', b === btn));
    roleFilter = btn.dataset.f;
    applyFilter();
}));

function toggleDrawer(open) {
    $('#drawer').classList.toggle('show', open);
    $('#drawerBg').classList.toggle('show', open);
    $('#drawer').setAttribute('aria-hidden', String(!open));
    if (open) setTimeout(() => $('#UserName').focus(), 250);
}
$('#addUser').addEventListener('click', () => toggleDrawer(true));
['#drawerClose', '#userCancel', '#drawerBg'].forEach(s => $(s).addEventListener('click', () => toggleDrawer(false)));
document.addEventListener('keydown', e => { if (e.key === 'Escape') toggleDrawer(false); });

const ROLE_DESC = {
    User: 'Przegląda mapę, zapisuje ulubione miejsca i trasy.',
    CityAdmin: 'Dodaje i edytuje miejsca tylko w przypisanych miastach.',
    Admin: 'Pełny dostęp, w tym ten panel i wszystkie miejsca.'
};
function setRole(role) {
    $('#Role').value = role;
    $$('#newRole button').forEach(b => b.classList.toggle('on', b.dataset.r === role));
    $('#roleDesc').textContent = ROLE_DESC[role];
    $('#newCitiesWrap').hidden = role !== 'CityAdmin';
}
$$('#newRole button').forEach(b => b.addEventListener('click', () => setRole(b.dataset.r)));
setRole($('#Role').value || 'User');

$('#newCitySelect').addEventListener('change', e => {
    const option = e.target.selectedOptions[0];
    if (!option.value) return;
    const chip = document.createElement('span');
    chip.className = 'chip';
    chip.append(option.value);
    const hidden = Object.assign(document.createElement('input'), { type: 'hidden', name: 'Cities', value: option.value });
    const remove = Object.assign(document.createElement('button'), { type: 'button', textContent: '×' });
    remove.addEventListener('click', () => { option.hidden = false; chip.remove(); });
    chip.append(hidden, remove);
    $('#newCities').append(chip);
    option.hidden = true;
    e.target.value = '';
});

const pw = $('#Password');
function showPassword(show) {
    pw.type = show ? 'text' : 'password';
    $('#pwShow').textContent = show ? 'Ukryj' : 'Pokaż';
}
$('#pwShow').addEventListener('click', () => showPassword(pw.type === 'password'));
pw.addEventListener('input', () => {
    const v = pw.value;
    const score = [v.length >= 8, v.length >= 12, /[a-z]/.test(v) && /[A-Z]/.test(v), /\d/.test(v), /[^A-Za-z0-9]/.test(v)]
        .filter(Boolean).length;
    $('#pwMeter').style.width = v ? `${Math.max(1, score) * 20}%` : '0';
    $('#pwMeter').style.background = score <= 2 ? 'var(--err)' : score === 3 ? 'var(--peach)' : '#7FA37A';
});
$('#pwGen').addEventListener('click', () => {
    const chars = 'abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789!?#%';
    const pick = () => chars[crypto.getRandomValues(new Uint32Array(1))[0] % chars.length];
    let value;
    do { value = Array.from({ length: 12 }, pick).join(''); } while (!/\d/.test(value) || !/[a-z]/i.test(value));
    pw.value = value;
    showPassword(true);
    pw.dispatchEvent(new Event('input'));
});