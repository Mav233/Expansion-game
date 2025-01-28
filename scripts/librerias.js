// SWEETALERT2
const buyButtons = document.querySelectorAll('.buy-button');

buyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.card');
        const productName = card.querySelector('.card-title').textContent;
        const productPrice = card.querySelector('.price').textContent;

        Swal.fire({
            title: `<span style="color: #03e9f5;">Producto agregado</span>`,
            html: `<p style="color: #ffffff; font-size: 1rem;">Has añadido <strong style="color: #00ffff;">${productName}</strong> al carrito por <strong style="color: #a6f6f1;">${productPrice}</strong>.</p>`,
            icon: 'success',
            iconColor: '#00ffff',
            customClass: {
                popup: 'cyberpunk-popup',
                confirmButton: 'cyberpunk-button'
            },
            backdrop: 'rgba(0, 0, 0, 0.8)',
            confirmButtonText: 'Continuar',
            timer: 3500,
            timerProgressBar: true
        });
    });
});

function showEmptyCartAlert() {
    Swal.fire({
        title: `<span style="color: #ffcc00;">Carrito vacío</span>`,
        html: `<p style="color: #ffffff; font-size: 1rem;">No puedes realizar un pedido sin productos en el carrito.</p>`,
        icon: 'warning',
        iconColor: '#ffcc00',
        customClass: {
            popup: 'cyberpunk-popup',
            confirmButton: 'cyberpunk-button'
        },
        backdrop: 'rgba(0, 0, 0, 0.8)',
        confirmButtonText: 'Continuar',
        timer: 3500,
        timerProgressBar: true
    });
}

function showOrderPlacedAlert() {
    Swal.fire({
        title: `<span style="color: #03e9f5;">¡Pedido realizado!</span>`,
        html: `<p style="color: #ffffff; font-size: 1rem;">Gracias por tu compra. Recibirás un correo con los detalles del pedido.</p>`,
        icon: 'success',
        iconColor: '#00ffff',
        customClass: {
            popup: 'cyberpunk-popup',
            confirmButton: 'cyberpunk-button'
        },
        backdrop: 'rgba(0, 0, 0, 0.8)',
        confirmButtonText: 'Continuar',
        timer: 3500,
        timerProgressBar: true
    });
}

// LUXON
(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const orderHistory = JSON.parse(localStorage.getItem("orderHistory")) || [];
    const orderHistoryContainer = document.getElementById("orderHistoryContainer");
    const cartContainer = document.getElementById("checkoutCart");
    const checkoutItemCount = document.getElementById("checkoutItemCount");
    const checkoutTotal = document.getElementById("checkoutTotal");

    function saveOrderHistory() {
        const now = luxon.DateTime.now().toISO();
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        const items = cart.map(item => ({ name: item.name, price: item.price }));

        const newOrder = { date: now, items, total };
        orderHistory.push(newOrder);
        localStorage.setItem("orderHistory", JSON.stringify(orderHistory));
    }

    function clearCart() {
        cart.length = 0;
        localStorage.setItem("cart", JSON.stringify(cart));
        cartContainer.innerHTML = "";
        checkoutItemCount.textContent = "0";
        checkoutTotal.textContent = "$0.00";
    }

    function loadOrderHistory() {
        orderHistoryContainer.innerHTML = "";

        if (orderHistory.length === 0) {
            orderHistoryContainer.innerHTML = "<p>No tienes pedidos realizados aún.</p>";
            return;
        }

        orderHistory.forEach((order, index) => {
            const date = luxon.DateTime.fromISO(order.date, { zone: "local" }).toLocaleString(luxon.DateTime.DATETIME_MED);
            const items = order.items
                .map(item => `<li>${item.name} - $${item.price.toLocaleString("es-AR", { minimumFractionDigits: 2 })}</li>`)
                .join("");
            const total = `$${order.total.toLocaleString("es-AR", { minimumFractionDigits: 2 })}`;

            const orderCard = document.createElement("div");
            orderCard.className = "order-card";
            orderCard.innerHTML = `
                <h4>Pedido #${index + 1}</h4>
                <p><strong>Fecha:</strong> ${date}</p>
                <ul>${items}</ul>
                <p><strong>Total:</strong> ${total}</p>
            `;
            orderHistoryContainer.appendChild(orderCard);
        });
    }

    const submitButton = document.querySelector(".btn-submit");
    submitButton.addEventListener("click", (e) => {
        e.preventDefault();

        if (cart.length === 0) {
            showEmptyCartAlert();
            return;
        }

        saveOrderHistory();
        showOrderPlacedAlert();
        clearCart();
        loadOrderHistory();
    });

    document.addEventListener("DOMContentLoaded", () => {
        loadOrderHistory();
    });
})();