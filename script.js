// capture all of the DOM elements 
const displayPlayerTurn = document.getElementById('playerTurn');
const gameBoardDiv = document.getElementById('gameBoard');
const resetButton = document.getElementById('reset');

let gameOver = false;

// use factories to make a gameboard that had all of the functions contained
// within it

function gameBoard () {
    const board = ["","","", "","","", "","",""];
    let playerTurn = 1;

    const changeTile = (tileNumber) => {
        // the tiles are numbered 0-8 reading like a book 
        // 0 1 2
        // 3 4 5
        // 6 7 8
        if (playerTurn == 1 && board[tileNumber] == "" && gameOver == false) {
            board[tileNumber] = "O";
            switchPlayer();
        }
        else if (playerTurn == 2 && board[tileNumber] == "" && gameOver == false){
            board[tileNumber] = "X";
            switchPlayer();
        }
        else {
            return "Try again";
        }
        
        updateScreen();
    };

    const getBoard = () => {

        return board;

    } ;

    const getTile = (int) => {

        return board[int];

    } ;

    const getPlayer = () => {
        return playerTurn;
    };
    
    const switchPlayer = () => {
        if (playerTurn == 1) {
            playerTurn = 2;
        }
        else {
            playerTurn = 1;
        }
    };

    const reset = () => {
        playerTurn = 1;
        board.length = 0; // clear the array
        for (let i = 0; i < 9; i++) {
            board.push("");       
        }
        gameOver = false;
        updateScreen();
    };

    return{ getPlayer, changeTile, getBoard, reset, getTile }
};


function updateScreen() {
    // check for a winner
    let winner = checkWinner();

    if (gameOver) {
        displayPlayerTurn.innerHTML = winner;
        // update the board
        updateBoard();
        return;
    }

    /* update player turn */
    // reset the content
    displayPlayerTurn.innerHTML = "";
    if (board.getPlayer() == 1){
        displayPlayerTurn.innerText = "It is player O's turn." ;
    }
    else {
        displayPlayerTurn.innerText = "It is player X's turn." ;
    }

    updateBoard();
};

function updateBoard() {
    /* update the game board */
    gameBoardDiv.innerHTML = "";

    board.getBoard().forEach((element, index) => {
        const button = document.createElement("button");
        button.textContent = element;
        button.id = index;
        button.addEventListener("click", function() {
            board.changeTile(index);
        });
        gameBoardDiv.appendChild(button);

    });
    
}

function checkWinner() {
    // check for a winner
    // check rows
    if (board.getTile(0) == board.getTile(1) && board.getTile(1) == board.getTile(2) && board.getTile(0) != "") {
        gameOver = true;
        return("Player " + board.getTile(0) + " wins!");
    }
    else if (board.getTile(3) == board.getTile(4) && board.getTile(4) == board.getTile(5) && board.getTile(3) != "") {
        gameOver = true;
        return("Player " + board.getTile(3) + " wins!");
    }
    else if (board.getTile(6) == board.getTile(7) && board.getTile(7) == board.getTile(8) && board.getTile(6) != "") {
        gameOver = true;
        return("Player " + board.getTile(6) + " wins!");
    }
    // check columns
    else if (board.getTile(0) == board.getTile(3) && board.getTile(3) == board.getTile(6) && board.getTile(0) != "") {
        gameOver = true;
        return("Player " + board.getTile(0) + " wins!");
    }
    else if (board.getTile(1) == board.getTile(4) && board.getTile(4) == board.getTile(7) && board.getTile(1) != "") {
        gameOver = true;
        return("Player " + board.getTile(1) + " wins!");
    }
    else if (board.getTile(2) == board.getTile(5) && board.getTile(5) == board.getTile(8) && board.getTile(2) != "") {
        gameOver = true;
        return("Player " + board.getTile(2) + " wins!");
    }
    // check diagonals
    else if (board.getTile(0) == board.getTile(4) && board.getTile(4) == board.getTile(8) && board.getTile(0) != "") {
        gameOver = true;
        return("Player " + board.getTile(0) + " wins!");
    }
    else if (board.getTile(2) == board.getTile(4) && board.getTile(4) == board.getTile(6) && board.getTile(2) != "") {
        gameOver = true;
        return("Player " + board.getTile(2) + " wins!");
        
    }
    // check for a tie
    else if (board.getBoard().every((element) => element != "")) {
        gameOver = true;
        return("It's a tie!");
    }
}


const board = gameBoard();


updateScreen();


resetButton.onclick = function() {
    board.reset();
};
