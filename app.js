// TODO: Add name change function

const initGame = (function () {
  const scores = {
    player1: localStorage.getItem('player1Score') || 0,
    player2: localStorage.getItem('player2Score') || 0,
  };

  document.getElementById('postNames').addEventListener('click', postNames);

  // Get player names and hide form
  function postNames() {
    getNames();
    toggleElements();
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
    // Store names on LS
    let player1Name = document.getElementById('player1Name');
    let player2Name = document.getElementById('player2Name');
    localStorage.setItem('player1', JSON.stringify(player1Name.value));
    localStorage.setItem('player2', JSON.stringify(player2Name.value));
    // Get names from LS
    let getPlayer1Name = localStorage.getItem('player1');
    let getPlayer2Name = localStorage.getItem('player2');
    // Print names with scores
    document.getElementById('player1Score').textContent = `${JSON.parse(getPlayer1Name)}: ${scores.player1}`;
    document.getElementById('player2Score').textContent = `${JSON.parse(getPlayer2Name)}: ${scores.player2}`;

    return { getPlayer1Name, getPlayer2Name };
  }

  // Hide form, if LS stores names
  if (getNames().getPlayer1Name !== '""' && getNames().getPlayer2Name !== '""') hideElements();

  const players = {
    player1: getNames().player1Name,
    player2: getNames().player1Name,
  };

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

  function xOrO() {
    let currentBoxId = this.getAttribute('data-id');
    let currentBox = document.querySelector(`[data-id="${currentBoxId}"]`);

    if (moves.length < 9) {
      if (lastMove() === 'x') {
        console.log('o');
        moves.push('o');
        currentBox.textContent = 'o';
        console.log(`Box Number is ${currentBoxId}`);
      } else if (lastMove() === 'o') {
        console.log('x');
        moves.push('x');
        currentBox.textContent = 'x';
        console.log(`Box Number is ${currentBoxId}`);
      } else {
        console.log('x');
        moves.push('x');
        currentBox.textContent = 'x';
        console.log(`Box Number is ${currentBoxId}`);
      }
    }
    checkWinner();
  }

  function checkWinner() {}
  // Reset game areo
  function resetGame() {
    box.forEach((item) => (item.textContent = ''));
    moves = [];
  }

  return {
    getNames,
    xOrO,
    hideElements,
  };
})();
