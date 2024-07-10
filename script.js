document.addEventListener("DOMContentLoaded", () => {
  const cells = document.querySelectorAll(".cell");
  const statusText = document.getElementById("status");
  const restartButton = document.getElementById("restartButton");
  let currentPlayer = "A";
  let gameActive = true;
  const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
  ];
  
  const handleCellClick = (e) => {
      const cell = e.target;
      const cellIndex = parseInt(cell.getAttribute("data-index"));

      if (cell.textContent !== "" || !gameActive) return;

      cell.textContent = currentPlayer;
      cell.classList.add(currentPlayer);

      if (checkWin()) {
          statusText.textContent = `Joueur ${currentPlayer === 'A' ? 'Ayman' : 'Moussa'} a gagné !`;
          gameActive = false;
      } else if (isDraw()) {
          statusText.textContent = "Match nul !";
          gameActive = false;
      } else {
          currentPlayer = currentPlayer === "A" ? "M" : "A";
          statusText.textContent = `C'est le tour de ${currentPlayer === 'A' ? 'Ayman' : 'Moussa'}`;
      }
  };

  const checkWin = () => {
      return winningCombinations.some(combination => {
          return combination.every(index => {
              return cells[index].textContent === currentPlayer;
          });
      });
  };

  const isDraw = () => {
      return [...cells].every(cell => cell.textContent !== "");
  };

  const restartGame = () => {
      currentPlayer = "A";
      gameActive = true;
      statusText.textContent = "C'est le tour de Ayman";
      cells.forEach(cell => {
          cell.textContent = "";
          cell.classList.remove("A");
          cell.classList.remove("M");
      });
  };

  cells.forEach(cell => cell.addEventListener("click", handleCellClick));
  restartButton.addEventListener("click", restartGame);

  restartGame();
});
