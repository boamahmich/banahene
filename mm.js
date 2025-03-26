document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const signUpToggle = document.getElementById('signUpToggle');
    const signInToggle = document.getElementById('signInToggle');
    const container = document.getElementById('container');
    
    // Toggle to sign up form
    signUpToggle.addEventListener('click', function() {
        container.classList.add('right-panel-active');
    });
    
    // Toggle back to sign in form
    signInToggle.addEventListener('click', function() {
        container.classList.remove('right-panel-active');
    });
    
    // Login form validation
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        let isValid = true;
        
        // Hide all errors first
        document.getElementById('loginEmailError').style.display = 'none';
        document.getElementById('loginPasswordError').style.display = 'none';
        
        // Email validation
        if (!email.includes('@') || !email.includes('.')) {
            document.getElementById('loginEmailError').style.display = 'block';
            isValid = false;
        }
        
        // Password validation
        if (password.length < 6) {
            document.getElementById('loginPasswordError').style.display = 'block';
            isValid = false;
        }
        
        if (isValid) {
            alert('Login successful!');
            // Here you would typically send data to server
        }
    });
    
    // Registration form validation
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;
        let isValid = true;
        
        // Hide all errors first
        document.getElementById('registerNameError').style.display = 'none';
        document.getElementById('registerEmailError').style.display = 'none';
        document.getElementById('registerPasswordError').style.display = 'none';
        document.getElementById('registerConfirmPasswordError').style.display = 'none';
        
        // Name validation
        if (name.trim() === '') {
            document.getElementById('registerNameError').style.display = 'block';
            isValid = false;
        }
        
        // Email validation
        if (!email.includes('@') || !email.includes('.')) {
            document.getElementById('registerEmailError').style.display = 'block';
            isValid = false;
        }
        
        // Password validation
        if (password.length < 6) {
            document.getElementById('registerPasswordError').style.display = 'block';
            isValid = false;
        }
        
        // Confirm password validation
        if (password !== confirmPassword) {
            document.getElementById('registerConfirmPasswordError').style.display = 'block';
            isValid = false;
        }
        
        if (isValid) {
            alert('Registration successful!');
            // Here you would typically send data to server
            // Switch back to login form
            container.classList.remove('right-panel-active');
            // Clear form
            registerForm.reset();
    // DOM Elements
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const signUpToggle = document.getElementById('signUpToggle');
    const signInToggle = document.getElementById('signInToggle');
    const container = document.getElementById('container');

    // Toggle between sign-in and sign-up forms
    signUpToggle.addEventListener('click', () => {
        container.classList.add('right-panel-active');
    });

    signInToggle.addEventListener('click', () => {
        container.classList.remove('right-panel-active');
    });

    // Initialize users array in local storage if it doesn't exist
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
    }

    // Registration form submission
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('registerName').value.trim();
        const email = document.getElementById('registerEmail').value.trim();
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;
        
        // Reset error messages
        document.getElementById('registerNameError').style.display = 'none';
        document.getElementById('registerEmailError').style.display = 'none';
        document.getElementById('registerPasswordError').style.display = 'none';
        document.getElementById('registerConfirmPasswordError').style.display = 'none';
        
        // Validation flags
        let isValid = true;
        
        // Name validation
        if (name === '') {
            document.getElementById('registerNameError').style.display = 'block';
            isValid = false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            document.getElementById('registerEmailError').style.display = 'block';
            isValid = false;
        }
        
        // Password validation
        if (password.length < 6) {
            document.getElementById('registerPasswordError').style.display = 'block';
            isValid = false;
        }
        
        // Confirm password validation
        if (password !== confirmPassword) {
            document.getElementById('registerConfirmPasswordError').style.display = 'block';
            isValid = false;
        }
        
        if (isValid) {
            // Check if email already exists
            const users = JSON.parse(localStorage.getItem('users'));
            const userExists = users.some(user => user.email === email);
            
            if (userExists) {
                document.getElementById('registerEmailError').textContent = 'Email already registered';
                document.getElementById('registerEmailError').style.display = 'block';
                return;
            }
            
            // Create new user object
            const newUser = {
                name,
                email,
                password // Note: In a real application, never store plain text passwords
            };
            
            // Add to users array and save to local storage
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            
            // Store current user in session
            sessionStorage.setItem('currentUser', JSON.stringify(newUser));
            
            // Reset form
            registerForm.reset();
            
            // Show success message or redirect
            alert('Registration successful! You can now sign in.');
            container.classList.remove('right-panel-active');
        }
    });

    // Login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;
        
        // Reset error messages
        document.getElementById('loginEmailError').style.display = 'none';
        document.getElementById('loginPasswordError').style.display = 'none';
        
        // Validation flags
        let isValid = true;
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            document.getElementById('loginEmailError').style.display = 'block';
            isValid = false;
        }
        
        // Password validation
        if (password.length < 6) {
            document.getElementById('loginPasswordError').style.display = 'block';
            isValid = false;
        }
        
        if (isValid) {
            // Check if user exists
            const users = JSON.parse(localStorage.getItem('users'));
            const user = users.find(user => user.email === email && user.password === password);
            
            if (user) {
                // Store current user in session
                sessionStorage.setItem('currentUser', JSON.stringify(user));
                
                // Reset form
                loginForm.reset();
                
                // Show success message or redirect
                alert('Login successful! Welcome back, ' + user.name);
                // Here you would typically redirect to a dashboard page
                // window.location.href = 'dashboard.html';
            } else {
                document.getElementById('loginPasswordError').textContent = 'Invalid email or password';
                document.getElementById('loginPasswordError').style.display = 'block';
            }
        
    });
});