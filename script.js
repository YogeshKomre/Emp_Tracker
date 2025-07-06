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
    supervisor: null,
    audit: null
};
let slotDurations = {
    supervisor: 0,
    audit: 0
};

// Sales data array
let sales = [
    { type: 'Fiber', count: 0 },
    { type: 'Mobile', count: 0 },
    { type: 'Video', count: 0 }
];

// --- Call Tracking Logic ---
let currentCall = null;
let callHistory = [];

// APM (Manager) to Employee mapping
const apmEmployeeMap = {
  "Bhavin Visaria": [
    "Affan Kasim Mulla", "Anisha Anthony Dsouza", "Aquib Malik Masood", "Atharv Shevale", "Biswajit Periala", "Dhaval Morabia", "Dinesh Kalade", "Gabriel Hudson Joseph", "Impreetkaut Khungura", "Mohammadumair Shaikh", "Priyesh Jagdish Gohil", "Shen Subramenian Iyer", "Tushar Singh"
  ],
  "Dinesh Nihalani": [
    "Abhijeet Bhuyer", "Abhishek Shaik Mandlik", "Aditya Mishke", "Bhavesh Anand Madave", "Heena Bhakta", "Komal Gosavi", "Mohammad Bilal Khan", "Priya Patil", "Rushi Rajendra Dhere", "Satyajit Jadhav", "Tanvi Sevkar", "Tushar More", "Viral Mane"
  ],
  "Rajendra Bajpai": [
    "Abdulla Shaikh", "Ashmita Suryawanshi", "Gavin Carvalho", "Karma Rinchen Tamang", "Mohit Prajapat", "Nagesh Sathe", "Nitesh Kshirsagar", "Pawan Raut", "Sampat Balasaheb Chavan"
  ],
  "Ameeruddin Salmani": [
    "Aarti Ashok Dhavani", "Ajaysh Ravindranath Yadav", "Chandan Mandal Singh", "Diksha Govind Makija", "Hitesh Israni", "Irfan Shaikh", "Lalit Sreekumar Nair", "Maryam Aysar Alee Tambe", "Rohit Bhise", "Roshan Raul", "Shivam Ramesh Yadav"
  ],
  "Vishal Pandey": [
    "Ajmal Shaikh", "Arya Anil", "Gandharv Singh", "Gaurav Sugare", "Girish Suresh Kumar Dubey", "Hitesh Jaisinghani", "Mimansha Subhadarshini", "Mohammad Shahid Rawabali Khan", "Om Sanjay Rajput", "Subhasree Atharthi", "Tatveer Singh", "Vikas Havale"
  ],
  "Lukas Chetty": [
    "Alfisa Ahlat", "Arjun Jog", "Ayush Ashok Bakal", "Harsh Jadhav", "Namrata Pandey", "Nisha Rati", "Piyush Tiwari", "Prabodh Kumar Bunker", "Prithviraj Gurupasad Nadkarni", "Simran Kaur Heera Singh Sandhu", "Vivek Jiaram Chudasama", "Yogesh Komre"
  ],
  "Faheem Khan": [
    "Aman Anil Singh", "Arjun Zore", "Dhanashree Salvo", "Gaurav Gore", "Jacile Hirani", "Kalpesh Kargutkar", "Mittali Milind Sulankhe", "Muskan Rizwan Ansari", "Pooja Lalan Savji", "Sahil Jaywant Chavan", "Sahil Sanjay Sukhla", "Sonali Sushant Panda", "Umar Junaid Khatib", "Yash Anant Jadhav"
  ],
  "Nikita Jawkar": [
    "Akshay Prasad", "Chirag Kedre", "Darshan Chaudhari", "Dheeraj Deepak Mhatre", "Honey Rawat", "Jagriti Ankit Sharma", "Mohammad Jublee Shaikh", "Namrata Banerji", "Nitin Raj", "Sajjadras Prashant Redkar", "Shubeda Abdul Selam Arai", "Sushmita Jaya Palan", "Vikrant Sawad", "Yash Rajkumar"
  ],
  "Ritesh Sherigar": [
    "Aayush Samant", "Aditi Bivans", "Darshan Bhimrao Lonare", "Gaurav Rajesh Borse", "Girish Rajesh Gosavi", "Mohd Shoaib Iqbal", "Mohd Ishad Mohd Ilyas Shaikh", "Sambhavi Shivendra Sarang", "Satyajit Tukaram Prabhu", "Snehank Pawar", "Swipnil Mane"
  ],
  "Mahesh Ghadge": [
    "Achal Gautam Vishwakarma", "Akansha Sunil Sable", "Fardeen Shakil Shaikh", "Mahak Chanderlal Wadhwani", "Mayur Maniyar", "Naznin Nadir Ahmed Sayed", "Saurabh More", "Siddhant Jayprakash Pathak", "Tahir Mohammed Khan", "Vivekraj Vinod Ghadge"
  ],
  "Melvyn Shinde": [
    "Ashutosh Waghmare", "Jatin Ajay Parab", "Kaushal Chandrashekhar Vishwakarma", "Mohammed Kaseeb Asif Ansari", "Sameer Satish Vhatkar", "Shweta Rakesh Rajoriya", "Vedant Dinesh Latke"
  ],
  "Kamala Ramanathan": [
    "Aman Indori Giri", "Hemant Kumar", "Neelak Bahubao Ghogale", "Priyanka Bandre", "Sanket Chandrakant Kharmbale", "Sanket Padwal", "Sankita Anjali Ambatti", "Sumit Subhash Patil"
  ],
  "Abdulrahim Khan": [
    "Aman Indori Giri", "Hemant Kumar", "Neelak Bahubao Ghogale", "Priyanka Bandre", "Sanket Chandrakant Kharmbale", "Sanket Padwal", "Sankita Anjali Ambatti", "Sumit Subhash Patil"
  ],
  "Craig Miranda": [
    "Meyhesh Rajaram Naik", "Mitesh Pramod Tupe", "Mohd. Faruk Jamaluddin Ansari", "Mohd. Kaushal Kumar", "Mohsin Sadiq Shaikh", "Sumit Desai", "Suresh Mendki", "Yash Jayeshwar Sathe"
  ],
  "SPM": [
    "Saumya Shetty", "Ara Khan", "Priyanka Naidu", "Siddharth Chaturvedi", "Ajay Kamti"
  ],
  "Senior Manager": [
    "Saumya Shetty", "Ara Khan", "Priyanka Naidu", "Siddharth Chaturvedi", "Ajay Kamti"
  ]
};

// Username-password mapping (auto-generated, example passwords)
const userPasswords = {
  "Bhavin Visaria": "bv@2024!",
  "Dinesh Nihalani": "dn@2024!",
  "Rajendra Bajpai": "rb@2024!",
  "Ameeruddin Salmani": "as@2024!",
  "Vishal Pandey": "vp@2024!",
  "Lukas Chetty": "lc@2024!",
  "Faheem Khan": "fk@2024!",
  "Nikita Jawkar": "nj@2024!",
  "Ritesh Sherigar": "rs@2024!",
  "Mahesh Ghadge": "mg@2024!",
  "Melvyn Shinde": "ms@2024!",
  "Kamala Ramanathan": "kr@2024!",
  "Abdulrahim Khan": "ak@2024!",
  "Craig Miranda": "cm@2024!",
  "SPM": "spm@2024!",
  "Saumya Shetty": "ss@2024!",
  "Ara Khan": "ak@2024!",
  "Priyanka Naidu": "pn@2024!",
  "Siddharth Chaturvedi": "sc@2024!",
  "Ajay Kamti": "ajk@2024!",
  // Employees (examples, you can randomize or use a pattern)
  "Affan Kasim Mulla": "affan2024",
  "Anisha Anthony Dsouza": "anisha2024",
  "Aquib Malik Masood": "aquib2024",
  "Atharv Shevale": "atharv2024",
  "Biswajit Periala": "biswajit2024",
  "Dhaval Morabia": "dhaval2024",
  "Dinesh Kalade": "dinesh2024",
  "Gabriel Hudson Joseph": "gabriel2024",
  "Impreetkaut Khungura": "impreet2024",
  "Mohammadumair Shaikh": "umair2024",
  "Priyesh Jagdish Gohil": "priyesh2024",
  "Shen Subramenian Iyer": "shen2024",
  "Tushar Singh": "tushar2024",
  // ...repeat for all employees in the mapping
};

