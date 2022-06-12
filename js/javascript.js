const gameBoard = (() => {
  let choice = [];

  const createChoiceAndBox = (e) => {
    sign: this.sign;
    boxId: e.target.getAttribute("data-id");
    return { sign: this.sign, boxId: e.target.getAttribute("data-id") };
  };

  const pushChoiceAndBox = (e) => {
    const isChoice = createChoiceAndBox(e);
    choice.push(isChoice);
    return choice;
  };

  const createBoxArray = () => {
    const box = document.querySelectorAll(".box");
    let boxArray = [];
    box.forEach((item) => boxArray.push(item));
    return boxArray;
  };

  const displaySigns = (e) => {
    const isChoiceArray = pushChoiceAndBox(e);
    const isBoxArray = createBoxArray();
    const isFilteredBoxArray = isBoxArray.filter(
      (item) =>
        item.getAttribute("data-id") ==
        isChoiceArray[isChoiceArray.length - 1]["boxId"]
    );
    const isClickedElement = isFilteredBoxArray[0];
    if (
      gameFlow.isRoundCounter % 2 === 0 &&
      isClickedElement.textContent === ""
    ) {
      isClickedElement.textContent = "X";
      gameFlow.isRoundCounter++;
      return;
    }
    if (
      gameFlow.isRoundCounter % 2 != 0 &&
      isClickedElement.textContent === ""
    ) {
      isClickedElement.textContent = "O";
      gameFlow.isRoundCounter++;
      return;
    }
  };

  const createOverlay = () => {
    document.querySelector(".overlay").classList.add("active");
    document.querySelector(".overlay").addEventListener("click", removeOverlay);
  };

  const displayPlayerForm = () => {
    document.querySelector(".form-container").classList.add("active");
    document
      .querySelector(".overlay")
      .addEventListener("click", removePlayerForm);
    document
      .querySelector("#submit-player-form")
      .addEventListener("click", removePlayerForm);
    document
      .querySelector("#submit-player-form")
      .addEventListener("click", removeOverlay);
  };

  const removeOverlay = () => {
    document.querySelector(".overlay").classList.remove("active");
  };

  const removePlayerForm = () => {
    document.querySelector(".form-container").classList.remove("active");
  };

  const printPlayerName = () => {
    if (gameFlow.isPlayerArray.length === 1) {
      return (document.querySelector(
        "#header-player-name-selection1"
      ).textContent = gameFlow.isPlayerArray[0].name);
    }
    if (gameFlow.isPlayerArray.length === 2) {
      document.querySelector("#header-player-name-selection2").textContent =
        gameFlow.isPlayerArray[1].name;
      gameFlow.playRound();
    }
  };

  return {
    displaySigns,
    createOverlay,
    displayPlayerForm,
    choice,
    printPlayerName,
    createBoxArray,
  };
})();

const gameFlow = (() => {
  let isPlayerArray = [];
  let isRoundCounter = 0;

  const displayForm = () => {
    gameBoard.createOverlay();
    gameBoard.displayPlayerForm();
  };

  const getPlayerInput = (e) => {
    e.preventDefault();
    const isPlayerName = document.querySelector("#player-name").value;

    if (isPlayerArray.length > 1) return;
    if (isPlayerArray[0] === undefined) {
      const isSign = document.querySelector(`input[name="sign"]:checked`).value;
      const isPlayer = player(isPlayerName, isSign);
      savePlayer(isPlayer);
      return gameBoard.printPlayerName();
    }
    if (isPlayerArray[0]["sign"] === "X") {
      const isSign = "O";
      const isPlayer = player(isPlayerName, isSign);
      savePlayer(isPlayer);
      return gameBoard.printPlayerName();
    } else {
      const isSign = "X";
      const isPlayer = player(isPlayerName, isSign);
      savePlayer(isPlayer);
      gameBoard.printPlayerName();
    }
  };

  const savePlayer = (isPlayer) => {
    isPlayerArray.push(isPlayer);
  };

  const resetGame = () => {
    gameFlow.isPlayerArray.length = 0;
    gameBoard.choice.length = 0;
    gameFlow.isRoundCounter = 0;
    const isBoxArray = gameBoard.createBoxArray();
    isBoxArray.forEach((item) => (item.textContent = ""));
    document.querySelector("#header-player-name-selection1").textContent =
      "Enter name";
    document.querySelector("#header-player-name-selection2").textContent =
      "Enter name";
    document
      .querySelectorAll(".box")
      .forEach((item) =>
        item.removeEventListener("click", gameBoard.displaySigns)
      );
  };

  const playRound = () => {
    document
      .querySelectorAll(".box")
      .forEach((item) =>
        item.addEventListener("click", gameBoard.displaySigns)
      );
  };

  return {
    displayForm,
    getPlayerInput,
    resetGame,
    isPlayerArray,
    playRound,
    isRoundCounter,
  };
})();

const player = (name, sign) => {
  this.name = name;
  this.sign = sign;

  return { name, sign };
};

// Event listener's

document
  .querySelector("#header-player-name-selection1")
  .addEventListener("click", gameFlow.displayForm);

document
  .querySelector("#header-player-name-selection2")
  .addEventListener("click", gameFlow.displayForm);

document
  .querySelector("#submit-player-form")
  .addEventListener("click", gameFlow.getPlayerInput);

document
  .querySelector("#start-restart-game")
  .addEventListener("click", gameFlow.resetGame);
