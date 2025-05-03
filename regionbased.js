// List of blocked regions (ISO country codes)
const blockedRegions = ['CN', 'RU', 'TR', 'KP']; // China, Russia, Turkey, North Korea

// Function to fetch the user's region based on their IP
const checkRegion = async () => {
    try {
        const response = await fetch('https://ip-api.com/json/');
        const data = await response.json();

        if (data && data.countryCode) {
            if (blockedRegions.includes(data.countryCode)) {
                // Block access
                alert('Access to ChitterSync is restricted in your region.');
                document.body.innerHTML = `
                    <h1 style="text-align: center; color: red;">Access Denied</h1>
                    <p style="text-align: center;">Your region (${data.country}) is not allowed to access this content. we do this to avoid potential legal issues</p>
                `;
            } else {
                console.log(`Access granted. Your region: ${data.country} (${data.countryCode})`);
            }
        } else {
            console.error('Could not determine your region.');
        }
    } catch (error) {
        console.error('Error fetching region data:', error);
    }
};

// Run the region check when the page loads
document.addEventListener('DOMContentLoaded', checkRegion);