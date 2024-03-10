const button = document.querySelector('#fetchbutton');
const quoteElement = document.getElementById('quote');
const imageElement = document.getElementById('image');
const sendButton = document.querySelector('.send');
const inputElement = document.getElementById('input');
const inputFilterElement = document.getElementById('input-f');
const filtroButton = document.getElementById('filtrob');

let currentCharacter = '';

window.onload = async function() {
    try {
        const data = await fetch('https://thesimpsonsquoteapi.glitch.me/quotes');
        const comments = await data.json();

        if (comments.length > 0) {
            const quote = comments[0].quote;
            const imageUrl = comments[0].image;
            const characterName = comments[0].character; 
            quoteElement.textContent = quote;
            imageElement.src = imageUrl;
            currentCharacter = characterName; 
            const nameElement = document.getElementById('name');
            nameElement.textContent = characterName; 
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
            const characterName = comments[0].character; 

            quoteElement.textContent = quote;
            imageElement.src = imageUrl;
            currentCharacter = characterName; 
            const nameElement = document.getElementById('name');
            nameElement.textContent = characterName; 
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
        const numFrases = parseInt(inputElement.value);

        const response = await fetch(`https://thesimpsonsquoteapi.glitch.me/quotes?count=${numFrases}&character=${currentCharacter}`);
        const data = await response.json();

        let commentsText = '';
        data.forEach((item, index) => {
            const numSecuencial = index + 1;
            commentsText += `<p>${numSecuencial}. ${item.quote}</p>`; 
        });

        quoteElement.innerHTML = commentsText; 
    } catch (error) {
        console.error('Error fetching data:', error);
        quoteElement.textContent = "Error al cargar los datos.";
    }
});

filtroButton.addEventListener('click', async () => {
    try {
        const characterName = inputFilterElement.value;

        const response = await fetch(`https://thesimpsonsquoteapi.glitch.me/quotes?character=${characterName}`);
        const data = await response.json();

        if (data.length > 0) {
            const quote = data[0].quote;
            const imageUrl = data[0].image;

            quoteElement.textContent = quote;
            imageElement.src = imageUrl;
            currentCharacter = characterName; 
            const nameElement = document.getElementById('name');
            nameElement.textContent = characterName; 
        } else {
            quoteElement.textContent = `No se encontraron frases para ${characterName}.`;
            imageElement.src = './../design/NOT FOUND.jpeg';
            const nameElement = document.getElementById('name');
            nameElement.textContent = ''; 
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        quoteElement.textContent = "Error al cargar los datos.";
    }
});
