const board = document.getElementById('board');
let userSelection = [];
let clickCount = 0;
let count = 0;
const EASY = 4;
const MEDIUM = 8
const HARD = 12
let difficulty = MEDIUM;
let setTime = 60;
let timer;

function init() {
  arry = generateArray(difficulty);
  arry = shuffle(arry);
  renderBoard();
  
  renderClock();
  
  bindEvents();
}
function renderClock() {
const clock = document.getElementById('clock');

timer = setInterval(function() {
   setTime--;
    clock.innerHTML = setTime;
   
    if (setTime === 0) {
      clearInterval(timer);
    }
  }, 1000);
}

/* Generate Array */
function generateArray(difficulty) {

  let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  let i = 0;
  let tempArry = [];

  while (i !== difficulty) {
    tempArry.push(alphabet[i]);
    tempArry.push(alphabet[i]);
    i++;
  }
  return tempArry;
}



/* Shuffle */
function shuffle(selectedArray) {
  // I'll store each number generated into generatedNumbers
  let generatedNumbers = [];
  let tempArry = [];
  
  while (generatedNumbers.length != selectedArray.length) {
    // I'll generate new numbers as long as genereatedNumbers length is not equal to selectedArray length
    let generatedNumber = Math.floor(Math.random() * selectedArray.length);
    // I've set this condition to avoid inserting duplicates into generatedNumbers
    if (! generatedNumbers.includes(generatedNumber)) {
      generatedNumbers.push(generatedNumber);
    }
  }
  // Once the loop is finished; I'll insert each item in the selectedArray using the generatedNumbers array as it's index into a tempArry
  for (let i = 0; i < selectedArray.length; i++) {
   tempArry[i] = selectedArray[generatedNumbers[i]]
  }
  // Finally i'll return the tempArry when called
   return tempArry;
}


/* renderBoard */
function renderBoard() {
  let fragment = document.createDocumentFragment();
  
  arry.forEach(function(value, i) {
    let card = document.createElement('div');
    fragment.appendChild(card);
    card.setAttribute('data-card-number', i)
    card.className = 'hidden-cards';
  })
  
  board.appendChild(fragment)
}

/* bindEvents */
function bindEvents() {
    const cards = board.querySelectorAll('.hidden-cards');
    cards.forEach(function(card) {
    card.addEventListener('click', guess);
  })
}

/* Guess */
function guess(e) {
  if (clickCount != 2) {
    const element = this;
    const cardId = e.path[0].dataset.cardNumber;
    const cardValue = arry[cardId];
    this.style.backgroundImage = `url('./img/img-${cardValue}.gif')`;
    this.style.backgroundColor = `#fff`;
    clickCount++;
    storeUserGuess(cardValue, cardId, element);
  }
}

/* storeUserGuess */
function storeUserGuess(cardValue, id, element) {
 
  userSelection.push({value: cardValue, id:id, element: element})
  
  if (userSelection.length === 2 && userSelection[0].id === userSelection[1].id) {
    userSelection.pop();
    clickCount = 1;
  }

  
  if (userSelection.length === 2) {
    setTimeout(function() {
      validateUserGuess()
    }, 500)
    
  }
}

/* validateUserGuess */
function validateUserGuess() {
 
  if (userSelection[0].value === userSelection[1].value) {
    correctGuess();
    resetValues()
  }
  else {
    wrongGuess();
    resetValues()
  }
}

/* correctGuess */
function correctGuess() {
  userSelection.forEach(function(object) {
    object.element.removeEventListener('click', guess);
  })
  count++;
  win();
}


function wrongGuess() {
  userSelection.forEach(function(object) {
   object.element.style.backgroundImage = `url('./img/card.gif')`;
  })
}

function resetValues() {
  clickCount = 0;
  userSelection = [];
}

function win() {
    if (count === arry.length / 2) {
      alert('You Win')
      clearInterval(timer);
    }
}
init();