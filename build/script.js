"use strict";

const btnSubmitP1 = document.querySelector(".submit--0");
const btnSubmitP2 = document.querySelector(".submit--1");
const btnAttackP1 = document.querySelector(".attack--0");
const btnAttackP2 = document.querySelector(".attack--1");
const startModal = document.querySelector(".startModal");
const modal = document.querySelector(".modal");
const btnRestart = document.querySelector(".restart");
const overlayStart = document.querySelector(".overlayStart");
const overlay = document.querySelector(".overlay");
const btnStartGame = document.querySelector(".startGame");
const inputName = document.querySelector(".playerNameInput");

let playerShips = [];
let botShips = [];
let playerShipsEl = [];
let botShipsEl = [];
let numberOfShips,
  selection,
  guessP1,
  guessBot,
  guessP1El,
  guessBotEl,
  currentScoreP1,
  currentScoreP2,
  winningResult;

const gameStart = () => {
  if (inputName.value !== "") {
    document.querySelector(".player1").textContent = inputName.value;
    startModal.classList.add("hidden");
    overlayStart.classList.add("hidden");
  }
};
const closeStartModal = () => {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") gameStart();
  });
  document.addEventListener("click", gameStart);
};

const init = () => {
  closeStartModal();
  currentScoreP1 = 0;
  currentScoreP2 = 0;
  selection = 0;
  numberOfShips = 0;
  guessP1 = 0;
  guessBot = 0;
  guessP1El = 0;
  guessBotEl = 0;
  winningResult = 4;

  playerShipsEl = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];

  playerShips = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];

  botShipsEl = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];

  botShips = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];
  btnSubmitP2.style.pointerEvents = "none";
  btnAttackP2.style.pointerEvents = "none";
};

const defaultBtnColor = () => {
  btnSubmitP1.style.backgroundColor = "";
  btnSubmitP2.style.backgroundColor = "";
  btnAttackP1.style.backgroundColor = "";
  btnAttackP2.style.backgroundColor = "";
};

// Switching active colors of the players
const switchToPlayer1 = () => {
  document.querySelector(".player2").classList.remove("--active");
  document.querySelector(".player1").classList.add("--active");
  defaultBtnColor();
};

const switchToPlayer2 = () => {
  document.querySelector(".player1").classList.remove("--active");
  document.querySelector(".player2").classList.add("--active");
  defaultBtnColor();
};

//
const btnStates = () => {
  btnSubmitP1.style.pointerEvents = "none";
  btnAttackP1.style.pointerEvents = "none";
};

const clearSelectionP1 = () => {
  for (let i = 0; i < playerShipsEl.length; i++) {
    for (let j = 0; j < playerShipsEl[i].length; j++) {
      playerShipsEl[i][j].textContent = "";
    }
  }
};

const choosingPhaseP1 = () => {
  btnStates();
  for (let i = 0; i < playerShipsEl.length; i++) {
    for (let j = 0; j < playerShipsEl[i].length; j++) {
      playerShipsEl[i][j] = document.getElementById(`s${i}${j}`);
      playerShipsEl[i][j].addEventListener("click", () => {
        if (numberOfShips < 4) {
          playerShipsEl[i][j].textContent = "🚢";
          playerShipsEl[i][j].style.pointerEvents = "none";
          playerShips[i][j] = 1;
          numberOfShips++;
        } else {
          return;
        }
        if (numberOfShips === 4) {
          btnSubmitP1.style.backgroundColor = "green";
          btnSubmitP1.style.pointerEvents = "all";
          document.querySelector("#gameboard1").style.pointerEvents = "none";
        }
        console.log(playerShips);
      });
    }
  }
};

// In the first version it was made with two real players

/* const choosingPhaseP2 = () => {
  btnStates();
  for (let i = 0; i < botShipsEl.length; i++) {
    for (let j = 0; j < botShipsEl[i].length; j++) {
      botShipsEl[i][j] = document.getElementById(`d${i}${j}`);
      botShipsEl[i][j].addEventListener("click", () => {
        if (numberOfShips < 4) {
          botShipsEl[i][j].textContent = "🚢";
          botShips[i][j] = 1;
          numberOfShips++;
        } else {
          return;
        }
        if (numberOfShips === 4) {
          btnSubmitP2.style.backgroundColor = "green";
          btnSubmitP2.style.pointerEvents = "all";
        }
      });
    }
  }
}; */

const botEl = () => {
  for (let i = 0; i < botShipsEl.length; i++) {
    for (let j = 0; j < botShipsEl[i].length; j++) {
      botShipsEl[i][j] = document.getElementById(`d${i}${j}`);
    }
  }
};

const choosingPhaseBot = () => {
  botEl();
  console.log(botShips);
  for (let k = 0; k < 4; k++) {
    let i = Math.trunc(Math.random() * 5);
    let j = Math.trunc(Math.random() * 5);
    if (botShips[i][j] === 0) {
      botShips[i][j] = 1;
    } else {
      k--;
    }
  }
  setTimeout(() => {
    switchToPlayer1();
    guessingP1();
  }, 1);
};

