// Admin Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the admin dashboard
    init();
});

// Global variables
let currentUser = null;
let currentPage = 'dashboard';
let sampleTransactions = [];
let sessionTimeout = 30; // minutes
let timeoutWarning = null;
let timeoutTimer = null;
let warningTimer = null;
let lastActivity = Date.now();

// Template management variables
let currentTemplateSection = 'faceswap';
let faceSwapTemplates = [];
let aiEffectsTemplates = [];
let framesTemplates = [];
let currentCategory = 'all';
let selectedFaceSwapTemplates = new Set();
let selectedAIEffectsTemplates = new Set();
let selectedFramesTemplates = new Set();
let autoSortFaceSwap = false;
let autoSortAIEffects = false;
let autoSortFrames = false;
let currentFaceSwapView = 'gallery'; // 'gallery' or 'selected'
let currentAIEffectsView = 'gallery';
let currentFramesView = 'gallery';
let filteredFaceSwapTemplates = [];
let filteredAIEffectsTemplates = [];
let filteredFramesTemplates = [];

// Initialize the application
function init() {
    console.log('Initializing admin dashboard...');
    generateSampleData();
    
    // First try to load existing templates from localStorage
    loadTemplateSettings();
    
    // If no templates were loaded, generate new ones
    if (faceSwapTemplates.length === 0 || aiEffectsTemplates.length === 0) {
        generateTemplateData();
    }
    
    console.log('Final templates - Face Swap:', faceSwapTemplates.length, 'AI Effects:', aiEffectsTemplates.length);
    setupEventListeners();
    
    // For testing, skip login and show dashboard directly
    showDashboard();
    
    // Initialize templates immediately for testing
    setTimeout(() => {
        initializeTemplates();
        showTemplateSection('frames');
    }, 100);
}

// Generate sample transaction data
function generateSampleData() {
    const styles = [
        { id: 'coral-reef', name: 'Coral Reef Dreams', emoji: '🐠', image: 'https://picsum.photos/100/100?random=style1' },
        { id: 'deep-ocean', name: 'Deep Ocean Blue', emoji: '🌊', image: 'https://picsum.photos/100/100?random=style2' },
        { id: 'octopus', name: 'Octopus Garden', emoji: '🐙', image: 'https://picsum.photos/100/100?random=style3' },
        { id: 'sea-turtle', name: 'Sea Turtle Serenity', emoji: '🐢', image: 'https://picsum.photos/100/100?random=style4' },
        { id: 'shark-tank', name: 'Shark Tank Adventure', emoji: '🦈', image: 'https://picsum.photos/100/100?random=style5' },
        { id: 'seashell', name: 'Seashell Memories', emoji: '🐚', image: 'https://picsum.photos/100/100?random=style6' }
    ];
    
    const frames = [
        { id: 'bubble', name: 'Bubble Frame', emoji: '🫧', image: 'https://picsum.photos/100/100?random=frame1' },
        { id: 'coral', name: 'Coral Border', emoji: '🪸', image: 'https://picsum.photos/100/100?random=frame2' },
        { id: 'wave', name: 'Wave Crest', emoji: '🌊', image: 'https://picsum.photos/100/100?random=frame3' },
        { id: 'tropical', name: 'Tropical Paradise', emoji: '🏝️', image: 'https://picsum.photos/100/100?random=frame4' }
    ];
    
    // Generate 50 sample transactions
    for (let i = 0; i < 50; i++) {
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 30));
        date.setHours(Math.floor(Math.random() * 24));
        date.setMinutes(Math.floor(Math.random() * 60));
        
        const style = styles[Math.floor(Math.random() * styles.length)];
        const frame = frames[Math.floor(Math.random() * frames.length)];
        
        sampleTransactions.push({
            id: i + 1,
            datetime: date,
            style: style,
            frame: frame,
            sourceImage: `https://picsum.photos/200/300?random=${i + 1}`,
            styleImage: `https://picsum.photos/200/300?random=${i + 51}`,
            finalImage: `https://picsum.photos/200/300?random=${i + 101}`
        });
    }
    
    // Sort by date (newest first)
    sampleTransactions.sort((a, b) => b.datetime - a.datetime);
}

