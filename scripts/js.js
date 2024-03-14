const button = document.querySelector('#fetchbutton');
const quoteElement = document.getElementById('quote');
const imageElement = document.getElementById('image');
const sendButton = document.querySelector('.send');
const inputElement = document.getElementById('input');
const inputFilterElement = document.getElementById('input-f');
const filtroButton = document.getElementById('filtrob');
const secondErrorMessage = document.getElementById('secondErrorMessage');
const ThirdErrorMessage = document.getElementById('ThirdErrorMessage');

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

// Función para borrar el contenido de los inputs
function clearInputs() {
    inputElement.value = ''; // Limpiar input
    inputFilterElement.value = ''; // Limpiar input-f
}

// Agregar evento click a los botones para limpiar los inputs después de ejecutar el comando
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
    clearInputs(); // Limpiar inputs después de ejecutar el comando
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
    clearInputs(); // Limpiar inputs después de ejecutar el comando
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
    clearInputs(); // Limpiar inputs después de ejecutar el comando
});

document.addEventListener('DOMContentLoaded', function() {
    const secondInput = document.getElementById('input');

    secondInput.addEventListener('input', function() {
        const inputValue = secondInput.value.trim();
        if (isNaN(inputValue)) {
            secondErrorMessage.textContent = 'La entrada debe ser un número';
            secondErrorMessage.style.display = 'block';
            secondInput.style.backgroundColor = '#ffece4';
            secondInput.style.borderColor = 'hsl(4, 100%, 67%)';
            secondInput.style.color = 'hsl(4, 100%, 67%)';
        } else {
            secondErrorMessage.textContent = '';
            secondErrorMessage.style.display = 'none';
            secondInput.style.backgroundColor = '';
            secondInput.style.borderColor = '';
            secondInput.style.color = '';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const ThirdInput = document.getElementById('input-f');
  
    ThirdInput.addEventListener('input', function() {
        const thirdInputValue = ThirdInput.value.trim();
        const lettersRegex = /^[a-zA-Z\s]*$/; // Expresión regular para validar letras y espacios
        
        if (!lettersRegex.test(thirdInputValue)) {
            ThirdErrorMessage.textContent = 'La entrada debe contener solo letras';
            ThirdErrorMessage.style.display = 'block';
            ThirdInput.style.backgroundColor = '#ffece4';
            ThirdInput.style.borderColor = 'hsl(4, 100%, 67%)';
            ThirdInput.style.color = 'hsl(4, 100%, 67%)';
        } else {
            ThirdErrorMessage.textContent = '';
            ThirdErrorMessage.style.display = 'none';
            ThirdInput.style.backgroundColor = '';
            ThirdInput.style.borderColor = '';
            ThirdInput.style.color = '';
        }
    });
});
