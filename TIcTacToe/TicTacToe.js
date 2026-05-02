const board = document.getElementById("board");
let currentPlayer = "X";
let cells = ["", "", "", "", "", "", "", "", ""];

function checkWinner() {
  const wins = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];

  for (let combo of wins) {
    const [a,b,c] = combo;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      alert(cells[a] + " win!");
      location.reload();
    }
  }
}

function createBoard() {
  board.innerHTML = "";

  cells.forEach((cell, index) => {
    const div = document.createElement("div");
    div.classList.add("cell");
    div.textContent = cell;

    div.addEventListener("click", () => {
      if (!cells[index]) {
        cells[index] = currentPlayer;
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        createBoard();
        checkWinner();
      }
    });

    board.appendChild(div);
  });
}

createBoard();