// TODO: Add name change function

const initGame = (function () {
  const scores = {
    player1: localStorage.getItem('player1Score') || 0,
    player2: localStorage.getItem('player2Score') || 0,
  };

  const player1Indicator = 'x';
  const player2Indicator = 'o';

  document.getElementById('postNames').addEventListener('click', postNames);

  // Get player names and hide form
  function postNames() {
    getNames();
    hideElements();
  }

  function hideElements() {
    localStorage.setItem('hideItem', 'none');
    localStorage.setItem('showItem', 'inline');
    document.getElementById('playerNames').style.display = localStorage.getItem('hideItem');
    document.getElementById('showPlayerNames').style.display = localStorage.getItem('showItem');
    document.getElementById('showPlayerScores').style.display = localStorage.getItem('showItem');
  }

  // store names on localStorage and print them on screen
  function getNames() {
    let player1Name = document.getElementById('player1Name');
    let player2Name = document.getElementById('player2Name');
    // Get names from LS
    let getPlayer1Name = localStorage.getItem('player1');
    let getPlayer2Name = localStorage.getItem('player2');
    // Store names on LS
    if (getPlayer1Name == '""' || getPlayer2Name == '""') {
      localStorage.setItem('player1', JSON.stringify(player1Name.value));
      localStorage.setItem('player2', JSON.stringify(player2Name.value));
    }
    // Print names with scores
    document.getElementById('player1Score').textContent = `${JSON.parse(getPlayer1Name)}: ${scores.player1}`;
    document.getElementById('player2Score').textContent = `${JSON.parse(getPlayer2Name)}: ${scores.player2}`;
    return { getPlayer1Name, getPlayer2Name };
  }

  const players = {
    player1: getNames().player1Name,
    player2: getNames().player1Name,
  };

  // Hide the form, if LS stores names
  if (players.player1 !== '""' && players.player2 !== '""') hideElements();

  // Define Buttons
  const box = document.querySelectorAll('.box');
  const resetBtn = document.getElementById('resetBtn');
  resetBtn.addEventListener('click', resetGame);

  // Init Moves
  let moves = [];
  let lastMove = function () {
    return moves[moves.length - 1];
  };

  // Add functionalitys to boxes
  box.forEach((item) => {
    item.addEventListener('click', xOrO);
    item.addEventListener('mouseover', (e) => {
      let getTextCon = e.target.textContent;
      getTextCon == '' ? (e.target.style.backgroundColor = 'grey') : false;
    });
    item.addEventListener('mouseout', (e) => {
      e.target.style.backgroundColor = '';
    });
  });

  // Let's Play!
  let gameState = ['', '', '', '', '', '', '', '', ''];
  let playing = true;

  function xOrO(e) {
    if (playing) {
      let currBoxIndex = e.target.dataset.id;
      let currBox = e.target;
      //? That might be a problem.
      let countX = (countY = 0);

      // Track counts of X and Y
      for (el of gameState) {
        if (el == 'x') countX++;
        if (el == 'o') countY++;
      }

      // Chnage current value based on moves count. Note: First move is always X and then O. Everytime X == O means next turn is X.
      let currValue;
      if (countX == countY) {
        currValue = player1Indicator;
      } else if (countX < countY) {
        currValue = player1Indicator;
      } else if (countX > countY) {
        currValue = player2Indicator;
      }

      // Push current value to gameState and screen.
      if (gameState[currBoxIndex] == '') {
        function pushGameState(val, curr) {
          gameState[curr] = val;
          currBox.textContent = val;
        }
        pushGameState(currValue, currBoxIndex);
        console.log(gameState, currBoxIndex);
      }
      checkWinner();
    }
  }

  function checkWinner() {}

  // Reset game table
  function resetGame() {
    box.forEach((item) => (item.textContent = ''));
    gameState = ['', '', '', '', '', '', '', '', ''];
  }

  return {
    getNames,
    xOrO,
    hideElements,
    gameState,
  };
})();