// Initialize session on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add input validation for Sequence ID
    const sequenceIdInput = document.getElementById('sequenceId');
    if (sequenceIdInput) {
        sequenceIdInput.addEventListener('input', function(e) {
            // Remove any non-numeric characters
            this.value = this.value.replace(/[^0-9]/g, '');
        });
        
        // Prevent paste of non-numeric content
        sequenceIdInput.addEventListener('paste', function(e) {
            e.preventDefault();
            const pastedText = (e.clipboardData || window.clipboardData).getData('text');
            const numericOnly = pastedText.replace(/[^0-9]/g, '');
            this.value = numericOnly;
        });
    }
    
    const savedSession = localStorage.getItem('session');
    console.log('Checking for saved session:', !!savedSession);
    console.log('Raw session data:', savedSession);
    
    if (savedSession) {
        let session;
        try {
            session = JSON.parse(savedSession);
            console.log('Session parsed successfully:', session);
            console.log('Session found:', session.username, 'Role:', session.role);
            console.log('Session login time:', session.loginTime);
        } catch (error) {
            console.error('Error parsing session:', error);
            localStorage.removeItem('session');
            return;
        }
        
        // Check if session has expired (24 hours timeout)
        const sessionTime = new Date(session.loginTime);
        const currentTime = new Date();
        const sessionAge = currentTime - sessionTime;
        const maxSessionAge = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        
        if (sessionAge > maxSessionAge) {
            // Session expired, clear it
            localStorage.removeItem('session');
            localStorage.removeItem('callHistory');
            localStorage.removeItem('sales');
            console.log('Session expired (24 hours), cleared automatically');
            return;
        }
        
        currentUser = session.username;
        currentRole = session.role;
        loginTime = new Date(session.loginTime);
        
        console.log('Session restored for:', currentUser, 'as', currentRole);
        console.log('Login time restored:', loginTime);
        console.log('Current user set to:', currentUser);
        console.log('Current role set to:', currentRole);
        
        // Update slot durations (timers will be restarted when user clicks start)
        if (session.slotDurations) {
            Object.assign(slotDurations, session.slotDurations);
            Object.keys(slotDurations).forEach(key => {
                updateSlotDisplay(key);
            });
        }
        
        // Show dashboard and hide login
        const loginContainer = document.getElementById('loginContainer');
        const dashboard = document.getElementById('dashboard');
        
        if (loginContainer && dashboard) {
            loginContainer.style.display = 'none';
            dashboard.style.display = 'block';
            console.log('Dashboard displayed, login hidden');
            console.log('Login container display:', loginContainer.style.display);
            console.log('Dashboard display:', dashboard.style.display);
        } else {
            console.error('Login container or dashboard not found!');
            console.log('Login container found:', !!loginContainer);
            console.log('Dashboard found:', !!dashboard);
        }
        
        // Show appropriate dashboard based on role
        if (currentRole === 'manager') {
            document.getElementById('managerDashboard').style.display = 'block';
            document.getElementById('spmDashboard').style.display = 'none';
            // Hide employee-specific sections for managers
            document.getElementById('breakTracking').style.display = 'none';
            document.getElementById('salesTracking').style.display = 'none';
            document.getElementById('checkboxSection').style.display = 'none';
            document.getElementById('callDetailsSection').style.display = 'none';
            document.getElementById('callSummaryTableSection').style.display = 'none';
            document.getElementById('dailyUpdateBox').style.display = 'none';
            document.getElementById('summaryBox').style.display = 'none';
            // Show manager summary
            document.querySelector('.manager-summary').style.display = 'block';
            updateManagerSummary();
            updateManagerDashboard(); // Load initial manager data
            setupManagerDashboardUpdates(); // Set up automatic updates
        } else if (currentRole === 'spm') {
            document.getElementById('spmDashboard').style.display = 'block';
            document.getElementById('managerDashboard').style.display = 'none';
            document.getElementById('seniorManagerDashboard').style.display = 'none';
            // Hide employee-specific sections for SPM
            document.getElementById('breakTracking').style.display = 'none';
            document.getElementById('salesTracking').style.display = 'none';
            document.getElementById('checkboxSection').style.display = 'none';
            document.getElementById('callDetailsSection').style.display = 'none';
            document.getElementById('callSummaryTableSection').style.display = 'none';
            document.getElementById('dailyUpdateBox').style.display = 'none';
            document.getElementById('summaryBox').style.display = 'none';
            // Hide manager summary for SPM
            document.querySelector('.manager-summary').style.display = 'none';
            updateSPMDashboard(); // Load initial SPM data
            setupSPMDashboardUpdates(); // Set up automatic updates
        } else if (currentRole === 'senior-manager') {
            document.getElementById('seniorManagerDashboard').style.display = 'block';
            document.getElementById('managerDashboard').style.display = 'none';
            document.getElementById('spmDashboard').style.display = 'none';
            // Hide employee-specific sections for Senior Managers
            document.getElementById('breakTracking').style.display = 'none';
            document.getElementById('salesTracking').style.display = 'none';
            document.getElementById('checkboxSection').style.display = 'none';
            document.getElementById('callDetailsSection').style.display = 'none';
            document.getElementById('callSummaryTableSection').style.display = 'none';
            document.getElementById('dailyUpdateBox').style.display = 'none';
            document.getElementById('summaryBox').style.display = 'none';
            // Hide manager summary for Senior Managers
            document.querySelector('.manager-summary').style.display = 'none';
            updateSeniorManagerDashboard(); // Load initial Senior Manager data
            setupSeniorManagerDashboardUpdates(); // Set up automatic updates
        } else {
            // Show employee-specific sections for employees
            document.getElementById('managerDashboard').style.display = 'none';
            document.getElementById('spmDashboard').style.display = 'none';
            document.getElementById('seniorManagerDashboard').style.display = 'none';
            document.getElementById('breakTracking').style.display = 'block';
            document.getElementById('salesTracking').style.display = 'block';
            document.getElementById('checkboxSection').style.display = 'block';
            document.getElementById('callDetailsSection').style.display = 'block';
            document.getElementById('callSummaryTableSection').style.display = 'block';
            document.getElementById('dailyUpdateBox').style.display = 'block';
            document.getElementById('summaryBox').style.display = 'block';
            // Hide manager summary for employees
            document.querySelector('.manager-summary').style.display = 'none';
        }
        
        // Start login timer
        startLoginTimer();
        
        // Update break display with saved values (timers will be restarted when user clicks start)
        if (session.breakDurations) {
            Object.assign(breakDurations, session.breakDurations);
            updateBreakDisplay();
        }
        
        // Update username display
        document.getElementById('userName').textContent = currentUser;

        // Load call history and update call summary table only if user is logged in
        const saved = localStorage.getItem('callHistory');
        if (saved) {
            callHistory = JSON.parse(saved);
        }
        
        // If no calls exist, add a test call to verify the table works
        if (callHistory.length === 0) {
            addTestCall();
        } else {
            updateCallSummary();
        }
        
        // Update session status and load additional data
        updateSessionStatus();
        
        // Load daily update and marquee announcement
        if (document.getElementById('preShift')) {
            loadDailyUpdate();
        }
        loadMarqueeAnnouncement();
        
        // Ensure call button event listeners are attached for restored session
        const startCallBtn = document.getElementById('startCallBtn');
        const endCallBtn = document.getElementById('endCallBtn');
        
        if (startCallBtn) {
            startCallBtn.removeEventListener('click', startCall);
            startCallBtn.addEventListener('click', startCall);
            console.log('Start call button event listener re-attached for restored session');
        }
        
        if (endCallBtn) {
            endCallBtn.removeEventListener('click', endCall);
            endCallBtn.addEventListener('click', endCall);
            console.log('End call button event listener re-attached for restored session');
        }
    } else {
        console.log('No saved session found, showing login page');
        // No session exists, ensure call history is empty
        callHistory = [];
        localStorage.removeItem('callHistory');
        // Clear the call summary table
        const tbody = document.getElementById('callSummaryTableBody');
        if (tbody) {
            tbody.innerHTML = '';
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td colspan="6" style="text-align: center; color: #FFA07A; font-style: italic;">
                    No calls recorded yet. Start a call to see details here.
                </td>
            `;
            tbody.appendChild(tr);
        }
    }

    // Add event listeners for call start/end buttons
    const startCallBtn = document.getElementById('startCallBtn');
    const endCallBtn = document.getElementById('endCallBtn');
    
    console.log('Setting up call button event listeners...');
    console.log('startCallBtn found:', !!startCallBtn);
    console.log('endCallBtn found:', !!endCallBtn);
    
    if (startCallBtn) {
        startCallBtn.addEventListener('click', startCall);
        console.log('Start call button event listener added');
    }
    
    if (endCallBtn) {
        endCallBtn.addEventListener('click', endCall);
        console.log('End call button event listener added');
    }
    
    // Add test button event listener
    const testCallBtn = document.getElementById('testCallBtn');
    if (testCallBtn) {
        testCallBtn.addEventListener('click', function() {
            console.log('Test button clicked');
            console.log('Current state:');
            console.log('- currentCall:', currentCall);
            console.log('- callHistory:', callHistory);
            console.log('- startCallBtn display:', document.getElementById('startCallBtn').style.display);
            console.log('- endCallBtn display:', document.getElementById('endCallBtn').style.display);
            alert('Check console for call details debug info');
        });
        console.log('Test call button event listener added');
    }
    

    

    
    // Add real-time update event listeners
    // Update call data when sales change
    const originalUpdateTotalSales = updateTotalSales;
    updateTotalSales = function() {
        originalUpdateTotalSales();
        updateCurrentCallData();
    };
    
    // Update call data when CPC changes
    const cpcDropdown = document.getElementById('cpcDropdown');
    if (cpcDropdown) {
        cpcDropdown.addEventListener('change', updateCurrentCallData);
    }
    
    // Update call data when call steps change
    document.querySelectorAll('.call-step, .preferred-contact-method').forEach(cb => {
        cb.addEventListener('change', updateCurrentCallData);
    });

    // Add event listener for Pull Call Steps to Summary button
    const pullStepsBtn = document.getElementById('pullStepsBtn');
    if (pullStepsBtn) {
        pullStepsBtn.addEventListener('click', updateCheckedStepsSummary);
    }

    // Password visibility toggle
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    
    console.log('Password toggle setup:');
    console.log('- passwordInput found:', !!passwordInput);
    console.log('- togglePassword found:', !!togglePassword);
    
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Password toggle clicked');
            console.log('Current password type:', passwordInput.type);
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                togglePassword.textContent = '🙈';
                console.log('Password now visible');
            } else {
                passwordInput.type = 'password';
                togglePassword.textContent = '👁️';
                console.log('Password now hidden');
            }
        });
        console.log('Password toggle event listener added');
    } else {
        console.log('Password toggle elements not found');
    }
    
    // DXST Number input functionality (now a simple text input)
    const dxstInput = document.getElementById('dxstNumber');
    if (dxstInput) {
        console.log('DXST input field found and ready');
    }
    
    // Load daily update for all users (only if elements exist)
    if (document.getElementById('preShift')) {
        loadDailyUpdate();
    }
    
    // Load marquee announcement for all users
    loadMarqueeAnnouncement();
    
    // Initialize call summary table
    updateCallSummary();
    
    // Update session status periodically
    setInterval(updateSessionStatus, 60000); // Update every minute
});

// Password visibility toggle function (backup method)
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    
    console.log('togglePasswordVisibility function called');
    console.log('Password input found:', !!passwordInput);
    console.log('Toggle button found:', !!togglePassword);
    
    if (passwordInput && togglePassword) {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            togglePassword.textContent = '🙈';
            console.log('Password now visible');
        } else {
            passwordInput.type = 'password';
            togglePassword.textContent = '👁️';
            console.log('Password now hidden');
        }
    } else {
        console.log('Password toggle elements not found in function');
    }
}

// Update session status display
function updateSessionStatus() {
    const sessionStatus = document.getElementById('sessionStatus');
    if (sessionStatus && currentUser) {
        const savedSession = localStorage.getItem('session');
        if (savedSession) {
            const session = JSON.parse(savedSession);
            const sessionTime = new Date(session.loginTime);
            const currentTime = new Date();
            const sessionAge = currentTime - sessionTime;
            const maxSessionAge = 24 * 60 * 60 * 1000; // 24 hours
            
            if (sessionAge > maxSessionAge) {
                sessionStatus.textContent = 'Session: Expired';
                sessionStatus.style.color = '#ff6b6b';
            } else {
                const remainingHours = Math.max(0, 24 - Math.floor(sessionAge / (60 * 60 * 1000)));
                sessionStatus.textContent = `Session: Persistent (${remainingHours}h remaining)`;
                sessionStatus.style.color = '#90EE90';
            }
        }
    }
}

// Login/Logout Functions
function handleLogin() {
    const username = document.getElementById('username').value.trim();
    const role = document.getElementById('userRole').value;
    
    console.log('Login attempt for:', username, 'as', role);
    console.log('Available managers:', Object.keys(apmEmployeeMap));
    console.log('SPM team:', apmEmployeeMap['SPM']);
    console.log('Senior Manager team:', apmEmployeeMap['Senior Manager']);

    if (role === 'employee') {
        // Check if username is in any manager's employee list
        let found = false;
        let managerName = null;
        for (const [apm, employees] of Object.entries(apmEmployeeMap)) {
            if (employees.includes(username)) {
                found = true;
                managerName = apm;
                break;
            }
        }
        if (!found) {
            alert('Name not found. Please enter your exact name as shown in the list.');
            return;
        }
        currentUser = username;
        currentRole = role;
        loginTime = new Date();
        // Save session to localStorage
        saveSession();
        console.log('Session saved after employee login');
        // Show dashboard and hide login
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        // Hide manager dashboard for employees
        document.getElementById('managerDashboard').style.display = 'none';
        
        // Show employee-specific sections
        document.getElementById('breakTracking').style.display = 'block';
        document.getElementById('salesTracking').style.display = 'block';
        document.getElementById('checkboxSection').style.display = 'block';
        document.getElementById('callDetailsSection').style.display = 'block';
        document.getElementById('callSummaryTableSection').style.display = 'block';
        document.getElementById('dailyUpdateBox').style.display = 'block';
        
        // Load call history for this employee
        const saved = localStorage.getItem('callHistory');
        if (saved) {
            callHistory = JSON.parse(saved);
        } else {
            callHistory = [];
        }
        
        // Update call summary table
        updateCallSummary();
        
        // Start login timer
        startLoginTimer();
        // Update username display
        document.getElementById('userName').textContent = username;
        // Store manager name for this employee (if needed)
        localStorage.setItem('employeeManager', managerName);
        // Load daily update (only if element exists)
        if (document.getElementById('preShift')) {
            loadDailyUpdate();
        }
        // Load marquee announcement
        loadMarqueeAnnouncement();
        
        // Update session status
        updateSessionStatus();
        
        // Ensure call button event listeners are attached after login
        const startCallBtn = document.getElementById('startCallBtn');
        const endCallBtn = document.getElementById('endCallBtn');
        
        if (startCallBtn) {
            // Remove existing listener to avoid duplicates
            startCallBtn.removeEventListener('click', startCall);
            startCallBtn.addEventListener('click', startCall);
            console.log('Start call button event listener re-attached after employee login');
        }
        
        if (endCallBtn) {
            // Remove existing listener to avoid duplicates
            endCallBtn.removeEventListener('click', endCall);
            endCallBtn.addEventListener('click', endCall);
            console.log('End call button event listener re-attached after employee login');
        }
        
        // Set employee status and trigger update for any open manager dashboards
        handleEmployeeLogin(username);
        console.log('Employee login status set for:', username);
    } else if (role === 'manager') {
        // Check if username is a manager
        console.log('Checking manager login for:', username);
        console.log('Manager exists in apmEmployeeMap:', !!apmEmployeeMap[username]);
        if (!apmEmployeeMap[username]) {
            alert('Manager name not found. Please enter your exact name as shown in the APM list.');
            return;
        }
        currentUser = username;
        currentRole = role;
        loginTime = new Date();
        // Save session to localStorage
        saveSession();
        // Show dashboard and hide login
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        // Show manager dashboard
            document.getElementById('managerDashboard').style.display = 'block';
        
        // Hide employee-specific sections for managers
        document.getElementById('breakTracking').style.display = 'none';
        document.getElementById('salesTracking').style.display = 'none';
        document.getElementById('checkboxSection').style.display = 'none';
        document.getElementById('callDetailsSection').style.display = 'none';
        document.getElementById('callSummaryTableSection').style.display = 'none';
        document.getElementById('dailyUpdateBox').style.display = 'none';
        document.getElementById('summaryBox').style.display = 'none';
        
        updateManagerDashboard();
        setupManagerDashboardUpdates();
        // Start login timer
        startLoginTimer();
        // Update username display
        document.getElementById('userName').textContent = username;
        // Store manager's employee list for use in dashboard
        localStorage.setItem('managerEmployeeList', JSON.stringify(apmEmployeeMap[username]));
        // Load daily update (only if element exists)
        if (document.getElementById('preShift')) {
            loadDailyUpdate();
        }
        // Load marquee announcement
        loadMarqueeAnnouncement();
        
        // Update session status
        updateSessionStatus();
    } else if (role === 'spm') {
        // Only allow the specified SPM users
        const spmTeam = apmEmployeeMap['SPM'];
        if (!spmTeam.includes(username)) {
            alert('SPM access is restricted. Please use the correct SPM credentials.');
            return;
        }
        currentUser = username;
        currentRole = role;
        loginTime = new Date();
        // Save session to localStorage
        saveSession();
        // Show dashboard and hide login
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        // Show SPM dashboard
        document.getElementById('spmDashboard').style.display = 'block';
        // Hide employee-specific sections for SPM
        document.getElementById('breakTracking').style.display = 'none';
        document.getElementById('salesTracking').style.display = 'none';
        document.getElementById('checkboxSection').style.display = 'none';
        document.getElementById('callDetailsSection').style.display = 'none';
        document.getElementById('callSummaryTableSection').style.display = 'none';
        document.getElementById('dailyUpdateBox').style.display = 'none';
        document.getElementById('summaryBox').style.display = 'none';
        updateSPMDashboard();
        setupSPMDashboardUpdates();
        // Start login timer
        startLoginTimer();
        // Update username display
        document.getElementById('userName').textContent = username;
        // Load daily update (only if element exists)
        if (document.getElementById('preShift')) {
            loadDailyUpdate();
        }
        // Load marquee announcement
        loadMarqueeAnnouncement();
        // Update session status
        updateSessionStatus();
    } else if (role === 'senior-manager') {
        // Check if username is a Senior Manager
        const seniorManagers = apmEmployeeMap['Senior Manager'];
        if (!seniorManagers.includes(username)) {
            alert('Senior Manager name not found. Please enter your exact name as shown in the Senior Manager list.');
            return;
        }
        currentUser = username;
        currentRole = role;
        loginTime = new Date();
        // Save session to localStorage
        saveSession();
        // Show dashboard and hide login
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        // Show Senior Manager dashboard
        document.getElementById('seniorManagerDashboard').style.display = 'block';
        
        // Hide employee-specific sections for Senior Managers
        document.getElementById('breakTracking').style.display = 'none';
        document.getElementById('salesTracking').style.display = 'none';
        document.getElementById('checkboxSection').style.display = 'none';
        document.getElementById('callDetailsSection').style.display = 'none';
        document.getElementById('callSummaryTableSection').style.display = 'none';
        document.getElementById('dailyUpdateBox').style.display = 'none';
        document.getElementById('summaryBox').style.display = 'none';
        
        updateSeniorManagerDashboard();
        setupSeniorManagerDashboardUpdates();
        // Start login timer
        startLoginTimer();
        // Update username display
        document.getElementById('userName').textContent = username;
        // Load daily update (only if element exists)
        if (document.getElementById('preShift')) {
            loadDailyUpdate();
        }
        // Load marquee announcement
        loadMarqueeAnnouncement();
        
        // Update session status
        updateSessionStatus();
    }
}

function saveSession() {
    const session = {
        username: currentUser,
        role: currentRole,
        loginTime: loginTime.toISOString(),
        breakDurations: breakDurations,
        slotDurations: slotDurations
    };
    localStorage.setItem('session', JSON.stringify(session));
    console.log('Session saved:', session);
}

function forceLogout() {
    // Clear all session data immediately
    localStorage.removeItem('session');
    localStorage.removeItem('callHistory');
    localStorage.removeItem('sales');
    localStorage.removeItem('allManagerData');
    localStorage.removeItem('marqueeAnnouncement');
    
    // Clear all timers
    clearInterval(loginTimer);
    Object.keys(breakTimers).forEach(key => {
        if (breakTimers[key]) {
            clearInterval(breakTimers[key]);
            breakTimers[key] = null;
        }
    });
    Object.keys(slotTimers).forEach(key => {
        if (slotTimers[key]) {
            clearInterval(slotTimers[key]);
            slotTimers[key] = null;
        }
    });
    
    // Reset all variables
    currentUser = null;
    currentRole = null;
    loginTime = null;
    
    // Show login and hide dashboard
    document.getElementById('loginContainer').style.display = 'block';
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('spmDashboard').style.display = 'none';
    document.getElementById('seniorManagerDashboard').style.display = 'none';
    
    // Clear login form
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('userRole').value = 'employee';
    
    // Clear progress report display
    const salesDonutChart = document.getElementById('salesDonutChart');
    if (salesDonutChart) {
        const ctx = salesDonutChart.getContext('2d');
        ctx.clearRect(0, 0, salesDonutChart.width, salesDonutChart.height);
    }
    
    // Clear call coding metrics display
    const callCodingMetrics = document.getElementById('callCodingMetrics');
    if (callCodingMetrics) {
        callCodingMetrics.innerHTML = `
            <div class="metric">
                <span class="metric-label">Total DXST:</span>
                <span class="metric-value">0</span>
            </div>
            <div class="metric">
                <span class="metric-label">Total Sequence ID:</span>
                <span class="metric-value">0</span>
            </div>
            <div class="metric">
                <span class="metric-label">Call Coding Ratio:</span>
                <span class="metric-value">0%</span>
            </div>
        `;
    }
    
    alert('Force logout completed. All session data cleared.');
    if (currentRole === 'employee' && currentUser) {
        handleEmployeeLogout(currentUser);
    }
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
    localStorage.removeItem('allManagerData');
    localStorage.removeItem('marqueeAnnouncement');
    
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
    
    // Show login and hide dashboard
    document.getElementById('loginContainer').style.display = 'block';
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('spmDashboard').style.display = 'none';
    document.getElementById('seniorManagerDashboard').style.display = 'none';

    // Clear call summary table and call history
    callHistory = [];
    localStorage.removeItem('callHistory');
    // Update call summary table to show empty state
    updateCallSummary();
    
    // Clear progress report display
    const salesDonutChart = document.getElementById('salesDonutChart');
    if (salesDonutChart) {
        const ctx = salesDonutChart.getContext('2d');
        ctx.clearRect(0, 0, salesDonutChart.width, salesDonutChart.height);
    }
    
    // Clear call coding metrics display
    const callCodingMetrics = document.getElementById('callCodingMetrics');
    if (callCodingMetrics) {
        callCodingMetrics.innerHTML = `
            <div class="metric">
                <span class="metric-label">Total DXST:</span>
                <span class="metric-value">0</span>
            </div>
            <div class="metric">
                <span class="metric-label">Total Sequence ID:</span>
                <span class="metric-value">0</span>
            </div>
            <div class="metric">
                <span class="metric-label">Call Coding Ratio:</span>
                <span class="metric-value">0%</span>
            </div>
        `;
    }
    if (currentRole === 'employee' && currentUser) {
        handleEmployeeLogout(currentUser);
    }
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
    if (currentRole === 'employee' && currentUser) {
        // Determine breakType: 'first', 'second', 'bio', or 'none'
        let breakType = 'none';
        if (breakTimers[type]) {
            breakType = type;
        }
        handleEmployeeBreak(currentUser, breakType);
    }
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
    const checked = Array.from(document.querySelectorAll('.call-step:checked')).map(cb => cb.value);
    const userName = document.getElementById('userName').textContent || currentUser || 'Unknown';
    const cpcValue = document.getElementById('cpcDropdown').value;
    const preferred = Array.from(document.querySelectorAll('.preferred-contact-method:checked')).map(cb => cb.value);
    let emailBody = `Employee Summary:\n\n` +
        `Login Person: ${userName}\n` +
        `Login Hours: ${loginHours}\n` +
        `Total Break Time: ${totalBreak}\n` +
        `Total Sales: ${totalSales}\n` +
        `Checked Call Steps: ${checked.length ? checked.join(', ') : 'None'}\n` +
        `CPC: ${cpcValue || 'None'}\n` +
        `Preferred Contact: ${preferred.length ? preferred.join(', ') : 'None'}\n\n`;
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

    // Clear all checkboxes after sending summary
    document.querySelectorAll('.call-step').forEach(cb => cb.checked = false);
    updateCheckedStepsSummary();
    // Clear CPC and preferred contact fields after sending
    document.getElementById('cpcDropdown').value = '';
    document.querySelectorAll('.preferred-contact-method').forEach(cb => cb.checked = false);
    updateCPCAndPreferredContactSummary();
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
    
    // Only update if the element exists
    const durationElement = document.getElementById(`${type}Duration`);
    if (durationElement) {
        durationElement.textContent = formattedTime;
    }
    
    // Update summary if manager and element exists
    if (currentRole === 'manager') {
        const summaryElement = document.getElementById(`summary${type.charAt(0).toUpperCase() + type.slice(1)}`);
        if (summaryElement) {
            summaryElement.textContent = formattedTime;
        }
    }
}

function updateManagerSummary() {
    if (currentRole === 'manager') {
        const managerSummary = document.querySelector('.manager-summary');
        if (managerSummary) {
            managerSummary.style.display = 'block';
        }
        
        Object.keys(slotDurations).forEach(type => {
            const seconds = slotDurations[type];
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            
            const formattedTime = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
            const summaryElement = document.getElementById(`summary${type.charAt(0).toUpperCase() + type.slice(1)}`);
            if (summaryElement) {
                summaryElement.textContent = formattedTime;
            }
        });
    }
}

// Function to update the checked steps summary
function updateCheckedStepsSummary() {
    const checked = Array.from(document.querySelectorAll('.call-step:checked')).map(cb => cb.value);
    document.getElementById('checkedSteps').textContent = checked.length ? checked.join(', ') : 'None';
}

// Attach event listeners and initialize summary on page load
window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.call-step').forEach(cb => {
        cb.addEventListener('change', updateCheckedStepsSummary);
    });
    updateCheckedStepsSummary();
});

// Add a button to pull call handling steps into summary
if (!document.getElementById('pullStepsBtn')) {
    const btn = document.createElement('button');
    btn.id = 'pullStepsBtn';
    btn.className = 'neon-btn';
    btn.textContent = 'Pull Call Steps to Summary';
    btn.onclick = updateCheckedStepsSummary;
    const checkboxSection = document.getElementById('checkboxSection');
    if (checkboxSection) checkboxSection.appendChild(btn);
}

// --- CPC and Preferred Contact Logic ---
function updateCPCAndPreferredContactSummary() {
    const cpcValue = document.getElementById('cpcDropdown').value;
    document.getElementById('summaryCPC').textContent = cpcValue || 'None';
    const preferred = Array.from(document.querySelectorAll('.preferred-contact-method:checked')).map(cb => cb.value);
    document.getElementById('summaryPreferredContact').textContent = preferred.length ? preferred.join(', ') : 'None';
}
document.getElementById('cpcDropdown').addEventListener('change', updateCPCAndPreferredContactSummary);
document.querySelectorAll('.preferred-contact-method').forEach(cb => {
    cb.addEventListener('change', updateCPCAndPreferredContactSummary);
});
window.addEventListener('DOMContentLoaded', updateCPCAndPreferredContactSummary);

// --- Daily Update Logic ---
// Note: Old daily update functions removed - using new manager-controlled system

// --- Call Details Logic ---
// Note: Call details are now handled through the call summary table
// The separate call details table functionality has been removed
// as it was causing errors due to missing HTML elements

// --- Call Tracking Logic ---
function startCall() {
    console.log('startCall function called');
    console.log('Current user:', currentUser);
    console.log('Current role:', currentRole);
    
    const sequenceIdInput = document.getElementById('sequenceId');
    console.log('Sequence ID input found:', !!sequenceIdInput);
    
    if (!sequenceIdInput) {
        alert('Sequence ID input not found. Please refresh the page.');
        return;
    }
    
    const sequenceId = sequenceIdInput.value.trim();
    console.log('Sequence ID value:', sequenceId);
    
    if (!sequenceId) {
        alert('Please enter Sequence ID to start a call.');
        return;
    }
    
    currentCall = {
        id: Date.now(),
        sequenceId,
        dxstNumber: '', // Will be set before ending call
        sales: { Fiber: 0, Mobile: 0, Video: 0 },
        cpc: '',
        callSteps: [],
        preferredContact: []
    };
    
    // Clear sequence ID input after starting call
    document.getElementById('sequenceId').value = '';
    
    // Show end call button and hide start call button
    document.getElementById('startCallBtn').style.display = 'none';
    document.getElementById('endCallBtn').style.display = 'inline-block';
    
    updateCallSummary();
    alert('Call started! Complete the call steps, add DXST Number, and add sales, then end the call.');
}

function endCall() {
    console.log('endCall function called');
    if (!currentCall) {
        alert('No active call to end.');
        return;
    }
    
    // Get DXST Number from input field
    const dxstInput = document.getElementById('dxstNumber');
    let dxstNumber = dxstInput.value.trim();
    
    // If DXST is 'NA', empty, or null, store as -1
    if (dxstNumber === '' || dxstNumber.toUpperCase() === 'NA' || dxstNumber === null) {
        dxstNumber = -1;
    }
    
    // Update current call with DXST Number
    currentCall.dxstNumber = dxstNumber;
    
    // Capture current state
    currentCall.sales = {
        Fiber: sales.find(s => s.type === 'Fiber').count,
        Mobile: sales.find(s => s.type === 'Mobile').count,
        Video: sales.find(s => s.type === 'Video').count
    };
    currentCall.cpc = document.getElementById('cpcDropdown').value;
    currentCall.callSteps = Array.from(document.querySelectorAll('.call-step:checked')).map(cb => cb.value);
    currentCall.preferredContact = Array.from(document.querySelectorAll('.preferred-contact-method:checked')).map(cb => cb.value);
    
    // Add to history
    callHistory.push({...currentCall});
    localStorage.setItem('callHistory', JSON.stringify(callHistory));
    
    currentCall = null;
    
    // Show start call button and hide end call button
    document.getElementById('startCallBtn').style.display = 'inline-block';
    document.getElementById('endCallBtn').style.display = 'none';
    
    // Clear all inputs
    dxstInput.value = '';
    
    // Clear call steps checkboxes
    document.querySelectorAll('.call-step, .preferred-contact-method').forEach(cb => {
        cb.checked = false;
    });
    
    // Update checked steps summary after clearing
    updateCheckedStepsSummary();
    updateCPCAndPreferredContactSummary();
    
    // Clear CPC dropdown
    document.getElementById('cpcDropdown').value = '';
    
    // Clear sales inputs
    document.getElementById('Fiber').value = '';
    document.getElementById('Mobile').value = '';
    document.getElementById('Video').value = '';
    
    // Reset sales data
    sales.forEach(s => s.count = 0);
    updateSalesList();
    updateTotalSales();
    
    updateCallSummary();
    
    alert('Call ended and saved to history!');
}

function updateCallSummary() {
    console.log('updateCallSummary called');
    console.log('currentCall:', currentCall);
    console.log('callHistory length:', callHistory.length);
    
    // Update summary with latest call details
    if (currentCall) {
        const dxstDisplay = currentCall.dxstNumber || 'Pending DXST';
        document.getElementById('summaryCallDetails').textContent = 
            `${currentCall.sequenceId} / ${dxstDisplay}`;
    } else {
        document.getElementById('summaryCallDetails').textContent = 'No active call';
    }
    
    // Update call summary table
    const tbody = document.getElementById('callSummaryTableBody');
    if (!tbody) {
        console.error('Call summary table body not found!');
        return;
    }
    
    tbody.innerHTML = '';
    
    // Add current call if active
    if (currentCall) {
        const tr = document.createElement('tr');
        tr.style.backgroundColor = 'rgba(255, 160, 122, 0.2)';
        const dxstDisplay = currentCall.dxstNumber || 'Pending DXST';
        tr.innerHTML = `
            <td>Active</td>
            <td>${currentCall.sequenceId}</td>
            <td>${dxstDisplay}</td>
            <td>${currentCall.sales.Fiber}/${currentCall.sales.Mobile}/${currentCall.sales.Video}</td>
            <td>${currentCall.cpc || 'Pending'}</td>
            <td>${currentCall.callSteps.length} steps</td>
        `;
        tbody.appendChild(tr);
    }
    
    // Add completed calls
    callHistory.forEach((call, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${callHistory.length - idx}</td>
            <td>${call.sequenceId}</td>
            <td>${call.dxstNumber || 'N/A'}</td>
            <td>${call.sales.Fiber}/${call.sales.Mobile}/${call.sales.Video}</td>
            <td>${call.cpc || 'N/A'}</td>
            <td>${call.callSteps.join(', ')}</td>
        `;
        tbody.appendChild(tr);
    });
    
    // If no calls exist, add a test message
    if (!currentCall && callHistory.length === 0) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td colspan="6" style="text-align: center; color: #FFA07A; font-style: italic;">
                No calls recorded yet. Start a call to see details here.
            </td>
        `;
        tbody.appendChild(tr);
    }
    
    // Automatically send data to manager dashboard
    sendToManagerDashboard();
}

// Update call summary when sales, CPC, or call steps change
function updateCurrentCallData() {
    if (currentCall) {
        updateCallSummary();
    }
}

// Test function to add a sample call for debugging
function addTestCall() {
    const testCall = {
        id: Date.now(),
        sequenceId: '12345',
        dxstNumber: 'DXST001',
        sales: { Fiber: 1, Mobile: 2, Video: 0 },
        cpc: 'Yes',
        callSteps: ['Greeting', 'Authentication', 'Problem Resolution'],
        preferredContact: ['Preferred Number']
    };
    
    callHistory.push(testCall);
    localStorage.setItem('callHistory', JSON.stringify(callHistory));
    updateCallSummary();
    console.log('Test call added to verify call summary table functionality');
}

// Send call summary to manager dashboard
function sendToManagerDashboard() {
    if (!currentUser) {
        console.log('No user logged in');
        return;
    }
    
    const managerData = {
        employeeName: currentUser,
        timestamp: new Date().toISOString(),
        currentCall: currentCall,
        callHistory: callHistory,
        totalCalls: callHistory.length + (currentCall ? 1 : 0),
        todayCalls: getTodayCalls(),
        salesSummary: getSalesSummary(),
        cpcSummary: getCPCSummary()
    };
    
    // Save to localStorage for manager access
    localStorage.setItem(`managerData_${currentUser}`, JSON.stringify(managerData));
    
    // Also save to a general manager data store
    const allManagerData = JSON.parse(localStorage.getItem('allManagerData') || '{}');
    allManagerData[currentUser] = managerData;
    localStorage.setItem('allManagerData', JSON.stringify(allManagerData));
    
    console.log('Call summary sent to manager dashboard');
}

// Get today's calls count
function getTodayCalls() {
    const today = new Date().toDateString();
    return callHistory.filter(call => {
        const callDate = new Date(call.id).toDateString();
        return callDate === today;
    }).length;
}

// Get sales summary
function getSalesSummary() {
    const summary = { Fiber: 0, Mobile: 0, Video: 0, Total: 0 };
    
    callHistory.forEach(call => {
        summary.Fiber += call.sales.Fiber;
        summary.Mobile += call.sales.Mobile;
        summary.Video += call.sales.Video;
    });
    
    if (currentCall) {
        summary.Fiber += currentCall.sales.Fiber;
        summary.Mobile += currentCall.sales.Mobile;
        summary.Video += currentCall.sales.Video;
    }
    
    summary.Total = summary.Fiber + summary.Mobile + summary.Video;
    return summary;
}

// Get CPC summary
function getCPCSummary() {
    const summary = { Yes: 0, No: 0, NA: 0, Pending: 0 };
    
    callHistory.forEach(call => {
        if (call.cpc) {
            summary[call.cpc] = (summary[call.cpc] || 0) + 1;
        } else {
            summary.NA += 1;
        }
    });
    
    if (currentCall && currentCall.cpc) {
        summary[currentCall.cpc] = (summary[currentCall.cpc] || 0) + 1;
    } else if (currentCall) {
        summary.Pending += 1;
    }
    
    return summary;
}

// Update manager dashboard with real-time data
function updateManagerDashboard() {
    if (currentRole !== 'manager') {
        return;
    }
    
    const allManagerData = JSON.parse(localStorage.getItem('allManagerData') || '{}');
    const managerDashboard = document.getElementById('managerDashboard');
    if (!managerDashboard) {
        return;
    }
    
    // Update employee status panel first
    updateEmployeeStatusPanel();
    // Get the manager's employee list
    let employeeList = [];
    try {
        employeeList = JSON.parse(localStorage.getItem('managerEmployeeList')) || [];
    } catch (e) {}
    
    // Load current daily update
    const savedUpdate = localStorage.getItem('dailyUpdate');
    let currentUpdate = '';
    let updateInfo = '';
    if (savedUpdate) {
        const update = JSON.parse(savedUpdate);
        const today = new Date().toDateString();
        if (update.date === today) {
            currentUpdate = update.content;
            updateInfo = `Last updated by ${update.updatedBy} at ${new Date(update.timestamp).toLocaleString()}`;
        }
    }
    
    // Load current marquee announcement
    const savedMarquee = localStorage.getItem('marqueeAnnouncement');
    let currentMarquee = '';
    let marqueeInfo = '';
    if (savedMarquee) {
        const marquee = JSON.parse(savedMarquee);
        const today = new Date().toDateString();
        if (marquee.date === today) {
            currentMarquee = marquee.content;
            marqueeInfo = `Last updated by ${marquee.updatedBy} at ${new Date(marquee.timestamp).toLocaleString()}`;
        }
    }
    
    // Create or update manager dashboard content
    let dashboardHTML = `
        <h3 style="margin-bottom: 15px;">Manager Dashboard</h3>
        
        <!-- Marquee Announcement Section -->
        <div style="background: rgba(3, 5, 91, 0.8); margin-bottom: 15px; padding: 20px; border-radius: 10px; border: 1px solid #FFA07A;">
            <h4 style="color: #FFD700; margin-bottom: 15px;">Marquee Announcement</h4>
            <div style="margin-bottom: 10px;">
                <label for="managerMarquee" style="display: block; margin-bottom: 5px; color: #FFA07A;">Scrolling announcement for all users:</label>
                <textarea id="managerMarquee" rows="4" placeholder="Enter announcement to display in the scrolling marquee..." style="width: 100%; padding: 10px; border: 1px solid #FFA07A; border-radius: 5px; background: rgba(3, 5, 91, 0.8); color: #fff; font-size: 14px;">${currentMarquee}</textarea>
            </div>
            <div style="display: flex; gap: 10px; align-items: center;">
                <button class="neon-btn" onclick="saveMarqueeAnnouncement()">Save Marquee Announcement</button>
                <span style="color: #FFA07A; font-size: 12px;">${marqueeInfo}</span>
            </div>
        </div>
        
        <!-- Progress Report Section -->
        <div style="background: rgba(3, 5, 91, 0.8); margin-bottom: 15px; padding: 20px; border-radius: 10px; border: 1px solid #FFA07A;">
            <h4 style="color: #FFD700; margin-bottom: 15px;">Progress Report</h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <!-- Sales Progress Donut Chart -->
                <div style="text-align: center;">
                    <h5 style="color: #FFA07A; margin-bottom: 10px;">Total Sales Progress</h5>
                    <div style="position: relative; width: 150px; height: 150px; margin: 0 auto;">
                        <canvas id="salesDonutChart" width="150" height="150"></canvas>
                        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;">
                            <div style="font-size: 18px; font-weight: bold; color: #FFD700;">${getTotalSalesProgress().Total}</div>
                            <div style="font-size: 12px; color: #FFA07A;">Total Sales</div>
                        </div>
                    </div>
                    <div style="margin-top: 10px; font-size: 12px;">
                        <div style="display: flex; justify-content: space-between; margin: 2px 0;">
                            <span style="color: #FF6B6B;">Fiber: ${getTotalSalesProgress().Fiber}</span>
                            <span style="color: #4ECDC4;">Mobile: ${getTotalSalesProgress().Mobile}</span>
                            <span style="color: #45B7D1;">Video: ${getTotalSalesProgress().Video}</span>
                        </div>
                    </div>
                </div>
                
                <!-- Call Coding Metrics -->
                <div style="text-align: center;">
                    <h5 style="color: #FFA07A; margin-bottom: 10px;">Call Coding Metrics</h5>
                    <div style="background: rgba(255, 160, 122, 0.1); padding: 15px; border-radius: 8px; border: 1px solid #FFA07A;">
                        <div style="font-size: 24px; font-weight: bold; color: #FFD700; margin-bottom: 5px;">
                            ${getCallCodingMetrics().callCodingRatio}%
                        </div>
                        <div style="font-size: 14px; color: #FFA07A; margin-bottom: 10px;">Call Coding Ratio</div>
                        <div style="font-size: 12px; color: #fff;">
                            <div>Total DXST: ${getCallCodingMetrics().totalDXST}</div>
                            <div>Total Sequence ID: ${getCallCodingMetrics().totalSequenceID}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Daily Update Section -->
        <div style="background: rgba(3, 5, 91, 0.8); margin-bottom: 15px; padding: 20px; border-radius: 10px; border: 1px solid #FFA07A;">
            <h4 style="color: #FFD700; margin-bottom: 15px;">Daily Update (Pre-shift Briefing)</h4>
            <div style="margin-bottom: 10px;">
                <label for="managerPreShift" style="display: block; margin-bottom: 5px; color: #FFA07A;">Update for all employees:</label>
                <textarea id="managerPreShift" rows="8" placeholder="Enter today's pre-shift briefing update..." style="width: 100%; padding: 10px; border: 1px solid #FFA07A; border-radius: 5px; background: rgba(3, 5, 91, 0.8); color: #fff; font-size: 14px;">${currentUpdate}</textarea>
            </div>
            <div style="display: flex; gap: 10px; align-items: center;">
                <button class="neon-btn" onclick="saveDailyUpdate()">Save Daily Update</button>
                <span style="color: #FFA07A; font-size: 12px;">${updateInfo}</span>
            </div>
        </div>
        
        <!-- Comprehensive Call Summary Table Section -->
        <div style="background: rgba(3, 5, 91, 0.8); margin-bottom: 15px; padding: 20px; border-radius: 10px; border: 1px solid #FFA07A;">
            <h4 style="color: #FFD700; margin-bottom: 15px;">Complete Call Summary - All Employees</h4>
            <div style="margin-bottom: 10px;">
                <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 10px;">
                    <button class="neon-btn" onclick="refreshCallSummaryTable()">Refresh Table</button>
                    <span style="color: #FFA07A; font-size: 12px;">Last updated: ${new Date().toLocaleString()}</span>
                </div>
                <div id="comprehensiveCallTable" style="overflow-x: auto; max-height: 400px; overflow-y: auto;">
                    ${generateComprehensiveCallTable()}
                </div>
            </div>
        </div>
    `;
    
    if (employeeList.length === 0) {
        dashboardHTML += '<p style="color: #FFA07A; text-align: center;">No employee data available yet.</p>';
    } else {
        dashboardHTML += '<div class="employee-summaries" style="margin-top: 0;">';
        employeeList.forEach(employeeName => {
            const data = allManagerData[employeeName];
            if (!data) return;
            dashboardHTML += `
                <div class="employee-summary" style="background: rgba(3, 5, 91, 0.8); margin-bottom: 10px; padding: 15px; border-radius: 10px; border: 1px solid #FFA07A;">
                    <h4 style="color: #FFD700; margin-bottom: 10px;">${employeeName}</h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                        <div>
                            <p><strong>Total Calls:</strong> ${data.totalCalls}</p>
                            <p><strong>Today's Calls:</strong> ${data.todayCalls}</p>
                            <p><strong>Last Updated:</strong> ${new Date(data.timestamp).toLocaleString()}</p>
                        </div>
                        <div>
                            <p><strong>Sales Summary:</strong></p>
                            <p>Fiber: ${data.salesSummary.Fiber} | Mobile: ${data.salesSummary.Mobile} | Video: ${data.salesSummary.Video}</p>
                            <p><strong>Total Sales:</strong> ${data.salesSummary.Total}</p>
                        </div>
                    </div>
                    <div style="margin-top: 10px;">
                        <p><strong>CPC Summary:</strong> Yes: ${data.cpcSummary.Yes} | No: ${data.cpcSummary.No} | NA: ${data.cpcSummary.NA}</p>
                    </div>
                    ${data.currentCall ? '<p style="color: #FFA07A; margin-top: 10px;"><strong>Active Call:</strong> ' + data.currentCall.sequenceId + ' / ' + data.currentCall.dxstNumber + '</p>' : ''}
                    
                    <!-- Call History Table -->
                    ${data.callHistory && data.callHistory.length > 0 ? `
                        <div style="margin-top: 15px;">
                            <h5 style="color: #FFA07A; margin-bottom: 8px;">Call History</h5>
                            <div style="overflow-x: auto;">
                                <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                                    <thead>
                                        <tr style="background: rgba(255, 160, 122, 0.3);">
                                            <th style="border: 1px solid #FFA07A; padding: 4px; text-align: center;">#</th>
                                            <th style="border: 1px solid #FFA07A; padding: 4px; text-align: center;">Sequence ID</th>
                                            <th style="border: 1px solid #FFA07A; padding: 4px; text-align: center;">DXST Number</th>
                                            <th style="border: 1px solid #FFA07A; padding: 4px; text-align: center;">Sales (F/M/V)</th>
                                            <th style="border: 1px solid #FFA07A; padding: 4px; text-align: center;">CPC</th>
                                            <th style="border: 1px solid #FFA07A; padding: 4px; text-align: center;">Call Steps</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${data.callHistory.map((call, idx) => `
                                            <tr style="background: rgba(3, 5, 91, 0.5);">
                                                <td style="border: 1px solid #FFA07A; padding: 4px; text-align: center;">${data.callHistory.length - idx}</td>
                                                <td style="border: 1px solid #FFA07A; padding: 4px; text-align: center;">${call.sequenceId}</td>
                                                <td style="border: 1px solid #FFA07A; padding: 4px; text-align: center;">${call.dxstNumber}</td>
                                                <td style="border: 1px solid #FFA07A; padding: 4px; text-align: center;">${call.sales.Fiber}/${call.sales.Mobile}/${call.sales.Video}</td>
                                                <td style="border: 1px solid #FFA07A; padding: 4px; text-align: center;">${call.cpc || 'N/A'}</td>
                                                <td style="border: 1px solid #FFA07A; padding: 4px; text-align: center; font-size: 10px;">${call.callSteps.join(', ')}</td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ` : ''}
                </div>
            `;
        });
        dashboardHTML += '</div>';
    }
    managerDashboard.innerHTML = dashboardHTML;
    
    // Update progress report after dashboard is rendered
    setTimeout(() => {
        updateProgressReport();
    }, 100);
}

