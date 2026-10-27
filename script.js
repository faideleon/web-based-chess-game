const chessboard = [];
instantiatingboard();
instantiatingPieces();

function instantiatingboard() {
    const position_col = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    const main = document.querySelector('.main_board');


    let index = 0;
    let num = 1;
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

                element.innerHTML += `<span class="row-label"> ${num++}</span>`;
            }
            chessboard[i][j] = element;
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
                } else if (j === 1 || j === 6) {
                    chessboard[i][j].innerHTML += `<img class="chess_pieces" src="ChessPieces/Chess_ndt45.svg">`;
                }
                else if (j === 2 || j === 5) {
                    chessboard[i][j].innerHTML += `<img class="chess_pieces" src="ChessPieces/Chess_bdt45.svg">`;
                } else if (j === 3) { chessboard[i][j].innerHTML += `<img class="chess_pieces" src="ChessPieces/Chess_qdt45.svg">`; }
                else if (j === 4) { chessboard[i][j].innerHTML += `<img class="chess_pieces" src="ChessPieces/Chess_kdt45.svg">`; }
                    break;
                case 1: {
                    chessboard[i][j].innerHTML += `<img class="chess_pieces" src="ChessPieces/Chess_pdt45.svg">`;
                    break;
                }

                case 6: {
                    chessboard[i][j].innerHTML += `<img class="chess_pieces" src="ChessPieces/Chess_plt45.svg">`;
                    break;
                }
                case 7: {
                    if (j === 0 || j === 7) {
                        chessboard[i][j].innerHTML += `<img class="chess_pieces" src="ChessPieces/Chess_rlt45.svg">`;
                    } else if (j === 1 || j === 6) {
                        chessboard[i][j].innerHTML += `<img class="chess_pieces" src="ChessPieces/Chess_nlt45.svg">`;
                    }
                    else if (j === 2 || j === 5) {
                        chessboard[i][j].innerHTML += `<img class="chess_pieces" src="ChessPieces/Chess_blt45.svg">`;
                    } else if (j === 4) { chessboard[i][j].innerHTML += `<img class="chess_pieces" src="ChessPieces/Chess_qlt45.svg">`; }
                    else if (j === 3) { chessboard[i][j].innerHTML += `<img class="chess_pieces" src="ChessPieces/Chess_klt45.svg">`; }
                    break;
                }
            }

        }
    }
}