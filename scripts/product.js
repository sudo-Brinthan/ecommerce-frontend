// scripts/product.js
const detailContainer = document.getElementById('product-detail');
const loader = document.getElementById('loader');
const errorMessage = document.getElementById('error-message');

function getProductIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

function renderProduct(product) {
  const detailHTML = `
    <div class="product-detail-card">
      <div class="product-detail-image">
        <img src="${product.image}" alt="${product.title}" class="zoomable"/>
      </div>
      <div class="product-detail-info">
        <h1>${product.title}</h1>
        <p class="product-price">$${product.price.toFixed(2)}</p>
        <p>${product.description}</p>

        <label for="quantity">Quantity:</label>
        <div class="quantity-selector">
          <button id="decrease">-</button>
          <input type="number" id="quantity" value="1" min="1" max="10" readonly />
          <button id="increase">+</button>
        </div>

        <button id="add-to-cart">Add to Cart</button>
      </div>
    </div>
  `;

  detailContainer.innerHTML = detailHTML;

  const quantityInput = document.getElementById('quantity');
  document.getElementById('increase').addEventListener('click', () => {
    if (parseInt(quantityInput.value) < 10) quantityInput.value++;
  });

  document.getElementById('decrease').addEventListener('click', () => {
    if (parseInt(quantityInput.value) > 1) quantityInput.value--;
  });

  document.getElementById('add-to-cart').addEventListener('click', () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const quantity = parseInt(quantityInput.value);
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ id: product.id, title: product.title, price: product.price, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert('Added to cart');
  });
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cart-count').textContent = totalCount;
}

async function fetchProduct() {
  const productId = getProductIdFromURL();
  if (!productId) return (errorMessage.style.display = 'block');

  try {
    const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
    if (!res.ok) throw new Error('Failed to fetch');
    const product = await res.json();
    loader.style.display = 'none';
    renderProduct(product);
  } catch (err) {
    loader.style.display = 'none';
    errorMessage.style.display = 'block';
    console.error(err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  fetchProduct();
});