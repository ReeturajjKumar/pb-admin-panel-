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

// View toggle variables
let currentView = 'transactions'; // 'transactions' or 'ledger'
let creditsView = 'overview'; // 'overview' or 'usage' for credits page

// Credit management variables (Indian Rupees)
let currentCredits = 2450;
let creditsUsedThisMonth = 1250;
let totalPurchasedThisMonth = 31875.00; // ₹31,875
let averageCostPerCredit = 125; // ₹125 average
let creditHistory = [];

// Business profile and tax details variables
let businessProfile = {
    companyName: '',
    businessType: '',
    businessAddress: '',
    city: '',
    state: '',
    pincode: '',
    country: 'IN',
    contactPerson: '',
    contactEmail: '',
    contactPhone: '',
    website: ''
};

let taxDetails = {
    gstNumber: '',
    panNumber: '',
    tanNumber: '',
    cinNumber: '',
    msmeNumber: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    taxExemptions: ''
};

// Template management variables
let currentTemplateSection = 'faceswap';
let faceSwapTemplates = [];
let aiEffectsTemplates = [];
let portraitFrames = [];
let currentCategory = 'all';
let selectedFaceSwapTemplates = new Set();
let selectedAIEffectsTemplates = new Set();
let selectedFrames = new Set();
let autoSortFaceSwap = false;
let autoSortAIEffects = false;
let currentFaceSwapView = 'gallery'; // 'gallery' or 'selected'
let currentAIEffectsView = 'gallery';
let filteredFaceSwapTemplates = [];
let filteredAIEffectsTemplates = [];

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
    
    // Check if user is logged in (mock check)
    const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    if (isLoggedIn) {
        showDashboard();
    } else {
        showLoginPage();
    }
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
        
        // Determine credit cost based on service type
        const isHighQuality = Math.random() > 0.7; // 30% chance of high quality
        const creditCost = isHighQuality ? 3 : 1; // High quality = 3 credits, normal = 1 credit
        
        sampleTransactions.push({
            id: i + 1,
            datetime: date,
            style: style,
            frame: frame,
            sourceImage: `https://picsum.photos/200/300?random=${i + 1}`,
            styleImage: `https://picsum.photos/200/300?random=${i + 51}`,
            finalImage: `https://picsum.photos/200/300?random=${i + 101}`,
            creditsUsed: creditCost,
            service: isHighQuality ? 'Face Swap (HD)' : 'Face Swap',
            processingTime: isHighQuality ? `${Math.floor(Math.random() * 30) + 45}s` : `${Math.floor(Math.random() * 15) + 5}s`
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
    const darkModeBtn = document.getElementById('dark-mode-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const exportTransactionsBtn = document.getElementById('export-transactions-btn');
    const viewToggleBtn = document.getElementById('view-toggle-btn');
    
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
    if (darkModeBtn) {
        darkModeBtn.addEventListener('click', toggleDarkMode);
    }
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    if (exportTransactionsBtn) {
        exportTransactionsBtn.addEventListener('click', exportData);
    }
    if (creditsViewToggleBtn) {
        creditsViewToggleBtn.addEventListener('click', toggleCreditsView);
    }
    
    // Ledger filters in credits page
    const applyLedgerFiltersBtn = document.getElementById('apply-ledger-filters');
    const clearLedgerFiltersBtn = document.getElementById('clear-ledger-filters');
    const exportLedgerBtn = document.getElementById('export-ledger-btn');
    
    if (applyLedgerFiltersBtn) {
        applyLedgerFiltersBtn.addEventListener('click', applyLedgerFilters);
    }
    
    if (clearLedgerFiltersBtn) {
        clearLedgerFiltersBtn.addEventListener('click', clearLedgerFilters);
    }
    
    if (exportLedgerBtn) {
        exportLedgerBtn.addEventListener('click', exportLedger);
    }

    // Settings navigation
    const businessProfileNav = document.getElementById('business-profile-nav');
    const taxDetailsNav = document.getElementById('tax-details-nav');
    const systemSettingsNav = document.getElementById('system-settings-nav');

    if (businessProfileNav) businessProfileNav.addEventListener('click', () => showSettingsSection('business-profile'));
    if (taxDetailsNav) taxDetailsNav.addEventListener('click', () => showSettingsSection('tax-details'));
    if (systemSettingsNav) systemSettingsNav.addEventListener('click', () => showSettingsSection('system-settings'));

    // Save buttons
    const saveBusinessProfile = document.getElementById('save-business-profile');
    const saveTaxDetails = document.getElementById('save-tax-details');
    const saveSystemSettings = document.getElementById('save-system-settings');
    const generateInvoiceBtn = document.getElementById('generate-invoice-btn');

    if (saveBusinessProfile) saveBusinessProfile.addEventListener('click', saveBusinessProfileData);
    if (saveTaxDetails) saveTaxDetails.addEventListener('click', saveTaxDetailsData);
    if (saveSystemSettings) saveSystemSettings.addEventListener('click', saveSettings);
    if (generateInvoiceBtn) generateInvoiceBtn.addEventListener('click', generateInvoice);
    
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
    localStorage.setItem('adminUser', 'admin@pikcha.ai');
    currentUser = 'admin@pikcha.ai';
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
    const creditsBtn = document.getElementById('credits-btn');
    const templatesBtn = document.getElementById('templates-btn');
    const settingsBtn = document.getElementById('settings-btn');
    const logoutBtn = document.getElementById('logout-btn');
    
    if (dashboardBtn) {
        dashboardBtn.onclick = () => {
            console.log('Dashboard clicked');
            showPage('dashboard');
        };
    }
    if (creditsBtn) {
        creditsBtn.onclick = () => {
            console.log('Credits clicked');
            showPage('credits');
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
    const creditsDash = document.getElementById('credits-dashboard');
    const templatesDash = document.getElementById('templates-dashboard');
    const settingsDash = document.getElementById('settings-dashboard');
    
    if (transactionDash) transactionDash.style.display = page === 'dashboard' ? 'block' : 'none';
    if (creditsDash) creditsDash.style.display = page === 'credits' ? 'block' : 'none';
    if (templatesDash) templatesDash.style.display = page === 'templates' ? 'block' : 'none';
    if (settingsDash) settingsDash.style.display = page === 'settings' ? 'block' : 'none';
    
    if (page === 'dashboard') {
        populateDataTable();
    } else if (page === 'credits') {
        console.log('Loading credits section');
        updateCreditDashboard();
    } else if (page === 'templates') {
        console.log('Loading templates section');
        showTemplateSection(currentTemplateSection);
    }
}

// Data table functions (handles transactions view)
function populateDataTable() {
    populateTransactionsTable();
}

function populateTransactionsTable() {
    const thead = document.getElementById('table-header');
    const tbody = document.getElementById('table-tbody');
    const table = document.getElementById('data-table');
    
    if (!thead || !tbody || !table) return;
    
    // Remove ledger class
    table.classList.remove('ledger-view');
    
    // Set transaction headers
    thead.innerHTML = `
        <tr>
            <th>Date-Time</th>
            <th>Source Image</th>
            <th>Style Applied</th>
            <th>Frame Used</th>
            <th>Final Image</th>
        </tr>
    `;
    
    tbody.innerHTML = '';
    
    sampleTransactions.forEach(transaction => {
        const row = createTransactionRow(transaction);
        tbody.appendChild(row);
    });
}

function populateLedgerTable(dateFrom, dateTo) {
    const thead = document.getElementById('ledger-header');
    const tbody = document.getElementById('ledger-tbody');
    const table = document.getElementById('ledger-table');
    
    if (!thead || !tbody || !table) return;
    
    // Add ledger class
    table.classList.add('ledger-view');
    
    // Set ledger headers
    thead.innerHTML = `
        <tr>
            <th>Date</th>
            <th>Debit (Credits)</th>
            <th>Credit (Credits)</th>
            <th>Balance (Credits)</th>
        </tr>
    `;
    
    tbody.innerHTML = '';
    
    // Get combined ledger data
    let ledgerData = getCombinedLedgerData();
    
    // Apply date filter if provided
    if (dateFrom || dateTo) {
        const fromDate = dateFrom ? new Date(dateFrom) : new Date('1900-01-01');
        const toDate = dateTo ? new Date(dateTo) : new Date('2100-12-31');
        
        ledgerData = ledgerData.filter(entry => {
            const entryDate = new Date(entry.date);
            return entryDate >= fromDate && entryDate <= toDate;
        });
    }
    
    ledgerData.forEach(entry => {
        const row = createLedgerRow(entry);
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
                    <div style="font-weight: 600; color: var(--text-primary);">${transaction.style.name}</div>
                    <div style="font-size: 20px; margin-top: 4px;">${transaction.style.emoji}</div>
                </div>
            </div>
        </td>
        <td>
            <div style="display: flex; align-items: center; gap: 10px;">
                <img src="${transaction.frame.image}" alt="${transaction.frame.name}" class="frame-thumbnail">
                <div>
                    <div style="font-weight: 600; color: var(--text-primary);">${transaction.frame.name}</div>
                    <div style="font-size: 20px; margin-top: 4px;">${transaction.frame.emoji}</div>
                </div>
            </div>
        </td>
        <td>
            <img src="${transaction.finalImage}" alt="Final" class="thumbnail" 
                 onclick="showImageModal(${transaction.id})">
        </td>
    `;
    
    return row;
}

function createLedgerRow(entry) {
    const row = document.createElement('tr');
    
    const formattedDate = entry.date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
    
    const debitCell = entry.debit ? `<span class="debit-cell">-${entry.debit}</span>` : '';
    const creditCell = entry.credit ? `<span class="credit-cell">+${entry.credit.toLocaleString()}</span>` : '';
    
    row.innerHTML = `
        <td>${formattedDate}</td>
        <td>${debitCell}</td>
        <td>${creditCell}</td>
        <td><span class="balance-cell">${entry.balance.toLocaleString()}</span></td>
    `;
    
    return row;
}

// Credits view toggle function (simplified)
function toggleCreditsView() {
    // This function is no longer needed with the simplified Credits UI
    // Keeping it empty to avoid errors from existing event listeners
    console.log('Credits view toggle - using new tab system');
}

// New simplified Credits functions
function showCreditTab(tabName, buttonElement) {
    // Hide all tabs
    document.querySelectorAll('.credit-tab-content').forEach(tab => {
        tab.style.display = 'none';
    });
    
    // Remove active class from all buttons
    document.querySelectorAll('.credit-tabs .tab-btn').forEach(btn => {
        btn.style.borderBottom = '3px solid transparent';
        btn.classList.remove('active');
    });
    
    // Show selected tab
    const tabId = tabName + '-tab';
    const tab = document.getElementById(tabId);
    if (tab) {
        tab.style.display = 'block';
    }
    
    // Mark button as active
    if (buttonElement) {
        buttonElement.style.borderBottom = '3px solid #667eea';
        buttonElement.classList.add('active');
    }
}

function showBuyCredits() {
    // Switch to Buy Credits tab
    showCreditTab('packages');
    // Find and activate the packages tab button
    document.querySelectorAll('.credit-tabs .tab-btn').forEach(btn => {
        if (btn.textContent.includes('Buy Credits')) {
            btn.style.borderBottom = '3px solid #667eea';
            btn.classList.add('active');
        } else {
            btn.style.borderBottom = '3px solid transparent';
            btn.classList.remove('active');
        }
    });
}

function filterUsage() {
    const filter = document.getElementById('usage-filter').value;
    console.log('Filtering usage by:', filter);
    // In a real app, this would filter the usage history
    showNotification(`Showing usage for: ${filter}`, 'info');
}

function exportUsage() {
    const filter = document.getElementById('usage-filter').value;
    console.log('Exporting usage for:', filter);
    showNotification('Usage history exported successfully', 'success');
}

function purchaseCredits(packageType) {
    console.log('Purchasing:', packageType);
    showNotification(`${packageType} package purchase initiated`, 'info');
    // In a real app, this would handle payment processing
}

function getCombinedLedgerData() {
    const ledgerEntries = [];
    let runningBalance = currentCredits;
    
    // Combine transactions and credit history
    const allEntries = [];
    
    // Add credit usage from transactions
    sampleTransactions.forEach(transaction => {
        allEntries.push({
            date: transaction.datetime,
            type: 'debit',
            credits: transaction.creditsUsed || 1
        });
    });
    
    // Add credit purchases from credit history
    creditHistory.forEach(credit => {
        if (credit.type === 'purchase') {
            allEntries.push({
                date: credit.date,
                type: 'credit',
                credits: credit.credits
            });
        }
    });
    
    // Sort by date (newest first)
    allEntries.sort((a, b) => b.date - a.date);
    
    // Calculate running balance and create ledger entries
    allEntries.forEach(entry => {
        const ledgerEntry = {
            date: entry.date,
            balance: runningBalance
        };
        
        if (entry.type === 'debit') {
            ledgerEntry.debit = entry.credits;
            runningBalance += entry.credits; // Add back since we're going backwards
        } else {
            ledgerEntry.credit = entry.credits;
            runningBalance -= entry.credits; // Subtract since we're going backwards
        }
        
        ledgerEntries.push(ledgerEntry);
    });
    
    return ledgerEntries;
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
    if (currentView === 'transactions') {
        updateTransactionTable(filteredTransactions);
    }
    
    // Show notification
    const resultCount = filteredTransactions.length;
    showNotification(`Found ${resultCount} transaction${resultCount !== 1 ? 's' : ''} in the selected date range`, 'info');
}

function clearFilters() {
    // Clear date inputs
    document.getElementById('date-from').value = '';
    document.getElementById('date-to').value = '';
    
    // Show all data
    populateDataTable();
    
    showNotification('Filters cleared - showing all data', 'info');
}

// Ledger filter functions for Credits page
function applyLedgerFilters() {
    const dateFrom = document.getElementById('ledger-date-from').value;
    const dateTo = document.getElementById('ledger-date-to').value;
    
    if (!dateFrom && !dateTo) {
        showNotification('Please select at least one date to filter', 'warning');
        return;
    }
    
    populateLedgerTable(dateFrom, dateTo);
    showNotification('Ledger filtered by date range', 'info');
}

function clearLedgerFilters() {
    document.getElementById('ledger-date-from').value = '';
    document.getElementById('ledger-date-to').value = '';
    populateLedgerTable();
    showNotification('Ledger filters cleared', 'info');
}

function updateTransactionTable(transactions) {
    const tbody = document.getElementById('table-tbody');
    if (!tbody) return;
    
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
    console.log('Available templates:', section === 'faceswap' ? faceSwapTemplates.length : aiEffectsTemplates.length);
    
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
        // Initialize frames section
        console.log('Switching to frames section...');
        initializeFramesSection();
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

// Credit Management Functions

// Update credit dashboard with current data
function updateCreditDashboard() {
    console.log('Updating credit dashboard...');
    
    // Update credit overview cards
    const creditBalanceElement = document.querySelector('.credit-card .credit-amount');
    const usageElement = document.querySelectorAll('.credit-card .credit-amount')[1];
    const totalPurchasedElement = document.querySelectorAll('.credit-card .credit-amount')[2];
    const costPerCreditElement = document.querySelectorAll('.credit-card .credit-amount')[3];
    
    if (creditBalanceElement) creditBalanceElement.textContent = currentCredits.toLocaleString();
    if (usageElement) usageElement.textContent = creditsUsedThisMonth.toLocaleString();
    if (totalPurchasedElement) totalPurchasedElement.textContent = `₹${totalPurchasedThisMonth.toLocaleString()}`;
    if (costPerCreditElement) costPerCreditElement.textContent = `₹${averageCostPerCredit}`;
    
    // Setup credit purchase buttons
    setupCreditPurchaseButtons();
    
    showNotification('Credit dashboard updated', 'info');
}

// Setup credit purchase buttons
function setupCreditPurchaseButtons() {
    const buyCreditsBtn = document.getElementById('buy-credits-btn');
    const autoRefillBtn = document.getElementById('auto-refill-btn');
    const billingHistoryBtn = document.getElementById('billing-history-btn');
    
    // Package purchase buttons
    const packageButtons = document.querySelectorAll('.package-btn');
    
    if (buyCreditsBtn) {
        buyCreditsBtn.onclick = () => showCreditPurchaseModal();
    }
    
    if (autoRefillBtn) {
        autoRefillBtn.onclick = () => setupAutoRefill();
    }
    
    if (billingHistoryBtn) {
        billingHistoryBtn.onclick = () => showBillingHistory();
    }
    
    // Setup package purchase buttons
    packageButtons.forEach((btn, index) => {
        const packages = [
            { name: 'Starter', credits: 750, price: 112500, rate: 150 },
            { name: 'Professional', credits: 1500, price: 187500, rate: 125 },
            { name: 'Enterprise', credits: 3000, price: 297000, rate: 99 }
        ];
        
        if (packages[index]) {
            btn.onclick = () => purchasePackage(packages[index]);
        }
    });
}

// Show credit purchase modal (mock implementation)
function showCreditPurchaseModal() {
    showNotification('Credit purchase modal would open here', 'info');
    // In a real implementation, this would open a payment modal
}

// Setup auto-refill functionality
function setupAutoRefill() {
    showNotification('Auto-refill setup modal would open here', 'info');
    // In a real implementation, this would configure automatic credit refills
}

// Show billing history
function showBillingHistory() {
    showNotification('Billing history modal would open here', 'info');
    // In a real implementation, this would show past credit purchases
}

// Purchase a credit package
function purchasePackage(packageInfo) {
    console.log('Purchasing package:', packageInfo);
    
    showConfirmModal(
        `Purchase ${packageInfo.name} package?\n${packageInfo.credits.toLocaleString()} credits for ₹${packageInfo.price.toLocaleString()}`,
        () => {
            // Mock purchase process
            setTimeout(() => {
                currentCredits += packageInfo.credits;
                totalPurchasedThisMonth += packageInfo.price;
                
                // Add to credit history
                creditHistory.push({
                    date: new Date(),
                    type: 'purchase',
                    package: packageInfo.name,
                    credits: packageInfo.credits,
                    amount: packageInfo.price,
                    description: `Purchased ${packageInfo.name} package`
                });
                
                updateCreditDashboard();
                showNotification(
                    `Successfully purchased ${packageInfo.credits.toLocaleString()} credits for ₹${packageInfo.price.toLocaleString()}!`, 
                    'success'
                );
                
                // Save to localStorage for persistence
                saveCreditData();
            }, 1000);
        }
    );
}

// Deduct credits for a transaction
function deductCredits(amount, service) {
    if (currentCredits >= amount) {
        currentCredits -= amount;
        creditsUsedThisMonth += amount;
        
        // Add to credit history
        creditHistory.push({
            date: new Date(),
            type: 'usage',
            service: service,
            credits: -amount,
            description: `Used ${amount} credit${amount > 1 ? 's' : ''} for ${service}`
        });
        
        // Update dashboard if on credits page
        if (currentPage === 'credits') {
            updateCreditDashboard();
        }
        
        // Save to localStorage
        saveCreditData();
        
        return true;
    } else {
        showNotification(`Insufficient credits! You need ${amount} credits but only have ${currentCredits}.`, 'error');
        return false;
    }
}

// Save credit data to localStorage
function saveCreditData() {
    const creditData = {
        currentCredits,
        creditsUsedThisMonth,
        totalPurchasedThisMonth,
        creditHistory
    };
    
    localStorage.setItem('pikchaCreditData', JSON.stringify(creditData));
}

// Load credit data from localStorage
function loadCreditData() {
    const savedData = localStorage.getItem('pikchaCreditData');
    if (savedData) {
        try {
            const creditData = JSON.parse(savedData);
            currentCredits = creditData.currentCredits || 2450;
            creditsUsedThisMonth = creditData.creditsUsedThisMonth || 1250;
            totalPurchasedThisMonth = creditData.totalPurchasedThisMonth || 425.00;
            creditHistory = creditData.creditHistory || [];
            
            console.log('Loaded credit data from localStorage');
        } catch (e) {
            console.error('Error loading credit data:', e);
        }
    }
}

// Simulate credit usage for transactions (called when transactions happen)
function processTransactionWithCredits(transaction) {
    const creditCost = transaction.creditsUsed || 1;
    const service = transaction.service || 'Unknown Service';
    
    if (deductCredits(creditCost, service)) {
        console.log(`Transaction processed: ${creditCost} credits deducted for ${service}`);
        return true;
    } else {
        console.log('Transaction failed: Insufficient credits');
        return false;
    }
}

// Initialize credit data on page load
document.addEventListener('DOMContentLoaded', () => {
    loadCreditData();
    loadThemePreference();
});

// Dark Mode Functions
function toggleDarkMode() {
    const body = document.body;
    const isDarkMode = body.classList.toggle('dark-mode');
    
    // Update icon
    const icon = document.querySelector('#dark-mode-btn i');
    if (isDarkMode) {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
    
    // Save preference
    localStorage.setItem('darkMode', isDarkMode);
    
    showNotification(
        `Switched to ${isDarkMode ? 'dark' : 'light'} mode`, 
        'info'
    );
}

function loadThemePreference() {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme === 'true') {
        document.body.classList.add('dark-mode');
        const icon = document.querySelector('#dark-mode-btn i');
        if (icon) {
            icon.className = 'fas fa-sun';
        }
    }
}

// Export Functions
function exportData() {
    exportTransactions();
}

function exportTransactions() {
    // Get current date range filters
    const dateFrom = document.getElementById('date-from')?.value;
    const dateTo = document.getElementById('date-to')?.value;
    
    let transactionsToExport = [...sampleTransactions];
    
    // Apply date filters if set
    if (dateFrom) {
        const fromDate = new Date(dateFrom);
        transactionsToExport = transactionsToExport.filter(t => t.datetime >= fromDate);
    }
    
    if (dateTo) {
        const toDate = new Date(dateTo);
        toDate.setHours(23, 59, 59, 999);
        transactionsToExport = transactionsToExport.filter(t => t.datetime <= toDate);
    }
    
    // Show export options
    showExportModal(transactionsToExport, 'transactions');
}

function exportLedger() {
    // Get current date range filters
    const dateFrom = document.getElementById('date-from')?.value;
    const dateTo = document.getElementById('date-to')?.value;
    
    let ledgerData = getCombinedLedgerData();
    
    // Apply date filters if set
    if (dateFrom) {
        const fromDate = new Date(dateFrom);
        ledgerData = ledgerData.filter(entry => entry.date >= fromDate);
    }
    
    if (dateTo) {
        const toDate = new Date(dateTo);
        toDate.setHours(23, 59, 59, 999);
        ledgerData = ledgerData.filter(entry => entry.date <= toDate);
    }
    
    // Show export options
    showExportModal(ledgerData, 'ledger');
}

function showExportModal(data, type) {
    const modalHtml = `
        <div class="modal" id="export-modal" style="display: block;">
            <div class="modal-content small">
                <div class="modal-header">
                    <h3>Export ${type === 'transactions' ? 'Transactions' : 'Ledger'}</h3>
                    <button class="close-btn" onclick="hideModal('export-modal')">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <p><strong>${data.length}</strong> ${type === 'transactions' ? 'transactions' : 'ledger entries'} ready for export</p>
                    <div style="margin: 20px 0;">
                        <h4>Export Format:</h4>
                        <div style="margin: 10px 0;">
                            <label style="display: block; margin-bottom: 10px;">
                                <input type="radio" name="export-format" value="csv" checked> CSV Format
                            </label>
                            <label style="display: block;">
                                <input type="radio" name="export-format" value="excel"> Excel Format
                            </label>
                        </div>
                    </div>
                </div>
                <div class="modal-actions">
                    <button class="action-btn cancel-btn" onclick="hideModal('export-modal')">Cancel</button>
                    <button class="action-btn primary-btn" onclick="performExport(${JSON.stringify(data).replace(/"/g, '&quot;')}, '${type}')">
                        <i class="fas fa-download"></i> Export
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing export modal if any
    const existingModal = document.getElementById('export-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Add event listener for clicking outside modal
    document.getElementById('export-modal').addEventListener('click', (e) => {
        if (e.target.id === 'export-modal') {
            hideModal('export-modal');
        }
    });
}

function performExport(data, type) {
    const format = document.querySelector('input[name="export-format"]:checked').value;
    
    if (format === 'csv') {
        if (type === 'transactions') {
            exportTransactionsToCSV(data);
        } else {
            exportLedgerToCSV(data);
        }
    } else {
        if (type === 'transactions') {
            exportTransactionsToExcel(data);
        } else {
            exportLedgerToExcel(data);
        }
    }
    
    hideModal('export-modal');
}

function exportTransactionsToCSV(transactions) {
    const headers = ['Date', 'Time', 'Service Type', 'Credits Used', 'Processing Time', 'Transaction ID'];
    const csvContent = [
        headers.join(','),
        ...transactions.map(t => [
            t.datetime.toLocaleDateString(),
            t.datetime.toLocaleTimeString(),
            t.service || 'AI Processing',
            t.creditsUsed || 1,
            t.processingTime || 'N/A',
            `TXN-${t.id.toString().padStart(6, '0')}`
        ].join(','))
    ].join('\n');
    
    downloadFile(`pikcha-transactions-${new Date().toISOString().split('T')[0]}.csv`, csvContent, 'text/csv');
    
    showNotification(`Exported ${transactions.length} transactions to CSV`, 'success');
}

function exportTransactionsToExcel(transactions) {
    // For demonstration, we'll export as CSV with Excel-friendly formatting
    const headers = ['Date', 'Time', 'Service Type', 'Credits Used', 'Processing Time', 'Transaction ID'];
    const csvContent = [
        headers.join('\t'), // Tab-separated for Excel
        ...transactions.map(t => [
            t.datetime.toLocaleDateString(),
            t.datetime.toLocaleTimeString(),
            t.service || 'AI Processing',
            t.creditsUsed || 1,
            t.processingTime || 'N/A',
            `TXN-${t.id.toString().padStart(6, '0')}`
        ].join('\t'))
    ].join('\n');
    
    downloadFile(`pikcha-transactions-${new Date().toISOString().split('T')[0]}.xlsx`, csvContent, 'application/vnd.ms-excel');
    
    showNotification(`Exported ${transactions.length} transactions to Excel format`, 'success');
}

function exportLedgerToCSV(ledgerData) {
    const headers = ['Date', 'Debit (Credits)', 'Credit (Credits)', 'Balance (Credits)'];
    const csvContent = [
        headers.join(','),
        ...ledgerData.map(entry => [
            entry.date.toLocaleDateString(),
            entry.debit || '',
            entry.credit || '',
            entry.balance
        ].join(','))
    ].join('\n');
    
    downloadFile(`pikcha-ledger-${new Date().toISOString().split('T')[0]}.csv`, csvContent, 'text/csv');
    
    showNotification(`Exported ${ledgerData.length} ledger entries to CSV`, 'success');
}

function exportLedgerToExcel(ledgerData) {
    const headers = ['Date', 'Debit (Credits)', 'Credit (Credits)', 'Balance (Credits)'];
    const csvContent = [
        headers.join('\t'), // Tab-separated for Excel
        ...ledgerData.map(entry => [
            entry.date.toLocaleDateString(),
            entry.debit || '',
            entry.credit || '',
            entry.balance
        ].join('\t'))
    ].join('\n');
    
    downloadFile(`pikcha-ledger-${new Date().toISOString().split('T')[0]}.xlsx`, csvContent, 'application/vnd.ms-excel');
    
    showNotification(`Exported ${ledgerData.length} ledger entries to Excel format`, 'success');
}

function downloadFile(filename, content, contentType) {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Business Profile & Tax Details Functions

// Show different settings sections
function showSettingsSection(section) {
    // Update navigation
    document.querySelectorAll('.settings-nav-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`${section}-nav`).classList.add('active');
    
    // Show/hide sections
    document.querySelectorAll('.settings-section').forEach(sec => sec.style.display = 'none');
    document.getElementById(`${section}-section`).style.display = 'block';
    
    // Show/hide save buttons
    document.querySelectorAll('.save-btn').forEach(btn => btn.style.display = 'none');
    document.getElementById(`save-${section}`).style.display = 'flex';
    
    // Load data for the section
    if (section === 'business-profile') {
        loadBusinessProfileForm();
    } else if (section === 'tax-details') {
        loadTaxDetailsForm();
    }
}

// Load business profile data into form
function loadBusinessProfileForm() {
    const savedProfile = localStorage.getItem('businessProfile');
    if (savedProfile) {
        businessProfile = JSON.parse(savedProfile);
    }
    
    // Populate form fields
    Object.keys(businessProfile).forEach(key => {
        const element = document.getElementById(key.replace(/([A-Z])/g, '-$1').toLowerCase());
        if (element) {
            element.value = businessProfile[key] || '';
        }
    });
}

// Save business profile data
function saveBusinessProfileData() {
    const form = document.getElementById('business-form');
    const formData = new FormData(form);
    
    // Validate required fields
    const requiredFields = ['companyName', 'businessAddress', 'state', 'pincode', 'gstStatus', 'mobileNumber', 'whatsappNumber'];
    let isValid = true;
    
    for (const field of requiredFields) {
        const element = document.querySelector(`[name="${field}"]`);
        if (!element || !element.value.trim()) {
            element?.classList.add('invalid');
            isValid = false;
        } else {
            element?.classList.remove('invalid');
        }
    }
    
    if (!isValid) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    // Validate GST number if provided
    const gstNumber = formData.get('gstNumber');
    const mobileNumber = formData.get('mobileNumber');
    const whatsappNumber = formData.get('whatsappNumber');
    
    if (gstNumber && !validateGSTIN(gstNumber)) {
        showNotification('Invalid GST format. Please enter a valid 15-character GST number.', 'error');
        return;
    }
    
    // Validate mobile numbers (10 digits)
    const mobilePattern = /^[0-9]{10}$/;
    if (mobileNumber && !mobilePattern.test(mobileNumber)) {
        showNotification('Mobile number must be exactly 10 digits.', 'error');
        return;
    }
    
    if (whatsappNumber && !mobilePattern.test(whatsappNumber)) {
        showNotification('WhatsApp number must be exactly 10 digits.', 'error');
        return;
    }
    
    // Update businessProfile object
    for (const [key, value] of formData.entries()) {
        businessProfile[key] = value;
    }
    
    // Save to localStorage
    localStorage.setItem('businessProfile', JSON.stringify(businessProfile));
    
    showNotification('Business profile saved successfully!', 'success');
}

// Load tax details data into form
function loadTaxDetailsForm() {
    const savedTaxDetails = localStorage.getItem('taxDetails');
    if (savedTaxDetails) {
        taxDetails = JSON.parse(savedTaxDetails);
    }
    
    // Populate form fields
    Object.keys(taxDetails).forEach(key => {
        const element = document.getElementById(key.replace(/([A-Z])/g, '-$1').toLowerCase());
        if (element) {
            element.value = taxDetails[key] || '';
        }
    });
}

// Save tax details data
function saveTaxDetailsData() {
    const form = document.getElementById('tax-form');
    const formData = new FormData(form);
    
    // Update taxDetails object
    for (const [key, value] of formData.entries()) {
        taxDetails[key] = value;
    }
    
    // Save to localStorage
    localStorage.setItem('taxDetails', JSON.stringify(taxDetails));
    
    showNotification('Tax details saved successfully!', 'success');
}

// Generate Invoice
function generateInvoice() {
    // Check if business profile is complete
    const requiredFields = ['companyName', 'businessAddress', 'city', 'state', 'pincode', 'contactEmail'];
    const missingFields = requiredFields.filter(field => !businessProfile[field]);
    
    if (missingFields.length > 0) {
        showNotification('Please complete your business profile in Settings before generating invoices', 'warning');
        return;
    }
    
    // Show invoice generation modal
    showInvoiceGenerationModal();
}

function showInvoiceGenerationModal() {
    const recentPurchases = creditHistory.filter(h => h.type === 'purchase').slice(0, 10);
    
    let purchaseOptions = '';
    if (recentPurchases.length === 0) {
        purchaseOptions = '<option value="">No recent purchases found</option>';
    } else {
        purchaseOptions = recentPurchases.map(purchase => 
            `<option value="${purchase.date.getTime()}">${purchase.description} - ₹${purchase.amount.toLocaleString()} (${new Date(purchase.date).toLocaleDateString()})</option>`
        ).join('');
    }
    
    const modalHtml = `
        <div class="modal" id="invoice-modal" style="display: block;">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Generate Invoice</h3>
                    <button class="close-btn" onclick="hideModal('invoice-modal')">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-grid">
                        <div class="form-group">
                            <label for="invoice-purchase">Select Purchase:</label>
                            <select id="invoice-purchase" required>
                                <option value="">Select a purchase to invoice</option>
                                ${purchaseOptions}
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="invoice-date">Invoice Date:</label>
                            <input type="date" id="invoice-date" value="${new Date().toISOString().split('T')[0]}" required>
                        </div>
                        <div class="form-group">
                            <label for="invoice-number">Invoice Number:</label>
                            <input type="text" id="invoice-number" value="INV-${Date.now()}" required>
                        </div>
                        <div class="form-group full-width">
                            <label for="invoice-notes">Additional Notes:</label>
                            <textarea id="invoice-notes" placeholder="Any additional notes for the invoice..." rows="3"></textarea>
                        </div>
                    </div>
                    
                    <div class="business-preview" style="margin-top: 20px; padding: 15px; background: var(--bg-secondary); border-radius: 8px;">
                        <h4>Bill To:</h4>
                        <p><strong>${businessProfile.companyName}</strong></p>
                        <p>${businessProfile.businessAddress}</p>
                        <p>${businessProfile.city}, ${businessProfile.state} - ${businessProfile.pincode}</p>
                        <p>Email: ${businessProfile.contactEmail}</p>
                        <p>Phone: ${businessProfile.contactPhone}</p>
                        ${taxDetails.gstNumber ? `<p>GST: ${taxDetails.gstNumber}</p>` : ''}
                    </div>
                </div>
                <div class="modal-actions">
                    <button class="action-btn cancel-btn" onclick="hideModal('invoice-modal')">Cancel</button>
                    <button class="action-btn primary-btn" onclick="generatePDFInvoice()">
                        <i class="fas fa-file-pdf"></i> Generate PDF Invoice
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('invoice-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Add event listener for clicking outside modal
    document.getElementById('invoice-modal').addEventListener('click', (e) => {
        if (e.target.id === 'invoice-modal') {
            hideModal('invoice-modal');
        }
    });
}

function generatePDFInvoice() {
    const purchaseId = document.getElementById('invoice-purchase').value;
    const invoiceDate = document.getElementById('invoice-date').value;
    const invoiceNumber = document.getElementById('invoice-number').value;
    const notes = document.getElementById('invoice-notes').value;
    
    if (!purchaseId || !invoiceDate || !invoiceNumber) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    // Find the selected purchase
    const purchase = creditHistory.find(h => h.date.getTime().toString() === purchaseId);
    if (!purchase) {
        showNotification('Selected purchase not found', 'error');
        return;
    }
    
    // Generate invoice HTML
    const invoiceHTML = generateInvoiceHTML(purchase, invoiceDate, invoiceNumber, notes);
    
    // Create and download HTML file (In a real app, you'd use a PDF library like jsPDF)
    downloadFile(`Invoice-${invoiceNumber}.html`, invoiceHTML, 'text/html');
    
    hideModal('invoice-modal');
    showNotification('Invoice generated and downloaded successfully!', 'success');
}

function generateInvoiceHTML(purchase, invoiceDate, invoiceNumber, notes) {
    const gstAmount = taxDetails.gstNumber ? (purchase.amount * 0.18) : 0; // 18% GST
    const totalAmount = purchase.amount + gstAmount;
    
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Invoice ${invoiceNumber}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; color: #333; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #3498db; padding-bottom: 20px; }
        .company-info { text-align: right; margin-bottom: 30px; }
        .bill-to { margin-bottom: 30px; }
        .invoice-details { display: flex; justify-content: space-between; margin-bottom: 30px; }
        .items-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
        .items-table th, .items-table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        .items-table th { background-color: #f8f9fa; font-weight: 600; }
        .total-section { text-align: right; margin-top: 20px; }
        .total-row { margin: 5px 0; }
        .grand-total { font-size: 18px; font-weight: bold; color: #3498db; }
        .notes { margin-top: 30px; padding: 15px; background-color: #f8f9fa; border-radius: 5px; }
        @media print { body { margin: 0; } }
    </style>
</head>
<body>
    <div class="header">
        <h1>INVOICE</h1>
        <h2>Pikcha.ai</h2>
        <p>AI-Powered Photo Processing Services</p>
    </div>
    
    <div class="company-info">
        <strong>Pikcha.ai Technologies</strong><br>
        Email: billing@pikcha.ai<br>
        Website: www.pikcha.ai
    </div>
    
    <div class="invoice-details">
        <div class="bill-to">
            <h3>Bill To:</h3>
            <strong>${businessProfile.companyName}</strong><br>
            ${businessProfile.businessAddress}<br>
            ${businessProfile.city}, ${businessProfile.state} - ${businessProfile.pincode}<br>
            Email: ${businessProfile.contactEmail}<br>
            Phone: ${businessProfile.contactPhone}
            ${taxDetails.gstNumber ? `<br>GST No: ${taxDetails.gstNumber}` : ''}
            ${taxDetails.panNumber ? `<br>PAN No: ${taxDetails.panNumber}` : ''}
        </div>
        
        <div class="invoice-info">
            <strong>Invoice No:</strong> ${invoiceNumber}<br>
            <strong>Invoice Date:</strong> ${new Date(invoiceDate).toLocaleDateString()}<br>
            <strong>Purchase Date:</strong> ${purchase.date.toLocaleDateString()}
        </div>
    </div>
    
    <table class="items-table">
        <thead>
            <tr>
                <th>Description</th>
                <th>Credits</th>
                <th>Rate per Credit</th>
                <th>Amount (₹)</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>${purchase.description}</td>
                <td>${purchase.credits.toLocaleString()}</td>
                <td>₹${(purchase.amount / purchase.credits).toFixed(2)}</td>
                <td>₹${purchase.amount.toLocaleString()}</td>
            </tr>
        </tbody>
    </table>
    
    <div class="total-section">
        <div class="total-row"><strong>Subtotal: ₹${purchase.amount.toLocaleString()}</strong></div>
        ${gstAmount > 0 ? `<div class="total-row">GST (18%): ₹${gstAmount.toLocaleString()}</div>` : ''}
        <div class="total-row grand-total">Total: ₹${totalAmount.toLocaleString()}</div>
    </div>
    
    ${notes ? `
    <div class="notes">
        <h4>Notes:</h4>
        <p>${notes}</p>
    </div>
    ` : ''}
    
    <div style="margin-top: 50px; text-align: center; color: #666; font-size: 12px;">
        <p>Thank you for your business!</p>
        <p>This is a computer-generated invoice and does not require a signature.</p>
    </div>
</body>
</html>
    `.trim();
}

// Load business profile and tax details on page load
document.addEventListener('DOMContentLoaded', () => {
    loadCreditData();
    loadThemePreference();
    loadBusinessProfile();
    loadTaxDetails();
});

function loadBusinessProfile() {
    const savedProfile = localStorage.getItem('businessProfile');
    if (savedProfile) {
        businessProfile = JSON.parse(savedProfile);
    }
}

function loadTaxDetails() {
    const savedTaxDetails = localStorage.getItem('taxDetails');
    if (savedTaxDetails) {
        taxDetails = JSON.parse(savedTaxDetails);
    }
}

// Indian Business Form Functions
function toggleGSTFields(gstStatus) {
    const gstNumberGroup = document.getElementById('gst-number-group');
    const gstNumberInput = document.getElementById('gst-number');
    
    if (gstStatus === 'registered' || gstStatus === 'composition') {
        gstNumberGroup.style.display = 'block';
        gstNumberInput.setAttribute('required', 'required');
        gstNumberGroup.querySelector('label').innerHTML = 'GSTIN *';
    } else {
        gstNumberGroup.style.display = 'none';
        gstNumberInput.removeAttribute('required');
        gstNumberInput.value = '';
    }
}

function toggleMSMEField(msmeStatus) {
    const msmeNumberGroup = document.getElementById('msme-number-group');
    const msmeNumberInput = document.getElementById('msme-number');
    
    if (msmeStatus && msmeStatus !== '') {
        msmeNumberGroup.style.display = 'block';
        msmeNumberInput.setAttribute('required', 'required');
    } else {
        msmeNumberGroup.style.display = 'none';
        msmeNumberInput.removeAttribute('required');
        msmeNumberInput.value = '';
    }
}

// Validate Indian tax numbers
function validatePAN(pan) {
    const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panPattern.test(pan);
}

function validateGSTIN(gstin) {
    const gstinPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    return gstinPattern.test(gstin);
}

function validateTAN(tan) {
    const tanPattern = /^[A-Z]{4}[0-9]{5}[A-Z]{1}$/;
    return tanPattern.test(tan);
}

// Copy mobile to WhatsApp function
function copyMobileToWhatsapp(isChecked) {
    const mobileInput = document.getElementById('mobile-number');
    const whatsappInput = document.getElementById('whatsapp-number');
    
    if (isChecked && mobileInput && whatsappInput) {
        whatsappInput.value = mobileInput.value;
        whatsappInput.disabled = true;
        
        // Also copy on mobile input change when checkbox is checked
        mobileInput.addEventListener('input', function() {
            if (document.getElementById('same-as-mobile').checked) {
                whatsappInput.value = this.value;
            }
        });
    } else if (whatsappInput) {
        whatsappInput.disabled = false;
    }
}

// Auto-format inputs
document.addEventListener('DOMContentLoaded', function() {
    // Auto-format GST number
    const gstInput = document.getElementById('gst-number');
    if (gstInput) {
        gstInput.addEventListener('input', function(e) {
            let value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
            if (value.length > 15) value = value.substring(0, 15);
            e.target.value = value;
        });
    }
    
    // Auto-format mobile numbers (only digits, max 10)
    const mobileInputs = document.querySelectorAll('input[type="tel"]');
    mobileInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/[^0-9]/g, '');
            if (value.length > 10) value = value.substring(0, 10);
            e.target.value = value;
        });
    });
});

// Portrait Frame Management Functions

// Initialize frames section
function initializeFramesSection() {
    if (portraitFrames.length === 0) {
        generateSampleFrames();
    }
    populateFramesGrid();
    setupFrameUpload();
    updateFrameCount();
}

// Generate sample portrait frames
function generateSampleFrames() {
    const frameNames = [
        'Classic Gold Border', 'Modern White Frame', 'Vintage Wood Frame', 
        'Elegant Black Frame', 'Decorative Silver Frame', 'Minimalist Frame',
        'Ornate Baroque Frame', 'Contemporary Steel Frame', 'Rustic Oak Frame',
        'Art Deco Frame', 'Simple Border Frame', 'Textured Frame'
    ];
    
    portraitFrames = frameNames.map((name, index) => ({
        id: index + 1,
        name: name,
        filename: `frame-${index + 1}.png`,
        image: `https://picsum.photos/300/400?random=${index + 50}`, // Placeholder
        dimensions: '300x400',
        fileSize: Math.floor(Math.random() * 500 + 100) + 'KB',
        uploadDate: new Date(Date.now() - Math.random() * 10000000000),
        isActive: true,
        assignedTemplates: []
    }));
    
    console.log('Generated', portraitFrames.length, 'sample frames');
}

// Populate frames grid
function populateFramesGrid() {
    const framesGrid = document.getElementById('frames-grid');
    if (!framesGrid) return;
    
    framesGrid.innerHTML = '';
    
    portraitFrames.forEach(frame => {
        const frameCard = createFrameCard(frame);
        framesGrid.appendChild(frameCard);
    });
}

// Create frame card element
function createFrameCard(frame) {
    const frameCard = document.createElement('div');
    frameCard.className = 'frame-card';
    frameCard.dataset.frameId = frame.id;
    
    frameCard.innerHTML = `
        <div class="frame-checkbox"></div>
        <div class="frame-preview">
            <img src="${frame.image}" alt="${frame.name}">
        </div>
        <div class="frame-info">
            <div class="frame-name">${frame.name}</div>
            <div class="frame-meta">
                <span class="frame-dimensions">${frame.dimensions}</span>
                <span class="frame-status ${frame.isActive ? 'active' : 'inactive'}">
                    ${frame.isActive ? 'Active' : 'Inactive'}
                </span>
            </div>
        </div>
    `;
    
    // Add click event for selection
    frameCard.addEventListener('click', (e) => {
        if (e.target.closest('.frame-checkbox')) return;
        toggleFrameSelection(frame.id);
    });
    
    return frameCard;
}

// Toggle frame selection
function toggleFrameSelection(frameId) {
    const frameCard = document.querySelector(`[data-frame-id="${frameId}"]`);
    if (!frameCard) return;
    
    if (selectedFrames.has(frameId)) {
        selectedFrames.delete(frameId);
        frameCard.classList.remove('selected');
    } else {
        selectedFrames.add(frameId);
        frameCard.classList.add('selected');
    }
    
    updateFrameSelectionUI();
}

// Update frame selection UI
function updateFrameSelectionUI() {
    const selectedCount = selectedFrames.size;
    const bulkAssignBtn = document.getElementById('bulk-assign-frames');
    const deleteSelectedBtn = document.getElementById('delete-selected-frames');
    
    if (bulkAssignBtn) {
        bulkAssignBtn.style.display = selectedCount > 0 ? 'block' : 'none';
        bulkAssignBtn.textContent = `Assign ${selectedCount} Frame${selectedCount !== 1 ? 's' : ''} to Templates`;
    }
    
    if (deleteSelectedBtn) {
        deleteSelectedBtn.style.display = selectedCount > 0 ? 'block' : 'none';
        deleteSelectedBtn.textContent = `Delete ${selectedCount} Frame${selectedCount !== 1 ? 's' : ''}`;
    }
}

// Update frame count
function updateFrameCount() {
    const countElement = document.getElementById('frames-count');
    if (countElement) {
        countElement.textContent = portraitFrames.length;
    }
}

// Setup frame upload functionality
function setupFrameUpload() {
    const uploadArea = document.getElementById('frame-upload-area');
    const fileInput = document.getElementById('frame-file-input');
    
    if (!uploadArea || !fileInput) return;
    
    // Drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('drag-over');
    });
    
    uploadArea.addEventListener('dragleave', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');
        
        const files = Array.from(e.dataTransfer.files).filter(file => 
            file.type === 'image/png'
        );
        
        if (files.length > 0) {
            handleFrameUpload(files);
        } else {
            showNotification('Please upload PNG files only', 'warning');
        }
    });
    
    // File input change
    fileInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            handleFrameUpload(files);
        }
        e.target.value = ''; // Reset input
    });
}

