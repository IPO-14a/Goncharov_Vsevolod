/**
*Размер поля
*
*Отвечает за размер поля
@var int N_SIZE
*/
var N_SIZE = 3;

/**
*Очистка доски
*
*Переменная необходимая для очистки игрового поля
*/
var EMPTY = '&nbsp;';

/**
*Массив поля
*
*Массив в который будут записываться символы 'х' и '0', отображающий текущую ситуацию на доске
@var array
*/
var boxes = [];

/**
*Игрок делающий текущий ход
*
*Отображает какой символ будет записываться в массив поля 
@var string turn
*/
var turn = 'X';

/**
*Количество 'х' и '0' на доске
*
*Количество 'х' и '0' на доске на текущий момент
@var int score
*/
var score;

/**
*Количество сделанных ходов
*
*Количество сделанных ходов с начала игры
@var int moves
*/
var moves;

/**
*Функция запускающаяся при начале работы программы
*
*Функция начертания доски, с неё начинаеться работа программы
@return void
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
@return void
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
*Функция определяющая победу
*
*Функция определяющая победу на текущем ходе
*
@param object clicked    используется для обращения к элементам html-страницы
@return bool             возвращаяет true если победа достигнута
                         возвращаяет false если победа не достигнута
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

/*
*Функция проверки символа в ячейке
*
*Проверяет какой символ находиться в ячейке игрового поля
@param string selector линия которая проверяется на победу
@param string text     игрок делающий текущий ход
@return bool[]         совпадающие знаки в линии с знаком делающим текущий ход
*/
function contains(selector, text) {
    var elements = document.querySelectorAll(selector);
    return [].filter.call(elements, function (element) {
        return RegExp(text).test(element.textContent);
    });
}

/**
*Функция заполнения ячейки
*
*Функция необходимая для заполнения ячейки знаком
*так-же может вывести сообщение о победе одного из игроков
@return void
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