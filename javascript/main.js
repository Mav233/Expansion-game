//SIMULADOR DE CUOTAS, PARA INCORPORAR EN FUTURO CARRO COMPRAS.

function normalizarMonto(input) {
    const montoLimpio = input.replace(/\./g, "").replace(/,/g, ".");
    const montoNumerico = parseFloat(montoLimpio);
    if (isNaN(montoNumerico)) {
        alert("El monto ingresado no es válido. Asegúrese de usar números.");
        return null;
    }
    return montoNumerico;
}

function calcularCuotasConInteres(monto, cuotas, interes) {
    const montoFinal = monto * (1 + interes / 100);
    const cuotaMensual = montoFinal / cuotas;
    return cuotaMensual.toFixed(2);
}

function simuladorDeCuotas() {
    let continuar = true;

    while (continuar) {
        const montoIngresado = prompt("Ingrese el monto del producto (puede incluir puntos y comas para el formato):");
        if (!montoIngresado) {
            alert("Debe ingresar un monto válido para continuar.");
            continue;
        }

        const monto = normalizarMonto(montoIngresado);
        if (monto === null) continue;

        const banco = prompt(
            "Seleccione un banco ingresando su número:\n" +
            "1. Banco Macro (3% interés)\n" +
            "2. Banco Santander (5% interés)\n" +
            "3. Banco Galicia (0% interés hasta el 31/02/2025)"
        );

        let interes;
        switch (banco) {
            case "1":
                interes = 3;
                break;
            case "2":
                interes = 5;
                break;
            case "3":
                const hoy = new Date();
                const fechaVigencia = new Date(2025, 1, 31);
                interes = hoy <= fechaVigencia ? 0 : 10;
                break;
            default:
                alert("Banco no válido. Intente de nuevo.");
                continue;
        }

        const cuotas = parseInt(prompt("Ingrese el número de cuotas (3, 6 o 12 meses):"));
        if (![3, 6, 12].includes(cuotas)) {
            alert("Por favor, seleccione un número de cuotas válido (3, 6 o 12).");
            continue;
        }

        const cuotaMensual = calcularCuotasConInteres(monto, cuotas, interes);
        alert(
            `Banco seleccionado: ${banco === "1" ? "Macro" : banco === "2" ? "Santander" : "Galicia"}\n` +
            `Monto total: $${monto.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n` +
            `Interés aplicado: ${interes}%\n` +
            `Número de cuotas: ${cuotas}\n` +
            `Cuota mensual: $${parseFloat(cuotaMensual).toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        );

        const otraConsulta = prompt("¿Desea calcular otra cuota? (Ingrese 'si' para continuar o cualquier otra tecla para salir):").toLowerCase();
        continuar = otraConsulta === "si";
    }
}

simuladorDeCuotas();