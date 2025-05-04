// 1. Event Handling
document.addEventListener('DOMContentLoaded', function() {
    // Button Click
    const clickBtn = document.getElementById('click-btn');
    const clickOutput = document.getElementById('click-output');
    
    clickBtn.addEventListener('click', function() {
        clickOutput.textContent = "Button was clicked! 🎉";
        clickOutput.style.color = "#2ecc71";
    });

    // Hover Effects
    const hoverBox = document.querySelector('.hover-box');
    const hoverOutput = document.getElementById('hover-output');
    
    hoverBox.addEventListener('mouseenter', function() {
        hoverOutput.textContent = "Mouse is inside! 🐭";
    });
    
    hoverBox.addEventListener('mouseleave', function() {
        hoverOutput.textContent = "Mouse left... 🏃‍♂️";
    });

    // Keypress Detection
    const keypressInput = document.getElementById('keypress-input');
    const keypressOutput = document.getElementById('keypress-output');
    
    keypressInput.addEventListener('keyup', function(e) {
        keypressOutput.textContent = `You typed: ${e.target.value}`;
    });

    // Secret Action (Double Click)
    const secretBtn = document.getElementById('secret-btn');
    const secretOutput = document.getElementById('secret-output');
    let clickCount = 0;
    
    secretBtn.addEventListener('dblclick', function() {
        secretOutput.textContent = "You found the secret! 🎊";
        secretOutput.classList.add('secret-revealed');
    });

    // Long Press Detection
    let pressTimer;
    secretBtn.addEventListener('mousedown', function() {
        pressTimer = setTimeout(function() {
            secretOutput.textContent = "Long press detected! 🕒";
            secretOutput.classList.add('secret-revealed');
        }, 1000); // 1 second
    });
    
    secretBtn.addEventListener('mouseup', function() {
        clearTimeout(pressTimer);
    });
    
    secretBtn.addEventListener('mouseleave', function() {
        clearTimeout(pressTimer);
    });

    // 2. Interactive Elements
    // Color Changing Button
    const colorBtn = document.getElementById('color-btn');
    const colorChanger = document.querySelector('.color-changer');
    const colors = ['#ff7675', '#74b9ff', '#55efc4', '#a29bfe', '#ffeaa7'];
    let colorIndex = 0;
    
    colorBtn.addEventListener('click', function() {
        colorIndex = (colorIndex + 1) % colors.length;
        colorChanger.style.backgroundColor = colors[colorIndex];
        colorBtn.textContent = `Color ${colorIndex + 1}`;
    });

    // Image Gallery
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const images = document.querySelectorAll('.gallery-images img');
    const imageCounter = document.getElementById('image-counter');
    let currentImage = 0;
    
    function updateGallery() {
        images.forEach((img, index) => {
            img.classList.toggle('active', index === currentImage);
        });
        imageCounter.textContent = `${currentImage + 1}/${images.length}`;
    }
    
    prevBtn.addEventListener('click', function() {
        currentImage = (currentImage - 1 + images.length) % images.length;
        updateGallery();
    });
    
    nextBtn.addEventListener('click', function() {
        currentImage = (currentImage + 1) % images.length;
        updateGallery();
    });

    // Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update panes
            tabPanes.forEach(pane => pane.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });

    // 3. Form Validation
    const form = document.getElementById('validation-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const strengthBar = document.querySelector('.strength-bar');
    
    // Real-time validation
    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    
    function validateName() {
        const error = nameInput.nextElementSibling;
        if (nameInput.value.trim() === '') {
            showError(nameInput, error, 'Name is required');
            return false;
        } else {
            clearError(nameInput, error);
            return true;
        }
    }
    
    function validateEmail() {
        const error = emailInput.nextElementSibling;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailInput.value && !emailRegex.test(emailInput.value)) {
            showError(emailInput, error, 'Please enter a valid email');
            return false;
        } else {
            clearError(emailInput, error);
            return true;
        }
    }
    
    function validatePassword() {
        const error = passwordInput.nextElementSibling;
        const password = passwordInput.value;
        let strength = 0;
        
        if (password.length === 0) {
            strengthBar.style.width = '0';
            strengthBar.style.backgroundColor = 'transparent';
            clearError(passwordInput, error);
            return false;
        }
        
        // Check password strength
        if (password.length >= 8) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;
        
        // Update strength bar
        const width = strength * 25;
        let color;
        if (strength <= 1) color = '#e74c3c';
        else if (strength <= 2) color = '#f39c12';
        else if (strength <= 3) color = '#3498db';
        else color = '#2ecc71';
        
        strengthBar.style.width = `${width}%`;
        strengthBar.style.backgroundColor = color;
        
        if (password.length < 8) {
            showError(passwordInput, error, 'Password must be at least 8 characters');
            return false;
        } else {
            clearError(passwordInput, error);
            return true;
        }
    }
    
    function showError(input, errorElement, message) {
        input.classList.add('shake');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        
        // Remove shake animation after it completes
        setTimeout(() => {
            input.classList.remove('shake');
        }, 500);
    }
    
    function clearError(input, errorElement) {
        input.classList.remove('shake');
        errorElement.style.display = 'none';
    }
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        if (isNameValid && isEmailValid && isPasswordValid) {
            alert('Form submitted successfully!');
            form.reset();
            strengthBar.style.width = '0';
            strengthBar.style.backgroundColor = 'transparent';
        }
    });
});