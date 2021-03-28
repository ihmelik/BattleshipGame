"use strict";

const btnSubmitP1 = document.querySelector(".submit--0");
const btnSubmitP2 = document.querySelector(".submit--1");
const btnAttackP1 = document.querySelector(".attack--0");
const btnAttackP2 = document.querySelector(".attack--1");
const modal = document.querySelector(".modal");
const btnRestart = document.querySelector(".restart");
const overlay = document.querySelector(".overlay");

let pOneShips = [];
let pTwoShips = [];
let pOneShipsEl = [];
let pTwoShipsEl = [];
let numberOfShips,
  selection,
  guessP1,
  guessP2,
  guessP1El,
  guessP2El,
  currentScoreP1,
  currentScoreP2,
  winningResult;

const init = () => {
  currentScoreP1 = 0;
  currentScoreP2 = 0;
  selection = 0;
  numberOfShips = 0;
  guessP1 = 0;
  guessP2 = 0;
  guessP1El = 0;
  guessP2El = 0;
  winningResult = 4;

  pOneShipsEl = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];

  pOneShips = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];

  pTwoShipsEl = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];

  pTwoShips = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];
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
  btnSubmitP2.style.pointerEvents = "none";
  btnAttackP1.style.pointerEvents = "none";
  btnAttackP2.style.pointerEvents = "none";
};

const clearSelectionP1 = () => {
  for (let i = 0; i < pOneShipsEl.length; i++) {
    for (let j = 0; j < pOneShipsEl[i].length; j++) {
      pOneShipsEl[i][j].textContent = "";
    }
  }
};

const clearSelectionP2 = () => {
  for (let i = 0; i < pTwoShipsEl.length; i++) {
    for (let j = 0; j < pTwoShipsEl[i].length; j++) {
      pTwoShipsEl[i][j].textContent = "";
    }
  }
};

const choosingPhaseP1 = () => {
  btnStates();
  for (let i = 0; i < pOneShipsEl.length; i++) {
    for (let j = 0; j < pOneShipsEl[i].length; j++) {
      pOneShipsEl[i][j] = document.getElementById(`s${i}${j}`);
      pOneShipsEl[i][j].addEventListener("click", () => {
        if (numberOfShips < 4) {
          pOneShipsEl[i][j].textContent = "🚢";
          pOneShips[i][j] = 1;
          numberOfShips++;
        } else {
          return;
        }
        if (numberOfShips === 4) {
          btnSubmitP1.style.backgroundColor = "green";
          btnSubmitP1.style.pointerEvents = "all";
        }
        console.log(pOneShips);
      });
    }
  }
};

const choosingPhaseP2 = () => {
  btnStates();
  for (let i = 0; i < pTwoShipsEl.length; i++) {
    for (let j = 0; j < pTwoShipsEl[i].length; j++) {
      pTwoShipsEl[i][j] = document.getElementById(`d${i}${j}`);
      pTwoShipsEl[i][j].addEventListener("click", () => {
        if (numberOfShips < 4) {
          pTwoShipsEl[i][j].textContent = "🚢";
          pTwoShips[i][j] = 1;
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
};

const guessingP1 = () => {
  btnStates();
  document.querySelector("#gameboard1").style.pointerEvents = "none";
  document.querySelector("#gameboard2").style.pointerEvents = "all";
  for (let i = 0; i < pTwoShipsEl.length; i++) {
    for (let j = 0; j < pTwoShipsEl[i].length; j++) {
      pTwoShipsEl[i][j].addEventListener("click", () => {
        if (selection < 1) {
          guessP1 = pTwoShips[i][j];
          guessP1El = pTwoShipsEl[i][j];
          pTwoShipsEl[i][j].style.backgroundColor = "black";
          pTwoShipsEl[i][j].textContent = "❌";
          selection++;
          btnAttackP1.style.pointerEvents = "all";
          btnAttackP1.style.backgroundColor = "green";
          document.querySelector("#gameboard2").style.pointerEvents = "none";
        }
      });
    }
  }
};

const guessingP2 = () => {
  btnStates();
  document.querySelector("#gameboard2").style.pointerEvents = "none";
  document.querySelector("#gameboard1").style.pointerEvents = "all";
  for (let i = 0; i < pOneShipsEl.length; i++) {
    for (let j = 0; j < pOneShipsEl[i].length; j++) {
      pOneShipsEl[i][j].addEventListener("click", () => {
        if (selection < 1) {
          guessP2 = pOneShips[i][j];
          guessP2El = pOneShipsEl[i][j];
          pOneShipsEl[i][j].style.backgroundColor = "black";
          pOneShipsEl[i][j].textContent = "❌";
          selection++;
          btnAttackP2.style.pointerEvents = "all";
          btnAttackP2.style.backgroundColor = "green";
          document.querySelector("#gameboard1").style.pointerEvents = "none";
        }
      });
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
  choosingPhaseP2();
});

btnSubmitP2.addEventListener("click", () => {
  clearSelectionP2();
  switchToPlayer1();
  guessingP1();
});

btnAttackP1.addEventListener("click", () => {
  if (guessP1 === 1) {
    guessP1El.textContent = "🔥";
    guessP1El.style.backgroundColor = "transparent";
    currentScoreP1 += 1;
    document.querySelector(".current--0").textContent = currentScoreP1;
    document.querySelector("#gameboard2").style.pointerEvents = "all";
    if (currentScoreP1 === winningResult) {
      endGame();
    }
    selection = 0;
    switchToPlayer2();
    guessingP2();
  } else {
    guessP1El.textContent = "💧";
    guessP1El.style.backgroundColor = "transparent";
    document.querySelector("#gameboard2").style.pointerEvents = "all";
    selection = 0;
    switchToPlayer2();
    guessingP2();
  }
});

btnAttackP2.addEventListener("click", () => {
  if (guessP2 === 1) {
    guessP2El.textContent = "🔥";
    guessP2El.style.backgroundColor = "transparent";
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
    guessP2El.textContent = "💧";
    guessP2El.style.backgroundColor = "transparent";
    document.querySelector("#gameboard1").style.pointerEvents = "all";
    selection = 0;
    switchToPlayer1();
    guessingP1();
  }
});
