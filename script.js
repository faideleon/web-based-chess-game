const chessboard = [];
instantiatingboard();
instantiatingPieces();
pieceMovements();

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
                    chessboard[i][j].innerHTML += `<img class="chess_pieces" src="ChessPieces/Chess_rdt45.svg">`;
                    chessboard[i][j].dataset.isOccupied = true;

                } else if (j === 1 || j === 6) {
                    chessboard[i][j].innerHTML += `<img class="chess_pieces" src="ChessPieces/Chess_ndt45.svg">`;
                    chessboard[i][j].dataset.isOccupied = true;
                }
                else if (j === 2 || j === 5) {
                    chessboard[i][j].innerHTML += `<img class="chess_pieces" src="ChessPieces/Chess_bdt45.svg">`;
                    chessboard[i][j].dataset.isOccupied = true;
                } else if (j === 3) {
                    chessboard[i][j].innerHTML += `<img class="chess_pieces" src="ChessPieces/Chess_qdt45.svg">`;
                    chessboard[i][j].dataset.isOccupied = true;
                }
                else if (j === 4) {
                    chessboard[i][j].innerHTML += `<img class="chess_pieces" src="ChessPieces/Chess_kdt45.svg">`;
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
                        chessboard[i][j].innerHTML += `<img class="chess_pieces" src="ChessPieces/Chess_blt45.svg">`;
                        chessboard[i][j].dataset.isOccupied = true;
                    } else if (j === 3) {
                        chessboard[i][j].innerHTML += `<img class="chess_pieces" src="ChessPieces/Chess_qlt45.svg">`;
                        chessboard[i][j].dataset.isOccupied = true;
                    }
                    else if (j === 4) {
                        chessboard[i][j].innerHTML += `<img class="chess_pieces" src="ChessPieces/Chess_klt45.svg">`;
                        chessboard[i][j].dataset.isOccupied = true;
                    }
                    break;
                }
            }

        }
    }
}

function pieceMovements() {
    selectPieces();
}

function pawnMovement() {
    let alreadySelected = false;
    let previousPawn;
    const pawns = document.querySelectorAll(".chess_pieces.pawn");
    pawns.forEach(pawn => {
        pawn.addEventListener("click", () => {


            const row = Number(pawn.parentElement.dataset.row);
            const col = Number(pawn.parentElement.dataset.col);

            if (alreadySelected) {
                document.querySelectorAll(".circles").forEach((c) => {
                    c.remove();
                })
                alreadySelected = false;
                if (previousPawn === pawn) {
                    return;
                }

            }


            if (row === 6 && pawn.classList.contains("white")) {
                let i = 1;
                while (i < 3) {
                    const circle = document.createElement("div");
                    circle.classList.add("circles");
                    chessboard[row - i++][col].appendChild(circle);
                }
                previousPawn = pawn;
                alreadySelected = true;

            }

        })
    });
}

function rookMovement() {
    let alreadySelected = false;
    let previousRook;
    const rooks = document.querySelectorAll(".chess_pieces.rook");
    rooks.forEach(rook => {
        rook.addEventListener("click", () => {


            const row = Number(rook.parentElement.dataset.row);
            const col = Number(rook.parentElement.dataset.col);

            if (alreadySelected) {
                document.querySelectorAll(".circles").forEach((c) => {
                    c.remove();
                })
                alreadySelected = false;
                if (previousRook === rook) {
                    return;
                }

            }


            if (row === 7 && rook.classList.contains("white")) {
                let i = 1;
                while (i < 3) {
                    const circle = document.createElement("div");
                    circle.classList.add("circles");
                    chessboard[row - i++][col].appendChild(circle);
                }
                previousrook = rook;
                alreadySelected = true;

            }

        })
    });
}

const pawn_direction = [[-1, 0]]
const rook_direction = [[0, 1], [0, -1], [1, 0], [-1, 0]]
const knight_direction = [[2, 1], [2, -1], [-1, -2], [1, -2], [1, 2], [-1, 2], [-2, 1], [-2, -1]];
const bishop_direction = [[1, 1], [-1, -1], [1, -1], [-1, 1]]
const queen_direction = [...rook_direction, ...bishop_direction]
const king_direction = [queen_direction]




function selectPieces() {
    let alreadySelected = false;
    let previousPiece;
    const type = ["pawn", "rook", "knight", "bishop", "queen", "king"];

    const white_pieces = document.querySelectorAll(".chess_pieces.white");
    white_pieces.forEach(piece => {
        piece.addEventListener("click", () => {
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
                case "pawn": showMoves(row, col, pawn_direction, row === 6 ? 2 : 1); break;


                case "rook": showMoves(row, col, rook_direction, 8); break;

                case "knight": showMoves(row, col, knight_direction, 1); break;
                case "bishop": showMoves(row, col, bishop_direction, 8); break;
                case "queen": showMoves(row, col, queen_direction, 8); break;
                case "king": showMoves(row, col, king_direction, 1); break;
            }
            previousPiece = piece;    // add
            alreadySelected = true;

        });
    });
}

function showMoves(row, col, directions, maxSteps) {
    for (const direction of directions) {
        let r = row;
        let c = col;

        for (let step = 1; step <= maxSteps; step++) {
            r = r + direction[0];
            c = c + direction[1];

            if (r < 0 || r > 7 || c < 0 || c > 7) break;

            if (chessboard[r][c].dataset.isOccupied === "true") {
                break;
            }

            const circle = document.createElement("div");
            circle.classList.add("circles");
            chessboard[r][c].appendChild(circle);
        }
    }
}

/**
 * for (let i = 0; i < pawn_direction.length; i++) {
                        j = 0;
                        if (!chessboard[row + pawn_direction[i][j]][[col + pawn_direction[i][j + 1]]].dataset.isOccupied === "true")
 */