// Set up automatic updates for manager dashboard
function setupManagerDashboardUpdates() {
    if (currentRole === 'manager') {
        // Update every 30 seconds
        setInterval(() => {
            updateManagerDashboard();
        }, 30000);
        
        // Also update when localStorage changes (for real-time updates)
        window.addEventListener('storage', (e) => {
            if (e.key === 'allManagerData') {
                updateManagerDashboard();
            }
        });
    }
}

// Generate comprehensive call summary table for all employees
function generateComprehensiveCallTable() {
    const allManagerData = JSON.parse(localStorage.getItem('allManagerData') || '{}');
    let employeeList = [];
    try {
        employeeList = JSON.parse(localStorage.getItem('managerEmployeeList')) || [];
    } catch (e) {}
    
    if (employeeList.length === 0) {
        return '<p style="color: #FFA07A; text-align: center;">No employee data available yet.</p>';
    }
    
    // Collect all calls ONLY from employees in managerEmployeeList
    let allCalls = [];
    employeeList.forEach(employeeName => {
        // Defensive: Only use data for employees in the manager's list
        if (!employeeList.includes(employeeName)) return;
        const data = allManagerData[employeeName];
        if (data && data.callHistory && data.callHistory.length > 0) {
            data.callHistory.forEach(call => {
                allCalls.push({
                    employeeName: employeeName,
                    sequenceId: call.sequenceId,
                    dxstNumber: call.dxstNumber,
                    sales: call.sales,
                    cpc: call.cpc,
                    callSteps: call.callSteps,
                    timestamp: call.timestamp,
                    duration: call.duration
                });
            });
        }
    });
    
    // Sort calls by timestamp (newest first)
    allCalls.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    if (allCalls.length === 0) {
        return '<p style="color: #FFA07A; text-align: center;">No calls recorded yet.</p>';
    }
    
    let tableHTML = `
        <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
            <thead>
                <tr style="background: rgba(255, 160, 122, 0.3); position: sticky; top: 0;">
                    <th style="border: 1px solid #FFA07A; padding: 6px; text-align: center; min-width: 60px;">#</th>
                    <th style="border: 1px solid #FFA07A; padding: 6px; text-align: center; min-width: 120px;">Employee</th>
                    <th style="border: 1px solid #FFA07A; padding: 6px; text-align: center; min-width: 100px;">Sequence ID</th>
                    <th style="border: 1px solid #FFA07A; padding: 6px; text-align: center; min-width: 100px;">DXST Number</th>
                    <th style="border: 1px solid #FFA07A; padding: 6px; text-align: center; min-width: 80px;">Sales (F/M/V)</th>
                    <th style="border: 1px solid #FFA07A; padding: 6px; text-align: center; min-width: 60px;">CPC</th>
                    <th style="border: 1px solid #FFA07A; padding: 6px; text-align: center; min-width: 200px;">Call Steps</th>
                    <th style="border: 1px solid #FFA07A; padding: 6px; text-align: center; min-width: 100px;">Duration</th>
                    <th style="border: 1px solid #FFA07A; padding: 6px; text-align: center; min-width: 120px;">Time</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    allCalls.forEach((call, index) => {
        const rowColor = index % 2 === 0 ? 'rgba(3, 5, 91, 0.5)' : 'rgba(3, 5, 91, 0.3)';
        const callTime = new Date(call.timestamp).toLocaleTimeString();
        const duration = call.duration ? formatDuration(call.duration) : 'N/A';
        
        tableHTML += `
            <tr style="background: ${rowColor};">
                <td style="border: 1px solid #FFA07A; padding: 6px; text-align: center;">${allCalls.length - index}</td>
                <td style="border: 1px solid #FFA07A; padding: 6px; text-align: center; font-weight: bold; color: #FFD700;">${call.employeeName}</td>
                <td style="border: 1px solid #FFA07A; padding: 6px; text-align: center;">${call.sequenceId}</td>
                <td style="border: 1px solid #FFA07A; padding: 6px; text-align: center;">${call.dxstNumber || 'N/A'}</td>
                <td style="border: 1px solid #FFA07A; padding: 6px; text-align: center;">
                    <span style="color: #FF6B6B;">${call.sales.Fiber}</span>/
                    <span style="color: #4ECDC4;">${call.sales.Mobile}</span>/
                    <span style="color: #45B7D1;">${call.sales.Video}</span>
                </td>
                <td style="border: 1px solid #FFA07A; padding: 6px; text-align: center;">${call.cpc || 'N/A'}</td>
                <td style="border: 1px solid #FFA07A; padding: 6px; text-align: center; font-size: 10px; max-width: 200px; word-wrap: break-word;">
                    ${call.callSteps.join(', ')}
                </td>
                <td style="border: 1px solid #FFA07A; padding: 6px; text-align: center;">${duration}</td>
                <td style="border: 1px solid #FFA07A; padding: 6px; text-align: center; font-size: 11px;">${callTime}</td>
            </tr>
        `;
    });
    
    tableHTML += `
            </tbody>
        </table>
        <div style="margin-top: 10px; text-align: center; color: #FFA07A; font-size: 12px;">
            Total Calls: ${allCalls.length} | Showing all calls from your employees only
        </div>
    `;
    
    return tableHTML;
}

// Refresh call summary table function
function refreshCallSummaryTable() {
    if (currentRole === 'manager') {
        const tableContainer = document.getElementById('comprehensiveCallTable');
        if (tableContainer) {
            tableContainer.innerHTML = generateComprehensiveCallTable();
        }
    }
}

// Helper function to format duration
function formatDuration(seconds) {
    if (!seconds) return 'N/A';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Save daily update from manager (accessible to all employees)
function saveDailyUpdate() {
    console.log('saveDailyUpdate function called');
    const preShiftContent = document.getElementById('managerPreShift').value.trim();
    console.log('Content to save:', preShiftContent);
    
    if (!preShiftContent) {
        alert('Please enter content for the daily update.');
        return;
    }
    
    const dailyUpdate = {
        content: preShiftContent,
        updatedBy: currentUser,
        timestamp: new Date().toISOString(),
        date: new Date().toDateString()
    };
    
    console.log('Daily update object:', dailyUpdate);
    
    // Save to localStorage for all employees to access
    localStorage.setItem('dailyUpdate', JSON.stringify(dailyUpdate));
    
    console.log('Daily update saved to localStorage');
    
    alert('Daily update saved successfully! All employees will see this update.');
    
    // Refresh the manager dashboard to show updated info
    updateManagerDashboard();
}

// Load daily update for all users
function loadDailyUpdate() {
    console.log('loadDailyUpdate function called');
    const savedUpdate = localStorage.getItem('dailyUpdate');
    console.log('Saved update from localStorage:', savedUpdate);
    
    const preShiftTextarea = document.getElementById('preShift');
    const saveUpdateBtn = document.getElementById('saveUpdateBtn');
    
    if (!preShiftTextarea) {
        console.log('preShift textarea not found');
        return;
    }
    
    if (savedUpdate) {
        const update = JSON.parse(savedUpdate);
        const today = new Date().toDateString();
        console.log('Update date:', update.date, 'Today:', today);
        
        // Only show today's update
        if (update.date === today) {
            preShiftTextarea.value = update.content;
            preShiftTextarea.readOnly = true;
            if (saveUpdateBtn) saveUpdateBtn.style.display = 'none';
            console.log('Today\'s update loaded:', update.content);
        } else {
            // Clear old updates
            preShiftTextarea.value = '';
            preShiftTextarea.readOnly = true;
            if (saveUpdateBtn) saveUpdateBtn.style.display = 'none';
            console.log('Old update cleared');
        }
    } else {
        preShiftTextarea.value = '';
        preShiftTextarea.readOnly = true;
        if (saveUpdateBtn) saveUpdateBtn.style.display = 'none';
        console.log('No saved update found');
    }
}

// Calculate total sales across all employees for progress report
function getTotalSalesProgress() {
    const allManagerData = JSON.parse(localStorage.getItem('allManagerData') || '{}');
    let totalFiber = 0;
    let totalMobile = 0;
    let totalVideo = 0;
    
    Object.values(allManagerData).forEach(data => {
        if (data.salesSummary) {
            totalFiber += data.salesSummary.Fiber || 0;
            totalMobile += data.salesSummary.Mobile || 0;
            totalVideo += data.salesSummary.Video || 0;
        }
    });
    
    return {
        Fiber: totalFiber,
        Mobile: totalMobile,
        Video: totalVideo,
        Total: totalFiber + totalMobile + totalVideo
    };
}

// Calculate call coding metrics (DXST / Sequence ID ratio)
function getCallCodingMetrics() {
    const allManagerData = JSON.parse(localStorage.getItem('allManagerData') || '{}');
    let totalDXST = 0;
    let totalSequenceID = 0;
    
    Object.values(allManagerData).forEach(data => {
        if (data.callHistory) {
            data.callHistory.forEach(call => {
                if (call.dxstNumber !== -1 && call.dxstNumber !== undefined && call.dxstNumber !== null && call.dxstNumber !== '') {
                    totalDXST++;
                }
                if (call.sequenceId && call.sequenceId.trim() !== '') {
                    totalSequenceID++;
                }
            });
        }
        // Also check current call if active
        if (data.currentCall) {
            if (data.currentCall.dxstNumber !== -1 && data.currentCall.dxstNumber !== undefined && data.currentCall.dxstNumber !== null && data.currentCall.dxstNumber !== '') {
                totalDXST++;
            }
            if (data.currentCall.sequenceId && data.currentCall.sequenceId.trim() !== '') {
                totalSequenceID++;
            }
        }
    });
    
    const callCodingRatio = totalSequenceID > 0 ? (totalDXST / totalSequenceID * 100).toFixed(1) : 0;
    
    return {
        totalDXST,
        totalSequenceID,
        callCodingRatio: parseFloat(callCodingRatio)
    };
}

// Draw sales donut chart
function drawSalesDonutChart() {
    const canvas = document.getElementById('salesDonutChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const salesData = getTotalSalesProgress();
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 60;
    const innerRadius = 40;
    
    // Colors for each sales type
    const colors = {
        Fiber: '#FF6B6B',
        Mobile: '#4ECDC4', 
        Video: '#45B7D1'
    };
    
    let currentAngle = -Math.PI / 2; // Start from top
    
    // Draw each segment
    Object.entries(salesData).forEach(([type, value]) => {
        if (type === 'Total' || value === 0) return;
        
        const segmentAngle = (value / salesData.Total) * 2 * Math.PI;
        
        // Draw outer arc
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + segmentAngle);
        ctx.lineTo(centerX + (innerRadius * Math.cos(currentAngle + segmentAngle)), 
                   centerY + (innerRadius * Math.sin(currentAngle + segmentAngle)));
        
        // Draw inner arc
        ctx.arc(centerX, centerY, innerRadius, currentAngle + segmentAngle, currentAngle, true);
        ctx.closePath();
        
        // Fill segment
        ctx.fillStyle = colors[type];
        ctx.fill();
        
        currentAngle += segmentAngle;
    });
    
    // Draw center circle (donut hole)
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(3, 5, 91, 0.9)';
    ctx.fill();
}

// Update progress report (called after manager dashboard update)
function updateProgressReport() {
    drawSalesDonutChart();
}

// Save marquee announcement from manager (accessible to all users)
function saveMarqueeAnnouncement() {
    const marqueeContent = document.getElementById('managerMarquee').value.trim();
    if (!marqueeContent) {
        alert('Please enter content for the marquee announcement.');
        return;
    }
    
    const marqueeUpdate = {
        content: marqueeContent,
        updatedBy: currentUser,
        timestamp: new Date().toISOString(),
        date: new Date().toDateString()
    };
    
    // Save to localStorage for all users to access
    localStorage.setItem('marqueeAnnouncement', JSON.stringify(marqueeUpdate));
    
    alert('Marquee announcement saved successfully! All users will see this update.');
    
    // Refresh the manager dashboard to show updated info
    updateManagerDashboard();
    // Immediately update marquee for this user
    loadMarqueeAnnouncement();
}

// Load marquee announcement for all users
function loadMarqueeAnnouncement() {
    const scrollingText = document.querySelector('.scrolling-text');
    let announcement = null;

    // Check all possible announcement keys, prioritize SPM > Senior Manager > Manager
    const keys = ['spmMarqueeAnnouncement', 'seniorManagerMarqueeAnnouncement', 'marqueeAnnouncement'];
    for (const key of keys) {
        const saved = localStorage.getItem(key);
        if (saved) {
            const parsed = JSON.parse(saved);
            const today = new Date().toDateString();
            if (parsed.date === today) {
                announcement = parsed.content;
                break;
            }
        }
    }

    if (announcement) {
        scrollingText.textContent = announcement;
    } else {
        scrollingText.textContent = 'Welcome to Employee Tracking System! Stay updated with the latest announcements and updates.';
    }
}

// SPM Dashboard Functions
function updateSPMDashboard() {
    const spmManagerData = document.getElementById('spmManagerData');
    if (!spmManagerData) return;
    
    const allManagerData = JSON.parse(localStorage.getItem('allManagerData') || '{}');
    let html = '<div class="manager-performance-grid">';
    
    // Get all managers from the SPM team
    const spmTeam = apmEmployeeMap['SPM'];
    
    spmTeam.forEach(manager => {
        const managerData = allManagerData[manager] || {};
        const employeeCount = apmEmployeeMap[manager] ? apmEmployeeMap[manager].length : 0;
        const activeEmployees = managerData.activeEmployees || 0;
        const totalSales = managerData.salesSummary ? 
            (managerData.salesSummary.Fiber + managerData.salesSummary.Mobile + managerData.salesSummary.Video) : 0;
        const totalCalls = managerData.callHistory ? managerData.callHistory.length : 0;
        
        html += `
            <div class="manager-card">
                <h4>${manager}</h4>
                <div class="manager-stats">
                    <div class="stat">
                        <span class="stat-label">Team Size:</span>
                        <span class="stat-value">${employeeCount}</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Active:</span>
                        <span class="stat-value">${activeEmployees}</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Total Sales:</span>
                        <span class="stat-value">${totalSales}</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Total Calls:</span>
                        <span class="stat-value">${totalCalls}</span>
                    </div>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    spmManagerData.innerHTML = html;
    
    // Update SPM progress report
    updateSPMProgressReport();
}

