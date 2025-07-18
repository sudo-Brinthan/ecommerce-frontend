// --- E-COMMERCE & UI ---
const badge = document.querySelector('.badge');
const loader = document.getElementById('loader');
const errorMessage = document.getElementById('error-message');
const productGrid = document.getElementById('product-grid');

// Update cart count from localStorage
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  if (badge) {
    badge.textContent = count;
  }
}

// Add product to cart in localStorage
function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity = (existingItem.quantity || 1) + 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert(`${product.title} has been added to your cart.`);
}

// Fetch product data
async function fetchProducts() {
  // Ensure productGrid exists before fetching
  if (!productGrid) return; 
  
  try {
    const res = await fetch('https://fakestoreapi.com/products');
    if (!res.ok) throw new Error('Failed to fetch products');
    const products = await res.json();
    if(loader) loader.style.display = 'none';
    renderProducts(products);
  } catch (error) {
    if(loader) loader.style.display = 'none';
    if(errorMessage) errorMessage.style.display = 'block';
    console.error(error);
  }
}

// Render product cards
function renderProducts(products) {
  if (!productGrid) return;
  productGrid.innerHTML = ''; // Clear existing products
  
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}" class="product-img" loading="lazy" />
      <div class="product-info">
        <h3 class="product-title">${product.title}</h3>
        <p class="product-price">$${product.price.toFixed(2)}</p>
        <button class="add-to-cart">Add to Cart</button>
      </div>
    `;

    card.querySelector('.add-to-cart').addEventListener('click', () => {
      addToCart(product);
    });

    productGrid.appendChild(card);
  });
}

// Handle hamburger toggle
function initHamburgerMenu() {
  const hamburger = document.querySelector(".hamburger-menu");
  const navMenu = document.querySelector(".nav-menu");

  if (!hamburger || !navMenu) return;

  const toggleMenu = () => {
    const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
    hamburger.setAttribute("aria-expanded", !isExpanded);
    navMenu.classList.toggle("show");
  };

  hamburger.addEventListener("click", toggleMenu);

  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove("show");
      hamburger.setAttribute("aria-expanded", "false");
    }
  });

  hamburger.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleMenu();
    }
  });
}

// --- FIREBASE AUTHENTICATION ---

// This function updates the header buttons based on login status
function updateHeaderUI(user) {
  const loginBtn = document.getElementById('login-btn');
  const signupBtn = document.getElementById('signup-btn');
  const logoutBtn = document.getElementById('logout-btn');

  if (user) {
    // User is logged in
    if(loginBtn) loginBtn.style.display = 'none';
    if(signupBtn) signupBtn.style.display = 'none';
    if(logoutBtn) logoutBtn.style.display = 'block';

    if(logoutBtn) logoutBtn.addEventListener('click', () => {
      auth.signOut().then(() => {
        alert("You have been logged out.");
        // The onAuthStateChanged listener will handle UI updates
      });
    });

  } else {
    // User is not logged in
    if(loginBtn) loginBtn.style.display = 'block';
    if(signupBtn) signupBtn.style.display = 'block';
    if(logoutBtn) logoutBtn.style.display = 'none';
  }
}

// --- INITIALIZE APP ---

document.addEventListener('DOMContentLoaded', () => {
  // Initialize standard features
  fetchProducts();
  updateCartCount();
  initHamburgerMenu();

  // Listen for Firebase auth state changes
  // This will run when the page loads and any time the user logs in or out
  auth.onAuthStateChanged(user => {
    updateHeaderUI(user);
  });
});