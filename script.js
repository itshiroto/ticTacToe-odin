const Gameboard = (function() {
    const square = [
        {mark: ''}
    ];

    let board = [];
    const createBoard = function() {
        for (let i = 0; i < 9; i++) {
            board.push(square);
        }
    }


    return {
        createBoard,
        board
    }
})();

const Player = (move) => {
    this.move = move;

    const getMove = () => {return move}

    return { getMove };
}