// Handle frame upload
function handleFrameUpload(files) {
    showNotification(`Uploading ${files.length} frame${files.length !== 1 ? 's' : ''}...`, 'info');
    
    files.forEach((file, index) => {
        setTimeout(() => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const newFrame = {
                    id: portraitFrames.length + index + 1,
                    name: file.name.replace('.png', ''),
                    filename: file.name,
                    image: e.target.result,
                    dimensions: '300x400', // Would be detected in real implementation
                    fileSize: Math.round(file.size / 1024) + 'KB',
                    uploadDate: new Date(),
                    isActive: true,
                    assignedTemplates: []
                };
                
                portraitFrames.push(newFrame);
                
                // Add to grid
                const framesGrid = document.getElementById('frames-grid');
                if (framesGrid) {
                    const frameCard = createFrameCard(newFrame);
                    framesGrid.appendChild(frameCard);
                }
                
                updateFrameCount();
                
                if (index === files.length - 1) {
                    showNotification(`Successfully uploaded ${files.length} frame${files.length !== 1 ? 's' : ''}!`, 'success');
                }
            };
            reader.readAsDataURL(file);
        }, index * 200); // Stagger uploads for better UX
    });
}

// Frame search functionality
document.addEventListener('DOMContentLoaded', () => {
    const frameSearchInput = document.getElementById('frame-search');
    if (frameSearchInput) {
        frameSearchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            filterFrames(searchTerm);
        });
    }
});

