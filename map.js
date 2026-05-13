/**
 * Interactive Map Implementation using Leaflet.js
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize map centered on Myanmar (Yangon coordinates as default)
    const map = L.map('map').setView([16.8661, 96.1951], 6);

    // Add dark theme tile layer (CartoDB Dark Matter)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(map);

    // Custom SVG Icon for Markers
    const customIcon = L.divIcon({
        html: `<div class="w-6 h-6 bg-accent rounded-full border-2 border-white shadow-lg animate-pulse"></div>`,
        className: 'custom-div-icon',
        iconSize: [24, 24],
        iconAnchor: [12, 12]
    });

    // POI Data
    const locations = [
        { name: "Yangon HQ", coords: [16.8661, 96.1951], desc: "Main Office & GIS Lab" },
        { name: "Mandalay Branch", coords: [21.9588, 96.0891], desc: "Upper Myanmar Support Center" },
        { name: "Naypyitaw Hub", coords: [19.7633, 96.0785], desc: "Government Relations Office" }
    ];

    // Add markers to map
    locations.forEach(loc => {
        L.marker(loc.coords, { icon: customIcon })
            .addTo(map)
            .bindPopup(`
                <div class="p-2">
                    <h4 class="font-bold text-lg mb-1">${loc.name}</h4>
                    <p class="text-sm opacity-80">${loc.desc}</p>
                </div>
            `);
    });

    // Handle resize
    window.addEventListener('resize', () => {
        map.invalidateSize();
    });
});
