// scripts/auth.js

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");

  // --- Password Visibility Toggle ---
  const toggleButtons = document.querySelectorAll(".toggle-password");
  toggleButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const input = btn.closest(".password-wrapper").querySelector("input");
      if (input.type === "password") {
        input.type = "text";
        btn.textContent = "🙈"; // Eye closed
      } else {
        input.type = "password";
        btn.textContent = "👁️"; // Eye open
      }
    });
  });

  // --- Login Form Logic ---
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      clearErrorMessages(loginForm);

      const email = loginForm.email.value.trim();
      const password = loginForm.password.value.trim();
      let isValid = true;

      if (!validateEmail(email)) {
        showError(loginForm.email, "Please enter a valid email address.");
        isValid = false;
      }

      if (password.length < 8) {
        showError(loginForm.password, "Password must be at least 8 characters.");
        isValid = false;
      }

      if (isValid) {
        // --- On Successful Login ---
        localStorage.setItem('isLoggedIn', 'true');
        alert("Login successful!");
        window.location.href = 'index.html'; // Redirect to the main page
      }
    });
  }

  // --- Signup Form Logic ---
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      clearErrorMessages(signupForm);

      const name = signupForm.fullname.value.trim();
      const email = signupForm.email.value.trim();
      const password = signupForm["password"].value.trim();
      const confirmPassword = signupForm["confirm-password"].value.trim();
      let isValid = true;

      if (name.length < 2) {
        showError(signupForm.fullname, "Full Name must be at least 2 characters.");
        isValid = false;
      }

      if (!validateEmail(email)) {
        showError(signupForm.email, "Please enter a valid email address.");
        isValid = false;
      }

      if (!validatePassword(password)) {
        showError(signupForm.password, "Password must be > 8 characters and include uppercase, lowercase, & a number.");
        isValid = false;
      }

      if (password !== confirmPassword) {
        showError(signupForm["confirm-password"], "Passwords do not match.");
        isValid = false;
      }

      if (isValid) {
        // --- On Successful Signup ---
        localStorage.setItem('isLoggedIn', 'true');
        alert("Signup successful!");
        window.location.href = 'index.html'; // Redirect to the main page
      }
    });
  }
});

// --- Helper Functions ---

function validateEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

function validatePassword(password) {
  return (
    password.length >= 8 &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password)
  );
}

function showError(inputElement, message) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  // Insert error message after the input's parent element
  inputElement.closest('.input-group').appendChild(errorDiv);
}

function clearErrorMessages(form) {
  const errorMessages = form.querySelectorAll('.error-message');
  errorMessages.forEach(msg => msg.remove());
}

// Global logout function that can be called from other scripts (like app.js)
function logout() {
  localStorage.removeItem('isLoggedIn');
  alert('You have been logged out.');
  window.location.href = 'login.html';
}