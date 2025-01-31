async function obtenerCotizaciones() {
    try {
        const [blueResponse, criptoResponse] = await Promise.all([
            fetch('https://dolarapi.com/v1/dolares/blue'),
            fetch('https://dolarapi.com/v1/dolares/cripto')
        ]);

        const blueData = await blueResponse.json();
        const criptoData = await criptoResponse.json();

        if (blueData && blueData.venta && blueData.compra) {
            document.getElementById('dolar-blue').innerHTML = `
                <strong>Compra:</strong> $${blueData.compra.toFixed(2)}<br>
                <strong>Venta:</strong> $${blueData.venta.toFixed(2)}
            `;
        } else {
            document.getElementById('dolar-blue').innerText = "Error al obtener el dólar blue.";
        }

        if (criptoData && criptoData.venta && criptoData.compra) {
            document.getElementById('dolar-cripto').innerHTML = `
                <strong>Compra:</strong> $${criptoData.compra.toFixed(2)}<br>
                <strong>Venta:</strong> $${criptoData.venta.toFixed(2)}
            `;
        } else {
            document.getElementById('dolar-cripto').innerText = "Error al obtener el dólar cripto.";
        }
    } catch (error) {
        console.error('Error al obtener las cotizaciones:', error);
        document.getElementById('dolar-blue').innerText = "No se pudo cargar la cotización.";
        document.getElementById('dolar-cripto').innerText = "No se pudo cargar la cotización.";
    }
}

document.addEventListener("DOMContentLoaded", obtenerCotizaciones);