let boxes = document.querySelectorAll('.cell');
let resetBin = document.querySelector("#reset-btn");
let turnO = true; //playerX, playerO
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
boxes.forEach((box) => {
    box.addEventListener("click", () => {
      console.log("box was clicked");
      if(turnO){
        box.innerText = "O";
        turnO = false;
      } else {
        box.innerText = "X";
        turnO = true;
      }
      box.ariaDisabled= true;
      checkwinner();
    });
});
const checkwinner = () => {
    let currentPlayer = turnO ? "O" : "X";
    for (let pattern of winPatterns) {
        if (pattern.every(index => boxes[index].innerText === currentPlayer)) {
            alert(`${currentPlayer} wins!`);
            
            resetGame();
            return;
        }
    }
    if ([...boxes].every(box => box.innerText)) {
        alert("It's a draw!");
        resetGame();
    }
};
const resetGame = () => {
    boxes.forEach(box => {
        box.innerText = "";
        box.ariaDisabled = false;
    });
    turnO = true; // Reset to player O's turn
};
resetBin.addEventListener("click", resetGame);
// Add event listener to reset button
resetBin.addEventListener("click", () => {
    boxes.forEach(box => {
        box.innerText = "";
        box.ariaDisabled = false;
    });
    turnO = true; // Reset to player O's turn
});
// Add event listener to each box
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") {
            box.innerText = turnO ? "O" : "X";
            box.ariaDisabled = true;
            turnO = !turnO; // Switch turns
            checkwinner();
        }
    });
});
function checkWinner() {
  const currentPlayer = turnO ? "O" : "X";

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      boxes[a].innerText === currentPlayer &&
      boxes[b].innerText === currentPlayer &&
      boxes[c].innerText === currentPlayer
    ) {
      // Show congratulatory message
      document.getElementById("status").innerHTML = `
         <strong>Congratulations!</strong> Player <span style="color: green;">${currentPlayer}</span> wins! 🏆
      `;
      gameActive = false;
      disableAllBoxes();
      return;
    }
  }

  if ([...boxes].every(box => box.innerText !== "")) {
    document.getElementById("status").innerHTML = `🤝 It's a draw! No one wins.`;
    gameActive = false;
  }
}


