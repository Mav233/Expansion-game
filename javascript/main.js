//SIMULADOR DE CUOTAS, PARA INCORPORAR EN FUTURO CARRO COMPRAS.

// function normalizarMonto(input) {
//     const montoLimpio = input.replace(/\./g, "").replace(/,/g, ".");
//     const montoNumerico = parseFloat(montoLimpio);
//     if (isNaN(montoNumerico)) {
//         alert("El monto ingresado no es válido. Asegúrese de usar números.");
//         return null;
//     }
//     return montoNumerico;
// }

// function calcularCuotasConInteres(monto, cuotas, interes) {
//     const montoFinal = monto * (1 + interes / 100);
//     const cuotaMensual = montoFinal / cuotas;
//     return cuotaMensual.toFixed(2);
// }

// function simuladorDeCuotas() {
//     let continuar = true;

//     while (continuar) {
//         const montoIngresado = prompt("Ingrese el monto del producto (puede incluir puntos y comas para el formato):");
//         if (!montoIngresado) {
//             alert("Debe ingresar un monto válido para continuar.");
//             continue;
//         }

//         const monto = normalizarMonto(montoIngresado);
//         if (monto === null) continue;

//         const banco = prompt(
//             "Seleccione un banco ingresando su número:\n" +
//             "1. Banco Macro (3% interés)\n" +
//             "2. Banco Santander (5% interés)\n" +
//             "3. Banco Galicia (0% interés hasta el 31/02/2025)"
//         );

//         let interes;
//         switch (banco) {
//             case "1":
//                 interes = 3;
//                 break;
//             case "2":
//                 interes = 5;
//                 break;
//             case "3":
//                 const hoy = new Date();
//                 const fechaVigencia = new Date(2025, 1, 31);
//                 interes = hoy <= fechaVigencia ? 0 : 10;
//                 break;
//             default:
//                 alert("Banco no válido. Intente de nuevo.");
//                 continue;
//         }

//         const cuotas = parseInt(prompt("Ingrese el número de cuotas (3, 6 o 12 meses):"));
//         if (![3, 6, 12].includes(cuotas)) {
//             alert("Por favor, seleccione un número de cuotas válido (3, 6 o 12).");
//             continue;
//         }

//         const cuotaMensual = calcularCuotasConInteres(monto, cuotas, interes);
//         alert(
//             `Banco seleccionado: ${banco === "1" ? "Macro" : banco === "2" ? "Santander" : "Galicia"}\n` +
//             `Monto total: $${monto.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n` +
//             `Interés aplicado: ${interes}%\n` +
//             `Número de cuotas: ${cuotas}\n` +
//             `Cuota mensual: $${parseFloat(cuotaMensual).toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
//         );

//         const otraConsulta = prompt("¿Desea calcular otra cuota? (Ingrese 'si' para continuar o cualquier otra tecla para salir):").toLowerCase();
//         continuar = otraConsulta === "si";
//     }
// }

// simuladorDeCuotas();



// Segunda Pre-Entrega javascript
const productos = [
    { id: 1, nombre: "Procesador Intel i5", precio: 200 },
    { id: 2, nombre: "Memoria RAM 16GB", precio: 100 },
    { id: 3, nombre: "Disco SSD 1TB", precio: 150 },
    { id: 4, nombre: "Placa Madre ASUS", precio: 120 },
    { id: 5, nombre: "Tarjeta Gráfica NVIDIA", precio: 400 },
];

class Carrito {
    constructor() {
    this.items = [];
    }

    agregarProducto(idProducto, cantidad = 1) {
    const producto = productos.find((prod) => prod.id === idProducto);
    if (producto) {
        const itemExistente = this.items.find((item) => item.id === idProducto);
        if (itemExistente) {
        itemExistente.cantidad += cantidad;
        } else {
        this.items.push({ ...producto, cantidad });
        }
    } else {
        alert("Producto no encontrado.");
    }
    }

    eliminarProducto(idProducto) {
    this.items = this.items.filter((item) => item.id !== idProducto);
    }

    calcularTotal() {
      return this.items.reduce((total, item) => total + item.precio * item.cantidad, 0);
    }

    mostrarCarrito() {
    if (this.items.length === 0) {
        alert("El carrito está vacío.");
    } else {
        let mensaje = "Contenido del carrito:\n";
        this.items.forEach((item) => {
          mensaje += `- ${item.nombre} x${item.cantidad}: $${item.precio * item.cantidad}\n`;
        });
        mensaje += `Total: $${this.calcularTotal()}`;
        alert(mensaje);
        const opcionCompra = prompt("Desea realizar la compra ahora con envío gratis? (s/n)");
        if (opcionCompra.toLowerCase() === "s") {
        alert("Su compra está en camino. Gracias por su preferencia.");
        this.vaciarCarrito();
        } else {
        const continuarComprando = prompt("Desea seguir comprando para completar su pedido? (s/n)");
        if (continuarComprando.toLowerCase() !== "s") {
            alert("Gracias por visitar nuestra tienda.");
            this.vaciarCarrito();
        }
        }
    }
    }
    vaciarCarrito() {
    this.items = [];
    }
    mostrarProductos() {
    const mensaje = productos.map((prod) => `${prod.id}. ${prod.nombre} - $${prod.precio}`).join("\n");
    alert(`Productos disponibles:\n${mensaje}`);
    }
}

const miCarrito = new Carrito();
let continuar = true;
while (continuar) {
    const opcion = prompt("Seleccione una opción:\n1. Mostrar productos\n2. Agregar producto\n3. Eliminar producto\n4. Mostrar carrito\n5. Vaciar carrito\n6. Salir");
    switch (opcion) {
    case "1":
        miCarrito.mostrarProductos();
        break;
    case "2":
        miCarrito.mostrarProductos();
        const idProducto = parseInt(prompt("Ingrese el ID del producto a agregar:"));
        const cantidad = parseInt(prompt("Ingrese la cantidad:"));
        miCarrito.agregarProducto(idProducto, cantidad);
        break;
    case "3":
        const idEliminar = parseInt(prompt("Ingrese el ID del producto a eliminar:"));
        miCarrito.eliminarProducto(idEliminar);
        break;
    case "4":
        miCarrito.mostrarCarrito();
        break;
    case "5":
        miCarrito.vaciarCarrito();
        alert("El carrito ha sido vaciado.");
        break;
    case "6":
        continuar = false;
        alert("Gracias por usar el carrito de compras.");
        break;
    default:
        alert("Opción no válida, intente de nuevo.");
    }
}