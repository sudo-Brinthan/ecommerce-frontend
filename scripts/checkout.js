const badge = document.getElementById('cart-count');
const totalSpan = document.getElementById('checkout-total');
const form = document.getElementById('checkout-form');

// Update cart count
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  badge.textContent = count;
}

// Calculate total
function calculateTotal() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
  totalSpan.textContent = total.toFixed(2);
}

// Submit order
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const address = document.getElementById('address').value.trim();
  const payment = document.getElementById('payment').value;

  if (!name || !email || !address || !payment) {
    alert('Please fill all fields');
    return;
  }

  alert('Order placed successfully!');
  localStorage.removeItem('cart');
  window.location.href = 'index.html';
});

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  calculateTotal();
});
