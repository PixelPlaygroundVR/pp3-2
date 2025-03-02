// Sample Deals Data (Replace with `deals.json` from GitHub Actions)
let dealsData = [
    { id: 1, name: "Laptop X", category: "Laptops", originalPrice: 1000, discountedPrice: 700, expiration: "2025-03-05", link: "https://example.com", dateAdded: "2025-03-01" },
    { id: 2, name: "GPU 3080", category: "GPUs", originalPrice: 800, discountedPrice: 600, expiration: "2025-03-03", link: "https://example.com", dateAdded: "2025-03-02" },
    { id: 3, name: "Phone Z", category: "Phones", originalPrice: 500, discountedPrice: 400, expiration: "2025-03-04", link: "https://example.com", dateAdded: "2025-02-28" },
    { id: 4, name: "1TB SSD", category: "Storage", originalPrice: 150, discountedPrice: 70, expiration: "2025-03-10", link: "https://example.com", dateAdded: "2025-03-01" },
    { id: 5, name: "Mechanical Keyboard", category: "Peripherals", originalPrice: 200, discountedPrice: 120, expiration: "2025-03-15", link: "https://example.com", dateAdded: "2025-02-25" },
    { id: 6, name: "Quantum Processor", category: "Alien Tech", originalPrice: 5000, discountedPrice: 2000, expiration: "2025-03-20", link: "https://example.com", dateAdded: "2025-03-01" }
];

// DOM Elements - Main Navigation
const dealNav = document.getElementById('dealNav');
const forumNav = document.getElementById('forumNav');
const volunteerNav = document.getElementById('volunteerNav');
const impactNav = document.getElementById('impactNav');
const zorblaxBtn = document.getElementById('zorblaxBtn');

// DOM Elements - Sections
const dealSection = document.getElementById('dealSection');
const forumSection = document.getElementById('forumSection');
const volunteerSection = document.getElementById('volunteerSection');
const impactSection = document.getElementById('impactSection');
const zorblaxChat = document.getElementById('zorblaxChat');

// DOM Elements - Deal Section
const dealCatalog = document.getElementById('dealCatalog');
const searchBar = document.getElementById('searchBar');
const categoryFilter = document.getElementById('categoryFilter');
const dealTypeFilter = document.getElementById('dealTypeFilter');
const sortFilter = document.getElementById('sortFilter');
const cosmicScan = document.getElementById('cosmicScan');
const checkout = document.getElementById('checkout');
const savingsText = document.getElementById('savingsText');

// DOM Elements - Donation
const donateButtons = document.querySelectorAll('.donate-btn');
const customAmount = document.getElementById('customAmount');
const customDonate = document.getElementById('customDonate');
const roundUp = document.getElementById('roundUp');
const stripeBtn = document.getElementById('stripeBtn');
const paypalBtn = document.getElementById('paypalBtn');
const cryptoBtn = document.getElementById('cryptoBtn');

// DOM Elements - Forum
const dealThreads = document.getElementById('dealThreads');
const techThreads = document.getElementById('techThreads');
const threadTitle = document.getElementById('threadTitle');
const threadContent = document.getElementById('threadContent');
const postThread = document.getElementById('postThread');

// DOM Elements - Volunteer
const volunteerBtns = document.querySelectorAll('.volunteer-btn');
const volunteerForm = document.getElementById('volunteerForm');
const volunteerName = document.getElementById('volunteerName');
const volunteerEmail = document.getElementById('volunteerEmail');
const volunteerSkills = document.getElementById('volunteerSkills');
const submitVolunteer = document.getElementById('submitVolunteer');

// DOM Elements - Impact
const totalDonations = document.getElementById('totalDonations');
const totalSavings = document.getElementById('totalSavings');
const activeUsers = document.getElementById('activeUsers');
const donorList = document.getElementById('donorList');

// DOM Elements - Zorblax Chat
const chatOutput = document.getElementById('chatOutput');
const chatInput = document.getElementById('chatInput');
const sendChat = document.getElementById('sendChat');
const closeChat = document.getElementById('closeChat');

