/**
 * Pricing Calculator Logic
 */
document.addEventListener('DOMContentLoaded', async () => {
    const mapSelect = document.getElementById('map-type');
    const formatSelect = document.getElementById('format-type');
    const totalDisplay = document.getElementById('total-price');

    let pricingData = null;

    // Fetch pricing data
    try {
        const response = await fetch('data/pricing.json');
        pricingData = await response.json();
        
        // Populate dropdowns
        pricingData.mapTypes.forEach(type => {
            const option = document.createElement('option');
            option.value = type.id;
            option.textContent = type.name;
            mapSelect.appendChild(option);
        });

        pricingData.formats.forEach(format => {
            const option = document.createElement('option');
            option.value = format.id;
            option.textContent = format.name;
            formatSelect.appendChild(option);
        });

        // Initial calculation
        calculateTotal();
    } catch (error) {
        console.error('Error loading pricing data:', error);
    }

    function calculateTotal() {
        if (!pricingData) return;

        const selectedMap = pricingData.mapTypes.find(t => t.id === mapSelect.value);
        const selectedFormat = pricingData.formats.find(f => f.id === formatSelect.value);

        if (selectedMap && selectedFormat) {
            const total = selectedMap.basePrice * selectedFormat.multiplier;
            
            // Animate number change
            animateValue(totalDisplay, parseInt(totalDisplay.textContent.replace(/\D/g, '') || 0), total, 500);
        }
    }

    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            obj.innerHTML = current.toLocaleString() + ' MMK';
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    mapSelect.addEventListener('change', calculateTotal);
    formatSelect.addEventListener('change', calculateTotal);
});
