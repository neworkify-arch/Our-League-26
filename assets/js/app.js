let appData = {};
let isAdmin = false;

async function init() {
    const res = await fetch('data/league.json');
    appData = await res.json();
    renderApp();
}

function renderApp() {
    const container = document.getElementById('clubsContainer');
    container.innerHTML = '';
    document.getElementById('seasonBadge').innerText = `Sezon ${appData.meta.seasonIndex} - ${appData.meta.seasonYear}`;

    appData.clubs.forEach((club, i) => {
        const div = document.createElement('div');
        div.className = 'club-card';
        div.innerHTML = `
            <div class="card-header">
                <img src="${club.logo}" class="club-logo">
                <h2>${club.name} 🏆 ${club.trophies.total}</h2>
                <span>${(club.currentBudget/1000000).toFixed(1)}M</span>
            </div>
            <div class="stat-grid">
                <div class="input-group">
                    <label>Yerli Liqa (Q / H / Yer)</label>
                    <input id="win_${i}" type="number" value="0">
                    <input id="draw_${i}" type="number" value="0">
                    <input id="pos_${i}" type="number" value="1">
                </div>
                <div class="input-group">
                    <label>ÇL Final (Xal / Kubok)</label>
                    <input id="fwin_${i}" type="number" step="0.5" oninput="handleFinal(${i})">
                    <input id="fcheck_${i}" type="checkbox">
                </div>
                <div class="input-group">
                    <label>Xərc (Milyon)</label>
                    <input id="exp_${i}" type="number" value="0">
                </div>
            </div>
            <div id="status_${i}" class="status-bar">Gözlənilir...</div>
        `;
        container.appendChild(div);
    });
}

function handleFinal(i) {
    const val = Number(document.getElementById(`fwin_${i}`).value);
    const cb = document.getElementById(`fcheck_${i}`);
    if(val === 1) { cb.checked = true; cb.disabled = true; }
    else if(val === 0.5) { cb.disabled = false; }
    else { cb.checked = false; cb.disabled = true; }
}

// Admin Logic
document.getElementById('adminToggleBtn').onclick = () => {
    const p = prompt("Şifrə:");
    if(p === "admin123") {
        isAdmin = true;
        document.getElementById('adminPanel').classList.remove('hidden');
    }
};

document.getElementById('calcBtn').onclick = () => calculateAll(false);
document.getElementById('nextSeasonBtn').onclick = () => calculateAll(true);
document.getElementById('saveBtn').onclick = () => {
    const blob = new Blob([JSON.stringify(appData, null, 2)], {type : 'application/json'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'league.json';
    a.click();
};

init();
