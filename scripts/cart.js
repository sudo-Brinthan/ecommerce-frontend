const cartContainer = document.getElementById('cart-container');
const totalAmount = document.getElementById('total-amount');
const badge = document.getElementById('cart-count');
const checkoutBtn = document.querySelector('.checkout-btn');

// Load and render cart items
function renderCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  cartContainer.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p style="text-align:center;">Your cart is empty.</p>';
    totalAmount.textContent = '0.00';
    badge.textContent = 0;
    if (checkoutBtn) checkoutBtn.disabled = true;
    return;
  }

  cart.forEach(item => {
    const quantity = item.quantity || 1;
    const itemTotal = item.price * quantity;
    total += itemTotal;

    const card = document.createElement('div');
    card.className = 'product-card';

    const productHTML = `
      <img src="${item.image}" alt="${item.title}" class="product-img" />
      <h3 class="product-title">${item.title}</h3>
      <p class="product-price">$${item.price.toFixed(2)}</p>

      <div class="quantity-control">
        <button class="qty-btn decrease">-</button>
        <span class="qty-display">${quantity}</span>
        <button class="qty-btn increase">+</button>
      </div>

      <p class="product-price">Total: $${itemTotal.toFixed(2)}</p>
      <button class="remove-btn">Remove</button>
    `;

    card.innerHTML = productHTML;

    // Increase quantity
    card.querySelector('.increase').addEventListener('click', () => {
      item.quantity = Math.min((item.quantity || 1) + 1, 10);
      updateCartItem(item);
    });

    // Decrease quantity
    card.querySelector('.decrease').addEventListener('click', () => {
      if ((item.quantity || 1) > 1) {
        item.quantity -= 1;
        updateCartItem(item);
      }
    });

    // Remove item
    card.querySelector('.remove-btn').addEventListener('click', () => {
      if (confirm("Remove this item from cart?")) {
        removeFromCart(item.id);
      }
    });

    cartContainer.appendChild(card);
  });

  totalAmount.textContent = total.toFixed(2);
  badge.textContent = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  if (checkoutBtn) checkoutBtn.disabled = false;
}

// Update quantity of a specific item
function updateCartItem(updatedItem) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const index = cart.findIndex(item => item.id === updatedItem.id);
  if (index !== -1) {
    cart[index].quantity = updatedItem.quantity;
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }
}

// Remove item by ID
function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

// Initialize cart page
document.addEventListener('DOMContentLoaded', renderCart);
