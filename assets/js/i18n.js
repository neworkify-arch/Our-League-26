const translations = {
    az: {
        history: "Tarixçə", admin_login: "Admin Girişi", calc: "Hesabla",
        next_season: "Növbəti Sezon", save_json: "Yadda Saxla (JSON)",
        win: "Q", draw: "H", pos: "Yer", expense: "Xərc", bonus: "Bonus",
        budget: "Büdcə", trophies: "Kuboklar"
    },
    en: {
        history: "History", admin_login: "Admin Login", calc: "Calculate",
        next_season: "Next Season", save_json: "Save (JSON)",
        win: "W", draw: "D", pos: "Pos", expense: "Exp", bonus: "Bonus",
        budget: "Budget", trophies: "Trophies"
    }
};
let curLang = 'az';
function t(key) { return translations[curLang][key] || key; }