// Generate template data with more templates to simulate hundreds
function generateTemplateData() {
    // Generate realistic face swap templates
    faceSwapTemplates = [];
    
    const celebrityTemplates = [
        'Leonardo DiCaprio', 'Brad Pitt', 'Will Smith', 'Tom Cruise', 'Robert Downey Jr',
        'Chris Evans', 'Ryan Reynolds', 'Dwayne Johnson', 'Johnny Depp', 'Matthew McConaughey',
        'Scarlett Johansson', 'Jennifer Lawrence', 'Emma Stone', 'Margot Robbie', 'Angelina Jolie',
        'Gal Gadot', 'Emma Watson', 'Anne Hathaway', 'Natalie Portman', 'Sandra Bullock',
        'Ryan Gosling', 'Chris Hemsworth', 'Mark Wahlberg', 'Ben Affleck', 'Matt Damon'
    ];
    
    const historicalTemplates = [
        'Albert Einstein', 'Napoleon Bonaparte', 'Cleopatra', 'Abraham Lincoln', 'Winston Churchill',
        'Marie Curie', 'Leonardo da Vinci', 'Shakespeare', 'Mozart', 'Beethoven',
        'George Washington', 'Julius Caesar', 'Alexander the Great', 'Frida Kahlo', 'Van Gogh',
        'Tesla', 'Gandhi', 'Martin Luther King Jr', 'JFK', 'Marilyn Monroe'
    ];
    
    const characterTemplates = [
        'Superman', 'Batman', 'Spider-Man', 'Iron Man', 'Captain America',
        'Wonder Woman', 'Thor', 'Hulk', 'Black Widow', 'Wolverine',
        'Deadpool', 'Joker', 'Harley Quinn', 'Loki', 'Doctor Strange',
        'Flash', 'Green Lantern', 'Aquaman', 'Black Panther', 'Captain Marvel'
    ];
    
    const fantasyTemplates = [
        'Elven Warrior', 'Dragon Lord', 'Mystical Wizard', 'Forest Fairy', 'Dark Sorcerer',
        'Phoenix Guardian', 'Ice Queen', 'Fire Demon', 'Angel Warrior', 'Shadow Knight',
        'Crystal Mage', 'Storm Bringer', 'Moon Goddess', 'Sun God', 'Nature Spirit',
        'Vampire Lord', 'Werewolf Alpha', 'Demon Hunter', 'Celestial Being', 'Mythic Beast'
    ];
    
    let templateId = 1;
    
    // Generate celebrity templates
    celebrityTemplates.forEach(name => {
        faceSwapTemplates.push({
            id: templateId++,
            name: name,
            image: `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="400"%3E%3Crect fill="%23${Math.floor(Math.random()*16777215).toString(16)}" width="300" height="400"/%3E%3Ctext x="50%25" y="45%25" text-anchor="middle" dy=".3em" fill="white" font-size="18" font-family="Arial"%3E⭐ ${name.split(' ')[0]}%3C/text%3E%3Ctext x="50%25" y="55%25" text-anchor="middle" dy=".3em" fill="white" font-size="16" font-family="Arial"%3E${name.split(' ').slice(1).join(' ')}%3C/text%3E%3C/svg%3E`,
            category: 'celebrity',
            active: Math.random() > 0.6,
            type: 'faceswap',
            order: templateId - 1,
            usageCount: Math.floor(Math.random() * 800) + 100
        });
    });
    
    // Generate historical templates
    historicalTemplates.forEach(name => {
        faceSwapTemplates.push({
            id: templateId++,
            name: name,
            image: `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="400"%3E%3Crect fill="%23${Math.floor(Math.random()*16777215).toString(16)}" width="300" height="400"/%3E%3Ctext x="50%25" y="45%25" text-anchor="middle" dy=".3em" fill="white" font-size="18" font-family="Arial"%3E🏛️ ${name.split(' ')[0]}%3C/text%3E%3Ctext x="50%25" y="55%25" text-anchor="middle" dy=".3em" fill="white" font-size="16" font-family="Arial"%3E${name.split(' ').slice(1).join(' ')}%3C/text%3E%3C/svg%3E`,
            category: 'historical',
            active: Math.random() > 0.7,
            type: 'faceswap',
            order: templateId - 1,
            usageCount: Math.floor(Math.random() * 600) + 50
        });
    });
    
    // Generate character templates
    characterTemplates.forEach(name => {
        faceSwapTemplates.push({
            id: templateId++,
            name: name,
            image: `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="400"%3E%3Crect fill="%23${Math.floor(Math.random()*16777215).toString(16)}" width="300" height="400"/%3E%3Ctext x="50%25" y="45%25" text-anchor="middle" dy=".3em" fill="white" font-size="18" font-family="Arial"%3E🎭 ${name.split(' ')[0]}%3C/text%3E%3Ctext x="50%25" y="55%25" text-anchor="middle" dy=".3em" fill="white" font-size="16" font-family="Arial"%3E${name.split(' ').slice(1).join(' ')}%3C/text%3E%3C/svg%3E`,
            category: 'character',
            active: Math.random() > 0.6,
            type: 'faceswap',
            order: templateId - 1,
            usageCount: Math.floor(Math.random() * 700) + 75
        });
    });
    
    // Generate fantasy templates
    fantasyTemplates.forEach(name => {
        faceSwapTemplates.push({
            id: templateId++,
            name: name,
            image: `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="400"%3E%3Crect fill="%23${Math.floor(Math.random()*16777215).toString(16)}" width="300" height="400"/%3E%3Ctext x="50%25" y="45%25" text-anchor="middle" dy=".3em" fill="white" font-size="18" font-family="Arial"%3E🦄 ${name.split(' ')[0]}%3C/text%3E%3Ctext x="50%25" y="55%25" text-anchor="middle" dy=".3em" fill="white" font-size="16" font-family="Arial"%3E${name.split(' ').slice(1).join(' ')}%3C/text%3E%3C/svg%3E`,
            category: 'fantasy',
            active: Math.random() > 0.6,
            type: 'faceswap',
            order: templateId - 1,
            usageCount: Math.floor(Math.random() * 500) + 25
        });
    });
    
    // Pre-select some templates
    faceSwapTemplates.slice(0, 15).forEach(t => {
        t.active = true;
        selectedFaceSwapTemplates.add(t.id);
    });
    
    
    // Generate many AI effects templates
    aiEffectsTemplates = [];
    const aiCategories = ['underwater', 'fantasy', 'vintage', 'artistic'];
    const aiNames = [
        'Deep Ocean', 'Coral Reef', 'Underwater Caves', 'Shipwreck',
        'Mystical Forest', 'Dragon\'s Lair', 'Fairy Tale', 'Magic Kingdom',
        'Vintage Portrait', 'Old Hollywood', 'Retro Style', 'Classic Film',
        'Abstract Art', 'Watercolor', 'Oil Painting', 'Digital Art'
    ];
    
    // Generate 100+ AI effects templates
    for (let i = 1; i <= 100; i++) {
        const category = aiCategories[Math.floor(Math.random() * aiCategories.length)];
        const baseName = aiNames[Math.floor(Math.random() * aiNames.length)];
        aiEffectsTemplates.push({
            id: i,
            name: `${baseName} ${i}`,
            image: `https://picsum.photos/400/300?random=${i}`,
            category: category,
            active: Math.random() > 0.7,
            type: 'aieffect',
            order: i,
            usageCount: Math.floor(Math.random() * 300)
        });
    }
    
    // Pre-select some AI effects templates
    aiEffectsTemplates.slice(0, 12).forEach(t => {
        t.active = true;
        selectedAIEffectsTemplates.add(t.id);
    });
    
    // Old templates kept for reference
    const oldTemplates = [
        // Old data removed - using generated data above
    ];
}

// Setup event listeners
function setupEventListeners() {
    // Login form
    const loginForm = document.querySelector('.email-login');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Google login button
    const googleBtn = document.querySelector('.google-login-btn');
    if (googleBtn) {
        googleBtn.addEventListener('click', handleGoogleLogin);
    }
    
    // Navigation buttons
    const dashboardBtn = document.getElementById('dashboard-btn');
    const templatesBtn = document.getElementById('templates-btn');
    const settingsBtn = document.getElementById('settings-btn');
    const logoutBtn = document.getElementById('logout-btn');
    
    if (dashboardBtn) {
        dashboardBtn.addEventListener('click', () => {
            console.log('Dashboard clicked');
            showPage('dashboard');
        });
    }
    if (templatesBtn) {
        templatesBtn.addEventListener('click', () => {
            console.log('Templates clicked');
            showPage('templates');
        });
    }
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            console.log('Settings clicked');
            showPage('settings');
        });
    }
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // Template navigation
    const faceswapNav = document.getElementById('faceswap-nav');
    const aieffectsNav = document.getElementById('aieffects-nav');
    const framesNav = document.getElementById('frames-nav');
    
    if (faceswapNav) faceswapNav.addEventListener('click', () => showTemplateSection('faceswap'));
    if (aieffectsNav) aieffectsNav.addEventListener('click', () => showTemplateSection('aieffects'));
    if (framesNav) framesNav.addEventListener('click', () => showTemplateSection('frames'));
    
    // Category filters
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('category-btn')) {
            const category = e.target.dataset.category;
            filterTemplatesByCategory(category);
        }
    });
    
    // Quality settings
    document.addEventListener('change', (e) => {
        if (e.target.name === 'face-swap-quality') {
            saveFaceSwapQuality(e.target.value);
        }
    });
    
    // Filter functionality
    const applyFiltersBtn = document.getElementById('apply-filters');
    const clearFiltersBtn = document.getElementById('clear-filters');
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', applyFilters);
    }
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearFilters);
    }
    
    // Settings functionality
    const saveSettingsBtn = document.getElementById('save-settings');
    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', saveSettings);
    }
    
    const deleteAllBtn = document.getElementById('delete-all-btn');
    if (deleteAllBtn) {
        deleteAllBtn.addEventListener('click', () => showConfirmModal('Are you sure you want to delete ALL photos? This action cannot be undone.', deleteAllPhotos));
    }
    
    // Modal functionality
    const closeModal = document.getElementById('close-modal');
    const closeConfirm = document.getElementById('close-confirm');
    const cancelAction = document.getElementById('cancel-action');
    const closeTemplateModal = document.getElementById('close-template-modal');
    
    if (closeModal) closeModal.addEventListener('click', () => hideModal('image-modal'));
    if (closeConfirm) closeConfirm.addEventListener('click', () => hideModal('confirm-modal'));
    if (cancelAction) cancelAction.addEventListener('click', () => hideModal('confirm-modal'));
    if (closeTemplateModal) closeTemplateModal.addEventListener('click', () => hideModal('template-modal'));
    
    // Template modal actions
    const templateSave = document.getElementById('template-save');
    const templateDelete = document.getElementById('template-delete');
    
    if (templateSave) templateSave.addEventListener('click', saveTemplateChanges);
    if (templateDelete) templateDelete.addEventListener('click', deleteTemplate);
    
    // Modal action buttons
    const downloadAllBtn = document.getElementById('download-all');
    const printPhotoBtn = document.getElementById('print-photo');
    
    if (downloadAllBtn) downloadAllBtn.addEventListener('click', downloadAllImages);
    if (printPhotoBtn) printPhotoBtn.addEventListener('click', printPhoto);
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
}

