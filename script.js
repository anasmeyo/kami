// Sample product data
const products = [
    {
        id: 1,
        name: "Classic T-Shirt",
        price: 29.99,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        category: "Clothing"
    },
    {
        id: 2,
        name: "Wireless Headphones",
        price: 99.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        category: "Electronics"
    },
    {
        id: 3,
        name: "Smart Watch",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        category: "Electronics"
    },
    {
        id: 4,
        name: "Yoga Mat",
        price: 39.99,
        image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        category: "Sports"
    },
    {
        id: 5,
        name: "Coffee Maker",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1517661931470-2a9daaa1c5d1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        category: "Home & Living"
    },
    {
        id: 6,
        name: "Running Shoes",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        category: "Sports"
    }
];

// Shopping cart state
let cart = [];

// DOM Elements
const productGrid = document.querySelector('.product-grid');
const cartModal = document.getElementById('cartModal');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.querySelector('.cart-count');
const cartIcon = document.querySelector('.cart-icon');
const checkoutBtn = document.querySelector('.checkout-btn');

// Initialize the website
function init() {
    displayProducts();
    setupEventListeners();
    updateCartCount();
}

// Display products in the grid
function displayProducts() {
    productGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// Setup event listeners
function setupEventListeners() {
    // Add to cart buttons
    productGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.dataset.id);
            addToCart(productId);
        }
    });

    // Cart icon click
    cartIcon.addEventListener('click', toggleCart);

    // Checkout button
    checkoutBtn.addEventListener('click', checkout);
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCartCount();
        showNotification('Product added to cart!');
    }
}

// Update cart count
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Toggle cart modal
function toggleCart() {
    if (cartModal.style.display === 'block') {
        cartModal.style.display = 'none';
    } else {
        displayCart();
        cartModal.style.display = 'block';
    }
}

// Display cart contents
function displayCart() {
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div>
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
            <div>
                <button onclick="removeFromCart(${item.id})">Remove</button>
                <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
            </div>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    displayCart();
}

// Update item quantity
function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(productId);
    } else {
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity = newQuantity;
            updateCartCount();
            displayCart();
        }
    }
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    showNotification('Thank you for your purchase!');
    cart = [];
    updateCartCount();
    toggleCart();
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add notification styles
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #2ecc71;
        color: white;
        padding: 1rem 2rem;
        border-radius: 4px;
        animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Initialize the website when the DOM is loaded
document.addEventListener('DOMContentLoaded', init); 