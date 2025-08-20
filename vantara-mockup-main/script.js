// Screen content definitions
const screens = {
    1: {
        tv: `
            <div class="brand-title">Vantara AI Photo Booth</div>
            <div class="animation-box">
                <div>Looping Animation</div>
            </div>
            <div style="color: #7f8c8d; font-style: italic;">Animation playing...</div>
        `,
        tablet: `
            <div class="tablet-brand-title">Vantara AI Photo Booth</div>
            <div style="flex-grow: 1; display: flex; align-items: center; justify-content: center;">
                <button class="start-button">START</button>
            </div>
        `
    },
    2: {
        tv: `
            <div class="camera-frame" id="camera-frame">
                <div class="camera-message">
                    📸 Camera Ready
                    <div style="font-size: 16px; margin-top: 10px; color: #7f8c8d;">
                        Tap "Capture the Moment" to take photo
                    </div>
                </div>
                <div class="countdown" id="countdown" style="display: none;">3</div>
                <div class="tv-captured-photo" style="display: none;" id="captured-photo-tv">
                    Captured Image
                </div>
                <div style="color: #7f8c8d; margin-top: 20px; display: none;" id="continue-message">
                    Continue choosing options on the tab.
                </div>
            </div>
        `,
        tablet: `
            <div class="tablet-brand-title">Ready for Your Photo</div>
            <div class="take-photo-container" id="take-photo-container">
                <div class="photo-instructions">
                    <div style="font-size: 48px; margin-bottom: 15px;">📸</div>
                    <div style="color: #2c3e50; font-weight: 600; margin-bottom: 10px;">Position yourself and get ready!</div>
                    <div style="color: #7f8c8d; font-size: 14px;">Make sure everyone is in frame</div>
                </div>
                <button class="start-button" id="take-photo-btn" style="margin-top: 30px;">
                    🌊 Capture the Moment
                </button>
            </div>
            <div class="captured-photo" style="display: none;" id="captured-photo-tablet">
                Captured Photo
            </div>
            <div style="display: none;" id="photo-actions">
                <button class="action-button">Retake Photo</button>
                <button class="action-button primary-button">Continue</button>
            </div>
        `
    },
    3: {
        tv: `
            <div class="status-message">
                Continue choosing options on the tab.
            </div>
        `,
        tablet: `
            <div class="tablet-brand-title">Choose Your Experience</div>
            <div class="experience-options">
                <div class="experience-option" data-option="solo">
                    <div class="experience-icon">✨</div>
                    <div class="experience-title">Solo Transformation</div>
                    <div class="experience-subtitle">One person only — become anyone</div>
                </div>
                <div class="experience-option" data-option="ai-effects">
                    <div class="experience-icon">🎭</div>
                    <div class="experience-title">AI Effects</div>
                    <div class="experience-subtitle">Fun styles for one or many</div>
                </div>
            </div>
            <div class="sticky-footer">
                <button class="action-button back-button">← Back</button>
                <button class="action-button primary-button" disabled>Continue</button>
            </div>
        `
    },
    4: {
        tv: `
            <div class="status-message">
                AI Style being selected via the tab.
            </div>
        `,
        tablet: null // Will be generated dynamically
    },
    5: {
        tv: `
            <div class="status-message">
                Please choose a suitable frame via the tab.
            </div>
        `,
        tablet: `
            <div class="tablet-brand-title">Pick a Frame</div>
            <div class="frame-grid">
                <div class="frame-item">
                    <div class="frame-preview">🫧</div>
                    <div class="style-name">Bubble Frame</div>
                </div>
                <div class="frame-item">
                    <div class="frame-preview">🪸</div>
                    <div class="style-name">Coral Border</div>
                </div>
                <div class="frame-item">
                    <div class="frame-preview">🌊</div>
                    <div class="style-name">Wave Crest</div>
                </div>
                <div class="frame-item">
                    <div class="frame-preview">🏝️</div>
                    <div class="style-name">Tropical Paradise</div>
                </div>
            </div>
            <div class="sticky-footer">
                <button class="action-button back-button">← Back</button>
                <button class="action-button primary-button">Confirm Frame</button>
            </div>
        `
    },
    6: {
        tv: `
            <div class="processing-spinner"></div>
            <div class="processing-text">AI Processing... Please wait.</div>
        `,
        tablet: `
            <div style="text-align: center; margin-top: 50px;">
                <div class="processing-spinner"></div>
                <div style="color: #7f8c8d; font-style: italic; margin-top: 20px;">
                    "Creating magic with AI..."
                </div>
            </div>
        `
    },
    7: {
        tv: `
            <div class="final-image">
                Final Transformed Image<br>
                <small>(Frame + Overlay)</small>
            </div>
            <div class="qr-code-container">
                <div id="tv-qr-code" class="qr-code"></div>
            </div>
            <div class="download-message">
                Scan the QR to download your picture
            </div>
        `,
        tablet: `
            <div class="final-result-container">
                <div class="tablet-brand-title">🧾 Your Magical Photo is Ready!</div>
                
                <div class="qr-download-section">
                    <div id="tablet-qr-code" class="qr-code"></div>
                    <div class="download-instructions">
                        <p>📲 Scan to download your photo</p>
                    </div>
                </div>
                
                <div class="next-actions-section">
                    <div class="section-title">✨ What would you like to do next?</div>
                    
                    <button class="action-button final-action-btn">
                        <span class="action-icon">🔁</span>
                        <span class="action-text">
                            <strong>Try a New AI Style</strong>
                            <small>Use the same photo with a different look</small>
                        </span>
                    </button>
                    
                    <button class="action-button final-action-btn">
                        <span class="action-icon">🌊</span>
                        <span class="action-text">
                            <strong>Try Vantara Style</strong>
                            <small>Apply our exclusive underwater effect</small>
                        </span>
                    </button>
                    
                    <button class="action-button final-action-btn">
                        <span class="action-icon">📸</span>
                        <span class="action-text">
                            <strong>Take a New Photo</strong>
                            <small>Start over with a fresh photo</small>
                        </span>
                    </button>
                    
                    <button class="action-button primary-button final-action-btn">
                        <span class="action-icon">✅</span>
                        <span class="action-text">
                            <strong>Finish & Exit</strong>
                        </span>
                    </button>
                </div>
            </div>
        `
    }
};