// Filter frames by search term
function filterFrames(searchTerm) {
    const frameCards = document.querySelectorAll('.frame-card');
    
    frameCards.forEach(card => {
        const frameName = card.querySelector('.frame-name').textContent.toLowerCase();
        const matches = frameName.includes(searchTerm);
        
        card.style.display = matches ? 'block' : 'none';
    });
}

// === UNIFIED TEMPLATE-FRAME MANAGEMENT ===

// Template-Frame assignment mapping
let templateFrameAssignments = {};

// Initialize unified template-frame management
function initializeUnifiedTemplateFrameManagement() {
    // Add frame assignment tabs
    initializeFrameAssignmentTabs();
    
    // Setup bulk frame assignment tools
    initializeBulkFrameTools();
    
    // Setup template modal frame assignment
    initializeTemplateModalFrameAssignment();
    
    // Add frame indicators to template cards
    updateTemplateFrameIndicators();
}

// Initialize frame assignment tabs
function initializeFrameAssignmentTabs() {
    // Face Swap frames tab
    const faceSwapFramesTab = document.getElementById('faceswap-frames-tab');
    if (faceSwapFramesTab) {
        faceSwapFramesTab.addEventListener('click', () => {
            showFrameAssignmentView('faceswap');
        });
    }
    
    // AI Effects frames tab
    const aiEffectsFramesTab = document.getElementById('aieffects-frames-tab');
    if (aiEffectsFramesTab) {
        aiEffectsFramesTab.addEventListener('click', () => {
            showFrameAssignmentView('aieffects');
        });
    }
}

