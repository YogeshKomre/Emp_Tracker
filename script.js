// Global Variables
let currentUser = null;
let currentRole = null;
let loginTime = null;
let loginTimer = null;
let breakTimers = {
    first: null,
    second: null,
    bio: null
};
let breakDurations = {
    first: 0,
    second: 0,
    bio: 0
};
let slotTimers = {
    hr: null,
    supervisor: null,
    audit: null
};
let slotDurations = {
    hr: 0,
    supervisor: 0,
    audit: 0
};

// Sales data array
let sales = [
    { type: 'Fiber', count: 0 },
    { type: 'Mobile', count: 0 },
    { type: 'Video', count: 0 }
];

// --- Remove OpenAI API integration ---
// --- Restore simple local chatbot logic ---

function handleTechIssue() {
    const inputElem = document.getElementById('techInput');
    const input = inputElem.value;
    const messages = document.getElementById('techMessages');
    if (!input) return;
    messages.innerHTML += `<div class="user-message">${input}</div>`;
    let response = "I'm here to help with tech issues!";
    if (input.toLowerCase().includes('internet')) {
        response = "Check your modem lights and try restarting your router. If issues persist, contact tech support.";
    } else if (input.toLowerCase().includes('video')) {
        response = "Try restarting your set-top box and check if you have the latest firmware.";
    } else if (input.toLowerCase().includes('cable box')) {
        response = "Check if the cable box is properly connected and powered. Try a power cycle if needed.";
    } else if (input.toLowerCase().includes('modem')) {
        response = "Check power supply and connections. Try resetting the modem if needed.";
    } else if (input.toLowerCase().includes('remote')) {
        response = "Ensure the remote is properly paired. Check battery levels and alignment.";
    }
    messages.innerHTML += `<div class="bot-message">${response}</div>`;
    inputElem.value = '';
    messages.scrollTop = messages.scrollHeight;
}

function handleCustomerIssue() {
    const inputElem = document.getElementById('customerInput');
    const input = inputElem.value;
    const messages = document.getElementById('customerMessages');
    if (!input) return;
    messages.innerHTML += `<div class="user-message">${input}</div>`;
    let response = "I'm here to help with customer handling!";
    if (input.toLowerCase().includes('irate') || input.toLowerCase().includes('upset')) {
        response = "Stay calm, listen actively, and apologize sincerely. Offer solutions and escalate if needed.";
    } else if (input.toLowerCase().includes('billing')) {
        response = "Review the bill carefully, explain charges clearly, and offer payment options.";
    } else if (input.toLowerCase().includes('service')) {
        response = "Acknowledge the issue, provide status updates, and set expectations.";
    } else if (input.toLowerCase().includes('happy')) {
        response = "Great job! Continue providing excellent service and maintain a positive attitude.";
    } else if (input.toLowerCase().includes('unhappy')) {
        response = "Listen actively, empathize, and address concerns promptly.";
    }
    messages.innerHTML += `<div class="bot-message">${response}</div>`;
    inputElem.value = '';
    messages.scrollTop = messages.scrollHeight;
}

// Initialize session on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedSession = localStorage.getItem('session');
    if (savedSession) {
        const session = JSON.parse(savedSession);
        currentUser = session.username;
        currentRole = session.role;
        loginTime = new Date(session.loginTime);
        
        // Restore slots
        Object.keys(slotTimers).forEach(key => {
            if (session.slotTimers[key]) {
                slotTimers[key] = setInterval(() => {
                    slotDurations[key] += 1;
                    updateSlotDisplay(key);
                    updateManagerSummary(); // Update summary when slot changes
                }, 1000);
                
                // Update button text
                const button = document.querySelector(`button[onclick*="${key}"]`);
                if (button) {
                    button.textContent = `End ${key.charAt(0).toUpperCase() + key.slice(1)}`;
                }
            }
        });
        
        // Update slot durations
        if (session.slotDurations) {
            Object.assign(slotDurations, session.slotDurations);
            Object.keys(slotDurations).forEach(key => {
                updateSlotDisplay(key);
            });
        }
        
        // Show manager summary if manager
        if (currentRole === 'manager') {
            document.querySelector('.manager-summary').style.display = 'block';
            updateManagerSummary();
        }
        
        // Show dashboard and hide login
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        
        // Show manager dashboard if role is manager
        if (currentRole === 'manager') {
            document.getElementById('managerDashboard').style.display = 'block';
        }
        
        // Start login timer
        startLoginTimer();
        
        // Restore break timers
        Object.keys(breakTimers).forEach(key => {
            if (session.breakTimers[key]) {
                breakTimers[key] = setInterval(() => {
                    breakDurations[key] += 1;
                    updateBreakDisplay();
                }, 1000);
            }
        });
        
        // Update break display with saved values
        if (session.breakDurations) {
            Object.assign(breakDurations, session.breakDurations);
            updateBreakDisplay();
        }
        
        // Update username display
        document.getElementById('userName').textContent = currentUser;
    }
});