// Authentication functions
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Mock authentication
    if (email && password) {
        localStorage.setItem('adminLoggedIn', 'true');
        localStorage.setItem('adminUser', email);
        currentUser = email;
        showDashboard();
    } else {
        alert('Please enter both email and password');
    }
}

function handleGoogleLogin() {
    // Mock Google OAuth
    localStorage.setItem('adminLoggedIn', 'true');
    localStorage.setItem('adminUser', 'admin@vantara.com');
    currentUser = 'admin@vantara.com';
    showDashboard();
}

function handleLogout() {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminUser');
    currentUser = null;
    
    // Clear timers
    if (timeoutTimer) clearTimeout(timeoutTimer);
    if (warningTimer) clearTimeout(warningTimer);
    
    // Remove activity listeners
    document.removeEventListener('click', trackActivity);
    document.removeEventListener('keypress', trackActivity);
    document.removeEventListener('mousemove', trackActivity);
    
    showLoginPage();
}

// Page navigation functions
function showLoginPage() {
    document.getElementById('login-page').style.display = 'block';
    document.getElementById('dashboard-page').style.display = 'none';
}

function showDashboard() {
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('dashboard-page').style.display = 'block';
    
    // Re-attach navigation event listeners after login
    attachNavigationListeners();
    
    showPage('dashboard');
    
    // Start session timeout
    resetSessionTimeout();
    
    // Add activity listeners
    document.addEventListener('click', trackActivity);
    document.addEventListener('keypress', trackActivity);
    document.addEventListener('mousemove', trackActivity);
}

function attachNavigationListeners() {
    // Navigation buttons
    const dashboardBtn = document.getElementById('dashboard-btn');
    const templatesBtn = document.getElementById('templates-btn');
    const settingsBtn = document.getElementById('settings-btn');
    const logoutBtn = document.getElementById('logout-btn');
    
    if (dashboardBtn) {
        dashboardBtn.onclick = () => {
            console.log('Dashboard clicked');
            showPage('dashboard');
        };
    }
    if (templatesBtn) {
        templatesBtn.onclick = () => {
            console.log('Templates clicked');
            showPage('templates');
        };
    }
    if (settingsBtn) {
        settingsBtn.onclick = () => {
            console.log('Settings clicked');
            showPage('settings');
        };
    }
    if (logoutBtn) {
        logoutBtn.onclick = handleLogout;
    }
    
    // Template navigation
    const faceswapNav = document.getElementById('faceswap-nav');
    const aieffectsNav = document.getElementById('aieffects-nav');
    
    if (faceswapNav) {
        faceswapNav.onclick = () => showTemplateSection('faceswap');
    }
    if (aieffectsNav) {
        aieffectsNav.onclick = () => showTemplateSection('aieffects');
    }
    
    // View tab switching
    setupViewTabSwitching();
    
    // Search functionality
    setupSearchFunctionality();
    
    // Category filtering
    setupCategoryFiltering();
    
    // Auto-sort toggles
    setupAutoSortToggles();
    
    // Debug: Add test button for templates
    setTimeout(() => {
        console.log('Templates after init:');
        console.log('Face Swap Templates:', faceSwapTemplates.length, faceSwapTemplates.slice(0, 3));
        console.log('AI Effects Templates:', aiEffectsTemplates.length, aiEffectsTemplates.slice(0, 3));
        
        // Add global function to reset templates for debugging
        window.resetTemplates = function() {
            localStorage.removeItem('faceSwapTemplates');
            localStorage.removeItem('aiEffectsTemplates');
            console.log('LocalStorage cleared. Refresh the page to see new templates.');
        };
        console.log('Run resetTemplates() in console to clear localStorage and see fresh templates');
    }, 1000);
}

function showPage(page) {
    currentPage = page;
    console.log('Showing page:', page);
    
    // Update navigation buttons
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById(`${page}-btn`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    
    // Show/hide page content
    const transactionDash = document.getElementById('transaction-dashboard');
    const templatesDash = document.getElementById('templates-dashboard');
    const settingsDash = document.getElementById('settings-dashboard');
    
    if (transactionDash) transactionDash.style.display = page === 'dashboard' ? 'block' : 'none';
    if (templatesDash) templatesDash.style.display = page === 'templates' ? 'block' : 'none';
    if (settingsDash) settingsDash.style.display = page === 'settings' ? 'block' : 'none';
    
    if (page === 'dashboard') {
        populateTransactionsTable();
    } else if (page === 'templates') {
        console.log('Loading templates section');
        showTemplateSection(currentTemplateSection);
    }
}

// Transaction table functions
function populateTransactionsTable() {
    const tbody = document.getElementById('transactions-tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    sampleTransactions.forEach(transaction => {
        const row = createTransactionRow(transaction);
        tbody.appendChild(row);
    });
}

function createTransactionRow(transaction) {
    const row = document.createElement('tr');
    
    const formattedDate = transaction.datetime.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    row.innerHTML = `
        <td>${formattedDate}</td>
        <td>
            <img src="${transaction.sourceImage}" alt="Source" class="thumbnail" 
                 onclick="showImageModal(${transaction.id})">
        </td>
        <td>
            <div style="display: flex; align-items: center; gap: 10px;">
                <img src="${transaction.style.image}" alt="${transaction.style.name}" class="style-thumbnail">
                <div>
                    <div style="font-weight: 600; color: #2c3e50;">${transaction.style.name}</div>
                    <div style="font-size: 20px; margin-top: 4px;">${transaction.style.emoji}</div>
                </div>
            </div>
        </td>
        <td>
            <div style="display: flex; align-items: center; gap: 10px;">
                <img src="${transaction.frame.image}" alt="${transaction.frame.name}" class="frame-thumbnail">
                <div>
                    <div style="font-weight: 600; color: #2c3e50;">${transaction.frame.name}</div>
                    <div style="font-size: 20px; margin-top: 4px;">${transaction.frame.emoji}</div>
                </div>
            </div>
        </td>
        <td>
            <img src="${transaction.finalImage}" alt="Final" class="thumbnail" 
                 onclick="showImageModal(${transaction.id})">
        </td>
        <td>
            <button class="action-btn download-btn" onclick="downloadImage(${transaction.id})">
                <i class="fas fa-download"></i>
                Download
            </button>
            <button class="action-btn print-btn" onclick="printImage(${transaction.id})">
                <i class="fas fa-print"></i>
                Print
            </button>
        </td>
    `;
    
    return row;
}

