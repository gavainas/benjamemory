

// script.js
const cards = [
    'menorah.png',
    'menorah.png',
    'dreidel.png',
    'dreidel.png',
    'torah.png',
    'torah.png',
    'kippah.png',
    'kippah.png',
    'shofar.png',
    'shofar.png',
    'challah.png',
    'challah.png',
    'mezuzah.png',
    'mezuzah.png',
    'dead_sea.png',   // Añade la nueva imagen
    'dead_sea.png',    // Añade la nueva imagen
    'Matzah.png',
    'Matzah.png',
    'manzana_con_miel.png',
    'manzana_con_miel.png'

];

let firstCard = null;
let secondCard = null;
let matchedPairs = 0;
let lockBoard = false; // Variable para bloquear el tablero mientras se están revisando cartas

function createBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = ''; // Limpiar el tablero antes de crear nuevas cartas
    const shuffledCards = cards.sort(() => 0.5 - Math.random());

    shuffledCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.card = card;

        const imgElement = document.createElement('img');
        imgElement.src = `images/${card}`;
        cardElement.appendChild(imgElement);

        cardElement.addEventListener('click', flipCard);

        gameBoard.appendChild(cardElement);
    });
}

function flipCard() {
    if (lockBoard) return; // Bloquear el tablero si ya hay dos cartas volteadas
    if (this === firstCard) return; // Evitar que se haga clic en la misma carta dos veces

    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true; // Bloquear el tablero

    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.card === secondCard.dataset.card;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetCards();
    matchedPairs++;
    if (matchedPairs === cards.length / 2) {
        setTimeout(() => alert('¡Ganaste!'), 500);
    }
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetCards();
    }, 1000);
}

function resetCards() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false; // Desbloquear el tablero
}

document.getElementById('reset-button').addEventListener('click', resetGame);

function resetGame() {
    matchedPairs = 0;
    createBoard();
}

createBoard();