// Login/Logout Functions
function handleLogin() {
    const username = document.getElementById('username').value;
    const role = document.getElementById('userRole').value;
    
    if (username) {
        currentUser = username;
        currentRole = role;
        loginTime = new Date();
        
        // Save session to localStorage
        saveSession();
        
        // Show dashboard and hide login
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        
        // Show manager dashboard if role is manager
        if (role === 'manager') {
            document.getElementById('managerDashboard').style.display = 'block';
        }
        
        // Start login timer
        startLoginTimer();
        
        // Update username display
        document.getElementById('userName').textContent = username;
    }
}

function saveSession() {
    const session = {
        username: currentUser,
        role: currentRole,
        loginTime: loginTime.toISOString(),
        breakTimers: breakTimers,
        breakDurations: breakDurations,
        slotTimers: slotTimers,
        slotDurations: slotDurations
    };
    localStorage.setItem('session', JSON.stringify(session));
}

function handleLogout() {
    clearInterval(loginTimer);
    
    // Clear slot timers
    Object.keys(slotTimers).forEach(key => {
        if (slotTimers[key]) {
            clearInterval(slotTimers[key]);
            slotTimers[key] = null;
            slotDurations[key] = 0;
            
            // Reset button text
            const button = document.querySelector(`button[onclick*="${key}"]`);
            if (button) {
                button.textContent = `Start ${key.charAt(0).toUpperCase() + key.slice(1)}`;
            }
            
            // Reset duration display
            document.getElementById(`${key}Duration`).textContent = '00:00';
            
            // Reset summary display
            document.getElementById(`summary${key.charAt(0).toUpperCase() + key.slice(1)}`).textContent = '00:00';
        }
    });
    
    // Hide manager summary
    document.querySelector('.manager-summary').style.display = 'none';
    
    // Clear localStorage
    localStorage.removeItem('session');
    
    currentUser = null;
    currentRole = null;
    loginTime = null;
    
    // Reset all inputs
    document.getElementById('username').value = '';
    document.getElementById('userRole').value = 'employee';
    
    // Reset break display
    updateBreakDisplay();
    
    // Reset manager dashboard
    document.getElementById('hrStart').value = '';
    document.getElementById('hrEnd').value = '';
    document.getElementById('supervisorStart').value = '';
    document.getElementById('supervisorEnd').value = '';
    document.getElementById('auditStart').value = '';
    document.getElementById('auditEnd').value = '';
    
    // Clear chat messages
    document.getElementById('techMessages').innerHTML = '';
    document.getElementById('customerMessages').innerHTML = '';
    
    // Show login and hide dashboard
    document.getElementById('loginContainer').style.display = 'block';
    document.getElementById('dashboard').style.display = 'none';
}

// Break Tracking Functions
function toggleBreak(type) {
    const button = document.querySelector(`button[onclick*="${type}"]`);
    
    if (breakTimers[type]) {
        clearInterval(breakTimers[type]);
        breakTimers[type] = null;
        button.textContent = `${type.charAt(0).toUpperCase() + type.slice(1)} Break`;
    } else {
        breakTimers[type] = setInterval(() => {
            breakDurations[type] += 1;
            updateBreakDisplay();
        }, 1000);
        button.textContent = `End ${type.charAt(0).toUpperCase() + type.slice(1)}`;
    }
    saveSession(); // Save break state
}

function updateBreakDisplay() {
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    document.getElementById('firstBreak').textContent = formatTime(breakDurations.first);
    document.getElementById('secondBreak').textContent = formatTime(breakDurations.second);
    document.getElementById('bioBreak').textContent = formatTime(breakDurations.bio);

    // Calculate total break time
    const totalBreakSeconds = breakDurations.first + breakDurations.second + breakDurations.bio;
    document.getElementById('totalBreak').textContent = formatTime(totalBreakSeconds);
    document.getElementById('summaryBreak').textContent = formatTime(totalBreakSeconds);
}

// Sales Tracking Functions
function addSale() {
    const fiberCount = parseInt(document.getElementById('Fiber').value) || 0;
    const mobileCount = parseInt(document.getElementById('Mobile').value) || 0;
    const videoCount = parseInt(document.getElementById('Video').value) || 0;

    if (fiberCount < 0 || mobileCount < 0 || videoCount < 0) {
        alert('Please enter valid (non-negative) numbers for sales.');
        return;
    }

    // Update sales array
    sales.find(s => s.type === 'Fiber').count += fiberCount;
    sales.find(s => s.type === 'Mobile').count += mobileCount;
    sales.find(s => s.type === 'Video').count += videoCount;

    updateSalesList();
    updateTotalSales();
    localStorage.setItem('sales', JSON.stringify(sales));

    // Clear inputs
    document.getElementById('Fiber').value = '';
    document.getElementById('Mobile').value = '';
    document.getElementById('Video').value = '';
}

