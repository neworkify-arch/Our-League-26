function calculateAll(commit = false) {
    const cfg = appData.config;
    appData.clubs.forEach((club, i) => {
        const win = Number(document.getElementById(`win_${i}`).value) || 0;
        const draw = Number(document.getElementById(`draw_${i}`).value) || 0;
        const pos = Number(document.getElementById(`pos_${i}`).value) || 0;
        
        const gWin = Number(document.getElementById(`gwin_${i}`).value) || 0;
        const gDraw = Number(document.getElementById(`gdraw_${i}`).value) || 0;
        
        const fScore = Number(document.getElementById(`fwin_${i}`).value) || 0;
        const isChamp = document.getElementById(`fcheck_${i}`).checked;

        let income = (win * cfg.localWin) + (draw * cfg.localDraw);
        income += (gWin * cfg.groupWin) + (gDraw * cfg.groupDraw);
        income += (fScore * cfg.final);

        const exp = (Number(document.getElementById(`exp_${i}`).value) || 0) * 1000000;
        const net = income - exp;

        const statusEl = document.getElementById(`status_${i}`);
        statusEl.innerHTML = `Status: ${(net/1000000).toFixed(1)}M | Yeni Büdcə: ${((club.currentBudget+net)/1000000).toFixed(1)}M`;

        if(commit) {
            club.currentBudget += net;
            if(pos === 1) { club.trophies.local++; club.trophies.total++; }
            if(isChamp) { club.trophies.ucl++; club.trophies.total++; }
            club.seasons.push({ year: appData.meta.seasonYear, pos: pos, net: net });
        }
    });

    if(commit) {
        appData.meta.seasonYear++;
        appData.meta.seasonIndex++;
        renderApp();
    }
}
