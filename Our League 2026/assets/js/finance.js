function calculateAll(commit = false) {
    const cfg = appData.config;

    appData.clubs.forEach((club, i) => {
        // ID-lərə görə inputları tap
        const getVal = (id) => parseFloat(document.getElementById(id).value) || 0;

        // Yerli Liqa
        const pos = getVal(`pos_${i}`);
        const lIncome = (getVal(`win_${i}`) * cfg.localWin) + (getVal(`draw_${i}`) * cfg.localDraw);

        // ÇL
        const gIncome = (getVal(`gwin_${i}`) * cfg.groupWin) + (getVal(`gdraw_${i}`) * cfg.groupDraw);
        const pIncome = (getVal(`pwin_${i}`) * cfg.playoffWin) + (getVal(`pdraw_${i}`) * cfg.playoffDraw) + (getVal(`pbonus_${i}`) * cfg.playoffBonus);

        // Finallar
        const finalsIncome = (getVal(`r16_${i}`) * cfg.r16) + (getVal(`qf_${i}`) * cfg.qf) + (getVal(`sf_${i}`) * cfg.sf) + (getVal(`fwin_${i}`) * cfg.final);

        // Xərc
        const expense = getVal(`exp_${i}`) * cfg.expense;
        const bonus = getVal(`bonus_${i}`) * 1.0; // 1M

        const totalIncome = lIncome + gIncome + pIncome + finalsIncome + bonus;
        const net = totalIncome - expense;
        const newBudget = club.currentBudget + net;

        // UI Update
        const statusEl = document.getElementById(`status_${i}`);
        statusEl.innerHTML = `<span class="${net >= 0 ? 'positive' : 'negative'}">${net >= 0 ? '+' : ''}${(net / 1000000).toFixed(2)}M</span> | Yekun: ${(newBudget / 1000000).toFixed(2)}M`;

        // Növbəti Sezona Keçid Məntiqi
        if (commit) {
            club.currentBudget = newBudget;

            // Kubok Məntiqi
            if (pos === 1) club.trophies.local++;
            const fWin = getVal(`fwin_${i}`);
            if (fWin >= 1) club.trophies.ucl++; // 1 qələbə finalda = kubok
            club.trophies.total = club.trophies.local + club.trophies.ucl;

            // Tarixçəyə yaz
            club.seasons.push({
                year: appData.meta.seasonYear,
                pos: pos,
                net: net,
                trophyWon: (pos === 1 || fWin >= 1)
            });
        }
    });

    if (commit) {
        appData.meta.seasonYear++;
        appData.meta.seasonIndex++;
        alert("Sezon Uğurla Tamamlandı!");
        renderApp(); // Ekranı yenilə
    }
}