// Filter functions
function applyFilters() {
    const dateFrom = document.getElementById('date-from').value;
    const dateTo = document.getElementById('date-to').value;
    
    let filteredTransactions = [...sampleTransactions];
    
    // Apply date filter
    if (dateFrom) {
        const fromDate = new Date(dateFrom);
        filteredTransactions = filteredTransactions.filter(t => t.datetime >= fromDate);
    }
    
    if (dateTo) {
        const toDate = new Date(dateTo);
        toDate.setHours(23, 59, 59, 999);
        filteredTransactions = filteredTransactions.filter(t => t.datetime <= toDate);
    }
    
    // Update table with filtered results
    updateTransactionTable(filteredTransactions);
    
    // Show notification
    const resultCount = filteredTransactions.length;
    showNotification(`Found ${resultCount} photo${resultCount !== 1 ? 's' : ''} in the selected date range`, 'info');
}

function clearFilters() {
    // Clear date inputs
    document.getElementById('date-from').value = '';
    document.getElementById('date-to').value = '';
    
    // Show all transactions
    updateTransactionTable(sampleTransactions);
    
    showNotification('Filters cleared - showing all photos', 'info');
}

function updateTransactionTable(transactions) {
    const tbody = document.getElementById('transactions-tbody');
    tbody.innerHTML = '';
    
    transactions.forEach(transaction => {
        const row = createTransactionRow(transaction);
        tbody.appendChild(row);
    });
}

// Modal functions
function showImageModal(transactionId) {
    const transaction = sampleTransactions.find(t => t.id === transactionId);
    if (!transaction) return;
    
    // Populate modal with transaction data
    document.getElementById('source-image').src = transaction.sourceImage;
    document.getElementById('style-image').src = transaction.styleImage;
    document.getElementById('final-image').src = transaction.finalImage;
    
    document.getElementById('photo-datetime').textContent = transaction.datetime.toLocaleString();
    document.getElementById('photo-frame').textContent = transaction.frame.name;
    document.getElementById('photo-style').textContent = transaction.style.name;
    
    // Store current transaction for actions
    document.getElementById('image-modal').dataset.transactionId = transactionId;
    
    // Show modal
    document.getElementById('image-modal').style.display = 'block';
}

function showConfirmModal(message, callback) {
    document.getElementById('confirm-message').textContent = message;
    document.getElementById('confirm-action').onclick = () => {
        callback();
        hideModal('confirm-modal');
    };
    document.getElementById('confirm-modal').style.display = 'block';
}

function hideModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Action functions
function downloadImage(transactionId) {
    const transaction = sampleTransactions.find(t => t.id === transactionId);
    if (!transaction) return;
    
    // Mock download
    const link = document.createElement('a');
    link.href = transaction.finalImage;
    link.download = `vantara-photo-${transactionId}.jpg`;
    link.click();
    
    showNotification('Download started!', 'success');
}

function printImage(transactionId) {
    const transaction = sampleTransactions.find(t => t.id === transactionId);
    if (!transaction) return;
    
    // Mock print
    window.open(transaction.finalImage, '_blank');
    showNotification('Print dialog opened!', 'info');
}

function downloadAllImages() {
    const transactionId = document.getElementById('image-modal').dataset.transactionId;
    const transaction = sampleTransactions.find(t => t.id == transactionId);
    if (!transaction) return;
    
    // Mock download all
    [transaction.sourceImage, transaction.styleImage, transaction.finalImage].forEach((img, index) => {
        const link = document.createElement('a');
        link.href = img;
        link.download = `vantara-photo-${transactionId}-${index + 1}.jpg`;
        link.click();
    });
    
    showNotification('All images download started!', 'success');
    hideModal('image-modal');
}

function printPhoto() {
    const transactionId = document.getElementById('image-modal').dataset.transactionId;
    const transaction = sampleTransactions.find(t => t.id == transactionId);
    if (!transaction) return;
    
    // Mock print
    window.open(transaction.finalImage, '_blank');
    showNotification('Print dialog opened!', 'info');
    hideModal('image-modal');
}

// Settings functions
function saveSettings() {
    const retentionDays = document.getElementById('retention-days').value;
    const autoCleanup = document.getElementById('auto-cleanup').checked;
    const timeout = document.getElementById('session-timeout').value;
    const boothTimeout = document.getElementById('booth-timeout').value;
    
    // Update session timeout
    sessionTimeout = parseInt(timeout);
    
    // Mock save settings
    localStorage.setItem('retentionDays', retentionDays);
    localStorage.setItem('autoCleanup', autoCleanup);
    localStorage.setItem('sessionTimeout', timeout);
    localStorage.setItem('photoBoothTimeout', boothTimeout);
    
    // Restart timeout timer with new settings
    if (currentUser) {
        resetSessionTimeout();
    }
    
    // Update photo booth timeout if needed
    updatePhotoBoothTimeout(parseInt(boothTimeout));
    
    showNotification('Settings saved successfully!', 'success');
}

// Function to update photo booth timeout
function updatePhotoBoothTimeout(seconds) {
    // This would communicate with the photo booth app
    // For now, just show a notification
    showNotification(`Photo booth timeout updated to ${seconds} seconds`, 'info');
}

function deleteAllPhotos() {
    // Mock delete all
    sampleTransactions.length = 0;
    populateTransactionsTable();
    showNotification('All photos deleted!', 'success');
}

// Utility functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '9999',
        animation: 'slideIn 0.3s ease'
    });
    
    // Set background color based on type
    const colors = {
        success: '#27ae60',
        error: '#e74c3c',
        warning: '#f39c12',
        info: '#3498db'
    };
    
    notification.style.backgroundColor = colors[type] || colors.info;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Session timeout management
function resetSessionTimeout() {
    lastActivity = Date.now();
    
    // Clear existing timers
    if (timeoutTimer) clearTimeout(timeoutTimer);
    if (warningTimer) clearTimeout(warningTimer);
    
    // Don't set timeout if disabled
    if (sessionTimeout === 0) return;
    
    // Set warning timer (5 minutes before timeout)
    const warningTime = Math.max(0, (sessionTimeout - 5) * 60 * 1000);
    if (warningTime > 0) {
        warningTimer = setTimeout(() => {
            showTimeoutWarning();
        }, warningTime);
    }
    
    // Set logout timer
    timeoutTimer = setTimeout(() => {
        showNotification('Session expired. Logging out...', 'warning');
        setTimeout(() => {
            handleLogout();
        }, 2000);
    }, sessionTimeout * 60 * 1000);
}

function showTimeoutWarning() {
    const remainingTime = Math.ceil((sessionTimeout * 60 * 1000 - (Date.now() - lastActivity)) / 60000);
    
    showNotification(
        `Session will expire in ${remainingTime} minute${remainingTime !== 1 ? 's' : ''}. Click anywhere to stay logged in.`,
        'warning'
    );
}

function trackActivity() {
    resetSessionTimeout();
}

