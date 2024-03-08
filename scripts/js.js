// Espera a que la ventana esté completamente cargada
window.onload = async function() {
    try {
        // Realizar la solicitud fetch para obtener la cita y la imagen
        const data = await fetch('https://thesimpsonsquoteapi.glitch.me/quotes');
        const comments = await data.json();

        if (comments.length > 0) {
            const quote = comments[0].quote;
            const imageUrl = comments[0].image;

            // Actualizar los elementos HTML con la cita y la imagen obtenidas
            const quoteElement = document.getElementById('quote');
            quoteElement.textContent = quote;

            const imageElement = document.getElementById('image');
            imageElement.src = imageUrl;
        } else {
            console.error('No se encontraron citas.');
        }
    } catch (error) {
        console.error('Error fetching quote:', error);
    }
};
