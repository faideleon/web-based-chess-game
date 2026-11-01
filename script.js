const chessboard = [];
let whiteToPlay = true;
let gameIsOver = false;


instantiatingboard();
instantiatingPieces();
gameManager();
function gameManager() {

    selectPieces();

}


function instantiatingboard() {
    const position_col = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    const main = document.querySelector('.main_board');


    let index = 0;
    let num = 8;
    for (let i = 0; i < 8; i++) {
        chessboard[i] = [];
        for (let j = 0; j < 8; j++) {
            const element = document.createElement("div");
            element.classList.add("squares");
            if ((i + j) % 2 === 0) {
                element.classList.add('white');
            }
            if (i === 7) {
                element.innerHTML += `<span class="col-label">${position_col[index++]}</span>`;
            }

            if (j === 0) {

                element.innerHTML += `<span class="row-label"> ${num--}</span>`;
            }
            chessboard[i][j] = element;
            element.dataset.row = i;
            element.dataset.col = j;
            element.dataset.isOccupied = false;
            main.append(element);
        }
    }
}

function instantiatingPieces() {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            switch (i) {
                case 0: if (j === 0 || j === 7) {
                    chessboard[i][j].innerHTML += `<img class="chess_pieces rook black" src="ChessPieces/Chess_rdt45.svg">`;
                    chessboard[i][j].dataset.isOccupied = true;

                } else if (j === 1 || j === 6) {
                    chessboard[i][j].innerHTML += `<img class="chess_pieces knight black" src="ChessPieces/Chess_ndt45.svg">`;
                    chessboard[i][j].dataset.isOccupied = true;
                }
                else if (j === 2 || j === 5) {
                    chessboard[i][j].innerHTML += `<img class="chess_pieces bishop black" src="ChessPieces/Chess_bdt45.svg">`;
                    chessboard[i][j].dataset.isOccupied = true;
                } else if (j === 3) {
                    chessboard[i][j].innerHTML += `<img class="chess_pieces queen black" src="ChessPieces/Chess_qdt45.svg">`;
                    chessboard[i][j].dataset.isOccupied = true;
                }
                else if (j === 4) {
                    chessboard[i][j].innerHTML += `<img class="chess_pieces king black" src="ChessPieces/Chess_kdt45.svg">`;
                    chessboard[i][j].dataset.isOccupied = true;
                }
                    break;
                case 1: {
                    chessboard[i][j].innerHTML += `<img class="chess_pieces pawn black" src="ChessPieces/Chess_pdt45.svg">`;
                    chessboard[i][j].dataset.isOccupied = true;
                    break;
                }

                case 6: {
                    chessboard[i][j].innerHTML += `<img class="chess_pieces pawn white" src="ChessPieces/Chess_plt45.svg">`;
                    chessboard[i][j].dataset.isOccupied = true;
                    break;
                }
                case 7: {
                    if (j === 0 || j === 7) {
                        chessboard[i][j].innerHTML += `<img class="chess_pieces rook white" src="ChessPieces/Chess_rlt45.svg">`;
                        chessboard[i][j].dataset.isOccupied = true;
                    } else if (j === 1 || j === 6) {
                        chessboard[i][j].innerHTML += `<img class="chess_pieces knight white" src="ChessPieces/Chess_nlt45.svg">`;
                        chessboard[i][j].dataset.isOccupied = true;
                    }
                    else if (j === 2 || j === 5) {
                        chessboard[i][j].innerHTML += `<img class="chess_pieces bishop white" src="ChessPieces/Chess_blt45.svg">`;
                        chessboard[i][j].dataset.isOccupied = true;
                    } else if (j === 3) {
                        chessboard[i][j].innerHTML += `<img class="chess_pieces queen white" src="ChessPieces/Chess_qlt45.svg">`;
                        chessboard[i][j].dataset.isOccupied = true;
                    }
                    else if (j === 4) {
                        chessboard[i][j].innerHTML += `<img class="chess_pieces king white" src="ChessPieces/Chess_klt45.svg">`;
                        chessboard[i][j].dataset.isOccupied = true;
                        document.querySelector('.chess_pieces.king').dataset.hasMoved = false;
                    }
                    break;
                }
            }

        }
    }
}

const pawn_direction = [[-1, 0]]
const rook_direction = [[0, 1], [0, -1], [1, 0], [-1, 0]]
const knight_direction = [[2, 1], [2, -1], [-1, -2], [1, -2], [1, 2], [-1, 2], [-2, 1], [-2, -1]];
const bishop_direction = [[1, 1], [-1, -1], [1, -1], [-1, 1]];
const queen_direction = [...rook_direction, ...bishop_direction]
const king_direction = [...queen_direction]




