import React, { useEffect, useState } from "react";

import "./App.css";


const Tictactoe = () => {
  const [boxes, setBoxes] = useState(["", "", "", "", "", "", "", "", ""]);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [running, setRunning] = useState(true);


  const winConditions = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6], 
  ];


  const boxClicked = (boxIndex) => {
    if (boxes[boxIndex] !== "" || !running) {
      return;
    }

    const updatedBoxes = [...boxes];
    updatedBoxes[boxIndex] = currentPlayer;
    setBoxes(updatedBoxes);

    checkWinner(updatedBoxes);
  };

 
  const checkWinner = (updatedBoxes) => {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
      const condition = winConditions[i];
      const boxA = updatedBoxes[condition[0]];
      const boxB = updatedBoxes[condition[1]];
      const boxC = updatedBoxes[condition[2]];

      if (boxA === "" || boxB === "" || boxC === "") {
        continue;
      }

      if (boxA === boxB && boxB === boxC) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      setRunning(false);
      showAlert(`${currentPlayer} wins!`);
    } else if (!updatedBoxes.includes("")) {
      setRunning(false);
      showAlert("It's a draw!");
    } else {
      changePlayer();
    }
  };

 
  const changePlayer = () => {
    const nextPlayer = currentPlayer === "X" ? "O" : "X";
    setCurrentPlayer(nextPlayer);
  };

 
  const showAlert = (message) => {
    alert(message);
  };

 
  const restartGame = () => {
    setCurrentPlayer("X");
    setBoxes(["", "", "", "", "", "", "", "", ""]);
    setRunning(true);
  };

  useEffect(() => {
    if (running) {
      document.title = `${currentPlayer}'s turn`;
    } else {
      document.title = "Tic Tac Toe";
    }
  }, [currentPlayer, running]);

  return (
    <>
      <div className="m-5 p-5 border rounded">
        <div id="game">
          <h1>Tic Tac Toe</h1>

          <div id="boxContainer">
            {boxes.map((box, index) => (
              <div
                key={index}
                className="box"
                onClick={() => boxClicked(index)}
              >
                {box}
              </div>
            ))}
          </div>

          <h2 id="statusText">{running ? `${currentPlayer}'s turn` : ""}</h2>

          <button id="restartBtn" onClick={restartGame}>
            Play again!
          </button>
        </div>
      </div>
    </>
  );
};

export default Tictactoe;