// Show frame assignment view for template section
function showFrameAssignmentView(section) {
    // Hide other views
    document.getElementById(`${section}-gallery-view`).style.display = 'none';
    document.getElementById(`${section}-selected-view`).style.display = 'none';
    
    // Show bulk tools
    document.getElementById(`${section}-bulk-tools`).style.display = 'flex';
    
    // Create or show frame assignment view
    let frameView = document.getElementById(`${section}-frame-view`);
    if (!frameView) {
        frameView = createFrameAssignmentView(section);
        document.getElementById(`${section}-section`).appendChild(frameView);
    }
    frameView.style.display = 'block';
    
    // Update tab states
    document.querySelectorAll(`#${section}-section .tab-btn`).forEach(btn => btn.classList.remove('active'));
    document.getElementById(`${section}-frames-tab`).classList.add('active');
}

// Create frame assignment view
function createFrameAssignmentView(section) {
    const frameView = document.createElement('div');
    frameView.className = 'template-view';
    frameView.id = `${section}-frame-view`;
    frameView.style.display = 'none';
    
    frameView.innerHTML = `
        <div class="frame-assignment-overview">
            <h4><i class="fas fa-border-all"></i> Frame Assignments for ${section === 'faceswap' ? 'Face Swap' : 'AI Effects'} Templates</h4>
            <p>Manage which frames can be used with each template. Users will see these frame options on the frontend.</p>
        </div>
        
        <div class="template-frame-grid" id="${section}-template-frame-grid">
            <!-- Template-frame assignments will be populated here -->
        </div>
    `;
    
    return frameView;
}