function updateSPMProgressReport() {
    // Update SPM sales donut chart
    drawSPMSalesDonutChart();
    
    // Update SPM call coding metrics
    const spmMetrics = getSPMCallCodingMetrics();
    const spmCallCodingMetrics = document.getElementById('spmCallCodingMetrics');
    if (spmCallCodingMetrics) {
        spmCallCodingMetrics.innerHTML = `
            <div class="metric">
                <span class="metric-label">Total DXST:</span>
                <span class="metric-value">${spmMetrics.totalDXST}</span>
            </div>
            <div class="metric">
                <span class="metric-label">Total Sequence ID:</span>
                <span class="metric-value">${spmMetrics.totalSequenceID}</span>
            </div>
            <div class="metric">
                <span class="metric-label">Call Coding Ratio:</span>
                <span class="metric-value">${spmMetrics.callCodingRatio}%</span>
            </div>
        `;
    }
}

function getSPMCallCodingMetrics() {
    const allManagerData = JSON.parse(localStorage.getItem('allManagerData') || '{}');
    let totalDXST = 0;
    let totalSequenceID = 0;
    const spmTeam = apmEmployeeMap['SPM'];
    spmTeam.forEach(manager => {
        const managerData = allManagerData[manager];
        if (managerData && managerData.callHistory) {
            managerData.callHistory.forEach(call => {
                if (call.dxstNumber !== -1 && call.dxstNumber !== undefined && call.dxstNumber !== null && call.dxstNumber !== '') {
                    totalDXST++;
                }
                if (call.sequenceId && call.sequenceId.trim() !== '') {
                    totalSequenceID++;
                }
            });
        }
        if (managerData && managerData.currentCall) {
            if (managerData.currentCall.dxstNumber !== -1 && managerData.currentCall.dxstNumber !== undefined && managerData.currentCall.dxstNumber !== null && managerData.currentCall.dxstNumber !== '') {
                totalDXST++;
            }
            if (managerData.currentCall.sequenceId && managerData.currentCall.sequenceId.trim() !== '') {
                totalSequenceID++;
            }
        }
    });
    const callCodingRatio = totalSequenceID > 0 ? (totalDXST / totalSequenceID * 100).toFixed(1) : 0;
    return {
        totalDXST,
        totalSequenceID,
        callCodingRatio: parseFloat(callCodingRatio)
    };
}

