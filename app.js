const initGame = (function () {
  document.getElementById('postNames').addEventListener('click', postNames);

  function postNames() {
    getNames();
    document.getElementById('player1Name').value = '';
    document.getElementById('player1Name').value = '';
  }

  function getNames() {
    let player1Name = document.getElementById('player1Name').value;
    let player2Name = document.getElementById('player2Name').value;
    return { player1Name, player2Name };
  }

  const players = {
    player1: getNames().player1Name,
    player2: getNames().player1Name,
  };
  const scores = {
    player1: 0,
    player2: 0,
  };

  // Show scores
  const printPlayer1Score = (document.getElementById('player1Score').textContent = `Player 1: ${scores.player1}`);
  const printPlayer2Score = (document.getElementById('player2Score').textContent = `Player 2: ${scores.player2}`);

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
    moves,
    box,
    players,
    getNames,
    xOrO,
  };
})();
