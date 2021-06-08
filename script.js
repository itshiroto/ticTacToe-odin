"use strict";

const Player = (name, move) => {
    const playerName = name;
    const playerMove = move;

    const getName = () => {return playerName}
    const getMove = () => {return playerMove}
    
    return { 
        getName,
        getMove,
     };
}

const Gameboard = (function() {
    let board = [];
    const square = '' ;
    const get = () => {
        const boardCache = [...board];
        return boardCache;
    }
    const create = function() {
        if (board.length != 0) board = [];
        for (let i = 0; i < 9; i++) {
            board.push(square);
        }
    }
    const mark = (mark, index) => {
        board[index] = mark;
    }
    return {
        create,
        get,
        mark,
    }
})();

const displayController = (function() {
    const render = () => {
        let array = Gameboard.get();
        let canvas = document.querySelector("#canvasGrid");
        if (canvas.innerHTML != "") {
            while (canvas.lastElementChild) {
                canvas.removeChild(canvas.lastElementChild);
            }
        }
        array.forEach((element, index) => {
            let item = document.createElement('div');
            item.classList.add("board-item")
            item.dataset.index = index;
            item.addEventListener('click', (e) => {
                // console.log(e.target.dataset.index);
                gameController.play(e.target.dataset.index);
            });
            item.appendChild(displayMark(element));
            canvas.appendChild(item);
        })
    }
    const displayMark = (element) => {
        let icon = document.createElement('i');
        if (element == 'x') {
            icon.className = "fas fa-times";
        } else if (element == 'o') {
            icon.className = "far fa-circle";
        }
        icon.classList.add("item-icon")       
        return icon;
    }
    return {
        render,
        displayMark,
    }
})()

const gameController = (function() {
    let player1, player2;
    const start = () => {
        player1 = Player("player1", 'x');
        player2 = Player("player2", 'o');
        Gameboard.create();
        displayController.render();
    }
    const getPlayer = () => {
        const playerCache = [player1, player2];
        return playerCache;
    }
    const play = (index) => {
        if (Gameboard.get()[index] != '') return;
        Gameboard.mark('x', index);
        displayController.render();
    }
    return {
        start,
        getPlayer,
        play,
    }
})()