// Initialize bulk frame assignment tools
function initializeBulkFrameTools() {
    // Face Swap bulk tools
    initializeSectionBulkTools('faceswap');
    // AI Effects bulk tools  
    initializeSectionBulkTools('aieffects');
}

// Initialize bulk tools for specific section
function initializeSectionBulkTools(section) {
    const selectAllCheckbox = document.getElementById(`${section}-select-all`);
    const frameSelector = document.getElementById(`${section}-frame-selector`);
    const bulkAssignBtn = document.getElementById(`${section}-bulk-assign`);
    
    // Populate frame selector
    populateFrameSelector(frameSelector);
    
    // Select all functionality
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', (e) => {
            toggleAllTemplateSelection(section, e.target.checked);
        });
    }
    
    // Frame selector change
    if (frameSelector) {
        frameSelector.addEventListener('change', (e) => {
            bulkAssignBtn.disabled = !e.target.value || getSelectedTemplates(section).length === 0;
        });
    }
    
    // Bulk assign button
    if (bulkAssignBtn) {
        bulkAssignBtn.addEventListener('click', () => {
            const selectedFrame = frameSelector.value;
            const selectedTemplates = getSelectedTemplates(section);
            
            if (selectedFrame && selectedTemplates.length > 0) {
                bulkAssignFrameToTemplates(selectedFrame, selectedTemplates, section);
                frameSelector.value = '';
                bulkAssignBtn.disabled = true;
            }
        });
    }
}

