// auth.js

document.addEventListener("DOMContentLoaded", () => {
  const toggleButtons = document.querySelectorAll(".toggle-password");
  toggleButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const input = btn.previousElementSibling;
      input.type = input.type === "password" ? "text" : "password";
      btn.textContent = input.type === "password" ? "👁️" : "👁️‍🔍";
    });
  });

  // Login validation
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = loginForm.email.value.trim();
      const password = loginForm.password.value.trim();

      if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      if (!validatePassword(password)) {
        alert("Password must be at least 8 characters and contain a mix of upper/lowercase letters and numbers.");
        return;
      }

      alert("Login successful!");
    });
  }

  // Signup validation
  const signupForm = document.getElementById("signup-form");
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = signupForm.fullname.value.trim();
      const email = signupForm.email.value.trim();
      const password = signupForm["password"].value.trim();
      const confirmPassword = signupForm["confirm-password"].value.trim();

      if (name.length < 2) {
        alert("Full Name must be at least 2 characters long.");
        return;
      }

      if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      if (!validatePassword(password)) {
        alert("Password must be at least 8 characters and include uppercase, lowercase, and a number.");
        return;
      }

      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }

      alert("Signup successful!");
    });
  }
});

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
