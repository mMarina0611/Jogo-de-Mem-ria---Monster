const cardImages = [
  'monster-green.png',
  'monster-red.png',
  'monster-blue.png',
  'monster-white.png',
  'monster-yellow.png',
  'monster-orange.png'
];

const gameBoard = document.getElementById('gameBoard');
let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;

// Duplica e embaralha
function initGame() {
  const allCards = [...cardImages, ...cardImages]
    .sort(() => 0.5 - Math.random());

  allCards.forEach((img) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.image = img;

    card.innerHTML = `
      <div class="front"></div>
      <div class="back" style="background-image: url('img/${img}')"></div>
    `;

    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
    cards.push(card);
  });
}

function flipCard() {
  if (lockBoard || this === firstCard) return;

  this.classList.add('flip');

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkMatch();
}

function checkMatch() {
  const isMatch = firstCard.dataset.image === secondCard.dataset.image;

  if (isMatch) {
    disableCards();
  } else {
    unflipCards();
  }
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
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

initGame();
