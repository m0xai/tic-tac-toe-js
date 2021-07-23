// TODO: Add name change function

const initGame = (function () {
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
  }

  function hideElements() {
    document.getElementById('playerNames').style.display = 'none';
    document.getElementById('scoreboard').style.display = 'inline';
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
    document.getElementById('showPlayer1').textContent = `${getFromLS('players').player1.name} : ${getFromLS('players').player1.score}`;
    document.getElementById('showPlayer2').textContent = `${getFromLS('players').player2.name} : ${getFromLS('players').player2.score}`;
  }
  printInfo();

  // Checks localStorega and if empty, then greabNames, but ifa has a value, than hide userForm
  if (localStorage.length !== 0) {
    hideElements();
  } else {
    grabNames();
  }
  // // store names on localStorage and print them on screen
  // function getNames() {
  //   let player1Name = document.getElementById('player1Name');
  //   let player2Name = document.getElementById('player2Name');
  //   // Get names from LS
  //   let getPlayer1Name = localStorage.getItem('player1');
  //   let getPlayer2Name = localStorage.getItem('player2');
  //   // Store names on LS
  //   if (getPlayer1Name == '""' || getPlayer2Name == '""') {
  //     localStorage.setItem('player1', JSON.stringify(player1Name.value));
  //     localStorage.setItem('player2', JSON.stringify(player2Name.value));
  //   }
  //   // Print names with scores
  //   document.getElementById('player1Score').textContent = `${JSON.parse(getPlayer1Name)}: ${getPlayers.player1.score}`;
  //   document.getElementById('player2Score').textContent = `${JSON.parse(getPlayer2Name)}: ${getPlayers.player2.score}`;
  //   return { getPlayer1Name, getPlayer2Name };
  // }

  // const players = {
  //   player1: getNames().player1Name,
  //   player2: getNames().player1Name,
  // };

  // Hide the form, if LS stores names

  // Define Buttons
  const box = document.querySelectorAll('.box');
  const resetBtn = document.getElementById('resetBtn');
  resetBtn.addEventListener('click', resetGame);

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
        if (gameState[a] == 'x') updateScoreLS('players', 'player1', 'score', 1);
        if (gameState[a] == 'o') updateScoreLS('players', 'player2', 'score', 1);
        printInfo();
        playing = false;
      }
    }
  }

  // Reset game table
  function resetGame() {
    box.forEach((item) => (item.textContent = ''));
    gameState = ['', '', '', '', '', '', '', '', ''];
    updateScoreLS('players', 'player1', 'score', 0);
    updateScoreLS('players', 'player2', 'score', 0);
    printInfo();
    playing = true;
  }

  return {
    xOrO,
    gameState,
    setLS,
    getFromLS,
    updateScoreLS,
  };
})();
