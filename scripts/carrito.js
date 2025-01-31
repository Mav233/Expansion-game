import { products } from "./products.js";

document.addEventListener("DOMContentLoaded", async () => {
    const discountPercentage = 20;
    const flashSaleDuration = 60 * 60 * 2; // Duración de la oferta en segundos (2 horas)
    let flashSaleEndTime = localStorage.getItem("flashSaleEndTime");

    if (!flashSaleEndTime || Date.now() > flashSaleEndTime) {
        flashSaleEndTime = Date.now() + flashSaleDuration * 1000;
        localStorage.setItem("flashSaleEndTime", flashSaleEndTime);
    }

    function isFlashSaleActive() {
        return Date.now() < flashSaleEndTime;
    }

    // Aplicar el descuento a los productos
    function applyFlashSale() {
        document.querySelectorAll(".custom-card").forEach((card) => {
            const priceElement = card.querySelector(".price");
            const buyButton = card.querySelector(".buy-button");

            if (priceElement && buyButton) {
                let originalPrice = parseFloat(priceElement.textContent.replace(/[^0-9,]/g, "").replace(",", "."));
                let discountedPrice = (originalPrice * (1 - discountPercentage / 100)).toFixed(2);

                if (isFlashSaleActive()) {
                    priceElement.innerHTML = `
                        <span class="original-price" style="text-decoration: line-through; color: red;">$${originalPrice.toLocaleString("es-AR", { minimumFractionDigits: 2 })}</span> 
                        <span class="discounted-price" style="font-weight: bold;">$${discountedPrice.toLocaleString("es-AR", { minimumFractionDigits: 2 })}</span> 
                        <span class="discount-percentage" style="color: green;">-${discountPercentage}%</span>`;
                    buyButton.dataset.price = discountedPrice;
                } else {
                    priceElement.textContent = `$${originalPrice.toLocaleString("es-AR", { minimumFractionDigits: 2 })}`;
                    buyButton.dataset.price = originalPrice;
                }

                if (!card.querySelector(".flash-sale-timer-container")) {
                    const timerContainer = document.createElement("div");
                    timerContainer.classList.add("flash-sale-timer-container");

                    const timerMessage = document.createElement("span");
                    timerMessage.classList.add("flash-sale-message");

                    const timerBarContainer = document.createElement("div");
                    timerBarContainer.classList.add("flash-sale-timer-bar-container");

                    const timerBar = document.createElement("div");
                    timerBar.classList.add("flash-sale-timer");
                    timerBarContainer.appendChild(timerBar);
                    timerContainer.appendChild(timerMessage);
                    timerContainer.appendChild(timerBarContainer);

                    card.appendChild(timerContainer);

                    startCountdown(flashSaleEndTime, timerBar, timerMessage);
                }
            }
        });
    }

    function startCountdown(endTime, barElement, messageElement) {
        function updateTimer() {
            let timeLeft = Math.max(0, endTime - Date.now());
            let percentage = (timeLeft / (flashSaleDuration * 1000)) * 100;
            barElement.style.width = `${percentage}%`;

            let hours = Math.floor(timeLeft / 3600000);
            let minutes = Math.floor((timeLeft % 3600000) / 60000);
            let seconds = Math.floor((timeLeft % 60000) / 1000);

            messageElement.textContent = `La oferta termina en: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

            if (timeLeft > 0) {
                requestAnimationFrame(updateTimer);
            } else {
                barElement.style.backgroundColor = "#ff4d4d";
                messageElement.textContent = "¡La oferta ha terminado!";
                localStorage.removeItem("flashSaleEndTime"); // Limpiar localStorage
                applyFlashSale(); // Actualizar precios cuando la oferta expire
            }
        }

        updateTimer();
    }

    // Aplicar la oferta flash al cargar la página
    applyFlashSale();

    // FUNCIONES PARA EL CARRITO
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCart() {
        const cartItems = document.getElementById("cartItems");
        const cartTotal = document.getElementById("cartTotal");
        const cartCount = document.querySelector(".cart-count");

        cartItems.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            const li = document.createElement("li");
            li.textContent = `${item.name} - $${item.price.toLocaleString("es-AR", { minimumFractionDigits: 2 })} (Cantidad: ${item.quantity})`;

            const removeButton = document.createElement("button");
            removeButton.textContent = "Eliminar";
            removeButton.onclick = () => removeFromCart(index);
            li.appendChild(removeButton);
            cartItems.appendChild(li);

            total += item.price * item.quantity;
        });

        cartTotal.textContent = `$${total.toLocaleString("es-AR", { minimumFractionDigits: 2 })}`;
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Agregar un producto al carrito
    function addToCart(productId) {
        const product = products.find((p) => p.id === productId);
        if (product) {
            const discountedPrice = isFlashSaleActive()
                ? (product.price * (1 - discountPercentage / 100)).toFixed(2)
                : product.price;

            const cartItem = {
                id: product.id,
                name: product.name,
                price: parseFloat(discountedPrice),
                quantity: 1, // Inicializar la cantidad en 1
            };

            const existingItemIndex = cart.findIndex((item) => item.id === product.id);
            if (existingItemIndex !== -1) {
                cart[existingItemIndex].quantity += 1;
            } else {
                cart.push(cartItem);
            }

            updateCart();
            showProductAlert(product, discountedPrice);
        }
    }

    // Alerta de producto añadido
    function showProductAlert(product, discountedPrice) {
        const originalPrice = product.price.toLocaleString("es-AR", { minimumFractionDigits: 2 });
        const finalPrice = parseFloat(discountedPrice).toLocaleString("es-AR", { minimumFractionDigits: 2 });

        Swal.fire({
            title: `<span style="color: #03e9f5;">Producto agregado</span>`,
            html: `
            <p style="color: #ffffff; font-size: 1rem;">
                Has añadido <strong style="color: #00ffff;">${product.name}</strong> al carrito por <strong style="color: #a6f6f1;">$${finalPrice}</strong>.<br>
                <span style="text-decoration: line-through; color: red;">Precio original: $${originalPrice}</span><br>
                <span style="color: green;">Descuento: -${discountPercentage}%</span><br>
                <span>Cantidad: 1</span>
            </p>
        `,
            icon: 'success',
            iconColor: '#00ffff',
            customClass: {
                popup: 'cyberpunk-popup',
                confirmButton: 'cyberpunk-button'
            },
            backdrop: 'rgba(0, 0, 0, 0.8)',
            confirmButtonText: 'Continuar',
            showCancelButton: true,
            cancelButtonText: "Ver carrito",
            timer: 3500,
            timerProgressBar: true
        }).then(result => {
            if (result.dismiss === Swal.DismissReason.cancel) {
                openCartModal();
            }
        });
    }

    // Abrir el modal del carrito
    function openCartModal() {
        const cartModal = document.getElementById("cartModal");
        if (cartModal) {
            cartModal.style.display = "block";
        }
    }

    // Cerrar el modal del carrito
    function closeCartModal() {
        const cartModal = document.getElementById("cartModal");
        if (cartModal) {
            cartModal.style.display = "none";
        }
    }

    document.querySelector(".cart-icon").addEventListener("click", openCartModal);
    document.querySelector(".close").addEventListener("click", closeCartModal);
    window.addEventListener("click", (event) => {
        const cartModal = document.getElementById("cartModal");
        if (event.target === cartModal) {
            closeCartModal();
        }
    });

    // Eliminar un producto del carrito
    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCart();
    }

    document.querySelectorAll(".buy-button").forEach((button) => {
        button.addEventListener("click", () => {
            const productId = parseInt(button.dataset.id);
            addToCart(productId);
        });
    });

    // Actualizar precios en el carrito cuando cambia la oferta
    function updateCartPrices() {
        const isSaleActive = isFlashSaleActive();
        cart = cart.map((item) => {
            const product = products.find((p) => p.id === item.id);
            if (product) {
                const newPrice = isSaleActive
                    ? (product.price * (1 - discountPercentage / 100)).toFixed(2)
                    : product.price;
                return { ...item, price: parseFloat(newPrice) };
            }
            return item;
        });

        updateCart();
    }

    setInterval(updateCartPrices, 10000);

    updateCart();
});