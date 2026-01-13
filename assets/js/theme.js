const themes = ['theme-dark', 'theme-light', 'theme-blue', 'theme-pink', 'theme-green', 'theme-orange', 'theme-purple', 'theme-ocean', 'theme-gold', 'theme-blood'];
let curThemeIdx = parseInt(localStorage.getItem('ol_theme_idx')) || 0;

function applyTheme() {
    document.body.className = themes[curThemeIdx];
}

document.getElementById('themeBtn').onclick = () => {
    curThemeIdx = (curThemeIdx + 1) % themes.length;
    localStorage.setItem('ol_theme_idx', curThemeIdx);
    applyTheme();
};
applyTheme();