// DOM Elements - Modals
const galacticMapModal = document.getElementById('galacticMapModal');
const newsletterModal = document.getElementById('newsletterModal');
const ratingModal = document.getElementById('ratingModal');
const closeModals = document.querySelectorAll('.close-modal');
const mapBtn = document.getElementById('mapBtn');
const newsletterBtn = document.getElementById('newsletterBtn');
const galaxySvg = document.getElementById('galaxySvg');
const newsletterEmail = document.getElementById('newsletterEmail');
const subscribeBtn = document.getElementById('subscribeBtn');
const stars = document.querySelectorAll('.star');
const feedbackText = document.getElementById('feedbackText');
const submitRating = document.getElementById('submitRating');

// DOM Elements - Audio and Social
const spaceAudio = document.getElementById('spaceAudio');
const muteToggle = document.getElementById('muteToggle');
const shareTwitter = document.getElementById('shareTwitter');

// State
let selectedDeals = [];
let totalSavingsAmount = 0;
let currentRating = 0;
let currentVolunteerType = '';
let zorblaxResponses = {
    greetings: [
        "Greetings, primitive human. What tech deals do you seek?",
        "Your presence has been acknowledged. State your technological desires.",
        "Ah, another Earthling seeking bargains. How may I assist?"
    ],
    laptop: [
        "Scanning the cosmos for laptop deals... I've found a Dell XPS for $899, 40% off its original price. Not bad for your species' technology.",
        "Hmm, laptops... There's an Alienware M15 with 32GB RAM for $1,200. A decent machine by your primitive standards."
    ],
    phone: [
        "Your primitive communication devices? There's a Galaxy S23 for $699, down from $999. Barely better than a calculator by my standards.",
        "iPhone 15 Pro for $899. Overpriced by 200% but you humans seem to enjoy them."
    ],
    gpu: [
        "Graphics processors... There's an RTX 4080 for $799. Adequate for rendering your simple Earth games.",
        "AMD Radeon RX 7900 XT for $749. Primitive, but it will suffice for your basic computational needs."
    ],
    storage: [
        "Data storage? How quaint. There's a 4TB NVMe drive for $299. My species stores data in quantum foam.",
        "Samsung 990 Pro 2TB for $179. Barely enough to store a fraction of my consciousness."
    ],
    default: [
        "I don't understand your primitive query. Try asking about laptops, phones, GPUs, or storage devices.",
        "Your Earth language confuses me. Please specify what technology you're looking for.",
        "That request does not compute. Ask me about specific tech categories for better results."
    ]
};

// Fetch deals from JSON (in production, this would load from the GitHub-updated deals.json)
function fetchDeals() {
    // In a real implementation, this would be:
    // fetch('deals.json')
    //     .then(response => response.json())
    //     .then(data => {
    //         dealsData = data;
    //         renderDeals(dealsData);
    //     });
    
    // For now, we'll just use our sample data
    renderDeals(dealsData);
}

// Render Deals
function renderDeals(deals) {
    dealCatalog.innerHTML = '';
    if (deals.length === 0) {
        dealCatalog.innerHTML = '<p class="no-deals">No deals found in this sector of the galaxy. Try adjusting your search parameters.</p>';
        return;
    }
    
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
    const dealType = dealTypeFilter.value;
    const sort = sortFilter.value;

    // Apply search filter
    if (searchTerm) {
        filtered = filtered.filter(deal => 
            deal.name.toLowerCase().includes(searchTerm) || 
            deal.category.toLowerCase().includes(searchTerm)
        );
    }
    
    // Apply category filter
    if (category) {
        filtered = filtered.filter(deal => deal.category === category);
    }
    
    // Apply deal type filter
    if (dealType) {
        if (dealType === 'flash') {
            // Flash deals expire within 24 hours
            const tomorrow = new Date();
            tomorrow.setHours(tomorrow.getHours() + 24);
            filtered = filtered.filter(deal => new Date(deal.expiration) <= tomorrow);
        } else {
            // Filter by discount percentage
            const minPercentage = parseInt(dealType);
            filtered = filtered.filter(deal => {
                const savings = deal.originalPrice - deal.discountedPrice;
                const percentage = (savings / deal.originalPrice) * 100;
                return percentage >= minPercentage;
            });
        }
    }

    // Apply sorting
    if (sort === 'price') {
        filtered.sort((a, b) => a.discountedPrice - b.discountedPrice);
    } else if (sort === 'discount') {
        filtered.sort((a, b) => {
            const percentA = (b.originalPrice - b.discountedPrice) / b.originalPrice;
            const percentB = (a.originalPrice - a.discountedPrice) / a.originalPrice;
            return percentA - percentB;
        });
    } else if (sort === 'expiration') {
        filtered.sort((a, b) => new Date(a.expiration) - new Date(b.expiration));
    } else if (sort === 'newest') {
        filtered.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    }

    renderDeals(filtered);
}