// Template management functions
function showTemplateSection(section) {
    currentTemplateSection = section;
    console.log('Showing template section:', section);
    console.log('Available templates:', section === 'faceswap' ? faceSwapTemplates.length : 
                                         section === 'aieffects' ? aiEffectsTemplates.length : 
                                         framesTemplates.length);
    
    // Update template navigation
    document.querySelectorAll('.template-nav-btn').forEach(btn => btn.classList.remove('active'));
    const navBtn = document.getElementById(`${section}-nav`);
    if (navBtn) navBtn.classList.add('active');
    
    // Show/hide sections
    const faceswapSection = document.getElementById('faceswap-section');
    const aieffectsSection = document.getElementById('aieffects-section');
    const framesSection = document.getElementById('frames-section');
    
    if (faceswapSection) faceswapSection.style.display = section === 'faceswap' ? 'block' : 'none';
    if (aieffectsSection) aieffectsSection.style.display = section === 'aieffects' ? 'block' : 'none';
    if (framesSection) framesSection.style.display = section === 'frames' ? 'block' : 'none';
    
    if (section === 'faceswap') {
        // Initialize with gallery view
        console.log('Switching to face swap gallery view...');
        switchTemplateView('faceswap', 'gallery');
        loadFaceSwapQuality();
    } else if (section === 'aieffects') {
        // Initialize with gallery view
        console.log('Switching to AI effects gallery view...');
        switchTemplateView('aieffects', 'gallery');
    } else if (section === 'frames') {
        // Initialize with gallery view
        console.log('Initializing frames section...');
        switchTemplateView('frames', 'gallery');
        setupFramesEventListeners();
        console.log('Frames event listeners setup complete');
    }
}

// Legacy functions removed - using new dual-view system

function saveTemplateChanges() {
    const modal = document.getElementById('template-modal');
    const templateId = parseInt(modal.dataset.templateId);
    const type = modal.dataset.templateType;
    const isActive = document.getElementById('template-active-toggle').checked;
    
    toggleTemplateStatus(templateId, type, isActive);
    hideModal('template-modal');
}

function deleteTemplate() {
    const modal = document.getElementById('template-modal');
    const templateId = parseInt(modal.dataset.templateId);
    const type = modal.dataset.templateType;
    
    const templates = type === 'faceswap' ? faceSwapTemplates : aiEffectsTemplates;
    const template = templates.find(t => t.id === templateId);
    
    if (template) {
        showConfirmModal(
            `Are you sure you want to delete the template "${template.name}"? This action cannot be undone.`,
            () => {
                const index = templates.findIndex(t => t.id === templateId);
                if (index > -1) {
                    templates.splice(index, 1);
                    saveTemplateSettings();
                    
                    if (type === 'faceswap') {
                        populateFaceSwapTemplates();
                    } else {
                        populateAIEffectsTemplates();
                    }
                    
                    showNotification(`Template "${template.name}" deleted successfully`, 'success');
                    hideModal('template-modal');
                }
            }
        );
    }
}

function saveFaceSwapQuality(quality) {
    localStorage.setItem('faceSwapQuality', quality);
    showNotification(`Face swap quality set to ${quality === 'fast' ? 'Fast & Lower Quality' : 'Slow & Higher Quality'}`, 'success');
}

function loadFaceSwapQuality() {
    const savedQuality = localStorage.getItem('faceSwapQuality');
    if (savedQuality) {
        const radio = document.querySelector(`input[name="face-swap-quality"][value="${savedQuality}"]`);
        if (radio) {
            radio.checked = true;
        }
    }
}

function saveTemplateSettings() {
    localStorage.setItem('faceSwapTemplates', JSON.stringify(faceSwapTemplates));
    localStorage.setItem('aiEffectsTemplates', JSON.stringify(aiEffectsTemplates));
}

function loadTemplateSettings() {
    const savedFaceSwap = localStorage.getItem('faceSwapTemplates');
    const savedAIEffects = localStorage.getItem('aiEffectsTemplates');
    
    // Only load if templates haven't been generated yet or are empty
    if (savedFaceSwap && faceSwapTemplates.length === 0) {
        try {
            const parsed = JSON.parse(savedFaceSwap);
            // Only use saved data if it looks valid (has expected structure)
            if (parsed && parsed.length > 0 && parsed[0].category && parsed[0].name) {
                faceSwapTemplates = parsed;
                console.log('Loaded saved face swap templates:', faceSwapTemplates.length);
            }
        } catch (e) {
            console.error('Error loading face swap templates:', e);
        }
    }
    
    if (savedAIEffects && aiEffectsTemplates.length === 0) {
        try {
            const parsed = JSON.parse(savedAIEffects);
            // Only use saved data if it looks valid
            if (parsed && parsed.length > 0 && parsed[0].category && parsed[0].name) {
                aiEffectsTemplates = parsed;
                console.log('Loaded saved AI effects templates:', aiEffectsTemplates.length);
            }
        } catch (e) {
            console.error('Error loading AI effects templates:', e);
        }
    }
    
    console.log('After loading settings - Face Swap:', faceSwapTemplates.length, 'AI Effects:', aiEffectsTemplates.length);
}

// Load saved settings on page load
function loadSettings() {
    const retentionDays = localStorage.getItem('retentionDays');
    const autoCleanup = localStorage.getItem('autoCleanup');
    const timeout = localStorage.getItem('sessionTimeout');
    const boothTimeout = localStorage.getItem('photoBoothTimeout');
    
    if (retentionDays) {
        document.getElementById('retention-days').value = retentionDays;
    }
    
    if (autoCleanup !== null) {
        document.getElementById('auto-cleanup').checked = autoCleanup === 'true';
    }
    
    if (timeout) {
        sessionTimeout = parseInt(timeout);
        document.getElementById('session-timeout').value = timeout;
    }
    
    if (boothTimeout) {
        document.getElementById('booth-timeout').value = boothTimeout;
    }
}

// Initialize settings when settings page is shown
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(loadSettings, 100);
});

// New Template Management Functions

// Setup view tab switching
function setupViewTabSwitching() {
    // Face swap tabs
    const faceswapGalleryTab = document.getElementById('faceswap-gallery-tab');
    const faceswapSelectedTab = document.getElementById('faceswap-selected-tab');
    
    if (faceswapGalleryTab) {
        faceswapGalleryTab.addEventListener('click', () => switchTemplateView('faceswap', 'gallery'));
    }
    if (faceswapSelectedTab) {
        faceswapSelectedTab.addEventListener('click', () => switchTemplateView('faceswap', 'selected'));
    }
    
    // AI effects tabs
    const aieffectsGalleryTab = document.getElementById('aieffects-gallery-tab');
    const aieffectsSelectedTab = document.getElementById('aieffects-selected-tab');
    
    if (aieffectsGalleryTab) {
        aieffectsGalleryTab.addEventListener('click', () => switchTemplateView('aieffects', 'gallery'));
    }
    if (aieffectsSelectedTab) {
        aieffectsSelectedTab.addEventListener('click', () => switchTemplateView('aieffects', 'selected'));
    }
}

