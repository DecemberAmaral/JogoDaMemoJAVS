const cardsArray = [
    { name: 'besta', img: 'ben10/besta.png' },
    { name: 'fantasmático', img: 'ben10/fantasmatico.png' },
    { name: 'gordo metalurgico', img: 'ben10/gordoMetalurgico.png' },
    { name: 'quatro braços', img: 'ben10/quatrobracos.png' },
    { name: 'paralelepípedo', img: 'ben10/paralelepipedo.png' },
    { name: 'xlr8', img: 'ben10/xlr8.png' }
];

let gameGrid = cardsArray.concat(cardsArray).sort(() => 0.5 - Math.random());
let firstCard = null;
let secondCard = null;
let lockBoard = false;

function createBoard() {
    const gameBoard = document.getElementById('game-board');
    gameGrid.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.name = card.name;

        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        cardFront.innerHTML = '<img src="ben10/omnitrix.png" alt="Omnitrix">';

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        cardBack.style.backgroundImage = `url(${card.img})`;

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        cardElement.appendChild(cardInner);

        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

createBoard();