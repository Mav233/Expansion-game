import { products } from "./products.js";

export function initProductAlerts() {
    document.querySelectorAll(".buy-button").forEach(button => {
        button.addEventListener("click", () => {
            const productId = parseInt(button.dataset.id);
            const product = products.find(p => p.id === productId);

            if (product) {
                Swal.fire({
                    title: "¡Producto añadido al carrito!",
                    html: `
                        <strong>${product.name}</strong> ha sido añadido al carrito.<br>
                        Precio: <strong>$${product.price.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</strong>
                    `,
                    icon: "success",
                    confirmButtonText: "Aceptar",
                    showCancelButton: true,
                    cancelButtonText: "Ver carrito",
                    background: "#f5f5f5",
                    color: "#333",
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                }).then(result => {
                    if (result.dismiss === Swal.DismissReason.cancel) {
                        const cartModal = document.getElementById("cartModal");
                        cartModal.style.display = "block";
                    }
                });
            }
        });
    });
}