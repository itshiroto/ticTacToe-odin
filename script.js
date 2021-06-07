const Player = (move) => {
    this.move = move;

    const getMove = () => {return move}

    return { getMove };
}

const Gameboard = (function() {
    const square = [
        {mark: ''}
    ];

    let board = [];

    const get = () => {
        return board;
    }
    const create = function() {
        for (let i = 0; i < 9; i++) {
            board.push(square);
        }
    }

    return {
        create,
        get,
    }
})();

const displayController = (function() {
    const render = () => {
        let array = Gameboard.get();
        let canvas = document.querySelector("#canvasGrid");
        array.forEach((element, index) => {
            let item = document.createElement('div');
            item.classList.add("board-item")
            item.dataset.index = index;
            canvas.appendChild(item);
        })
    }
    return {
        render,
    }
})()