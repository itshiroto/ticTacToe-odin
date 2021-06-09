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
    let player1, player2, currentlyPlaying;
    // const winCondition = [
    //     [0,1,2],
    //     [3,4,5],
    //     [6,7,8],
    //     [0,3,6],
    //     [1,4,7],
    //     [2,5,8],
    //     [0,4,8],
    //     [2,4,6],
    // ];
    const start = () => {
        player1 = Player("player1", 'x');
        player2 = Player("player2", 'o');
        currentlyPlaying = player1;
        Gameboard.create();
        displayController.render();
    }
    const getPlayer = () => {
        const playerCache = [player1, player2];
        return playerCache;
    }
    const play = (index) => {
        if (Gameboard.get()[index] != '') return;
        Gameboard.mark(currentlyPlaying.getMove(), index)
        displayController.render();
        checkWinner();
        switchPlayer();
    }

    const switchPlayer = () => {
        switch (currentlyPlaying.getName()) {
            case "player1": currentlyPlaying = player2; break;
            case "player2": currentlyPlaying = player1; break;
        }
    }

    const checkWinner = () => {
        const winCondition = [
                // rows
                [0,1,2],
                [3,4,5],
                [6,7,8],
                // columns
                [0,3,6],
                [1,4,7],
                [2,5,8],
                // diagonal
                [0,4,8],
                [2,4,6],
            ];
        // Get currentPlayer Mark and Array of selection
        const currentPlayerMark = currentlyPlaying.getMove();
        const currentPlayerSel = Gameboard.get().map(val => {
            if (val === currentPlayerMark) return currentPlayerMark;
            else return "";
        });
       
        // Check the array if currentlyPlaying player wins
        let win = winCondition.some((val) => {
            return val.every((mark) => {
                if (currentPlayerSel[mark] != "") return true;
                else return false
            });
        });

        // If wins, then return
        // TODO
        if (win) console.log(`${currentlyPlaying.getName()} wins`)

        // TODO: If array full, then tie
    }
    return {
        start,
        getPlayer,
        play,
        checkWinner,
    }
})()

window.onload = gameController.start();