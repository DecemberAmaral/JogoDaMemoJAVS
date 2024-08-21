const cardsArray = [
    { name: 'besta', img: 'ben10/besta.png' },
    { name: 'fantasmatico', img: 'ben10/fantasmatico.png' },
    { name: 'gordoMetalurgico', img: 'ben10/gordoMetalurgico.png' },
    { name: 'macacoAranha', img: 'ben10/macacoAranha.png' },
    { name: 'paralelepipedo', img: 'ben10/paralelepipedo.png' },
    { name: 'xlr8', img: 'ben10/xlr8.png' }
];

let gameGrid = [...cardsArray, ...cardsArray].sort(() => 0.5 - Math.random());
let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;
let delay = 1200;

const game = document.querySelector('.memory-game');

gameGrid.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('memory-card');
    card.dataset.name = item.name;

    const frontFace = document.createElement('div');
    frontFace.classList.add('front-face');

    const backFace = document.createElement('div');
    backFace.classList.add('back-face');
    backFace.style.backgroundImage = `url(${item.img})`;

    game.appendChild(card);
    card.appendChild(frontFace);
    card.appendChild(backFace);
});

function match() {
    const selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
        card.classList.add('match');
    });
}

function resetGuesses() {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;

    const selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
        card.classList.remove('selected');
        card.classList.remove('flip');
    });
}

game.addEventListener('click', event => {
    const clicked = event.target;

    if (
        clicked.nodeName === 'SECTION' ||
        clicked === previousTarget ||
        clicked.parentNode.classList.contains('selected') ||
        clicked.parentNode.classList.contains('match')
    ) {
        return;
    }

    if (count < 2) {
        count++;
        if (count === 1) {
            firstGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
            clicked.parentNode.classList.add('flip');
        } else {
            secondGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
            clicked.parentNode.classList.add('flip');
            
            // Verificar se as cartas são iguais
            if (firstGuess === secondGuess) {
                setTimeout(() => {
                    match();
                    resetGuesses();
                }, delay);
            } else {
                setTimeout(resetGuesses, delay);
            }
        }
        previousTarget = clicked;
    }
});

function resetGame() {
    const cards = document.querySelectorAll('.memory-card');
    cards.forEach(card => {
        card.classList.remove('match', 'selected', 'flip');
    });

    gameGrid = [...cardsArray, ...cardsArray].sort(() => 0.5 - Math.random());

    const backFaces = document.querySelectorAll('.back-face');
    backFaces.forEach((backFace, index) => {
        backFace.style.backgroundImage = `url(${gameGrid[index].img})`;
    });

    resetGuesses();
}