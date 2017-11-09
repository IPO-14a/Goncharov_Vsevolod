/**
*размер поля
*
*отвечает за размер поля
*/
var N_SIZE = 3;

/**
*очистка доски
*
*переменная необходимая для очистки игрового поля
*/
var EMPTY = '&nbsp;';

/**
*массив поля
*
*массив в который будут записываться символы 'х' и '0', отображающий текущую ситуацию на доске
*/
var boxes = [];

/**
*игрок делающий текущий ход
*
*отображает какой символ будет записываться в массив поля 
*/
var turn = 'X';

/**
*количество 'х' и '0' на доске
*
*количество 'х' и '0' на доске на текущий момент
*/
var score;

/**
*количество сделанных ходов
*
*количество сделанных ходов с начала игры
*/
var moves;

/**
*функция запускающаяся при начале работы программы
*
*функция начертания доски, с неё начинаеться работа программы
*/
function init() {
    var board = document.createElement('table');
    board.setAttribute('border', 1);
    board.setAttribute('cellspacing', 0);

    var identifier = 1;
    for (var i = 0; i < N_SIZE; i++) {
        var row = document.createElement('tr');
        board.appendChild(row);
        for (var j = 0; j < N_SIZE; j++) {
            var cell = document.createElement('td');
            cell.setAttribute('height', 120);
            cell.setAttribute('width', 120);
            cell.setAttribute('align', 'center');
            cell.setAttribute('valign', 'center');
            cell.classList.add('col' + j, 'row' + i);
            if (i == j) {
                cell.classList.add('diagonal0');
            }
            if (j == N_SIZE - i - 1) {
                cell.classList.add('diagonal1');
            }
            cell.identifier = identifier;
            cell.addEventListener('click', set);
            row.appendChild(cell);
            boxes.push(cell);
            identifier += identifier;
        }
    }

    document.getElementById('tictactoe').appendChild(board);
    startNewGame();
}

/**
*Фунцкия старта новой игры
*
*Фунцкия очищающиая доску, обнуляющая необходимые переменные
*/
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

/**
*функция определяющая победу
*
*функция определяющая победу на текущем ходе
*возвращаяет true если победа достигнута
*возвращаяет false если победа  не достигнута
*/
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
*
/*
*функция проверки символа в ячейке
*
*проверяет какой символ находиться в ячейке игрового поля
*/
function contains(selector, text) {
    var elements = document.querySelectorAll(selector);
    return [].filter.call(elements, function (element) {
        return RegExp(text).test(element.textContent);
    });
}

/**
*функция заполнения ячейки
*
*функция необходимая для заполнения ячейки знаком
*так-же может вывести сообщение о победе одного из игроков
*/
function set() {
    if (this.innerHTML !== EMPTY) {
        return;
    }
    this.innerHTML = turn;
    moves += 1;
    score[turn] += this.identifier;
    if (win(this)) {
        alert('Winner: Player ' + turn);
        startNewGame();
    } else if (moves === N_SIZE * N_SIZE) {
        alert('Draw');
        startNewGame();
    } else {
        turn = turn === 'X' ? 'O' : 'X';
        document.getElementById('turn').textContent = 'Player ' + turn;
    }
}

init();