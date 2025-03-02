// Sample Deals Data (Replace with `deals.json` from GitHub Actions)
const dealsData = [
    { id: 1, name: "Laptop X", category: "Laptops", originalPrice: 1000, discountedPrice: 700, expiration: "2025-03-05", link: "https://example.com" },
    { id: 2, name: "GPU 3080", category: "GPUs", originalPrice: 800, discountedPrice: 600, expiration: "2025-03-03", link: "https://example.com" },
    { id: 3, name: "Phone Z", category: "Phones", originalPrice: 500, discountedPrice: 400, expiration: "2025-03-04", link: "https://example.com" }
];

// DOM Elements
const dealCatalog = document.getElementById('dealCatalog');
const searchBar = document.getElementById('searchBar');
const categoryFilter = document.getElementById('categoryFilter');
const sortFilter = document.getElementById('sortFilter');
const cosmicScan = document.getElementById('cosmicScan');
const checkout = document.getElementById('checkout');
const savingsText = document.getElementById('savingsText');
const donateButtons = document.querySelectorAll('.donate-btn');
const customAmount = document.getElementById('customAmount');
const roundUp = document.getElementById('roundUp');
const spaceAudio = document.getElementById('spaceAudio');
const muteToggle = document.getElementById('muteToggle');

// State
let selectedDeals = [];
let totalSavings = 0;

// Render Deals
function renderDeals(deals) {
    dealCatalog.innerHTML = '';
    deals.forEach(deal => {
        const savings = deal.originalPrice - deal.discountedPrice;
        const percentage = ((savings / deal.originalPrice) * 100).toFixed(0);
        const timeLeft = Math.max(0, new Date(deal.expiration) - new Date());
        const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));

        const card = document.createElement('div');
        card.className = 'deal-card';
        card.innerHTML = `
            <h3>${deal.name}</h3>
            <p>Original: $${deal.originalPrice} | Now: $${deal.discountedPrice}</p>
            <p>Savings: $${savings} (${percentage}%)</p>
            <p class="timer">Expires in ${hoursLeft} hours</p>
            <button onclick="window.open('${deal.link}', '_blank')">Warp to Deal</button>
            <button onclick="addToCheckout(${deal.id}, ${savings})">Add to Cart</button>
        `;
        dealCatalog.appendChild(card);
    });
}

// Filter and Sort Deals
function filterAndSortDeals() {
    let filtered = [...dealsData];
    const searchTerm = searchBar.value.toLowerCase();
    const category = categoryFilter.value;
    const sort = sortFilter.value;

    if (searchTerm) filtered = filtered.filter(deal => deal.name.toLowerCase().includes(searchTerm));
    if (category) filtered = filtered.filter(deal => deal.category === category);

    if (sort === 'price') filtered.sort((a, b) => a.discountedPrice - b.discountedPrice);
    else if (sort === 'discount') filtered.sort((a, b) => (b.originalPrice - b.discountedPrice) - (a.originalPrice - a.discountedPrice));
    else if (sort === 'expiration') filtered.sort((a, b) => new Date(a.expiration) - new Date(b.expiration));

    renderDeals(filtered);
}

// Checkout Logic
function addToCheckout(dealId, savings) {
    const deal = dealsData.find(d => d.id === dealId);
    if (!selectedDeals.includes(deal)) {
        selectedDeals.push(deal);
        totalSavings += savings;
        savingsText.textContent = `You've saved $${totalSavings.toFixed(2)}, you cheap bastard!`;
        checkout.classList.remove('hidden');
    }
}

// Donation Logic
donateButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const amount = parseFloat(btn.dataset.amount);
        alert(`Thanks for donating $${amount}! (Stripe/PayPal integration placeholder)`);
    });
});

roundUp.addEventListener('click', () => {
    const donation = totalSavings * 0.1;
    alert(`Rounding up $${totalSavings.toFixed(2)} to donate $${donation.toFixed(2)}! (Payment placeholder)`);
});

customAmount.addEventListener('change', () => {
    const amount = parseFloat(customAmount.value);
    if (amount > 0) alert(`Donating $${amount}! (Payment placeholder)`);
});

// Event Listeners
searchBar.addEventListener('input', filterAndSortDeals);
categoryFilter.addEventListener('change', filterAndSortDeals);
sortFilter.addEventListener('change', filterAndSortDeals);
cosmicScan.addEventListener('click', () => {
    dealCatalog.classList.add('glitch');
    setTimeout(() => dealCatalog.classList.remove('glitch'), 500);
    filterAndSortDeals();
});

// Audio Control
spaceAudio.play();
muteToggle.addEventListener('click', () => {
    if (spaceAudio.paused) {
        spaceAudio.play();
        muteToggle.textContent = 'Mute';
    } else {
        spaceAudio.pause();
        muteToggle.textContent = 'Unmute';
    }
});

// UFO Animation
function spawnUFO() {
    const ufo = document.createElement('div');
    ufo.className = 'ufo';
    document.body.appendChild(ufo);
    setTimeout(() => ufo.remove(), 10000);
}
setInterval(spawnUFO, 5000);

// Initial Render
renderDeals(dealsData);