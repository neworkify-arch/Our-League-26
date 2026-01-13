const themes = ['theme-dark', 'theme-light', 'theme-blue', 'theme-green', 'theme-red', 'theme-purple', 'theme-orange', 'theme-cyber', 'theme-coffee', 'theme-ocean'];
let themeIndex = 0;

function cycleTheme() {
    document.body.classList.remove(themes[themeIndex]);
    themeIndex = (themeIndex + 1) % themes.length;
    document.body.classList.add(themes[themeIndex]);
    localStorage.setItem('ol_theme', themeIndex);
}

// Load saved theme
const savedTheme = localStorage.getItem('ol_theme');
if (savedTheme) {
    themeIndex = parseInt(savedTheme);
    document.body.className = themes[themeIndex];
}