// Populate frame selector dropdown
function populateFrameSelector(selector) {
    if (!selector) return;
    
    // Clear existing options except first
    selector.innerHTML = '<option value="">Choose Frame...</option>';
    
    // Add frame options
    portraitFrames.forEach(frame => {
        const option = document.createElement('option');
        option.value = frame.id;
        option.textContent = frame.name;
        selector.appendChild(option);
    });
}

// Toggle all template selection
function toggleAllTemplateSelection(section, checked) {
    const templateCards = document.querySelectorAll(`#${section}-gallery-grid .template-card, #${section}-selected-grid .template-card`);
    
    templateCards.forEach(card => {
        const checkbox = card.querySelector('.selection-checkbox') || card.querySelector('.template-checkbox');
        if (checkbox) {
            checkbox.checked = checked;
            card.classList.toggle('selected', checked);
        }
    });
    
    updateBulkAssignButton(section);
}

// Get selected templates
function getSelectedTemplates(section) {
    const selected = [];
    const templateCards = document.querySelectorAll(`#${section}-gallery-grid .template-card.selected, #${section}-selected-grid .template-card.selected`);
    
    templateCards.forEach(card => {
        const templateId = card.dataset.templateId;
        if (templateId) {
            selected.push(templateId);
        }
    });
    
    return selected;
}

