const translations = {
    az: { welcome: "Xoş gəlmisən bro 🦚", history: "Tarixçə", local: "Yerli Liqa", ucl: "ÇL Qrup", ucl_final: "ÇL Finallar" },
    en: { welcome: "Welcome bro 🦚", history: "History", local: "Local League", ucl: "UCL Group", ucl_final: "UCL Finals" }
};
let curLang = localStorage.getItem('ol_lang') || 'az';
