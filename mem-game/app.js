const gameBoard = document.querySelector('.game-board');
const resetBtn = document.querySelector('.reset-btn');
const winMessage = document.querySelector('.win-message');
const totalBoxes = 16; // Total number of boxes (4x4 grid)
let firstBox = null;
let secondBox = null;
let hasFlippedCard = false;
let lockBoard = false;
let matchedPairs = 0;

// Generate a shuffled array of values for the boxes
const createGameBoard = () => {
  const numbers = [];
  
  // Create pairs of numbers (you can customize this for different sets of images or values)
  for (let i = 1; i <= totalBoxes / 2; i++) {
    numbers.push(i, i);
  }
  
  // Shuffle the numbers randomly
  numbers.sort(() => Math.random() - 0.5);

  // Create the boxes and append them to the board
  gameBoard.innerHTML = '';
  numbers.forEach((num, index) => {
    const box = document.createElement('div');
    box.classList.add('box');
    box.setAttribute('data-id', num);
    box.setAttribute('data-index', index);
    box.addEventListener('click', flipBox);
    gameBoard.appendChild(box);
  });
};

// Flip a box when clicked
const flipBox = (e) => {
  if (lockBoard || e.target === firstBox) return;
  const clickedBox = e.target;
  clickedBox.classList.add('flipped');
  clickedBox.textContent = clickedBox.getAttribute('data-id');
  
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstBox = clickedBox;
    return;
  }

  secondBox = clickedBox;
  lockBoard = true;

  checkMatch();
};

// Check if two flipped boxes match
const checkMatch = () => {
  if (firstBox.getAttribute('data-id') === secondBox.getAttribute('data-id')) {
    firstBox.classList.add('matched');
    secondBox.classList.add('matched');
    matchedPairs++;

    if (matchedPairs === totalBoxes / 2) {
      showWinMessage();
    }

    resetBoard();
  } else {
    setTimeout(() => {
      firstBox.classList.remove('flipped');
      secondBox.classList.remove('flipped');
      firstBox.textContent = '';
      secondBox.textContent = '';
      resetBoard();
    }, 1000);
  }
};

// Reset the flipped cards and the board state
const resetBoard = () => {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstBox, secondBox] = [null, null];
};

// Display win message and hide game board
const showWinMessage = () => {
  gameBoard.style.display = 'none';
  winMessage.style.display = 'block';
};

// Reset the game
const resetGame = () => {
  matchedPairs = 0;
  gameBoard.style.display = 'grid';  // Show the game board again
  winMessage.style.display = 'none'; // Hide the win message
  createGameBoard();
};

// Initialize the game
createGameBoard();
