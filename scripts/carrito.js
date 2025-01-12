import { products } from './products.js';
(() => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    const cartCount = document.querySelector(".cart-count");

    function updateCart() {
        cartItems.innerHTML = "";

        cart.forEach((item, index) => {
            const li = document.createElement("li");
            li.textContent = `${item.name} - $${item.price.toLocaleString('es-AR', { minimumFractionDigits: 2 })}`;
            const removeButton = document.createElement("button");
            removeButton.textContent = "Eliminar";
            removeButton.onclick = () => removeFromCart(index);
            li.appendChild(removeButton);
            cartItems.appendChild(li);
        });

        const total = cart.reduce((sum, item) => sum + item.price, 0);
        cartTotal.textContent = `$${total.toLocaleString('es-AR', { minimumFractionDigits: 2 })}`;

        cartCount.textContent = cart.length;

        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            cart.push(product);
            updateCart();
        }
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCart();
    }

    document.querySelectorAll(".buy-button").forEach(button => {
        button.addEventListener("click", () => {
            const productId = parseInt(button.dataset.id);
            addToCart(productId);
        });
    });

    const modal = document.getElementById("cartModal");
    const closeModal = document.querySelector(".close");

    document.querySelector(".cart-icon").addEventListener("click", () => {
        modal.style.display = "block";
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", event => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    updateCart();
})();