// Retrieve the current theme from cookies or set a default
const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
};

const setCookie = (name, value, days = 7) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/`;
};

// Update the background theme based on the selected value
const updateTheme = (theme) => {
    const themes = {
        midnight: "linear-gradient(130deg, #323232 0%, #000000 100%)",
        silver: "linear-gradient(130deg, #4C4C4C 0%, #FFFFFF 100%)",
        titanium: "linear-gradient(130deg, #000000 0%, #373642 100%)",
        metallic: "linear-gradient(130deg, #B8B8B8 0%, #121212 100%)",
        'blood-moon': "linear-gradient(310deg, #000000 65%, #FF0000 0%)",
        varse: "linear-gradient(132deg, #004278 0%, #000024 100%)",
    };

    if (themes[theme]) {
        document.body.style.background = themes[theme];
        setCookie('theme', theme, 30); // Save the theme in cookies for 30 days
    }
};

// When the page loads, check if a theme is set in the cookies and apply it
const savedTheme = getCookie('theme');
if (savedTheme) {
    updateTheme(savedTheme);
} else {
    updateTheme('midnight'); // Default theme set to "Midnight"
}

// Update theme when a new selection is made
const backgroundSelector = document.getElementById('background-selector');
backgroundSelector.addEventListener('change', (e) => {
    updateTheme(e.target.value);
});
