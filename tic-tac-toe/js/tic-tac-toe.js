var N_SIZE = 3,
  EMPTY = '&nbsp;',
  boxes = [],
  turn = 'X',
  score,
  moves;

function init() {
  var board = document.createElement('table');
  board.setAttribute('border', 1);
  board.setAttribute('cellspacing', 0);

  var identifier = 1;
  for (var i = 0; i < N_SIZE; i++) {
    
    
  }

  document.getElementById('tictactoe').appendChild(board);
  startNewGame();
}

function startNewGame() {
  score = {
    'X': 0,
    'O': 0
  };
  moves = 0;
  turn = 'X';
  boxes.forEach(function (square) {
    square.innerHTML = EMPTY;
  });
}

function win(clicked) {

}

function contains(selector, text) {

}

function set() {

}

init();