function selectPieces() {
    let alreadySelected = false;
    let previousPiece;
    const type = ["pawn", "rook", "knight", "bishop", "queen", "king"];

    const _pieces = document.querySelectorAll(".chess_pieces");
    _pieces.forEach(piece => {
        piece.addEventListener("click", () => {
            if (piece.classList.contains("white") !== whiteToPlay) {
                return
            }

            const row = Number(piece.parentElement.dataset.row);
            const col = Number(piece.parentElement.dataset.col);

            if (alreadySelected) {
                document.querySelectorAll(".circles").forEach(c => c.remove());
                alreadySelected = false;
                if (previousPiece === piece) return; // same piece clicked again: just hide the dots
            }


            const typePiece = type.find(t => {
                return piece.classList.contains(t);
            })

            switch (typePiece) {
                case "pawn": {
                    const left = whiteToPlay ? chessboard[row - 1][col - 1] : chessboard[row + 1][col - 1];
                    const right = whiteToPlay ? chessboard[row - 1][col + 1] : chessboard[row + 1][col + 1];
                    console.log("left", left, right);

                    showMoves("pawn", row, col, whiteToPlay ? [[-1, 0], left?.querySelector(".chess_pieces")?.classList.contains("black") ? [-1, -1] : null, right?.querySelector(".chess_pieces")?.classList.contains("black") ? [-1, 1] : null] : [[1, 0], left?.querySelector(".chess_pieces")?.classList.contains("white") ? [1, -1] : null, right?.querySelector(".chess_pieces")?.classList.contains("white") ? [1, 1] : null], whiteToPlay ? row === 6 ? 2 : 1 : row === 1 ? 2 : 1);
                    document.querySelectorAll(".circles").forEach(c => {
                        c.addEventListener("click", () => {
                            moveToPosition(piece, Number(c.parentElement.dataset.row), Number(c.parentElement.dataset.col), row, col);

                            whiteToPlay = !whiteToPlay;
                        })

                    })

                    break;
                }


                case "rook": {
                    showMoves("rook", row, col, rook_direction, 8);
                    document.querySelectorAll(".circles").forEach(c => {
                        c.addEventListener("click", () => {
                            moveToPosition(piece, Number(c.parentElement.dataset.row), Number(c.parentElement.dataset.col), row, col);
                            whiteToPlay = !whiteToPlay;
                        })

                    })

                    break;
                }

                case "knight": {
                    showMoves("knight", row, col, knight_direction, 1);
                    document.querySelectorAll(".circles").forEach(c => {
                        c.addEventListener("click", () => {
                            moveToPosition(piece, Number(c.parentElement.dataset.row), Number(c.parentElement.dataset.col), row, col);
                            whiteToPlay = !whiteToPlay;
                        })

                    })

                    break;
                }
                case "bishop": {
                    showMoves("bishop", row, col, bishop_direction, 8);
                    document.querySelectorAll(".circles").forEach(c => {
                        c.addEventListener("click", () => {
                            moveToPosition(piece, Number(c.parentElement.dataset.row), Number(c.parentElement.dataset.col), row, col);
                            whiteToPlay = !whiteToPlay;
                        })

                    })

                    break;
                }
                case "queen": {
                    showMoves("queen", row, col, queen_direction, 8);
                    document.querySelectorAll(".circles").forEach(c => {
                        c.addEventListener("click", () => {
                            moveToPosition(piece, Number(c.parentElement.dataset.row), Number(c.parentElement.dataset.col), row, col);
                            whiteToPlay = !whiteToPlay;
                            console.log("clicked", piece.className, "whiteToPlay:", whiteToPlay);
                        })

                    })

                    break;
                }
                case "king": {
                    showMoves("king", row, col, king_direction, whiteToPlay ? (!(chessboard[7][5].dataset.isOccupied === "true") && !(chessboard[7][6].dataset.isOccupied === "true") && !(piece.dataset.hasMoved === "true")) ? 2 : (!(chessboard[7][1].dataset.isOccupied === "true") && !(chessboard[7][2].dataset.isOccupied === "true") && !(chessboard[7][3].dataset.isOccupied === "true") && !(piece.dataset.hasMoved === "true")) ? 3 : 1 : (!(chessboard[0][5].dataset.isOccupied === "true") && !(chessboard[0][6].dataset.isOccupied === "true") && !(piece.dataset.hasMoved === "true")) ? 2 : (!(chessboard[0][1].dataset.isOccupied === "true") && !(chessboard[0][2].dataset.isOccupied === "true") && !(chessboard[0][3].dataset.isOccupied === "true") && !(piece.dataset.hasMoved === "true")) ? 3 : 1);
                    document.querySelectorAll(".circles").forEach(c => {
                        console.log(c.parentElement);
                        c.addEventListener("click", () => {
                            const square = c.parentElement;
                            if (whiteToPlay ? square === chessboard[7][6] : square === chessboard[0][6]) {
                                console.log("went in here")
                                kingSideCastle();
                            } else if (whiteToPlay ? square === chessboard[7][2] : square === chessboard[0][2]) {
                                console.log("went queenside");
                                queenSideCastle();
                            }
                            moveToPosition(piece, Number(square.dataset.row), Number(square.dataset.col), row, col);
                            piece.dataset.hasMoved = true;
                            whiteToPlay = !whiteToPlay;
                        })

                    })
                    break;
                }
            }
            previousPiece = piece;    // add
            alreadySelected = true;

        });
    });
}