// Switch between gallery and selected views
function switchTemplateView(section, view) {
    console.log(`Switching ${section} to ${view} view`);
    
    if (section === 'faceswap') {
        currentFaceSwapView = view;
        
        // Update tab states
        const galleryTab = document.getElementById('faceswap-gallery-tab');
        const selectedTab = document.getElementById('faceswap-selected-tab');
        
        if (galleryTab) galleryTab.classList.toggle('active', view === 'gallery');
        if (selectedTab) selectedTab.classList.toggle('active', view === 'selected');
        
        // Show/hide views
        const galleryView = document.getElementById('faceswap-gallery-view');
        const selectedView = document.getElementById('faceswap-selected-view');
        
        if (galleryView) galleryView.style.display = view === 'gallery' ? 'block' : 'none';
        if (selectedView) selectedView.style.display = view === 'selected' ? 'block' : 'none';
        
        // Clear any existing filters when switching to gallery
        if (view === 'gallery') {
            filteredFaceSwapTemplates = []; // Clear filters to show all templates
        }
        
        // Populate appropriate view
        if (view === 'gallery') {
            populateFaceSwapGallery();
        } else {
            populateFaceSwapSelected();
        }
    } else {
        currentAIEffectsView = view;
        
        // Update tab states
        const galleryTab = document.getElementById('aieffects-gallery-tab');
        const selectedTab = document.getElementById('aieffects-selected-tab');
        
        if (galleryTab) galleryTab.classList.toggle('active', view === 'gallery');
        if (selectedTab) selectedTab.classList.toggle('active', view === 'selected');
        
        // Show/hide views
        const galleryView = document.getElementById('aieffects-gallery-view');
        const selectedView = document.getElementById('aieffects-selected-view');
        
        if (galleryView) galleryView.style.display = view === 'gallery' ? 'block' : 'none';
        if (selectedView) selectedView.style.display = view === 'selected' ? 'block' : 'none';
        
        // Clear any existing filters when switching to gallery
        if (view === 'gallery') {
            filteredAIEffectsTemplates = []; // Clear filters to show all templates
        }
        
        // Populate appropriate view
        if (view === 'gallery') {
            populateAIEffectsGallery();
        } else {
            populateAIEffectsSelected();
        }
    } else if (section === 'frames') {
        currentFramesView = view;
        
        // Update tab states
        const galleryTab = document.getElementById('frames-gallery-tab');
        const selectedTab = document.getElementById('frames-selected-tab');
        
        if (galleryTab) galleryTab.classList.toggle('active', view === 'gallery');
        if (selectedTab) selectedTab.classList.toggle('active', view === 'selected');
        
        // Show/hide views
        const galleryView = document.getElementById('frames-gallery-view');
        const selectedView = document.getElementById('frames-selected-view');
        
        if (galleryView) galleryView.style.display = view === 'gallery' ? 'block' : 'none';
        if (selectedView) selectedView.style.display = view === 'selected' ? 'block' : 'none';
        
        // Populate appropriate view
        if (view === 'selected') {
            populateFramesSelected();
        }
    }
}

// Setup search functionality
function setupSearchFunctionality() {
    const faceswapSearch = document.getElementById('faceswap-search');
    const aieffectsSearch = document.getElementById('aieffects-search');
    
    if (faceswapSearch) {
        faceswapSearch.addEventListener('input', (e) => filterTemplates('faceswap', e.target.value));
    }
    if (aieffectsSearch) {
        aieffectsSearch.addEventListener('input', (e) => filterTemplates('aieffects', e.target.value));
    }
}

// Setup category filtering
function setupCategoryFiltering() {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('category-btn')) {
            const category = e.target.dataset.category;
            const section = e.target.dataset.section;
            
            if (section) {
                // Update active state
                const categoryBtns = document.querySelectorAll(`[data-section="${section}"] .category-btn`);
                categoryBtns.forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                
                // Filter templates
                filterByCategory(section, category);
            }
        }
    });
}