function getSPMTotalSalesProgress() {
    const allManagerData = JSON.parse(localStorage.getItem('allManagerData') || '{}');
    let totalFiber = 0;
    let totalMobile = 0;
    let totalVideo = 0;
    
    // Get all managers from the SPM team
    const spmTeam = apmEmployeeMap['SPM'];
    
    spmTeam.forEach(manager => {
        const managerData = allManagerData[manager];
        if (managerData && managerData.salesSummary) {
            totalFiber += managerData.salesSummary.Fiber || 0;
            totalMobile += managerData.salesSummary.Mobile || 0;
            totalVideo += managerData.salesSummary.Video || 0;
        }
    });
    
    return {
        Fiber: totalFiber,
        Mobile: totalMobile,
        Video: totalVideo,
        Total: totalFiber + totalMobile + totalVideo
    };
}

function drawSPMSalesDonutChart() {
    const canvas = document.getElementById('spmSalesDonutChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const salesData = getSPMTotalSalesProgress();
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 60;
    const innerRadius = 40;
    
    // Colors for each sales type
    const colors = {
        Fiber: '#FF6B6B',
        Mobile: '#4ECDC4', 
        Video: '#45B7D1'
    };
    
    let currentAngle = -Math.PI / 2; // Start from top
    
    // Draw each segment
    Object.entries(salesData).forEach(([type, value]) => {
        if (type === 'Total' || value === 0) return;
        
        const segmentAngle = (value / salesData.Total) * 2 * Math.PI;
        
        // Draw outer arc
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + segmentAngle);
        ctx.lineTo(centerX + (innerRadius * Math.cos(currentAngle + segmentAngle)), 
                   centerY + (innerRadius * Math.sin(currentAngle + segmentAngle)));
        
        // Draw inner arc
        ctx.arc(centerX, centerY, innerRadius, currentAngle + segmentAngle, currentAngle, true);
        ctx.closePath();
        
        // Fill segment
        ctx.fillStyle = colors[type];
        ctx.fill();
        
        currentAngle += segmentAngle;
    });
    
    // Draw center circle (donut hole)
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(3, 5, 91, 0.9)';
    ctx.fill();
}

