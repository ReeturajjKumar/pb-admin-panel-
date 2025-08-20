// Simplified Credits Management Functions

// Credit usage data
let creditUsageHistory = [];

// Initialize credit usage history with sample data
function initializeCreditUsage() {
    const now = new Date();
    
    creditUsageHistory = [
        {
            date: new Date(now - 2 * 60 * 60 * 1000), // 2 hours ago
            type: 'usage',
            description: 'Face Swap - Celebrity',
            style: 'Tom Cruise',
            credits: -1
        },
        {
            date: new Date(now - 3 * 60 * 60 * 1000), // 3 hours ago
            type: 'usage',
            description: 'AI Effect',
            style: 'Underwater Scene',
            credits: -1
        },
        {
            date: new Date(now - 6 * 60 * 60 * 1000), // 6 hours ago
            type: 'purchase',
            description: 'Credit Purchase',
            style: 'Professional Package',
            credits: 1500
        },
        {
            date: new Date(now - 24 * 60 * 60 * 1000), // yesterday
            type: 'usage',
            description: 'Face Swap - Historical',
            style: 'Einstein',
            credits: -1
        }
    ];
}

// Show credit tab
function showCreditTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.credit-tab-content').forEach(tab => {
        tab.style.display = 'none';
    });
    
    // Remove active class from all buttons
    document.querySelectorAll('.credit-tabs .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    const tabId = tabName + '-tab';
    const tab = document.getElementById(tabId);
    if (tab) {
        tab.style.display = 'block';
    }
    
    // Mark button as active
    event.target.classList.add('active');
    
    // Load content for the tab
    if (tabName === 'usage') {
        loadUsageHistory();
    } else if (tabName === 'billing') {
        loadBillingHistory();
    }
}

// Load usage history
function loadUsageHistory() {
    const filter = document.getElementById('usage-filter').value;
    const timeline = document.querySelector('.usage-timeline');
    
    if (!timeline) return;
    
    // Group usage by day
    const grouped = groupUsageByDay(creditUsageHistory, filter);
    
    // Clear existing content
    timeline.innerHTML = '';
    
    // Display grouped usage
    Object.keys(grouped).forEach(day => {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'usage-day';
        
        const headerDiv = document.createElement('div');
        headerDiv.className = 'day-header';
        headerDiv.textContent = day;
        dayDiv.appendChild(headerDiv);
        
        const itemsDiv = document.createElement('div');
        itemsDiv.className = 'usage-items';
        
        grouped[day].forEach(item => {
            const itemDiv = createUsageItem(item);
            itemsDiv.appendChild(itemDiv);
        });
        
        dayDiv.appendChild(itemsDiv);
        timeline.appendChild(dayDiv);
    });
}

// Create usage item element
function createUsageItem(item) {
    const div = document.createElement('div');
    div.className = item.type === 'purchase' ? 'usage-item purchase' : 'usage-item';
    
    const timeDiv = document.createElement('div');
    timeDiv.className = 'usage-time';
    timeDiv.textContent = formatTime(item.date);
    
    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'usage-details';
    detailsDiv.innerHTML = `
        <span class="usage-type">${item.description}</span>
        <span class="usage-style">${item.style}</span>
    `;
    
    const costDiv = document.createElement('div');
    costDiv.className = 'usage-cost';
    costDiv.textContent = item.credits > 0 ? `+${item.credits} credits` : `${item.credits} credit`;
    
    div.appendChild(timeDiv);
    div.appendChild(detailsDiv);
    div.appendChild(costDiv);
    
    return div;
}

// Group usage by day
function groupUsageByDay(usage, filter) {
    const now = new Date();
    let filtered = [...usage];
    
    // Apply filter
    switch(filter) {
        case 'today':
            filtered = filtered.filter(item => isToday(item.date));
            break;
        case 'week':
            filtered = filtered.filter(item => {
                const diff = now - item.date;
                return diff < 7 * 24 * 60 * 60 * 1000;
            });
            break;
        case 'month':
            filtered = filtered.filter(item => {
                const diff = now - item.date;
                return diff < 30 * 24 * 60 * 60 * 1000;
            });
            break;
    }
    
    // Group by day
    const grouped = {};
    filtered.forEach(item => {
        const day = formatDay(item.date);
        if (!grouped[day]) {
            grouped[day] = [];
        }
        grouped[day].push(item);
    });
    
    // Sort days
    Object.keys(grouped).forEach(day => {
        grouped[day].sort((a, b) => b.date - a.date);
    });
    
    return grouped;
}

// Format day
function formatDay(date) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today - 24 * 60 * 60 * 1000);
    const itemDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    
    if (itemDate.getTime() === today.getTime()) {
        return 'Today';
    } else if (itemDate.getTime() === yesterday.getTime()) {
        return 'Yesterday';
    } else {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
}

// Format time
function formatTime(date) {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

// Check if date is today
function isToday(date) {
    const now = new Date();
    return date.getDate() === now.getDate() &&
           date.getMonth() === now.getMonth() &&
           date.getFullYear() === now.getFullYear();
}

// Filter usage
function filterUsage() {
    loadUsageHistory();
}

// Export usage
function exportUsage() {
    const filter = document.getElementById('usage-filter').value;
    console.log('Exporting usage for:', filter);
    showNotification('Usage history exported successfully', 'success');
}

// Show buy credits
function showBuyCredits() {
    showCreditTab('packages');
    // Find and activate the packages tab button
    document.querySelectorAll('.credit-tabs .tab-btn').forEach(btn => {
        if (btn.textContent.includes('Buy Credits')) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Load billing history
function loadBillingHistory() {
    console.log('Loading billing history...');
    // Billing history is already in the HTML as static content
    // In a real app, this would fetch from the server
}

// Purchase credits
function purchaseCredits(packageType) {
    console.log('Purchasing:', packageType);
    showNotification(`${packageType} package purchase initiated`, 'info');
    // In a real app, this would handle payment processing
}