(() => {
    const checkoutCart = document.getElementById("checkoutCart");
    const checkoutTotal = document.getElementById("checkoutTotal");

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    function loadCheckoutCart() {
        checkoutCart.innerHTML = "";
        let total = 0;

        cart.forEach(item => {
            const li = document.createElement("li");
            li.textContent = `${item.name} - $${item.price.toLocaleString('es-AR', { minimumFractionDigits: 2 })}`;
            checkoutCart.appendChild(li);
            total += item.price;
        });

        checkoutTotal.textContent = `$${total.toLocaleString('es-AR', { minimumFractionDigits: 2 })}`;
    }

    loadCheckoutCart();
})();


document.addEventListener("DOMContentLoaded", () => {
    const checkoutCart = document.getElementById("checkoutCart");
    const checkoutTotal = document.getElementById("checkoutTotal");
    const checkoutItemCount = document.getElementById("checkoutItemCount");

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCheckoutSummary() {
        checkoutCart.innerHTML = "";

        let total = 0;
        cart.forEach(item => {
            total += item.price;

            const li = document.createElement("li");
            li.className = "list-group-item d-flex justify-content-between lh-sm";
            li.innerHTML = `
                <div>
                    <h6 class="my-0">${item.name}</h6>
                    <small class="text-muted">Cantidad: 1</small>
                </div>
                <span class="text-muted">$${item.price.toLocaleString('es-AR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}</span>
            `;
            checkoutCart.appendChild(li);
        });

        checkoutTotal.textContent = `$${total.toLocaleString('es-AR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`;

        checkoutItemCount.textContent = cart.length;
    }

    updateCheckoutSummary();
});

