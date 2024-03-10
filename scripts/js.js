const button = document.querySelector('#fetchbutton');
const quoteElement = document.getElementById('quote');
const imageElement = document.getElementById('image');
const sendButton = document.querySelector('.send');
const inputElement = document.getElementById('input');

// Variable para almacenar el nombre del personaje actualmente mostrado en la imagen
let currentCharacter = '';

// Espera a que la ventana esté completamente cargada
window.onload = async function() {
    try {
        // Realizar la solicitud fetch para obtener la cita y la imagen
        const data = await fetch('https://thesimpsonsquoteapi.glitch.me/quotes');
        const comments = await data.json();

        if (comments.length > 0) {
            const quote = comments[0].quote;
            const imageUrl = comments[0].image;
            const characterName = comments[0].character; // Obtener el nombre del personaje actualmente mostrado

            // Actualizar los elementos HTML con la cita, la imagen y el nombre del personaje obtenidos
            quoteElement.textContent = quote;
            imageElement.src = imageUrl;
            currentCharacter = characterName; // Guardar el nombre del personaje
            const nameElement = document.getElementById('name');
            nameElement.textContent = characterName; // Actualizar el elemento HTML con el nombre del personaje
        } else {
            console.error('No se encontraron citas.');
        }
    } catch (error) {
        console.error('Error fetching quote:', error);
    }
};

button.addEventListener('click', async () => {
    try {
        const data = await fetch('https://thesimpsonsquoteapi.glitch.me/quotes');
        const comments = await data.json();

        if (comments.length > 0) {
            const quote = comments[0].quote;
            const imageUrl = comments[0].image;
            const characterName = comments[0].character; // Obtener el nombre del nuevo personaje

            quoteElement.textContent = quote;
            imageElement.src = imageUrl;
            currentCharacter = characterName; // Guardar el nombre del nuevo personaje
            const nameElement = document.getElementById('name');
            nameElement.textContent = characterName; // Actualizar el elemento HTML con el nombre del personaje
        } else {
            quoteElement.textContent = "No se encontraron citas.";
        }
    } catch (error) {
        console.error('Error fetching quote:', error);
        quoteElement.textContent = "Error al cargar la cita.";
    }
});

sendButton.addEventListener('click', async () => {
    try {
        // Obtener el número ingresado por el usuario
        const numFrases = parseInt(inputElement.value);

        // Realizar la solicitud fetch para obtener las frases del personaje actual
        const response = await fetch(`https://thesimpsonsquoteapi.glitch.me/quotes?count=${numFrases}&character=${currentCharacter}`);
        const data = await response.json();

        // Construir una cadena que contenga todos los comentarios con números secuenciales
        let commentsText = '';
        data.forEach((item, index) => {
            const numSecuencial = index + 1;
            commentsText += `<p>${numSecuencial}. ${item.quote}</p>`; // Agregar etiquetas <p> alrededor de cada frase
        });

        // Mostrar los comentarios en el elemento <p>
        quoteElement.innerHTML = commentsText; // Usar innerHTML para renderizar las etiquetas HTML
    } catch (error) {
        console.error('Error fetching data:', error);
        quoteElement.textContent = "Error al cargar los datos.";
    }
});