// Update bulk assign button state
function updateBulkAssignButton(section) {
    const bulkAssignBtn = document.getElementById(`${section}-bulk-assign`);
    const frameSelector = document.getElementById(`${section}-frame-selector`);
    const selectedCount = getSelectedTemplates(section).length;
    
    if (bulkAssignBtn && frameSelector) {
        bulkAssignBtn.disabled = !frameSelector.value || selectedCount === 0;
        bulkAssignBtn.textContent = `Assign to Selected (${selectedCount})`;
    }
}

// Bulk assign frame to templates
function bulkAssignFrameToTemplates(frameId, templateIds, section) {
    const frame = portraitFrames.find(f => f.id === frameId);
    if (!frame) return;
    
    templateIds.forEach(templateId => {
        if (!templateFrameAssignments[templateId]) {
            templateFrameAssignments[templateId] = [];
        }
        
        if (!templateFrameAssignments[templateId].includes(frameId)) {
            templateFrameAssignments[templateId].push(frameId);
        }
    });
    
    // Update template cards with frame indicators
    updateTemplateFrameIndicators();
    
    // Show success message
    showNotification(`${frame.name} assigned to ${templateIds.length} templates`, 'success');
}

// Initialize template modal frame assignment
function initializeTemplateModalFrameAssignment() {
    const templateFrameSearch = document.getElementById('template-frame-search');
    const previewWithFrameBtn = document.getElementById('preview-with-frame');
    
    // Template frame search
    if (templateFrameSearch) {
        templateFrameSearch.addEventListener('input', (e) => {
            filterAvailableFrames(e.target.value.toLowerCase());
        });
    }
    
    // Preview with frame button
    if (previewWithFrameBtn) {
        previewWithFrameBtn.addEventListener('click', () => {
            toggleFramePreview();
        });
    }
}