const guessingP1 = () => {
  btnStates();
  document.querySelector("#gameboard1").style.pointerEvents = "none";
  document.querySelector("#gameboard2").style.pointerEvents = "all";
  for (let i = 0; i < botShipsEl.length; i++) {
    for (let j = 0; j < botShipsEl[i].length; j++) {
      botShipsEl[i][j].addEventListener("click", () => {
        if (selection < 1) {
          guessP1 = botShips[i][j];
          guessP1El = botShipsEl[i][j];
          guessP1El.style.pointerEvents = "none";
          botShipsEl[i][j].style.backgroundColor = "black";
          botShipsEl[i][j].textContent = "❌";
          selection++;
          btnAttackP1.style.pointerEvents = "all";
          btnAttackP1.style.backgroundColor = "green";
          document.querySelector("#gameboard2").style.pointerEvents = "none";
        }
      });
    }
  }
};

/* const guessingP2 = () => {
  btnStates();
  document.querySelector("#gameboard2").style.pointerEvents = "none";
  document.querySelector("#gameboard1").style.pointerEvents = "all";
  for (let i = 0; i < playerShipsEl.length; i++) {
    for (let j = 0; j < playerShipsEl[i].length; j++) {
      playerShipsEl[i][j].addEventListener("click", () => {
        if (selection < 1) {
          guessBot = playerShips[i][j];
          guessBotEl = playerShipsEl[i][j];
          playerShipsEl[i][j].style.backgroundColor = "black";
          playerShipsEl[i][j].textContent = "❌";
          selection++;
          btnAttackP2.style.pointerEvents = "all";
          btnAttackP2.style.backgroundColor = "green";
          document.querySelector("#gameboard1").style.pointerEvents = "none";
        }
      });
    }
  }
}; */

const guessingBot = () => {
  document.querySelector("#gameboard2").style.pointerEvents = "none";
  document.querySelector("#gameboard1").style.pointerEvents = "all";
  for (let k = 0; k < 1; k++) {
    let i = Math.trunc(Math.random() * 5);
    let j = Math.trunc(Math.random() * 5);
    console.log(playerShips[i][j]);
    console.log(playerShips);
    if (playerShips[i][j] !== 2) {
      guessBot = playerShips[i][j];
      guessBotEl = playerShipsEl[i][j];
      setTimeout(() => {
        playerShipsEl[i][j].style.backgroundColor = "black";
        playerShipsEl[i][j].textContent = "❌";
      }, 1);
      setTimeout(() => {
        if (guessBot === 1) {
          guessBotEl.textContent = "🔥";
          guessBotEl.style.backgroundColor = "transparent";
          currentScoreP2 += 1;
          document.querySelector(".current--1").textContent = currentScoreP2;
          document.querySelector("#gameboard1").style.pointerEvents = "all";
          playerShips[i][j] = 2;
          if (currentScoreP2 === winningResult) {
            document.querySelector(".msgWin").textContent = "Mr. Robot won! 🤖";
            endGame();
          }
          selection = 0;
          switchToPlayer1();
          guessingP1();
        } else {
          guessBotEl.textContent = "💧";
          guessBotEl.style.backgroundColor = "transparent";
          document.querySelector("#gameboard1").style.pointerEvents = "all";
          playerShips[i][j] = 2;
          selection = 0;
          switchToPlayer1();
          guessingP1();
        }
      }, 1);
    } else {
      k--;
    }
  }
};

const endGame = () => {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  btnRestart.addEventListener("click", () => {
    location.reload();
    return false;
  });
};

// Reset the values and start game with Player 1 choosing the ship position
init();
choosingPhaseP1();

btnSubmitP1.addEventListener("click", () => {
  numberOfShips = 0;
  clearSelectionP1();
  switchToPlayer2();
  choosingPhaseBot();
});

btnAttackP1.addEventListener("click", () => {
  if (guessP1 === 1) {
    guessP1El.textContent = "🔥";
    guessP1El.style.backgroundColor = "transparent";
    currentScoreP1 += 1;
    document.querySelector(".current--0").textContent = currentScoreP1;
    document.querySelector("#gameboard2").style.pointerEvents = "all";
    if (currentScoreP1 === winningResult) {
      document.querySelector(".msgWin").textContent = `Congrats, you won! 
      🏆🥇`;
      endGame();
    }
    selection = 0;
    switchToPlayer2();
    guessingBot();
  } else {
    guessP1El.textContent = "💧";
    guessP1El.style.backgroundColor = "transparent";
    document.querySelector("#gameboard2").style.pointerEvents = "all";
    selection = 0;
    switchToPlayer2();
    guessingBot();
  }
});

/* btnAttackP2.addEventListener("click", () => {
  if (guessBot === 1) {
    guessBotEl.textContent = "🔥";
    guessBotEl.style.backgroundColor = "transparent";
    currentScoreP2 += 1;
    document.querySelector(".current--1").textContent = currentScoreP2;
    document.querySelector("#gameboard1").style.pointerEvents = "all";
    if (currentScoreP2 === winningResult) {
      endGame();
    }
    selection = 0;
    switchToPlayer1();
    guessingP1();
  } else {
    guessBotEl.textContent = "💧";
    guessBotEl.style.backgroundColor = "transparent";
    document.querySelector("#gameboard1").style.pointerEvents = "all";
    selection = 0;
    switchToPlayer1();
    guessingP1();
  }
}); */
