// Default data əgər json yoxdursa
const defaultData = {
    meta: { seasonYear: 2026, seasonIndex: 1 },
    config: { // Əmsallar
        localWin: 0.8, localDraw: 0.3,
        groupWin: 2.0, groupDraw: 0.9,
        playoffWin: 1.5, playoffDraw: 0.9, playoffBonus: 1.0,
        r16: 2.3, qf: 2.1, sf: 2.05, final: 5.0,
        expense: 1.0
    },
    clubs: []
};

let appData = JSON.parse(JSON.stringify(defaultData));