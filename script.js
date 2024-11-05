// scripts.js

document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const navBar = document.getElementById('nav-bar');
    const hamburger = document.getElementById('hamburger');
    const userDropdown = document.getElementById('user-dropdown');
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
    });
    
    hamburger.addEventListener('click', function() {
        navBar.classList.toggle('active');
    });
    
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.user-icon') && userDropdown.style.display === 'block') {
            userDropdown.style.display = 'none';
        }
    });
});

function toggleUserMenu() {
    const userDropdown = document.getElementById('user-dropdown');
    userDropdown.style.display = userDropdown.style.display === 'block' ? 'none' : 'block';
}

function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const togglePassword = document.querySelector('.toggle-password');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        togglePassword.textContent = 'hide';
    } else {
        passwordInput.type = 'password';
        togglePassword.textContent = 'show';
    }
}

function loginUser() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (username && email && password) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'backend.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                if (response.status === 'success') {
                    alert('Logged in successfully!');
                    window.location.href = 'dashboard.html';
                } else {
                    alert(response.message);
                }
            }
        };
        xhr.send(`action=login&username=${username}&email=${email}&password=${password}`);
    } else {
        alert('Please fill in all fields.');
    }
}

function submitRequest(event) {
    event.preventDefault();
    
    const requestData = new FormData();
    requestData.append('action', 'submit_request');
    requestData.append('name', document.getElementById('name').value);
    requestData.append('pf_number', document.getElementById('pf-number').value);
    requestData.append('email', document.getElementById('email').value);
    requestData.append('building', document.getElementById('building').value);
    requestData.append('floor', document.getElementById('floor').value);
    requestData.append('department', document.getElementById('department').value);
    requestData.append('designation', document.getElementById('designation').value);
    requestData.append('date', document.getElementById('date').value);
    requestData.append('request_type', document.getElementById('request-type').value);
    requestData.append('asset_category', document.getElementById('asset-category').value);
    requestData.append('accessory_category', document.getElementById('accessory-category').value);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'backend.php', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            const message = document.getElementById('request-message');
            if (response.status === 'success') {
                message.textContent = 'Request sent successfully';
                message.style.color = 'green';
            } else {
                message.textContent = 'Failed to send request';
                message.style.color = 'red';
            }
        }
    };
    xhr.send(requestData);
}