// Checkout Logic
function addToCheckout(dealId, savings) {
    const deal = dealsData.find(d => d.id === dealId);
    if (!selectedDeals.some(d => d.id === dealId)) {
        selectedDeals.push(deal);
        totalSavingsAmount += savings;
        savingsText.textContent = `You've saved $${totalSavingsAmount.toFixed(2)}, you cheap bastard!`;
        checkout.classList.remove('hidden');
        
        // Show rating modal after adding a few deals
        if (selectedDeals.length === 3) {
            setTimeout(() => {
                showModal(ratingModal);
            }, 2000);
        }
    }
}

// Donation Logic
donateButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const amount = parseFloat(btn.dataset.amount);
        processPayment(amount);
    });
});

customDonate.addEventListener('click', () => {
    const amount = parseFloat(customAmount.value);
    if (amount > 0) {
        processPayment(amount);
    } else {
        alert("Enter a valid amount, you stingy alien!");
    }
});

roundUp.addEventListener('click', () => {
    const donation = totalSavingsAmount * 0.1;
    processPayment(donation);
});

function processPayment(amount) {
    // In a real app, this would integrate with Stripe, PayPal, etc.
    alert(`Thanks for donating $${amount.toFixed(2)}! Your contribution keeps our galaxy spinning.`);
    
    // Add donor to the wall of fame
    const randomNames = ["CosmicUser", "DealHunter", "GalacticSaver", "StarGazer", "NebulaBargain"];
    const randomName = randomNames[Math.floor(Math.random() * randomNames.length)] + Math.floor(Math.random() * 100);
    
    const donorElement = document.createElement('div');
    donorElement.className = 'donor';
    donorElement.innerHTML = `
        <span class="donor-name">${randomName}</span>
        <span class="donor-amount">$${amount.toFixed(2)}</span>
        <span class="donor-badge ${amount >= 25 ? 'legend' : 'star'}">${amount >= 25 ? 'Galactic Legend' : 'Star Donor'}</span>
    `;
    donorList.prepend(donorElement);
    
    // Update total donations
    const currentDonations = parseFloat(totalDonations.textContent.replace('$', '').replace(',', ''));
    totalDonations.textContent = `$${(currentDonations + amount).toFixed(2)}`;
    
    // Show impact section after donation
    setTimeout(() => {
        switchSection(impactSection);
        impactNav.classList.add('active');
        dealNav.classList.remove('active');
    }, 1500);
}

// Navigation
function switchSection(section) {
    // Hide all sections
    dealSection.classList.add('hidden');
    forumSection.classList.add('hidden');
    volunteerSection.classList.add('hidden');
    impactSection.classList.add('hidden');
    
    // Show the selected section
    section.classList.remove('hidden');
}

dealNav.addEventListener('click', () => {
    switchSection(dealSection);
    updateActiveNav(dealNav);
});

forumNav.addEventListener('click', () => {
    switchSection(forumSection);
    updateActiveNav(forumNav);
});

volunteerNav.addEventListener('click', () => {
    switchSection(volunteerSection);
    updateActiveNav(volunteerNav);
});

impactNav.addEventListener('click', () => {
    switchSection(impactSection);
    updateActiveNav(impactNav);
});

function updateActiveNav(activeButton) {
    // Remove active class from all nav buttons
    dealNav.classList.remove('active');
    forumNav.classList.remove('active');
    volunteerNav.classList.remove('active');
    impactNav.classList.remove('active');
    
    // Add active class to the clicked button
    activeButton.classList.add('active');
}

