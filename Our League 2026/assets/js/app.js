let isAdmin = false;

document.addEventListener('DOMContentLoaded', () => {
  loadData();
  setupEventListeners();
});

function setupEventListeners() {
  document.getElementById('themeBtn').onclick = cycleTheme;
  document.getElementById('langBtn').onclick = () => { curLang = curLang === 'az' ? 'en' : 'az'; renderApp(); };
  document.getElementById('sidebarBtn').onclick = () => document.getElementById('sidebar').classList.add('active');
  document.getElementById('closeSidebar').onclick = () => document.getElementById('sidebar').classList.remove('active');

  // Admin
  document.getElementById('adminToggleBtn').onclick = () => document.getElementById('loginModal').classList.remove('hidden');
  document.getElementById('closeLogin').onclick = () => document.getElementById('loginModal').classList.add('hidden');
  document.getElementById('loginBtn').onclick = attemptLogin;

  // Actions
  document.getElementById('calcBtn').onclick = () => calculateAll(false);
  document.getElementById('nextSeasonBtn').onclick = () => { if (confirm('Əminsən?')) calculateAll(true); };
  document.getElementById('saveBtn').onclick = downloadJSON;
  document.getElementById('jsonUpload').onchange = uploadJSON;
}

function attemptLogin() {
  const pass = document.getElementById('adminPassword').value;
  if (pass === 'admin123') { // ŞİFRƏ BURADADIR
    isAdmin = true;
    document.getElementById('loginModal').classList.add('hidden');
    document.getElementById('adminPanel').classList.remove('hidden');
    document.getElementById('adminToggleBtn').style.display = 'none';
    renderApp();
  } else {
    alert('Səhv şifrə!');
  }
}

async function loadData() {
  try {
    const response = await fetch('data/league.json');
    if (response.ok) {
      appData = await response.json();
    } else {
      console.log("JSON tapılmadı, boş data yüklənir.");
    }
  } catch (e) { console.log("Offline mode or error"); }
  renderApp();
}

function renderApp() {
  const container = document.getElementById('clubsContainer');
  container.innerHTML = '';

  // Header Info
  document.getElementById('seasonBadge').innerText = `S: ${appData.meta.seasonIndex} | ${appData.meta.seasonYear}`;

  // Ticker Update
  const ticker = document.getElementById('ticker');
  ticker.innerHTML = appData.clubs.map(c =>
    `<div class="ticker-item"><img src="${c.logo}">${c.name}</div>`
  ).join('');

  // Club Cards
  appData.clubs.forEach((club, i) => {
    const disabled = isAdmin ? '' : 'disabled';
    const card = document.createElement('div');
    card.className = 'club-card';
    card.innerHTML = `
            <div class="card-header">
                <div style="display:flex; align-items:center; gap:10px;">
                    <img src="${club.logo || 'assets/default.png'}" class="club-logo">
                    <div>
                        <h3>${club.name}</h3>
                        <small>🏆 ${club.trophies.total} (L:${club.trophies.local} Ç:${club.trophies.ucl})</small>
                    </div>
                </div>
                <h2>${(club.currentBudget / 1000000).toFixed(2)}M</h2>
            </div>
            
            <div class="stat-grid">
                <div class="input-group">
                    <label>Yerli Liqa (Q/H/Yer)</label>
                    <div style="display:flex; gap:5px;">
                        <input type="number" id="win_${i}" placeholder="Q" ${disabled}>
                        <input type="number" id="draw_${i}" placeholder="H" ${disabled}>
                        <input type="number" id="pos_${i}" placeholder="Yer" ${disabled}>
                    </div>
                </div>
                <div class="input-group">
                    <label>ÇL Qrup (Q/H)</label>
                    <div style="display:flex; gap:5px;">
                        <input type="number" id="gwin_${i}" ${disabled}>
                        <input type="number" id="gdraw_${i}" ${disabled}>
                    </div>
                </div>
                <div class="input-group">
                    <label>ÇL P.O (Q/H/B)</label>
                    <div style="display:flex; gap:5px;">
                        <input type="number" id="pwin_${i}" ${disabled}>
                        <input type="number" id="pdraw_${i}" ${disabled}>
                        <input type="number" id="pbonus_${i}" ${disabled}>
                    </div>
                </div>
                <div class="input-group">
                    <label>ÇL Finallar (1/8, 1/4, 1/2, F)</label>
                    <div style="display:flex; gap:5px;">
                        <input type="number" step="0.5" id="r16_${i}" ${disabled}>
                        <input type="number" step="0.5" id="qf_${i}" ${disabled}>
                        <input type="number" step="0.5" id="sf_${i}" ${disabled}>
                        <input type="number" step="0.5" id="fwin_${i}" ${disabled}>
                    </div>
                </div>
                <div class="input-group">
                    <label>Digər (Bonus/Xərc)</label>
                    <div style="display:flex; gap:5px;">
                        <input type="number" id="bonus_${i}" ${disabled}>
                        <input type="number" id="exp_${i}" ${disabled}>
                    </div>
                </div>
            </div>
            <div id="status_${i}" class="status-bar">Gözlənilir...</div>
        `;
    container.appendChild(card);
  });

  // Sidebar History
  updateSidebar();
}

function updateSidebar() {
  const sb = document.getElementById('sidebarContent');
  sb.innerHTML = appData.clubs.map(c => `
        <div style="margin-bottom:20px; border-bottom:1px solid #444; padding-bottom:10px;">
            <h4>${c.name}</h4>
            ${c.seasons.map(s => `
                <div style="font-size:0.85rem; display:flex; justify-content:space-between;">
                    <span>${s.year} (Yer:${s.pos})</span>
                    <span class="${s.net >= 0 ? 'positive' : 'negative'}">${(s.net / 1000000).toFixed(1)}M</span>
                </div>
            `).join('')}
        </div>
    `).join('');
}

function downloadJSON() {
  const dataStr = JSON.stringify(appData, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `league_backup_${appData.meta.seasonYear}.json`;
  a.click();
}

function uploadJSON(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (event) => {
    appData = JSON.parse(event.target.result);
    renderApp();
    alert("Məlumat yükləndi! İndi 'Save' edib GitHub-a ata bilərsən.");
  };
  reader.readAsText(file);
}