// Global variables
let currentScreen = 1;
let countdownInterval;
let selectedPeopleCount = null;
let selectedExperience = null; // 'solo' or 'ai-effects'
let photoStage = 'ready'; // 'ready', 'countdown', 'captured'

// Session timeout variables
let sessionTimeoutDuration = 60; // seconds
let sessionTimer = null;
let lastActivity = Date.now();
let warningTimer = null;
let isWarningShown = false;

// Generate QR code for download
function generateQRCode(elementId, url) {
    const element = document.getElementById(elementId);
    if (element) {
        // Different sizes for TV and tablet
        const size = elementId === 'tv-qr-code' ? 150 : 100;
        
        // For mockup purposes, show a placeholder QR code
        element.innerHTML = `
            <div style="width: ${size}px; height: ${size}px; background: #000; position: relative; padding: 8px;">
                <div style="position: absolute; inset: 3px; background: #fff;"></div>
                <div style="position: absolute; inset: 6px; background: #000;"></div>
                <div style="position: absolute; inset: 9px; background: #fff;"></div>
                <div style="position: absolute; inset: 12px; background: #000;"></div>
                <div style="position: absolute; inset: 15px; background: #fff;"></div>
                <div style="position: absolute; inset: 18px; background: #000;"></div>
                <div style="position: absolute; top: 6px; left: 6px; width: 30%; height: 30%; background: #000;">
                    <div style="position: absolute; inset: 3px; background: #fff;"></div>
                    <div style="position: absolute; inset: 9px; background: #000;"></div>
                </div>
                <div style="position: absolute; top: 6px; right: 6px; width: 30%; height: 30%; background: #000;">
                    <div style="position: absolute; inset: 3px; background: #fff;"></div>
                    <div style="position: absolute; inset: 9px; background: #000;"></div>
                </div>
                <div style="position: absolute; bottom: 6px; left: 6px; width: 30%; height: 30%; background: #000;">
                    <div style="position: absolute; inset: 3px; background: #fff;"></div>
                    <div style="position: absolute; inset: 9px; background: #000;"></div>
                </div>
            </div>
        `;
    }
}

