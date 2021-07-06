document.addEventListener("DOMContentLoaded", play);

let thereIsAWinner = false;

function play() {
    const buttons = document.querySelectorAll(".cell");

    //const player1 = Player(1, 'X');
    //const player2 = Player(2, 'O');

    let playingPlayer = 1;

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            //console.log(button.id);
            let cellID = button.id;
            if (playingPlayer === 1) {

                button.innerHTML = 'X'; 

                gameBoard.mark(cellID, 'X');
                playingPlayer = 2;

            } else if (playingPlayer === 2) {

                //button.style.color = "red"
                //button.innerHTML = 'O';
                button.innerHTML = "<span style='color: red;'>O</span>";
                gameBoard.mark(cellID, 'O');
                playingPlayer = 1;
            }
            
            button.disabled = true;

            if (!checkIfWin()) {
                checkIfTie();
            }
        });
    });

    const restartButton = document.querySelector("#restart");
    restartButton.addEventListener('click', restartGame);
}

function restartGame() {
    // limpio el dict board, poniendo todos los cells en null:
    cellNumbers = Array.from(Array(9).keys()); // [0, 1, 2, 3, 4, 5, 6, 7, 8]
    cellNumbers.forEach((number) => {
        strKey = "cell" + number;
        board[strKey] = null;
    });

    // ademas limpio las cells de la interfaz, vaciando los innerHTML:
    cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
        cell.innerHTML = '';
        cell.disabled = false;
        cell.style['background-color'] = 'rgb(239, 239, 239)';
        cell.style['border-width'] = '0.5px';
    })

    // ademas limpio el mensaje de quien gano 
    const winningDiv = document.querySelector("#winner-is");
    winningDiv.innerHTML = "";
}

// me fijo si ya se completo el board entero y no gano nadie. entonces game over. empataron
function checkIfTie() {
    let isTie = true;
    // el board esta completo y todas las cells son distintas de null
    for (let cell in board){
            isTie = isTie & (board[cell] != null); // esto es un Y logico, en la que una board[cell] sea null, entonces (board[cell] != null) sera falso, haciendo que isTie sea falso sin importar todos las otras
    }
    if (isTie) {
        gameOver();
    }
    
}


function checkIfWin() {
   
    if (board['cell0'] == board['cell3'] & board['cell0'] == board['cell6'] & board['cell0'] != null) {
        //console.log('win');
        //winningCell = document.querySelector("#cell0");
        //winningCell.classList.add("wincell");
        changeColorToWinningCells(0,3,6);

        gameOver(board['cell0']);
        return true;
    }
    if (board['cell1'] == board['cell4'] & board['cell4'] == board['cell7'] & board['cell1'] != null) {
        changeColorToWinningCells(1,4,7);
        gameOver(board['cell1']);
        return true;
    }
    if (board['cell2'] == board['cell5'] & board['cell5'] == board['cell8'] & board['cell2'] != null) {
        changeColorToWinningCells(2,5,8);
        gameOver(board['cell2']);
        return true;
    }
    if (board['cell0'] == board['cell1'] & board['cell1'] == board['cell2'] & board['cell0'] != null) {
        changeColorToWinningCells(0,1,2);
        gameOver(board['cell1']);
        return true;
    }
    if (board['cell3'] == board['cell4'] & board['cell4'] == board['cell5'] & board['cell3'] != null) {
        changeColorToWinningCells(3,4,5);
        gameOver(board['cell3']);
        return true;
    }
    if (board['cell6'] == board['cell7'] & board['cell7'] == board['cell8'] & board['cell6'] != null) {
        changeColorToWinningCells(6,7,8);
        gameOver(board['cell6']);
        return true;
    }
    if (board['cell0'] == board['cell4'] & board['cell4'] == board['cell8'] & board['cell0'] != null) {
        changeColorToWinningCells(0,4,8);
        gameOver(board['cell0']);
        return true;
    }
    if (board['cell6'] == board['cell4'] & board['cell4'] == board['cell2'] & board['cell6'] != null) {
        changeColorToWinningCells(6,4,2);
        gameOver(board['cell6']);
        return true;
    }
    return false;
}

function changeColorToWinningCells(id1, id2, id3) {
    
    let ids = [id1, id2, id3];

    ids.forEach((id) => {
        strID = "#cell" + id;
        winningCell = document.querySelector(strID);
        //winningCell.classList.add("wincell");
        winningCell.style['background-color'] = 'rgb(62, 223, 70)';
    });

}


function gameOver(winnerSign) {

    const winningDiv = document.querySelector("#winner-is");
    const winningText = document.createElement("h2");

    if (winnerSign) {
        winningText.textContent = `${winnerSign} won!`;
    } else {
        winningText.textContent = "That's a tie!";
    }

    const restartText = document.createElement("h3");
    restartText.textContent = "Press Restart to play again."
    winningDiv.appendChild(winningText);
    winningDiv.appendChild(restartText);
}

let board = {
    cell0: null,
    cell1: null,
    cell2: null,
    cell3: null,
    cell4: null,
    cell5: null,
    cell6: null,
    cell7: null,
    cell8: null,
}

const gameBoard = ( () => {
    
    //let board = new Array(9);

    const mark = (cellID, sign) => {
        console.log(cellID);
        board[cellID] = sign;
    };

    return {
        mark,
        };

}) ();



// there are only 2 players: Player1 and Player2
const Player = (number, sign) => {

    const getNumber = () => number;
    const getSign = () => sign;

    return {getNumber, getSign}
};



