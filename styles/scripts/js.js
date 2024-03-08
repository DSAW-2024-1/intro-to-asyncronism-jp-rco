async function fetchData() {
    try {
        const response = await fetch('https://thesimpsonsquoteapi.glitch.me/quotes');
        const data = await response.json();

        const quoteElement = document.getElementById('quote');
        quoteElement.textContent = data[0].quote;

        const imageElement = document.getElementById('image');
        imageElement.src = data[0].image;
    } catch (error) {
        console.error('Error fetching quote:', error);
    }
}

// Llamar a la función fetchData cuando la página esté completamente cargada
window.addEventListener('load', fetchData);