function queenSideCastle() {
    const king = whiteToPlay ? document.querySelector(".king.white") : document.querySelector(".king.black");
    const rook = whiteToPlay ? Array.from(document.querySelectorAll(".rook.white")).find(rook => rook.parentElement === chessboard[7][0]) :
        Array.from(document.querySelectorAll(".rook.black")).find(rook => rook.parentElement === chessboard[0][0])
    console.log(rook.parentElement.dataset.row, rook.parentElement.dataset.col);
    moveToPosition(rook, whiteToPlay ? 7 : 0, 3, rook.parentElement.dataset.row, rook.parentElement.dataset.col)
    moveToPosition(king, whiteToPlay ? 7 : 0, 2, king.parentElement.dataset.row, king.parentElement.dataset.col)
    king.dataset.hasMoved = true;
}

function kingSideCastle() {
    const king = whiteToPlay ? document.querySelector(".king.white") : document.querySelector(".king.black");
    const rook = whiteToPlay ? Array.from(document.querySelectorAll(".rook.white")).find(rook => rook.parentElement === chessboard[7][7]) :
        Array.from(document.querySelectorAll(".rook.black")).find(rook => rook.parentElement === chessboard[0][7])

    console.log(rook.parentElement.dataset.row, rook.parentElement.dataset.col);
    moveToPosition(rook, whiteToPlay ? 7 : 0, 5, rook.parentElement.dataset.row, rook.parentElement.dataset.col)
    moveToPosition(king, whiteToPlay ? 7 : 0, 6, king.parentElement.dataset.row, king.parentElement.dataset.col)
    king.dataset.hasMoved = true;

}


function moveToPosition(piece, newRow, newCol, row, col) {
    let newPosition = chessboard[newRow][newCol];
    newPosition.innerHTML = "";
    newPosition.appendChild(piece);
    newPosition.dataset.isOccupied = true;
    console.log(newPosition)
    chessboard[row][col].innerHTML = "";
    chessboard[row][col].dataset.isOccupied = false;
    document.querySelectorAll(".circles").forEach(c => {
        c.remove();
    })

}


function showMoves(piece, row, col, directions, maxSteps) {
    for (const direction of directions) {
        if (direction === null) {
            continue;
        }
        let r = row;
        let c = col;

        for (let step = 1; step <= maxSteps; step++) {
            r = r + direction[0];
            c = c + direction[1];

            console.log(r, c);

            if (r < 0 || r > 7 || c < 0 || c > 7) break;

            console.log("row: " + r + " column: " + c)


            if (whiteToPlay ? (chessboard[r][c]?.querySelector(".chess_pieces")?.classList.contains("white")) : chessboard[r][c]?.querySelector(".chess_pieces")?.classList.contains("black")) {
                break;
            }

            if (piece === "pawn" && whiteToPlay ? ((direction[0] === -1 && direction[1] === 0) && chessboard[r][c].dataset.isOccupied === "true") : (direction[0] === 1 && direction[1] === 0) && chessboard[r][c].dataset.isOccupied === "true") {
                break;
            }




            const circle = document.createElement("div");
            circle.classList.add("circles");
            circle.style.zIndex = "10";
            chessboard[r][c].appendChild(circle);
            console.log("chessboard", chessboard[r][c])

            if (chessboard[r][c].dataset.isOccupied === "true") {
                break;
            }




            if (piece === "pawn" && ((direction[0] === -1 && direction[1] === -1) || (direction[0] === -1 && direction[1] === 1) || (direction[0] === 1 && direction[1] === -1) || (direction[0] === 1 && direction[1] === 1))) {
                break;
            }
        }
    }
}

/**
 * for (let i = 0; i < pawn_direction.length; i++) {
                        j = 0;
                        if (!chessboard[row + pawn_direction[i][j]][[col + pawn_direction[i][j + 1]]].dataset.isOccupied === "true")
 */