// Filter templates by search and category
function filterTemplates(section, searchTerm) {
    if (section === 'faceswap') {
        const activeCategory = document.querySelector('[data-section="faceswap"] .category-btn.active')?.dataset.category || 'all';
        filteredFaceSwapTemplates = faceSwapTemplates.filter(template => {
            const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = activeCategory === 'all' || template.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
        populateFaceSwapGallery();
    } else {
        const activeCategory = document.querySelector('[data-section="aieffects"] .category-btn.active')?.dataset.category || 'all';
        filteredAIEffectsTemplates = aiEffectsTemplates.filter(template => {
            const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = activeCategory === 'all' || template.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
        populateAIEffectsGallery();
    }
}

// Filter by category
function filterByCategory(section, category) {
    const searchInput = document.getElementById(`${section}-search`);
    const searchTerm = searchInput ? searchInput.value : '';
    
    if (section === 'faceswap') {
        filteredFaceSwapTemplates = faceSwapTemplates.filter(template => {
            const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = category === 'all' || template.category === category;
            return matchesSearch && matchesCategory;
        });
        populateFaceSwapGallery();
    } else {
        filteredAIEffectsTemplates = aiEffectsTemplates.filter(template => {
            const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = category === 'all' || template.category === category;
            return matchesSearch && matchesCategory;
        });
        populateAIEffectsGallery();
    }
}

// Populate face swap gallery view
function populateFaceSwapGallery() {
    console.log('Populating face swap gallery...');
    const grid = document.getElementById('faceswap-gallery-grid');
    if (!grid) {
        console.error('Face swap gallery grid not found!');
        return;
    }
    
    grid.innerHTML = '';
    
    console.log('Total faceSwapTemplates:', faceSwapTemplates.length);
    console.log('Filtered faceSwapTemplates:', filteredFaceSwapTemplates.length);
    
    // Use filtered templates if available, otherwise use all templates
    const templates = filteredFaceSwapTemplates.length > 0 ? filteredFaceSwapTemplates : faceSwapTemplates;
    
    console.log('Templates to display:', templates.length);
    
    if (templates.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h4>No templates found</h4>
                <p>Try adjusting your search or category filters. Total available: ${faceSwapTemplates.length}</p>
            </div>
        `;
        return;
    }
    
    templates.forEach((template, index) => {
        console.log(`Creating card ${index + 1}:`, template.name);
        const card = createGalleryTemplateCard(template, 'faceswap');
        grid.appendChild(card);
    });
    
    updateSelectedCount('faceswap');
    console.log('Face swap gallery populated with', templates.length, 'templates');
}

// Populate AI effects gallery view
function populateAIEffectsGallery() {
    const grid = document.getElementById('aieffects-gallery-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    // Use filtered templates or all templates
    const templates = filteredAIEffectsTemplates.length > 0 ? filteredAIEffectsTemplates : aiEffectsTemplates;
    
    if (templates.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h4>No templates found</h4>
                <p>Try adjusting your search or category filters</p>
            </div>
        `;
        return;
    }
    
    templates.forEach(template => {
        const card = createGalleryTemplateCard(template, 'aieffects');
        grid.appendChild(card);
    });
    
    updateSelectedCount('aieffects');
}

// Populate face swap selected view
function populateFaceSwapSelected() {
    const grid = document.getElementById('faceswap-selected-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    const selectedTemplates = faceSwapTemplates.filter(t => selectedFaceSwapTemplates.has(t.id));
    
    if (selectedTemplates.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-image"></i>
                <h4>No templates selected</h4>
                <p>Go to Browse Templates to select some face swap templates</p>
            </div>
        `;
        return;
    }
    
    // Sort by usage if auto-sort is enabled, otherwise by order
    const sortedTemplates = autoSortFaceSwap 
        ? selectedTemplates.sort((a, b) => b.usageCount - a.usageCount)
        : selectedTemplates.sort((a, b) => a.order - b.order);
    
    sortedTemplates.forEach((template, index) => {
        const card = createSelectedTemplateCard(template, 'faceswap', index + 1);
        grid.appendChild(card);
    });
}

// Populate AI effects selected view
function populateAIEffectsSelected() {
    const grid = document.getElementById('aieffects-selected-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    const selectedTemplates = aiEffectsTemplates.filter(t => selectedAIEffectsTemplates.has(t.id));
    
    if (selectedTemplates.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-magic"></i>
                <h4>No templates selected</h4>
                <p>Go to Browse Templates to select some AI effects templates</p>
            </div>
        `;
        return;
    }
    
    // Sort by usage if auto-sort is enabled, otherwise by order
    const sortedTemplates = autoSortAIEffects 
        ? selectedTemplates.sort((a, b) => b.usageCount - a.usageCount)
        : selectedTemplates.sort((a, b) => a.order - b.order);
    
    sortedTemplates.forEach((template, index) => {
        const card = createSelectedTemplateCard(template, 'aieffects', index + 1);
        grid.appendChild(card);
    });
}

// Create gallery template card (with selection checkbox)
function createGalleryTemplateCard(template, section) {
    const card = document.createElement('div');
    const isSelected = section === 'faceswap' ? selectedFaceSwapTemplates.has(template.id) : selectedAIEffectsTemplates.has(template.id);
    
    card.className = `template-card gallery-mode ${isSelected ? 'selected' : ''}`;
    card.dataset.templateId = template.id;
    card.dataset.templateType = section;
    
    card.innerHTML = `
        <div class="selection-checkbox" onclick="toggleTemplateSelection(${template.id}, '${section}')">
            ${isSelected ? '<i class="fas fa-check"></i>' : ''}
        </div>
        <div class="template-image-container">
            <img src="${template.image}" alt="${template.name}" class="template-image">
            <div class="usage-stats">
                <i class="fas fa-chart-line"></i>
                ${template.usageCount || 0} uses
            </div>
        </div>
        <div class="template-card-content">
            <div class="template-card-header">
                <div class="template-title">${template.name}</div>
                <span class="template-category-tag" style="background-color: ${getCategoryColor(template.category || 'unknown')}">
                    ${template.category ? template.category.charAt(0).toUpperCase() + template.category.slice(1) : 'Unknown'}
                </span>
            </div>
        </div>
    `;
    
    // Add click handler for selection
    card.addEventListener('click', (e) => {
        if (!e.target.classList.contains('selection-checkbox')) {
            toggleTemplateSelection(template.id, section);
        }
    });
    
    return card;
}

// Create selected template card (for reordering)
function createSelectedTemplateCard(template, section, position) {
    const card = document.createElement('div');
    card.className = 'template-card selected-mode';
    card.dataset.templateId = template.id;
    card.dataset.templateType = section;
    card.draggable = true;
    
    card.innerHTML = `
        <div class="selection-badge">${position}</div>
        <div class="template-image-container">
            <img src="${template.image}" alt="${template.name}" class="template-image">
            <div class="usage-stats">
                <i class="fas fa-chart-line"></i>
                ${template.usageCount || 0} uses
            </div>
        </div>
        <div class="template-card-content">
            <div class="template-card-header">
                <div class="template-title">${template.name}</div>
                <span class="template-category-tag" style="background-color: ${getCategoryColor(template.category || 'unknown')}">
                    ${template.category ? template.category.charAt(0).toUpperCase() + template.category.slice(1) : 'Unknown'}
                </span>
            </div>
            <div class="template-actions">
                <button class="remove-btn" onclick="toggleTemplateSelection(${template.id}, '${section}')">
                    <i class="fas fa-times"></i>
                    Remove
                </button>
            </div>
        </div>
    `;
    
    // Add drag and drop events
    setupDragAndDrop(card, section);
    
    return card;
}

// Toggle template selection
function toggleTemplateSelection(templateId, section) {
    if (section === 'faceswap') {
        if (selectedFaceSwapTemplates.has(templateId)) {
            selectedFaceSwapTemplates.delete(templateId);
        } else {
            selectedFaceSwapTemplates.add(templateId);
        }
        updateSelectedCount('faceswap');
        // Refresh current view
        if (currentFaceSwapView === 'gallery') {
            populateFaceSwapGallery();
        } else {
            populateFaceSwapSelected();
        }
    } else {
        if (selectedAIEffectsTemplates.has(templateId)) {
            selectedAIEffectsTemplates.delete(templateId);
        } else {
            selectedAIEffectsTemplates.add(templateId);
        }
        updateSelectedCount('aieffects');
        // Refresh current view
        if (currentAIEffectsView === 'gallery') {
            populateAIEffectsGallery();
        } else {
            populateAIEffectsSelected();
        }
    }
}

// Update selected count in UI
function updateSelectedCount(section) {
    const count = section === 'faceswap' ? selectedFaceSwapTemplates.size : selectedAIEffectsTemplates.size;
    
    const countElements = [
        document.getElementById(`${section}-count`),
        document.getElementById(`${section}-selected-count`)
    ];
    
    countElements.forEach(element => {
        if (element) element.textContent = count;
    });
}

// Get category color
function getCategoryColor(category) {
    const colors = {
        celebrity: '#f39c12',
        historical: '#9b59b6',
        character: '#e74c3c',
        fantasy: '#1abc9c',
        underwater: '#3498db',
        vintage: '#e67e22',
        artistic: '#e91e63'
    };
    return colors[category] || '#95a5a6';
}

// Setup drag and drop for selected templates
function setupDragAndDrop(card, section) {
    card.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', card.dataset.templateId);
        e.dataTransfer.effectAllowed = 'move';
        card.classList.add('dragging');
    });
    
    card.addEventListener('dragend', (e) => {
        card.classList.remove('dragging');
        // Remove all drag-over classes
        document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
    });
    
    card.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        
        // Only add drag-over if not dragging this card
        if (!card.classList.contains('dragging')) {
            card.classList.add('drag-over');
        }
    });
    
    card.addEventListener('dragleave', (e) => {
        // Only remove if we're actually leaving the card (not just moving to a child element)
        if (!card.contains(e.relatedTarget)) {
            card.classList.remove('drag-over');
        }
    });
    
    card.addEventListener('drop', (e) => {
        e.preventDefault();
        card.classList.remove('drag-over');
        
        const draggedId = parseInt(e.dataTransfer.getData('text/plain'));
        const targetId = parseInt(card.dataset.templateId);
        
        if (draggedId !== targetId) {
            reorderTemplates(draggedId, targetId, section);
        }
    });
}

// Reorder templates after drag and drop
function reorderTemplates(draggedId, targetId, section) {
    console.log(`Reordering: dragged ${draggedId} to target ${targetId} in ${section}`);
    
    const selectedSet = section === 'faceswap' ? selectedFaceSwapTemplates : selectedAIEffectsTemplates;
    const templates = section === 'faceswap' ? faceSwapTemplates : aiEffectsTemplates;
    
    // Get only the selected templates for reordering
    const selectedTemplates = templates.filter(t => selectedSet.has(t.id));
    
    if (selectedTemplates.length === 0) return;
    
    // Find the dragged and target templates
    const draggedTemplate = selectedTemplates.find(t => t.id === draggedId);
    const targetTemplate = selectedTemplates.find(t => t.id === targetId);
    
    if (!draggedTemplate || !targetTemplate) return;
    
    // Get current positions in the selected array
    const draggedIndex = selectedTemplates.indexOf(draggedTemplate);
    const targetIndex = selectedTemplates.indexOf(targetTemplate);
    
    // Remove dragged template from its current position
    selectedTemplates.splice(draggedIndex, 1);
    
    // Insert dragged template at target position
    const newTargetIndex = targetIndex > draggedIndex ? targetIndex - 1 : targetIndex;
    selectedTemplates.splice(newTargetIndex, 0, draggedTemplate);
    
    // Update order values based on new positions
    selectedTemplates.forEach((template, index) => {
        template.order = index + 1;
    });
    
    console.log('Reordered templates:', selectedTemplates.map(t => `${t.name}(${t.order})`));
    
    // Refresh the selected view
    if (section === 'faceswap') {
        populateFaceSwapSelected();
    } else {
        populateAIEffectsSelected();
    }
}

// Setup auto-sort toggles
function setupAutoSortToggles() {
    const faceswapAutoSort = document.getElementById('faceswap-auto-sort');
    const aieffectsAutoSort = document.getElementById('aieffects-auto-sort');
    
    if (faceswapAutoSort) {
        faceswapAutoSort.addEventListener('change', (e) => {
            autoSortFaceSwap = e.target.checked;
            if (currentFaceSwapView === 'selected') {
                populateFaceSwapSelected();
            }
        });
    }
    
    if (aieffectsAutoSort) {
        aieffectsAutoSort.addEventListener('change', (e) => {
            autoSortAIEffects = e.target.checked;
            if (currentAIEffectsView === 'selected') {
                populateAIEffectsSelected();
            }
        });
    }
}

// Frames management functions
function setupFramesEventListeners() {
    // Setup view tabs for frames
    const framesGalleryTab = document.getElementById('frames-gallery-tab');
    const framesSelectedTab = document.getElementById('frames-selected-tab');
    
    if (framesGalleryTab) {
        framesGalleryTab.addEventListener('click', () => {
            switchTemplateView('frames', 'gallery');
        });
    }
    
    if (framesSelectedTab) {
        framesSelectedTab.addEventListener('click', () => {
            switchTemplateView('frames', 'selected');
        });
    }
    
    // Setup frame selection using event delegation
    const framesGalleryGrid = document.getElementById('frames-gallery-grid');
    if (framesGalleryGrid) {
        console.log('Setting up click handler for frames gallery grid');
        framesGalleryGrid.addEventListener('click', (e) => {
            console.log('Frame gallery clicked', e.target);
            
            // Check if clicked element is part of the template action button
            const actionBtn = e.target.closest('.template-action-btn');
            if (actionBtn) {
                e.stopPropagation();
                const card = actionBtn.closest('.template-card');
                if (card) {
                    const frameId = card.dataset.id;
                    console.log('Toggling frame selection for:', frameId);
                    toggleFrameSelection(frameId);
                }
            }
            
            // Also handle clicks on the card itself
            const card = e.target.closest('.template-card');
            if (card && !actionBtn) {
                const frameId = card.dataset.id;
                console.log('Card clicked, toggling frame:', frameId);
                toggleFrameSelection(frameId);
            }
        });
    } else {
        console.log('Frames gallery grid not found!');
    }
    
    // Setup frames search
    const framesSearch = document.getElementById('frames-search');
    if (framesSearch) {
        framesSearch.addEventListener('input', (e) => {
            filterFrames(e.target.value);
        });
    }
    
    // Setup auto-sort for frames
    const framesAutoSort = document.getElementById('frames-auto-sort');
    if (framesAutoSort) {
        framesAutoSort.addEventListener('change', (e) => {
            autoSortFrames = e.target.checked;
            if (currentFramesView === 'selected') {
                populateFramesSelected();
            }
        });
    }
    
    // Setup category filters for frames
    document.querySelectorAll('.category-btn[data-section="frames"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class from all buttons in this section
            document.querySelectorAll('.category-btn[data-section="frames"]').forEach(b => {
                b.classList.remove('active');
            });
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Filter frames by category
            const category = btn.dataset.category;
            const cards = document.querySelectorAll('#frames-gallery-grid .template-card');
            
            cards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

window.toggleFrameSelection = function(frameId) {
    console.log('toggleFrameSelection called with frameId:', frameId);
    const card = document.querySelector(`#frames-gallery-grid .template-card[data-id="${frameId}"]`);
    if (!card) {
        console.log('Card not found for frameId:', frameId);
        return;
    }
    console.log('Card found:', card);
    
    if (selectedFramesTemplates.has(frameId)) {
        selectedFramesTemplates.delete(frameId);
        card.classList.remove('selected');
        card.querySelector('.template-action-btn i').className = 'fas fa-plus';
    } else {
        selectedFramesTemplates.add(frameId);
        card.classList.add('selected');
        card.querySelector('.template-action-btn i').className = 'fas fa-check';
    }
    
    updateFramesCount();
    if (currentFramesView === 'selected') {
        populateFramesSelected();
    }
}

function updateFramesCount() {
    const countElement = document.getElementById('frames-count');
    const selectedCountElement = document.getElementById('frames-selected-count');
    
    if (countElement) {
        countElement.textContent = selectedFramesTemplates.size;
    }
    if (selectedCountElement) {
        selectedCountElement.textContent = selectedFramesTemplates.size;
    }
}

function filterFrames(searchTerm) {
    const cards = document.querySelectorAll('#frames-gallery-grid .template-card');
    const term = searchTerm.toLowerCase();
    
    cards.forEach(card => {
        const title = card.querySelector('.template-info h4').textContent.toLowerCase();
        const category = card.querySelector('.template-category').textContent.toLowerCase();
        
        if (title.includes(term) || category.includes(term)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function populateFramesSelected() {
    const grid = document.getElementById('frames-selected-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (selectedFramesTemplates.size === 0) {
        grid.innerHTML = '<div class="empty-state">No frames selected. Select frames from the gallery to see them here.</div>';
        return;
    }
    
    // Get selected frames in order
    const selectedFrames = Array.from(selectedFramesTemplates).map(id => {
        const card = document.querySelector(`#frames-gallery-grid .template-card[data-id="${id}"]`);
        if (card) {
            return {
                id: id,
                name: card.querySelector('.template-info h4').textContent,
                category: card.querySelector('.template-category').textContent,
                image: card.querySelector('img').src
            };
        }
        return null;
    }).filter(frame => frame !== null);
    
    // Sort if auto-sort is enabled
    if (autoSortFrames) {
        selectedFrames.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    // Create cards for selected frames
    selectedFrames.forEach(frame => {
        const card = document.createElement('div');
        card.className = 'template-card selected draggable';
        card.dataset.id = frame.id;
        card.innerHTML = `
            <div class="template-image">
                <img src="${frame.image}" alt="${frame.name}">
                <div class="template-overlay">
                    <button class="template-action-btn remove-btn" onclick="toggleFrameSelection('${frame.id}')">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="drag-handle">
                    <i class="fas fa-grip-vertical"></i>
                </div>
            </div>
            <div class="template-info">
                <h4>${frame.name}</h4>
                <span class="template-category">${frame.category}</span>
            </div>
        `;
        grid.appendChild(card);
    });
    
    // Initialize drag and drop for frames
    initializeFramesDragDrop();
}

function initializeFramesDragDrop() {
    const grid = document.getElementById('frames-selected-grid');
    if (!grid || autoSortFrames) return;
    
    let draggedElement = null;
    
    grid.querySelectorAll('.draggable').forEach(item => {
        item.draggable = true;
        
        item.addEventListener('dragstart', (e) => {
            draggedElement = item;
            item.classList.add('dragging');
        });
        
        item.addEventListener('dragend', (e) => {
            item.classList.remove('dragging');
        });
        
        item.addEventListener('dragover', (e) => {
            e.preventDefault();
            const afterElement = getDragAfterElement(grid, e.clientY);
            if (afterElement == null) {
                grid.appendChild(draggedElement);
            } else {
                grid.insertBefore(draggedElement, afterElement);
            }
        });
    });
}

function updateFramesDisplay() {
    if (currentFramesView === 'gallery') {
        updateFramesCount();
    } else {
        populateFramesSelected();
    }
}