// Generate dynamic style selection content based on people count
function generateStyleSelectionContent() {
    const aspectRatio = (selectedPeopleCount === 'single' || selectedPeopleCount === 'two') ? 'style-2-3' : 'style-3-2';
    
    return `
        <div class="tablet-brand-title">Choose an AI Style</div>
        <div class="style-grid">
            <div class="style-item">
                <div class="style-image ${aspectRatio}">🐠</div>
                <div class="style-name">Coral Reef Dreams</div>
            </div>
            <div class="style-item">
                <div class="style-image ${aspectRatio}">🌊</div>
                <div class="style-name">Deep Ocean Blue</div>
            </div>
            <div class="style-item">
                <div class="style-image ${aspectRatio}">🐙</div>
                <div class="style-name">Octopus Garden</div>
            </div>
            <div class="style-item">
                <div class="style-image ${aspectRatio}">🐢</div>
                <div class="style-name">Sea Turtle Serenity</div>
            </div>
            <div class="style-item">
                <div class="style-image ${aspectRatio}">🦈</div>
                <div class="style-name">Shark Tank Adventure</div>
            </div>
            <div class="style-item">
                <div class="style-image ${aspectRatio}">🐚</div>
                <div class="style-name">Seashell Memories</div>
            </div>
        </div>
        <div class="sticky-footer">
            <button class="action-button back-button">← Back</button>
            <button class="action-button primary-button">Proceed</button>
        </div>
    `;
}

// Initialize the mockup
function init() {
    showScreen(1);
    setupSessionTimeout();
    loadTimeoutSettings();
}

// Session timeout management
function setupSessionTimeout() {
    // Add activity listeners
    document.addEventListener('click', trackActivity);
    document.addEventListener('keypress', trackActivity);
    document.addEventListener('mousemove', trackActivity);
    document.addEventListener('touchstart', trackActivity);
    
    // Start the session timer
    resetSessionTimer();
}

function trackActivity() {
    lastActivity = Date.now();
    hideWarningIfShown();
    resetSessionTimer();
}

function resetSessionTimer() {
    // Clear existing timers
    if (sessionTimer) clearTimeout(sessionTimer);
    if (warningTimer) clearTimeout(warningTimer);
    
    isWarningShown = false;
    
    // Set warning timer (10 seconds before timeout)
    const warningTime = Math.max(0, (sessionTimeoutDuration - 10) * 1000);
    if (warningTime > 0) {
        warningTimer = setTimeout(() => {
            showTimeoutWarning();
        }, warningTime);
    }
    
    // Set session reset timer
    sessionTimer = setTimeout(() => {
        resetPhotoBoothSession();
    }, sessionTimeoutDuration * 1000);
}