function setupSPMDashboardUpdates() {
    // Update SPM dashboard every 30 seconds
    setInterval(() => {
        if (currentRole === 'spm') {
            updateSPMDashboard();
        }
    }, 30000);
}

function saveSPMDailyUpdate() {
    const dailyUpdateContent = document.getElementById('spmDailyUpdate').value.trim();
    if (!dailyUpdateContent) {
        alert('Please enter content for the global daily update.');
        return;
    }
    
    const dailyUpdate = {
        content: dailyUpdateContent,
        updatedBy: currentUser,
        timestamp: new Date().toISOString(),
        date: new Date().toDateString()
    };
    
    // Save to localStorage for all users to access
    localStorage.setItem('spmDailyUpdate', JSON.stringify(dailyUpdate));
    
    alert('Global daily update saved successfully! All users will see this update.');
    
    // Refresh the SPM dashboard to show updated info
    updateSPMDashboard();
}

function saveSPMMarqueeAnnouncement() {
    const marqueeContent = document.getElementById('spmMarquee').value.trim();
    if (!marqueeContent) {
        alert('Please enter content for the global marquee announcement.');
        return;
    }
    
    const marqueeUpdate = {
        content: marqueeContent,
        updatedBy: currentUser,
        timestamp: new Date().toISOString(),
        date: new Date().toDateString()
    };
    
    // Save to localStorage for all users to access
    localStorage.setItem('spmMarqueeAnnouncement', JSON.stringify(marqueeUpdate));
    
    alert('Global marquee announcement saved successfully! All users will see this update.');
    
    // Refresh the SPM dashboard to show updated info
    updateSPMDashboard();
    // Immediately update marquee for this user
    loadMarqueeAnnouncement();
}