// Forum Functionality
postThread.addEventListener('click', () => {
    if (threadTitle.value && threadContent.value) {
        const newThread = document.createElement('li');
        newThread.className = 'thread';
        newThread.innerHTML = `
            <span class="thread-title">${threadTitle.value}</span>
            <span class="thread-author">You</span>
            <span class="thread-date">Just now</span>
        `;
        dealThreads.prepend(newThread);
        
        // Clear form
        threadTitle.value = '';
        threadContent.value = '';
        
        alert("Your cosmic wisdom has been shared with the galaxy!");
    } else {
        alert("Fill in all fields, space cadet!");
    }
});

// Volunteer Functionality
volunteerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        currentVolunteerType = btn.dataset.type;
        volunteerForm.classList.remove('hidden');
        
        // Scroll to form
        volunteerForm.scrollIntoView({ behavior: 'smooth' });
    });
});

submitVolunteer.addEventListener('click', () => {
    if (volunteerName.value && volunteerEmail.value && volunteerSkills.value) {
        alert(`Thanks for volunteering as a ${currentVolunteerType}! We'll contact you soon.`);
        volunteerForm.classList.add('hidden');
        
        // Clear form
        volunteerName.value = '';
        volunteerEmail.value = '';
        volunteerSkills.value = '';
    } else {
        alert("Fill in all fields, recruit!");
    }
});

// Zorblax Chatbot
zorblaxBtn.addEventListener('click', () => {
    zorblaxChat.classList.toggle('hidden');
});

closeChat.addEventListener('click', () => {
    zorblaxChat.classList.add('hidden');
});

sendChat.addEventListener('click', () => {
    sendMessageToZorblax();
});

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessageToZorblax();
    }
});

function sendMessageToZorblax() {
    const message = chatInput.value.trim();
    if (message) {
        // Add user message
        addChatMessage(message, 'user');
        
        // Clear input
        chatInput.value = '';
        
        // Get Zorblax response
        setTimeout(() => {
            const response = getZorblaxResponse(message);
            addChatMessage(response, 'bot');
        }, 1000);
    }
}

function addChatMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.className = `chat-message ${sender}`;
    messageElement.innerHTML = `<p>${message}</p>`;
    chatOutput.appendChild(messageElement);
    
    // Scroll to bottom
    chatOutput.scrollTop = chatOutput.scrollHeight;
}

function getZorblaxResponse(message) {
    message = message.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
        return getRandomResponse(zorblaxResponses.greetings);
    } else if (message.includes('laptop')) {
        return getRandomResponse(zorblaxResponses.laptop);
    } else if (message.includes('phone')) {
        return getRandomResponse(zorblaxResponses.phone);
    } else if (message.includes('gpu') || message.includes('graphics')) {
        return getRandomResponse(zorblaxResponses.gpu);
    } else if (message.includes('ssd') || message.includes('storage') || message.includes('drive')) {
        return getRandomResponse(zorblaxResponses.storage);
    } else {
        return getRandomResponse(zorblaxResponses.default);
    }
}

function getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
}

// Modal Functionality
function showModal(modal) {
    modal.classList.remove('hidden');
}

function closeAllModals() {
    galacticMapModal.classList.add('hidden');
    newsletterModal.classList.add('hidden');
    ratingModal.classList.add('hidden');
}

closeModals.forEach(closeBtn => {
    closeBtn.addEventListener('click', closeAllModals);
});

mapBtn.addEventListener('click', () => {
    showModal(galacticMapModal);
    generateGalaxyMap();
});

newsletterBtn.addEventListener('click', () => {
    showModal(newsletterModal);
});