function updateSalesList() {
    const salesList = document.getElementById('salesItems');
    salesList.innerHTML = '';
    sales.forEach(sale => {
        if (sale.count > 0) {
            const li = document.createElement('li');
            li.innerHTML = `<span>${sale.type}</span><span>Count: ${sale.count}</span>`;
            salesList.appendChild(li);
        }
    });
}

function updateTotalSales() {
    const total = sales.reduce((sum, sale) => sum + sale.count, 0);
    document.getElementById('totalSales').textContent = total;
    document.getElementById('summarySales').textContent = total;
}

// On load, restore sales from localStorage
window.addEventListener('DOMContentLoaded', () => {
    const savedSales = localStorage.getItem('sales');
    if (savedSales) {
        const loaded = JSON.parse(savedSales);
        // Ensure all three types exist
        ['Fiber', 'Mobile', 'Video'].forEach(type => {
            if (!loaded.find(s => s.type === type)) {
                loaded.push({ type, count: 0 });
            }
        });
        sales = loaded;
        updateSalesList();
        updateTotalSales();
    }
});

// Save sales data when window closes
window.addEventListener('beforeunload', () => {
    localStorage.setItem('sales', JSON.stringify(sales));
});

// Email Function
function sendEmail() {
    const totalBreak = document.getElementById('summaryBreak').textContent;
    const totalSales = document.getElementById('summarySales').textContent;
    const loginHours = document.getElementById('loginHours').textContent;
    
    let emailBody = `Employee Summary:\n\n` +
        `Login Hours: ${loginHours}\n` +
        `Total Break Time: ${totalBreak}\n` +
        `Total Sales: ${totalSales}\n\n`;
    
    if (currentRole === 'manager') {
        emailBody += `Manager Summary:\n`;
        Object.keys(slotDurations).forEach(type => {
            const time = document.getElementById(`${type}Duration`).textContent;
            emailBody += `${type.charAt(0).toUpperCase() + type.slice(1)} Time: ${time}\n`;
        });
    }
    
    window.location.href = `mailto:manager@example.com?subject=Employee%20Summary&body=${encodeURIComponent(emailBody)}`;

    // Clear sales history after sending summary
    sales.forEach(sale => sale.count = 0);
    updateSalesList();
    updateTotalSales();
    localStorage.setItem('sales', JSON.stringify(sales));
}

// Login/Logout Functions
function startLoginTimer() {
    loginTimer = setInterval(updateLoginHours, 1000);
}

function updateLoginHours() {
    if (loginTime) {
        const currentTime = new Date();
        const sessionDuration = currentTime - loginTime;
        
        // Convert milliseconds to hours:minutes:seconds
        const hours = Math.floor(sessionDuration / (1000 * 60 * 60));
        const minutes = Math.floor((sessionDuration % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((sessionDuration % (1000 * 60)) / 1000);
        
        // Format duration
        const formattedDuration = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Update summary box
        const loginHoursElement = document.getElementById('loginHours');
        if (loginHoursElement) {
            loginHoursElement.textContent = formattedDuration;
        }
    }
}

// Slot Functions
function toggleSlot(type) {
    const button = document.querySelector(`button[onclick*="${type}"]`);
    
    if (slotTimers[type]) {
        clearInterval(slotTimers[type]);
        slotTimers[type] = null;
        button.textContent = `Start ${type.charAt(0).toUpperCase() + type.slice(1)}`;
    } else {
        slotTimers[type] = setInterval(() => {
            slotDurations[type] += 1;
            updateSlotDisplay(type);
            updateManagerSummary(); // Update summary when slot changes
        }, 1000);
        button.textContent = `End ${type.charAt(0).toUpperCase() + type.slice(1)}`;
    }
    saveSession(); // Save slot state
}

function updateSlotDisplay(type) {
    const seconds = slotDurations[type];
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    document.getElementById(`${type}Duration`).textContent = formattedTime;
    
    // Update summary if manager
    if (currentRole === 'manager') {
        document.getElementById(`summary${type.charAt(0).toUpperCase() + type.slice(1)}`).textContent = formattedTime;
    }
}

function updateManagerSummary() {
    if (currentRole === 'manager') {
        document.querySelector('.manager-summary').style.display = 'block';
        Object.keys(slotDurations).forEach(type => {
            const seconds = slotDurations[type];
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            
            const formattedTime = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
            document.getElementById(`summary${type.charAt(0).toUpperCase() + type.slice(1)}`).textContent = formattedTime;
        });
    }
}