// Update template frame indicators
function updateTemplateFrameIndicators() {
    document.querySelectorAll('.template-card').forEach(card => {
        const templateId = card.dataset.templateId;
        const assignedFrames = templateFrameAssignments[templateId] || [];
        
        // Remove existing indicator
        const existingIndicator = card.querySelector('.frame-indicator');
        if (existingIndicator) {
            existingIndicator.remove();
        }
        
        // Add frame indicator if frames are assigned
        if (assignedFrames.length > 0) {
            card.classList.add('has-frames');
            card.dataset.frameCount = assignedFrames.length;
            
            const indicator = document.createElement('div');
            indicator.className = 'frame-indicator';
            indicator.innerHTML = `<i class="fas fa-border-all"></i> ${assignedFrames.length}`;
            card.appendChild(indicator);
        } else {
            card.classList.remove('has-frames');
            delete card.dataset.frameCount;
        }
    });
}

// Show template modal with frame assignment
function showTemplateModalWithFrames(templateId, templateData) {
    // Show existing template modal
    showTemplateModal(templateId, templateData);
    
    // Populate assigned frames
    populateAssignedFrames(templateId);
    
    // Populate available frames
    populateAvailableFrames(templateId);
}

// Populate assigned frames in modal
function populateAssignedFrames(templateId) {
    const assignedFramesContainer = document.getElementById('assigned-frames');
    const assignedFrameIds = templateFrameAssignments[templateId] || [];
    
    if (assignedFrameIds.length === 0) {
        assignedFramesContainer.innerHTML = `
            <div class="no-frames-message">
                <i class="fas fa-info-circle"></i>
                <span>No frames assigned to this template</span>
            </div>
        `;
    } else {
        const framesList = document.createElement('div');
        framesList.className = 'assigned-frames-list';
        
        assignedFrameIds.forEach(frameId => {
            const frame = portraitFrames.find(f => f.id === frameId);
            if (frame) {
                const frameItem = document.createElement('div');
                frameItem.className = 'assigned-frame-item';
                frameItem.innerHTML = `
                    <span>${frame.name}</span>
                    <button class="remove-frame" onclick="removeFrameFromTemplate('${templateId}', '${frameId}')">
                        <i class="fas fa-times"></i>
                    </button>
                `;
                framesList.appendChild(frameItem);
            }
        });
        
        assignedFramesContainer.innerHTML = '';
        assignedFramesContainer.appendChild(framesList);
    }
}

// Populate available frames in modal
function populateAvailableFrames(templateId) {
    const availableFramesGrid = document.getElementById('available-frames-grid');
    const assignedFrameIds = templateFrameAssignments[templateId] || [];
    
    availableFramesGrid.innerHTML = '';
    
    portraitFrames.forEach(frame => {
        const isAssigned = assignedFrameIds.includes(frame.id);
        
        const miniFrameCard = document.createElement('div');
        miniFrameCard.className = `mini-frame-card ${isAssigned ? 'assigned' : ''}`;
        miniFrameCard.innerHTML = `
            <img src="${frame.thumbnail}" alt="${frame.name}">
            <div class="frame-name">${frame.name}</div>
            ${isAssigned ? '<div class="assignment-indicator">✓</div>' : ''}
        `;
        
        miniFrameCard.addEventListener('click', () => {
            if (isAssigned) {
                removeFrameFromTemplate(templateId, frame.id);
            } else {
                assignFrameToTemplate(templateId, frame.id);
            }
        });
        
        availableFramesGrid.appendChild(miniFrameCard);
    });
}

// Assign frame to template
function assignFrameToTemplate(templateId, frameId) {
    if (!templateFrameAssignments[templateId]) {
        templateFrameAssignments[templateId] = [];
    }
    
    if (!templateFrameAssignments[templateId].includes(frameId)) {
        templateFrameAssignments[templateId].push(frameId);
        
        // Refresh modal view
        populateAssignedFrames(templateId);
        populateAvailableFrames(templateId);
        
        // Update template indicators
        updateTemplateFrameIndicators();
        
        const frame = portraitFrames.find(f => f.id === frameId);
        showNotification(`${frame.name} assigned to template`, 'success');
    }
}

// Remove frame from template
function removeFrameFromTemplate(templateId, frameId) {
    if (templateFrameAssignments[templateId]) {
        templateFrameAssignments[templateId] = templateFrameAssignments[templateId].filter(id => id !== frameId);
        
        // Refresh modal view
        populateAssignedFrames(templateId);
        populateAvailableFrames(templateId);
        
        // Update template indicators
        updateTemplateFrameIndicators();
        
        const frame = portraitFrames.find(f => f.id === frameId);
        showNotification(`${frame.name} removed from template`, 'info');
    }
}

// Filter available frames in modal
function filterAvailableFrames(searchTerm) {
    const miniFrameCards = document.querySelectorAll('.mini-frame-card');
    
    miniFrameCards.forEach(card => {
        const frameName = card.querySelector('.frame-name').textContent.toLowerCase();
        const matches = frameName.includes(searchTerm);
        
        card.style.display = matches ? 'block' : 'none';
    });
}

// Toggle frame preview overlay
function toggleFramePreview() {
    const frameOverlay = document.getElementById('frame-overlay');
    const previewBtn = document.getElementById('preview-with-frame');
    const templateId = document.getElementById('template-modal').dataset.templateId;
    
    if (!templateId || !templateFrameAssignments[templateId] || templateFrameAssignments[templateId].length === 0) {
        showNotification('No frames assigned to this template', 'warning');
        return;
    }
    
    const isVisible = frameOverlay.style.display === 'block';
    
    if (isVisible) {
        frameOverlay.style.display = 'none';
        previewBtn.innerHTML = '<i class="fas fa-eye"></i> Preview with Frame';
    } else {
        // Show first assigned frame
        const firstFrameId = templateFrameAssignments[templateId][0];
        const frame = portraitFrames.find(f => f.id === firstFrameId);
        
        if (frame) {
            document.getElementById('frame-preview-image').src = frame.image;
            frameOverlay.style.display = 'block';
            previewBtn.innerHTML = '<i class="fas fa-eye-slash"></i> Hide Frame';
        }
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: var(--${type === 'success' ? 'success' : type === 'warning' ? 'warning' : type === 'error' ? 'danger' : 'primary'}-color);
        color: white;
        border-radius: 8px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Initialize unified template-frame management when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize after a short delay to ensure other initialization is complete
    setTimeout(() => {
        initializeUnifiedTemplateFrameManagement();
    }, 100);
});