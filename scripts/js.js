const button = document.querySelector('#fetchbutton');
const quoteElement = document.getElementById('quote');
const imageElement = document.getElementById('image');

button.addEventListener('click', async () => {
    try {
        const data = await fetch('https://thesimpsonsquoteapi.glitch.me/quotes');
        const comments = await data.json();

        if (comments.length > 0) {
            const quote = comments[0].quote;
            const imageUrl = comments[0].image;

            quoteElement.textContent = quote;
            imageElement.src = imageUrl;
        } else {
            quoteElement.textContent = "No se encontraron citas.";
        }
    } catch (error) {
        console.error('Error fetching quote:', error);
        quoteElement.textContent = "Error al cargar la cita.";
    }
});