function showTimeoutWarning() {
    if (currentScreen === 1) return; // Don't show warning on idle screen
    
    isWarningShown = true;
    
    // Create warning overlay
    const warningOverlay = document.createElement('div');
    warningOverlay.id = 'timeout-warning';
    warningOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(5px);
    `;
    
    const warningBox = document.createElement('div');
    warningBox.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 20px;
        text-align: center;
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        max-width: 500px;
        animation: scaleIn 0.3s ease;
    `;
    
    warningBox.innerHTML = `
        <div style="font-size: 48px; margin-bottom: 20px;">⏰</div>
        <h2 style="color: #e74c3c; margin-bottom: 15px;">Session Ending Soon!</h2>
        <p style="color: #2c3e50; margin-bottom: 20px; font-size: 18px;">
            Your session will reset in 10 seconds due to inactivity.
        </p>
        <button onclick="continueSession()" style="
            background: #27ae60;
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 10px;
            font-size: 18px;
            cursor: pointer;
            transition: all 0.3s ease;
        ">🌊 Continue Session</button>
    `;
    
    warningOverlay.appendChild(warningBox);
    document.body.appendChild(warningOverlay);
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes scaleIn {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

function continueSession() {
    hideWarningIfShown();
    trackActivity();
}

function hideWarningIfShown() {
    const warning = document.getElementById('timeout-warning');
    if (warning) {
        warning.remove();
        isWarningShown = false;
    }
}

function resetPhotoBoothSession() {
    // Clear all timers
    if (countdownInterval) clearInterval(countdownInterval);
    if (sessionTimer) clearTimeout(sessionTimer);
    if (warningTimer) clearTimeout(warningTimer);
    
    // Hide warning if shown
    hideWarningIfShown();
    
    // Reset all variables
    selectedPeopleCount = null;
    selectedExperience = null;
    photoStage = 'ready';
    currentScreen = 1;
    
    // Show idle screen
    showScreen(1);
    
    // Show reset notification
    showSessionResetNotification();
    
    // Restart session timer
    resetSessionTimer();
}

function showSessionResetNotification() {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #3498db;
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        font-size: 16px;
        font-weight: 500;
        z-index: 9999;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 16px rgba(52, 152, 219, 0.3);
    `;
    
    notification.innerHTML = '🔄 Session reset due to inactivity';
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function loadTimeoutSettings() {
    // Load from localStorage or use default
    const savedTimeout = localStorage.getItem('photoBoothTimeout');
    if (savedTimeout) {
        sessionTimeoutDuration = parseInt(savedTimeout);
    }
}

// Function to update timeout setting (can be called from settings)
function updateSessionTimeout(seconds) {
    sessionTimeoutDuration = seconds;
    localStorage.setItem('photoBoothTimeout', seconds);
    resetSessionTimer();
}

// Show specific screen
function showScreen(screenNumber) {
    currentScreen = screenNumber;
    
    // Track activity when changing screens
    trackActivity();
    
    // Update navigation
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`nav-${screenNumber}`).classList.add('active');
    
    // Update screen content
    const tvContent = document.getElementById('tv-content');
    const tabletContent = document.getElementById('tablet-content');
    
    tvContent.innerHTML = screens[screenNumber].tv;
    
    // Generate tablet content dynamically for screen 4
    if (screenNumber === 4) {
        tabletContent.innerHTML = generateStyleSelectionContent();
    } else {
        tabletContent.innerHTML = screens[screenNumber].tablet;
    }
    
    // Add special interactions based on screen
    addScreenInteractions(screenNumber);
}

// Add screen-specific interactions
function addScreenInteractions(screenNumber) {
    switch(screenNumber) {
        case 1:
            // Start button functionality
            const startBtn = document.querySelector('.start-button');
            if (startBtn) {
                startBtn.addEventListener('click', () => {
                    photoStage = 'ready';
                    showScreen(2);
                });
            }
            break;
            
        case 2:
            // Handle photo capture flow
            if (photoStage === 'ready') {
                setupPhotoCapture();
            }
            break;
            
        case 3:
            // Experience selection
            const experienceOptions = document.querySelectorAll('.experience-option');
            const continueBtn = document.querySelector('.sticky-footer .primary-button');
            
            experienceOptions.forEach(option => {
                option.addEventListener('click', () => {
                    experienceOptions.forEach(opt => opt.classList.remove('selected'));
                    option.classList.add('selected');
                    selectedExperience = option.dataset.option;
                    
                    // Enable continue button
                    if (continueBtn) {
                        continueBtn.disabled = false;
                    }
                    
                    // Set people count based on experience type
                    if (selectedExperience === 'solo') {
                        selectedPeopleCount = 'single';
                    } else {
                        selectedPeopleCount = 'multiple'; // For AI effects, could be any number
                    }
                });
            });
            
            // Back button
            const backBtn3 = document.querySelector('.back-button');
            if (backBtn3) {
                backBtn3.addEventListener('click', () => showScreen(2));
            }
            
            // Continue button
            if (continueBtn) {
                continueBtn.addEventListener('click', () => {
                    if (selectedExperience) {
                        showScreen(4);
                    } else {
                        alert('Please choose an experience type.');
                    }
                });
            }
            break;
            
        case 4:
            // Style selection
            const styleItems = document.querySelectorAll('.style-item');
            styleItems.forEach(item => {
                item.addEventListener('click', () => {
                    styleItems.forEach(style => style.style.background = '');
                    item.style.background = '#d5f4e6';
                });
            });
            
            // Back button
            const backBtn4 = document.querySelector('.back-button');
            if (backBtn4) {
                backBtn4.addEventListener('click', () => showScreen(3));
            }
            
            // Proceed button
            const proceedBtn = document.querySelector('.sticky-footer .primary-button');
            if (proceedBtn) {
                proceedBtn.addEventListener('click', () => showScreen(5));
            }
            break;
            
        case 5:
            // Frame selection
            const frameItems = document.querySelectorAll('.frame-item');
            frameItems.forEach(item => {
                item.addEventListener('click', () => {
                    frameItems.forEach(frame => frame.classList.remove('selected'));
                    item.classList.add('selected');
                });
            });
            
            // Back button
            const backBtn5 = document.querySelector('.back-button');
            if (backBtn5) {
                backBtn5.addEventListener('click', () => showScreen(4));
            }
            
            // Confirm button
            const confirmBtn = document.querySelector('.sticky-footer .primary-button');
            if (confirmBtn) {
                confirmBtn.addEventListener('click', () => {
                    showScreen(6);
                    setTimeout(() => showScreen(7), 3000); // Auto-advance after processing
                });
            }
            break;
            
        case 7:
            // Generate QR codes for both screens
            const photoId = Date.now(); // Generate unique ID for this photo
            const shortId = photoId.toString().slice(-6); // Get last 6 digits for short URL
            const downloadUrl = `https://photo.vantara.ai/download/${photoId}`;
            
            // Generate QR codes with a small delay to ensure DOM is ready
            setTimeout(() => {
                generateQRCode('tv-qr-code', downloadUrl);
                generateQRCode('tablet-qr-code', downloadUrl);
            }, 500);
            
            // End session actions
            const endButtons = document.querySelectorAll('.tablet-content .final-action-btn');
            endButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const buttonText = btn.querySelector('strong').textContent;
                    if (buttonText === 'Take a New Photo') {
                        photoStage = 'ready';
                        showScreen(2);
                    } else if (buttonText === 'Try a New AI Style') {
                        showScreen(3);
                    } else if (buttonText === 'Try Vantara Style') {
                        // Show processing screen
                        showScreen(6);
                        // After 3 seconds, return to final screen
                        setTimeout(() => showScreen(7), 3000);
                    } else if (buttonText === 'Finish & Exit') {
                        showScreen(1);
                    }
                });
            });
            break;
    }
}