// Generate Galaxy Map
function generateGalaxyMap() {
    galaxySvg.innerHTML = '';
    
    const categories = ['Laptops', 'Phones', 'GPUs', 'Storage', 'Peripherals', 'Alien Tech'];
    const colors = ['#00ffcc', '#ff00ff', '#ffff00', '#00ff00', '#ff0000', '#0000ff'];
    
    categories.forEach((category, index) => {
        const x = 400 + 200 * Math.cos(index * Math.PI * 2 / categories.length);
        const y = 300 + 200 * Math.sin(index * Math.PI * 2 / categories.length);
        
        // Create star system
        const system = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        
        // Create star
        const star = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        star.setAttribute('cx', x);
        star.setAttribute('cy', y);
        star.setAttribute('r', 20);
        star.setAttribute('fill', colors[index]);
        star.setAttribute('class', 'star-system');
        star.setAttribute('data-category', category);
        
        // Create label
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', x);
        text.setAttribute('y', y + 40);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('fill', '#ffffff');
        text.textContent = category;
        
        // Add click event
        star.addEventListener('click', () => {
            closeAllModals();
            categoryFilter.value = category;
            filterAndSortDeals();
            switchSection(dealSection);
            updateActiveNav(dealNav);
        });
        
        system.appendChild(star);
        system.appendChild(text);
        galaxySvg.appendChild(system);
    });
    
    // Add connecting lines
    for (let i = 0; i < categories.length; i++) {
        const x1 = 400 + 200 * Math.cos(i * Math.PI * 2 / categories.length);
        const y1 = 300 + 200 * Math.sin(i * Math.PI * 2 / categories.length);
        
        const x2 = 400 + 200 * Math.cos(((i + 1) % categories.length) * Math.PI * 2 / categories.length);
        const y2 = 300 + 200 * Math.sin(((i + 1) % categories.length) * Math.PI * 2 / categories.length);
        
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('stroke', '#333366');
        line.setAttribute('stroke-width', '2');
        
        galaxySvg.insertBefore(line, galaxySvg.firstChild);
    }
}

// Newsletter Subscription
subscribeBtn.addEventListener('click', () => {
    const email = newsletterEmail.value;
    if (email && email.includes('@')) {
        alert(`Thanks for subscribing to Deal Warp! Your primitive inbox will now receive our cosmic deals.`);
        newsletterModal.classList.add('hidden');
        newsletterEmail.value = '';
    } else {
        alert("Enter a valid email, Earth creature!");
    }
});

// Rating System
stars.forEach(star => {
    star.addEventListener('click', () => {
        const rating = parseInt(star.dataset.rating);
        currentRating = rating;
        
        // Update star display
        stars.forEach(s => {
            if (parseInt(s.dataset.rating) <= rating) {
                s.classList.add('active');
            } else {
                s.classList.remove('active');
            }
        });
    });
});

submitRating.addEventListener('click', () => {
    if (currentRating > 0) {
        alert(`Thanks for your ${currentRating}-star rating! Your feedback powers our galactic engines.`);
        ratingModal.classList.add('hidden');
        
        // Reset rating
        currentRating = 0;
        stars.forEach(s => s.classList.remove('active'));
        feedbackText.value = '';
    } else {
        alert("Please select a star rating!");
    }
});

// Social Sharing
shareTwitter.addEventListener('click', () => {
    const text = `I just saved $${totalSavingsAmount.toFixed(2)} on tech deals using the Galactic Deal Scraper! Check it out:`;
    const url = 'https://yourusername.github.io/galactic-deal-scraper/';
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
});

// Audio Control
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
    
    // Random Y position
    const y = Math.random() * (window.innerHeight - 100);
    ufo.style.setProperty('--y', `${y}px`);
    ufo.style.top = `${y}px`;
    
    // Add tractor beam
    const tractorBeam = document.createElement('div');
    tractorBeam.className = 'tractor-beam';
    ufo.appendChild(tractorBeam);
    
    document.querySelector('.ufo-container').appendChild(ufo);
    
    // Remove after animation completes
    setTimeout(() => ufo.remove(), 15000);
}

// Cosmic Scan Effect
cosmicScan.addEventListener('click', () => {
    dealCatalog.classList.add('glitch');
    document.body.classList.add('glitch');
    
    setTimeout(() => {
        dealCatalog.classList.remove('glitch');
        document.body.classList.remove('glitch');
        filterAndSortDeals();
    }, 1000);
});

// Event Listeners
searchBar.addEventListener('input', filterAndSortDeals);
categoryFilter.addEventListener('change', filterAndSortDeals);
dealTypeFilter.addEventListener('change', filterAndSortDeals);
sortFilter.addEventListener('change', filterAndSortDeals);

// Initialize
function init() {
    fetchDeals();
    setInterval(spawnUFO, 10000);
    
    // Try to play audio (may be blocked by browser)
    try {
        spaceAudio.volume = 0.3;
        const playPromise = spaceAudio.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Auto-play was prevented. User must interact with the page first.");
            });
        }
    } catch (e) {
        console.log("Audio error:", e);
    }
}

// Start the app
init();