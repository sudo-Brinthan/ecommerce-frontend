// scripts/auth.js

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");

  // --- Login Form Logic with Firebase ---
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      clearErrorMessages(loginForm);

      const email = loginForm.email.value.trim();
      const password = loginForm.password.value.trim();

      // Use Firebase to sign in
      auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in successfully
          alert("Login successful!");
          window.location.href = 'index.html'; // Redirect to the main page
        })
        .catch((error) => {
          // Handle errors here
          let errorMessage = "An error occurred. Please try again.";
          if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
            errorMessage = "Invalid email or password.";
          }
          showError(loginForm.querySelector('button[type="submit"]'), errorMessage);
        });
    });
  }

  // --- Signup Form Logic with Firebase ---
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      clearErrorMessages(signupForm);

      const email = signupForm.email.value.trim();
      const password = signupForm.password.value.trim();
      const confirmPassword = signupForm["confirm-password"].value.trim();

      // Basic validation before sending to Firebase
      if (password !== confirmPassword) {
        showError(signupForm["confirm-password"], "Passwords do not match.");
        return;
      }

      // Use Firebase to create a new user
      auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed up and signed in successfully
          alert("Signup successful!");
          window.location.href = 'index.html'; // Redirect to the main page
        })
        .catch((error) => {
          // Handle errors here
          let errorMessage = "An error occurred. Please try again.";
          if (error.code === 'auth/email-already-in-use') {
            errorMessage = "This email address is already in use.";
          } else if (error.code === 'auth/weak-password') {
            errorMessage = "The password is too weak. It must be at least 6 characters long.";
          }
          showError(signupForm.querySelector('button[type="submit"]'), errorMessage);
        });
    });
  }
});

// --- Helper Functions to show/clear error messages on the form ---

function showError(anchorElement, message) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  // Insert error message before the anchor element (e.g., the submit button)
  anchorElement.parentNode.insertBefore(errorDiv, anchorElement);
}

function clearErrorMessages(form) {
  const errorMessages = form.querySelectorAll('.error-message');
  errorMessages.forEach(msg => msg.remove());
}