// Setup photo capture interface
function setupPhotoCapture() {
    const takePhotoBtn = document.getElementById('take-photo-btn');
    if (takePhotoBtn) {
        takePhotoBtn.addEventListener('click', () => {
            photoStage = 'countdown';
            startCountdown();
        });
    }
}

// Countdown functionality for photo capture
function startCountdown() {
    const countdownEl = document.getElementById('countdown');
    const cameraMessage = document.querySelector('.camera-message');
    const takePhotoContainer = document.getElementById('take-photo-container');
    
    // Hide camera message and show countdown
    if (cameraMessage) cameraMessage.style.display = 'none';
    if (countdownEl) countdownEl.style.display = 'block';
    if (takePhotoContainer) takePhotoContainer.style.display = 'none';
    
    let count = 3;
    
    if (countdownEl) {
        countdownInterval = setInterval(() => {
            count--;
            if (count > 0) {
                countdownEl.textContent = count;
            } else if (count === 0) {
                countdownEl.textContent = '🌊 SMILE!';
            } else {
                // Photo taken
                clearInterval(countdownInterval);
                photoStage = 'captured';
                showPhotoCaptured();
            }
        }, 1000);
    }
}

// Show captured photo state
function showPhotoCaptured() {
    const countdownEl = document.getElementById('countdown');
    const capturedPhotoTV = document.getElementById('captured-photo-tv');
    const capturedPhotoTablet = document.getElementById('captured-photo-tablet');
    const continueMessage = document.getElementById('continue-message');
    const photoActions = document.getElementById('photo-actions');
    
    // Hide countdown and show captured photo
    if (countdownEl) countdownEl.style.display = 'none';
    if (capturedPhotoTV) capturedPhotoTV.style.display = 'flex';
    if (continueMessage) continueMessage.style.display = 'block';
    if (capturedPhotoTablet) capturedPhotoTablet.style.display = 'flex';
    if (photoActions) photoActions.style.display = 'block';
    
    // Add photo action button functionality
    const retakeBtn = document.querySelector('#photo-actions .action-button:not(.primary-button)');
    const usePhotoBtn = document.querySelector('#photo-actions .primary-button');
    
    if (retakeBtn) {
        retakeBtn.addEventListener('click', () => {
            photoStage = 'ready';
            showScreen(2);
        });
    }
    
    if (usePhotoBtn) {
        usePhotoBtn.addEventListener('click', () => showScreen(3));
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', init);