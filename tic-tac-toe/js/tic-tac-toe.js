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
  var memberOf = clicked.className.split(/\s+/);
  for (var i = 0; i < memberOf.length; i++) {
    var testClass = '.' + memberOf[i];
    var items = contains('#tictactoe ' + testClass, turn);
    if (items.length == N_SIZE) {
      return true;
    }
  }
  return false;
}

function contains(selector, text) {
var elements = document.querySelectorAll(selector);
  return [].filter.call(elements, function (element) {
    return RegExp(text).test(element.textContent);
  });
}

function set() {

}

init();