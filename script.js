"use strict";


const Player = (name, move) => {
    const playerName = name;
    const playerMove = move;
    let points = 0;

    const getName = () => playerName;
    const getMove = () => playerMove;
    const getPoint = () => points;
    const addPoint = () => {
        points++;
        DOM.updateScore();
        // console.log(DOM.playerScore(playerName));
    }

    return { 
        getName,
        getMove,
        getPoint,
        addPoint,
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



const DOM = (function() {
    return {
        startButton: document.querySelector('#start-button'),
        p1score: document.querySelector('#p1-point'),
        p2score: document.querySelector('#p2-point'),

        displayMark: (element) => {
            let icon = document.createElement('i');
            if (element == 'x') {
                icon.className = "fas fa-times";
            } else if (element == 'o') {
                icon.className = "far fa-circle";
            }
            icon.classList.add("item-icon")       
            return icon;
        },

        // init: () => {
        //     let canvas = document.querySelector("#canvasGrid");
                       
        // },

        getName: (name) => {
            switch(name) {
                case "p1": return document.querySelector("#p1-nameInput").value;
                case "p2": return document.querySelector("#p2-nameInput").value;
            }
        },

        changeName: (name, index) => {
            switch(index) {
                case "p1": {
                    document.querySelector("#p1-name").innerText = name;
                    return
                }
                case "p2": {
                    document.querySelector("#p2-name").innerText = name;
                    return
                }
            }
        },
        
        render: () => {
            let canvas = document.querySelector("#canvasGrid");
            let array = Gameboard.get();
            
            if (canvas.innerHTML != "") {
                while (canvas.lastElementChild) {
                    canvas.removeChild(canvas.lastElementChild);
                }
            }
            
            const canvasBlock = document.createElement('div');
            canvasBlock.setAttribute('id', 'canvas-block');
            canvasBlock.addEventListener('click', () => DOM.toggleCanvas());
            canvas.appendChild(canvasBlock);
            
            array.forEach((element, index) => {
                const item = document.createElement('div');
                item.classList.add("board-item")
                item.dataset.index = index;
                item.addEventListener('click', (e) => {
                    gameController.play(e.target.dataset.index);
                });
                item.appendChild(DOM.displayMark(element));
                canvas.appendChild(item);
            })
        },

        blockCanvas: (val, playerName) => {
            const item = document.querySelector('#canvas-block');
            const status = document.createElement('h1');
            const info = document.createElement('p');
            if (val === 'win') {
                status.innerText = `${playerName} Wins!` 
            } else if (val === 'tie') {
                status.innerText = "It's a tie!";
            }
            info.innerText = "Press anywhere to toggle this box";
            item.appendChild(status);
            item.appendChild(info);
            item.style.pointerEvents = "auto";
            setTimeout(() => DOM.toggleCanvas(), 10);
        },
        toggleCanvas: () => {
            const item = document.querySelector('#canvas-block');
            item.classList.toggle('shown');
        },


        updateScore: () => {
            if (DOM.p1score.innerText === ""){
                DOM.p1score.innerText = "0";
                DOM.p2score.innerText = "0";
            } else {
                DOM.p1score.innerText = gameController.getPlayer()[0].getPoint();
                DOM.p2score.innerText = gameController.getPlayer()[1].getPoint();
            }
        },
    }
})()

const gameController = (() => {
    let player1, player2, currentPlayer;
    DOM.startButton.addEventListener('click', () => start());
    const init = () => {
        player1 = Player(DOM.getName("p1"), 'x');
        player2 = Player(DOM.getName("p2"), 'o');
        DOM.changeName(player1.getName(), "p1");
        DOM.changeName(player2.getName(), "p2");
    }
    const start = () => {
        if (!player1 && !player2) init();
        currentPlayer = player1;
        Gameboard.create();
        DOM.render();
    }
    
    const getPlayer = () => {
        const playerCache = [player1, player2]
        return playerCache;
    }

    const play = (index) => {
        if (Gameboard.get()[index] != '') return;
        Gameboard.mark(currentPlayer.getMove(), index)
        DOM.render();
        checkWinner();
        switchPlayer();
    }

    const switchPlayer = () => {
        switch (currentPlayer) {
            case player1: currentPlayer = player2; break;
            case player2: currentPlayer = player1; break;
        }
    }

    const checkWinner = () => {
        const winCondition = [
                [0,1,2],
                [3,4,5],
                [6,7,8],
                [0,3,6],
                [1,4,7],
                [2,5,8],
                [0,4,8],
                [2,4,6],
            ];
        const currentPlayerMark = currentPlayer.getMove();
        const currentPlayerSel = Gameboard.get().map(val => {
            if (val === currentPlayerMark) return currentPlayerMark;
            else return "";
        });
        
        const win = winCondition.some((val) => {
            return val.every((mark) => {
                if (currentPlayerSel[mark] != "") return true;
                else return false
            });
        });
        const tie = Gameboard.get().every(val => val != "")
        
        if (win) {
            currentPlayer.addPoint();
            DOM.blockCanvas('win', currentPlayer.getName());
            
        } else if (tie) {
            DOM.blockCanvas('tie');
        }
    }
    DOM.updateScore();
    return {
        start,
        play,
        getPlayer,
    }
})()
