const apiURL = 'https://fakestoreapi.com/products';
let products = [];
const cart = [];

document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});


const catalogEl = document.getElementById('catalog');
const productsEl = document.getElementById('products');
const cartEl = document.getElementById('cart');
const cartItemsEl = document.getElementById('cart-items');
const cartCountEl = document.getElementById('cart-count');
const cartTotalEl = document.getElementById('cart-total');
const checkoutEl = document.getElementById('checkout');
const checkoutBtn = document.getElementById('checkout-btn');


document.getElementById('link-catalog').addEventListener('click', e => { e.preventDefault(); showSection('catalog'); });
document.getElementById('link-cart').addEventListener('click', e => { e.preventDefault(); showSection('cart'); });
checkoutBtn.addEventListener('click', () => showSection('checkout'));


async function loadProducts() {
    try {
        const res = await fetch(apiURL);
        if (!res.ok) throw new Error('Erro ao buscar produtos');
        products = await res.json(); renderProducts();
    } catch (err) { console.error(err); }
}


function renderProducts() {
    productsEl.innerHTML = '';
    products.forEach(p => {
        const card = document.createElement('div'); card.className = 'card';
        card.innerHTML = `
      <img src="${p.image}" alt="${p.title}" />
      <div class="card-content">
        <h3>${p.title}</h3>
        <p class="price">R$ ${p.price.toFixed(2)}</p>
        <p class="desc">${p.description}</p>
        <button data-id="${p.id}">Adicionar ao carrinho</button>
      </div>
    `;
        card.querySelector('button').addEventListener('click', () => addToCart(p));
        productsEl.appendChild(card);
    });
}


function addToCart(product) {
    const item = cart.find(i => i.id === product.id);
    item ? item.qty++ : cart.push({ id: product.id, title: product.title, price: product.price, image: product.image, qty: 1 });
    updateCartUI();
}
function removeFromCart(id) {
    const idx = cart.findIndex(i => i.id === id);
    if (idx > -1) cart.splice(idx, 1);
    updateCartUI();
}
function updateCartUI() {
    const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);
    cartCountEl.textContent = totalQty;
    checkoutBtn.disabled = totalQty === 0;

    cartItemsEl.innerHTML = '';
    cart.forEach(i => {
        const div = document.createElement('div');
        div.innerHTML = `
      <img src="${i.image}" alt="${i.title}" />
      <span>${i.title}</span>
      <input type="number" min="1" value="${i.qty}" data-id="${i.id}" />
      × R$ ${i.price.toFixed(2)}
      <button data-id="${i.id}">❌</button>
    `;
        div.querySelector('input').addEventListener('change', e => {
            const newQty = +e.target.value;
            if (newQty < 1) return;
            i.qty = newQty; updateCartUI();
        });
        div.querySelector('button').addEventListener('click', () => removeFromCart(i.id));
        cartItemsEl.appendChild(div);
    });

    const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    cartTotalEl.textContent = total.toFixed(2);
}

function showSection(sec) {
    [catalogEl, cartEl, checkoutEl].forEach(el => el.classList.add('hidden'));
    if (sec === 'catalog') catalogEl.classList.remove('hidden');
    if (sec === 'cart') cartEl.classList.remove('hidden');
    if (sec === 'checkout') checkoutEl.classList.remove('hidden');
}

document.getElementById('checkout-form').addEventListener('submit', e => {
    e.preventDefault(); alert('Pedido confirmado! Obrigado pela compra.');
    cart.length = 0; updateCartUI(); showSection('catalog');
});