// Senior Manager Dashboard Functions
function updateSeniorManagerDashboard() {
    const seniorManagerData = document.getElementById('seniorManagerData');
    if (!seniorManagerData) return;
    
    const allManagerData = JSON.parse(localStorage.getItem('allManagerData') || '{}');
    let html = '<div class="team-performance-grid">';
    
    // Get all managers from the SPM team (Senior Managers oversee the same teams as SPM)
    const spmTeam = apmEmployeeMap['SPM'];
    
    spmTeam.forEach(manager => {
        const managerData = allManagerData[manager] || {};
        const employeeCount = apmEmployeeMap[manager] ? apmEmployeeMap[manager].length : 0;
        const activeEmployees = managerData.activeEmployees || 0;
        const totalSales = managerData.salesSummary ? 
            (managerData.salesSummary.Fiber + managerData.salesSummary.Mobile + managerData.salesSummary.Video) : 0;
        const totalCalls = managerData.callHistory ? managerData.callHistory.length : 0;
        
        html += `
            <div class="team-card">
                <h4>${manager}</h4>
                <div class="team-stats">
                    <div class="stat">
                        <span class="stat-label">Team Size:</span>
                        <span class="stat-value">${employeeCount}</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Active:</span>
                        <span class="stat-value">${activeEmployees}</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Total Sales:</span>
                        <span class="stat-value">${totalSales}</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Total Calls:</span>
                        <span class="stat-value">${totalCalls}</span>
                    </div>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    seniorManagerData.innerHTML = html;
    
    // Update Senior Manager progress report
    updateSeniorManagerProgressReport();
}

function updateSeniorManagerProgressReport() {
    // Update Senior Manager sales donut chart
    drawSeniorManagerSalesDonutChart();
    
    // Update Senior Manager call coding metrics
    const seniorManagerMetrics = getSeniorManagerCallCodingMetrics();
    const seniorManagerCallCodingMetrics = document.getElementById('seniorManagerCallCodingMetrics');
    if (seniorManagerCallCodingMetrics) {
        seniorManagerCallCodingMetrics.innerHTML = `
            <div class="metric">
                <span class="metric-label">Total DXST:</span>
                <span class="metric-value">${seniorManagerMetrics.totalDXST}</span>
            </div>
            <div class="metric">
                <span class="metric-label">Total Sequence ID:</span>
                <span class="metric-value">${seniorManagerMetrics.totalSequenceID}</span>
            </div>
            <div class="metric">
                <span class="metric-label">Call Coding Ratio:</span>
                <span class="metric-value">${seniorManagerMetrics.callCodingRatio}%</span>
            </div>
        `;
    }
}

function getSeniorManagerCallCodingMetrics() {
    const allManagerData = JSON.parse(localStorage.getItem('allManagerData') || '{}');
    let totalDXST = 0;
    let totalSequenceID = 0;
    const seniorManagers = apmEmployeeMap['Senior Manager'];
    seniorManagers.forEach(manager => {
        const managerData = allManagerData[manager];
        if (managerData && managerData.callHistory) {
            managerData.callHistory.forEach(call => {
                if (call.dxstNumber !== -1 && call.dxstNumber !== undefined && call.dxstNumber !== null && call.dxstNumber !== '') {
                    totalDXST++;
                }
                if (call.sequenceId && call.sequenceId.trim() !== '') {
                    totalSequenceID++;
                }
            });
        }
        if (managerData && managerData.currentCall) {
            if (managerData.currentCall.dxstNumber !== -1 && managerData.currentCall.dxstNumber !== undefined && managerData.currentCall.dxstNumber !== null && managerData.currentCall.dxstNumber !== '') {
                totalDXST++;
            }
            if (managerData.currentCall.sequenceId && managerData.currentCall.sequenceId.trim() !== '') {
                totalSequenceID++;
            }
        }
    });
    const callCodingRatio = totalSequenceID > 0 ? (totalDXST / totalSequenceID * 100).toFixed(1) : 0;
    return {
        totalDXST,
        totalSequenceID,
        callCodingRatio: parseFloat(callCodingRatio)
    };
}

function getSeniorManagerTotalSalesProgress() {
    const allManagerData = JSON.parse(localStorage.getItem('allManagerData') || '{}');
    let totalFiber = 0;
    let totalMobile = 0;
    let totalVideo = 0;
    
    // Get all managers from the SPM team (Senior Managers oversee the same teams)
    const spmTeam = apmEmployeeMap['SPM'];
    
    spmTeam.forEach(manager => {
        const managerData = allManagerData[manager];
        if (managerData && managerData.salesSummary) {
            totalFiber += managerData.salesSummary.Fiber || 0;
            totalMobile += managerData.salesSummary.Mobile || 0;
            totalVideo += managerData.salesSummary.Video || 0;
        }
    });
    
    return {
        Fiber: totalFiber,
        Mobile: totalMobile,
        Video: totalVideo,
        Total: totalFiber + totalMobile + totalVideo
    };
}

function drawSeniorManagerSalesDonutChart() {
    const canvas = document.getElementById('seniorManagerSalesDonutChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const salesData = getSeniorManagerTotalSalesProgress();
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 60;
    const innerRadius = 40;
    
    // Colors for each sales type
    const colors = {
        Fiber: '#FF6B6B',
        Mobile: '#4ECDC4', 
        Video: '#45B7D1'
    };
    
    let currentAngle = -Math.PI / 2; // Start from top
    
    // Draw each segment
    Object.entries(salesData).forEach(([type, value]) => {
        if (type === 'Total' || value === 0) return;
        
        const segmentAngle = (value / salesData.Total) * 2 * Math.PI;
        
        // Draw outer arc
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + segmentAngle);
        ctx.lineTo(centerX + (innerRadius * Math.cos(currentAngle + segmentAngle)), 
                   centerY + (innerRadius * Math.sin(currentAngle + segmentAngle)));
        
        // Draw inner arc
        ctx.arc(centerX, centerY, innerRadius, currentAngle + segmentAngle, currentAngle, true);
        ctx.closePath();
        
        // Fill segment
        ctx.fillStyle = colors[type];
        ctx.fill();
        
        currentAngle += segmentAngle;
    });
    
    // Draw center circle (donut hole)
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(3, 5, 91, 0.9)';
    ctx.fill();
}

function setupSeniorManagerDashboardUpdates() {
    // Update Senior Manager dashboard every 30 seconds
    setInterval(() => {
        if (currentRole === 'senior-manager') {
            updateSeniorManagerDashboard();
        }
    }, 30000);
}

function saveSeniorManagerDailyUpdate() {
    const dailyUpdateContent = document.getElementById('seniorManagerDailyUpdate').value.trim();
    if (!dailyUpdateContent) {
        alert('Please enter content for the team daily update.');
        return;
    }
    
    const dailyUpdate = {
        content: dailyUpdateContent,
        updatedBy: currentUser,
        timestamp: new Date().toISOString(),
        date: new Date().toDateString()
    };
    
    // Save to localStorage for all users to access
    localStorage.setItem('seniorManagerDailyUpdate', JSON.stringify(dailyUpdate));
    
    alert('Team daily update saved successfully! All users will see this update.');
    
    // Refresh the Senior Manager dashboard to show updated info
    updateSeniorManagerDashboard();
}

function saveSeniorManagerMarqueeAnnouncement() {
    const marqueeContent = document.getElementById('seniorManagerMarquee').value.trim();
    if (!marqueeContent) {
        alert('Please enter content for the team marquee announcement.');
        return;
    }
    
    const marqueeUpdate = {
        content: marqueeContent,
        updatedBy: currentUser,
        timestamp: new Date().toISOString(),
        date: new Date().toDateString()
    };
    
    // Save to localStorage for all users to access
    localStorage.setItem('seniorManagerMarqueeAnnouncement', JSON.stringify(marqueeUpdate));
    
    alert('Team marquee announcement saved successfully! All users will see this update.');
    
    // Refresh the Senior Manager dashboard to show updated info
    updateSeniorManagerDashboard();
    // Immediately update marquee for this user
    loadMarqueeAnnouncement();
}

document.addEventListener('DOMContentLoaded', loadMarqueeAnnouncement);

// --- Employee Status Tracking ---

// Helper: Set employee status in localStorage
function setEmployeeStatus(name, status) {
    localStorage.setItem(`employeeStatus_${name}`, JSON.stringify(status));
}

// Helper: Get employee status from localStorage
function getEmployeeStatus(name) {
    const data = localStorage.getItem(`employeeStatus_${name}`);
    return data ? JSON.parse(data) : null;
}

// Helper: Remove employee status from localStorage
function removeEmployeeStatus(name) {
    localStorage.removeItem(`employeeStatus_${name}`);
}

// On employee login
function handleEmployeeLogin(username) {
    const now = new Date().toISOString();
    const status = {
        loggedIn: true,
        break: 'none',
        loginTime: now,
        lastLogin: now,
        breakStart: null // clear any previous break
    };
    setEmployeeStatus(username, status);
    console.log(`Employee login status set for ${username}:`, status);
    console.log(`localStorage key: employeeStatus_${username}`);
    console.log(`localStorage value:`, localStorage.getItem(`employeeStatus_${username}`));
}

// On employee logout
function handleEmployeeLogout(username) {
    setEmployeeStatus(username, {
        loggedIn: false,
        break: 'none',
        logoutTime: new Date().toISOString(),
        breakStart: null
    });
}

// On employee break change
function handleEmployeeBreak(username, breakType) {
    const status = getEmployeeStatus(username) || {};
    if (breakType === 'none') {
        // Ending break
        setEmployeeStatus(username, { break: 'none', breakStart: null });
    } else {
        // Starting break
        setEmployeeStatus(username, { break: breakType, breakStart: new Date().toISOString() });
    }
}

// --- Enhanced Employee Status Panel ---
function getBreakIcon(breakType) {
    if (breakType === 'first') return '☕';
    if (breakType === 'second') return '🥪';
    if (breakType === 'bio') return '🚻';
    return '';
}

function getStatusIcon(loggedIn) {
    return loggedIn ? '🟢' : '🔴';
}

function formatTimeHM(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function getDurationSeconds(startIso) {
    if (!startIso) return 0;
    return Math.floor((Date.now() - new Date(startIso).getTime()) / 1000);
}

function formatDateTime(dt) {
    if (!dt) return '';
    const d = new Date(dt);
    return d.toLocaleString();
}

// Enhanced updateEmployeeStatusPanel function
function updateEmployeeStatusPanel() {
    if (currentRole !== 'manager') return;
    const employeeList = JSON.parse(localStorage.getItem('managerEmployeeList')) || [];
    const panel = document.getElementById('employeeStatusList');
    if (!panel) return;
    
    console.log('Updating employee status panel for manager:', currentUser);
    console.log('Employee list:', employeeList);
    
    // Gather statuses
    const statuses = employeeList.map(name => {
        const status = getEmployeeStatus(name) || {};
        console.log(`Status for ${name}:`, status);
        return { name, ...status };
    });
    
    // Sort: online first, then on break, then alphabetically
    statuses.sort((a, b) => {
        if ((b.loggedIn ? 1 : 0) - (a.loggedIn ? 1 : 0) !== 0) return (b.loggedIn ? 1 : 0) - (a.loggedIn ? 1 : 0);
        if ((b.break && b.break !== 'none' ? 1 : 0) - (a.break && a.break !== 'none' ? 1 : 0) !== 0) return (b.break && b.break !== 'none' ? 1 : 0) - (a.break && a.break !== 'none' ? 1 : 0);
        return a.name.localeCompare(b.name);
    });
    
    let html = `
        <div style="margin-bottom: 10px; text-align: center;">
            <button onclick="updateEmployeeStatusPanel()" style="background: #FFA07A; color: #000; border: none; padding: 5px 10px; border-radius: 4px; font-size: 11px; cursor: pointer;">🔄 Refresh Status</button>
        </div>
    `;
    
    if (statuses.length === 0) {
        html += '<div style="color: #FFA07A; text-align: center;">No employees found.</div>';
    } else {
        statuses.forEach(status => {
            const isOnline = !!status.loggedIn;
            const onBreak = isOnline && status.break && status.break !== 'none';
            const breakIcon = getBreakIcon(status.break);
            const statusIcon = getStatusIcon(isOnline);
            
            // Break duration
            let breakDuration = '';
            if (onBreak && status.breakStart) {
                breakDuration = ` (${formatTimeHM(getDurationSeconds(status.breakStart))})`;
            }
            
            // Total logged-in time
            let totalLogin = '';
            if (isOnline && status.loginTime) {
                totalLogin = ` | <span style="color:#FFD700; font-size:11px;">Login: ${formatTimeHM(getDurationSeconds(status.loginTime))}</span>`;
            }
            
            // Last login/logout
            let lastSeen = '';
            if (isOnline && status.lastLogin) {
                lastSeen = `<span style="color:#4ECDC4; font-size:11px;">Last Login: ${formatDateTime(status.lastLogin)}</span>`;
            } else if (!isOnline && status.logoutTime) {
                lastSeen = `<span style="color:#FF6B6B; font-size:11px;">Last Logout: ${formatDateTime(status.logoutTime)}</span>`;
            }
            
            // Color coding
            let bg = '';
            if (onBreak) bg = 'background:rgba(255,215,0,0.08);';
            else if (isOnline) bg = 'background:rgba(78,205,196,0.08);';
            else bg = 'background:rgba(255,107,107,0.08);';
            
            html += `<div style="margin-bottom:8px;display:flex;flex-direction:column;${bg}border-radius:6px;padding:6px 8px;">
                <div style="display:flex;align-items:center;justify-content:space-between;">
                    <span style="font-weight:bold;color:#FFD700;">${status.name}</span>
                    <span>${statusIcon}${onBreak ? ' ' + breakIcon : ''}</span>
                </div>
                <div style="font-size:12px;display:flex;align-items:center;justify-content:space-between;">
                    <span>${isOnline ? '<span style="color:#4ECDC4;">Online</span>' : '<span style="color:#FF6B6B;">Offline</span>'}${onBreak ? ` <span style="color:#FFD700;">On ${status.break.charAt(0).toUpperCase() + status.break.slice(1)} Break${breakDuration}</span>` : ''}${totalLogin}</span>
                </div>
                <div>${lastSeen}</div>
            </div>`;
        });
    }
    
    // Add debug section
    html += `
        <div style="margin-top: 20px; padding: 10px; background: rgba(0,0,0,0.3); border-radius: 6px; border: 1px solid #FFA07A;">
            <h5 style="color: #FFD700; margin-bottom: 8px;">🔧 Debug Info</h5>
            <div style="font-size: 11px; color: #ccc;">
                <div><strong>Manager Employee List:</strong> ${employeeList.length} employees</div>
                <div><strong>Current Role:</strong> ${currentRole}</div>
                <div><strong>Current User:</strong> ${currentUser}</div>
                <div><strong>Panel Element:</strong> ${panel ? 'Found' : 'Missing'}</div>
                <div><strong>Online Employees:</strong> ${statuses.filter(s => s.loggedIn).length}</div>
                <div><strong>Total Statuses:</strong> ${statuses.length}</div>
            </div>
            <details style="margin-top: 8px;">
                <summary style="color: #FFA07A; cursor: pointer; font-size: 11px;">📋 Raw Status Data</summary>
                <div style="font-size: 10px; color: #aaa; margin-top: 5px; max-height: 200px; overflow-y: auto;">
                    ${statuses.map(s => `<div style="margin-bottom: 5px;"><strong>${s.name}:</strong> ${JSON.stringify(s, null, 2)}</div>`).join('')}
                </div>
            </details>
            <details style="margin-top: 8px;">
                <summary style="color: #FFA07A; cursor: pointer; font-size: 11px;">🔍 All localStorage Keys</summary>
                <div style="font-size: 10px; color: #aaa; margin-top: 5px; max-height: 200px; overflow-y: auto;">
                    ${Object.keys(localStorage).filter(key => key.includes('employeeStatus') || key.includes('managerEmployeeList')).map(key => `<div style="margin-bottom: 3px;"><strong>${key}:</strong> ${localStorage.getItem(key)}</div>`).join('')}
                </div>
            </details>
        </div>
    `;
    
    panel.innerHTML = html;
    console.log('Employee status panel updated');
}

// Override updateManagerDashboard to include employee status panel updates
const originalUpdateManagerDashboard = updateManagerDashboard;
updateManagerDashboard = function() {
    originalUpdateManagerDashboard.apply(this, arguments);
    updateEmployeeStatusPanel();
};

// Auto-refresh every 30 seconds
setInterval(() => {
    if (currentRole === 'manager') updateEmployeeStatusPanel();
}, 30000);

// Also update on storage events (for real-time updates)
window.addEventListener('storage', (e) => {
    if (currentRole === 'manager' && e.key && e.key.startsWith('employeeStatus_')) {
        updateEmployeeStatusPanel();
    }
});

