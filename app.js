// TODO: Add name change function
// TODO: Add Webpack bundle system

const initGame = (function () {
  const gameArea = document.getElementById('game');
  const player1Indicator = 'x';
  const player2Indicator = 'o';

  document.getElementById('postNames').addEventListener('click', postNames);

  const players = {
    player1: { name: 'Player 1', score: 0 },
    player2: { name: 'Player 2', score: 0 },
  };

  // Get player names and hide form
  function postNames() {
    grabNames();
    hideElements();
    window.location.reload();
  }

  function hideElements() {
    document.getElementById('playerNames').style.display = 'none';
    document.getElementById('site-main').style.display = 'flex';
  }

  function grabNames() {
    players.player1.name = document.getElementById('player1Name').value;
    players.player2.name = document.getElementById('player2Name').value;
    setLS('players', players);
  }

  function setLS(key, obj) {
    localStorage.setItem(key, JSON.stringify(obj));
  }

  function getFromLS(obj) {
    return JSON.parse(localStorage.getItem(obj));
  }

  function updateScoreLS(key, property, subProperty, value) {
    let obj = getFromLS(key);
    obj[property][subProperty] = value === 0 ? 0 : obj[property][subProperty] + value;
    setLS(key, obj);
  }

  function printInfo() {
    document.getElementById('showPlayer1Name').textContent = `${getFromLS('players').player1.name}`;
    document.getElementById('showPlayer2Name').textContent = `${getFromLS('players').player2.name}`;
    document.getElementById('showPlayer1Score').textContent = `${getFromLS('players').player1.score}`;
    document.getElementById('showPlayer2Score').textContent = `${getFromLS('players').player2.score}`;
  }
  printInfo();

  // Checks localStorega and if empty, then greabNames, but ifa has a value, than hide userForm
  if (localStorage.length !== 0) {
    hideElements();
  } else {
    grabNames();
  }

  // Define Buttons
  const box = document.querySelectorAll('.box');
  const resetRoundBtn = document.getElementById('resetRoundBtn');
  const resetGameBtn = document.getElementById('resetGameBtn');
  resetRoundBtn.addEventListener('click', resetRound);
  resetGameBtn.addEventListener('click', resetGame);

  // Add functionalitys to boxes
  box.forEach((item) => {
    item.addEventListener('click', xOrO);
    item.addEventListener('mouseover', (e) => {
      let getTextCon = e.target.textContent;
      getTextCon == '' ? (e.target.style.cssText = 'background-color: rgba(255, 255, 255, .5);') : false;
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
          if (val === 'o') gameArea.style.border = '1px solid blue';
          if (val === 'x') gameArea.style.border = '1px solid magenta';
        }
        pushGameState(currValue, currBoxIndex);
        console.log(gameState, currBoxIndex);
      }
      checkWinner();
    }
  }

  function checkWinner() {
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    // Pair every conditions with a variable.
    for (let i = 0; i <= 7; i++) {
      let a = winningConditions[i][0];
      let b = winningConditions[i][1];
      let c = winningConditions[i][2];

      // Compare conditions with current game state.
      if (gameState[a] == '' || gameState[b] == '' || gameState[c] == '') {
        continue;
      } else if (gameState[a] == gameState[b] && gameState[a] == gameState[c] && gameState[b] == gameState[c]) {
        console.log(gameState[a].toUpperCase() + ' Wins!');
        if (gameState[a] == 'x') {
          updateScoreLS('players', 'player1', 'score', 1);
          gameArea.style.border = '1px solid blue';
          gameArea.innerHTML = `
          <h1 style="margin: 0 auto">
          ${getFromLS('players').player1.name} Wins!
          </h1>
          `;
        }
        if (gameState[a] == 'o') {
          updateScoreLS('players', 'player2', 'score', 1);
          gameArea.style.border = '1px solid magenta';
          gameArea.innerHTML = `
          <h1 style="margin: 0 auto">
          ${getFromLS('players').player2.name} Won!
          </h1>
          `;
        }
        printInfo();
        playing = false;
      } else if (gameState.filter((item) => item === '').length === 0) {
        console.log(`It's a draw!`);
        playing = false;
      }
    }
  }

  // Reset game table
  function resetRound() {
    box.forEach((item) => (item.textContent = ''));
    gameState = ['', '', '', '', '', '', '', '', ''];
    playing = true;
    window.location.reload();
  }
  function resetGame() {
    box.forEach((item) => (item.textContent = ''));
    gameState = ['', '', '', '', '', '', '', '', ''];
    updateScoreLS('players', 'player1', 'score', 0);
    updateScoreLS('players', 'player2', 'score', 0);
    printInfo();
    playing = true;
    window.location.reload();
  }

  return {
    xOrO,
    setLS,
    getFromLS,
    updateScoreLS,
  };
})();
