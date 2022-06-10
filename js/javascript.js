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
    isClickedElement.textContent = this.sign;
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
  };

  const removeOverlay = () => {
    document.querySelector(".overlay").classList.remove("active");
  };

  const removePlayerForm = () => {
    document.querySelector(".form-container").classList.remove("active");
  };

  return { displaySigns, createOverlay, displayPlayerForm };
})();

const gameFlow = (() => {
  return;
})();

const player = (name, sign) => {
  gameBoard.createOverlay();
  gameBoard.displayPlayerForm();
  this.name = name;
  this.sign = sign;

  return { name, sign };
};

document
  .querySelectorAll(".box")
  .forEach((item) => item.addEventListener("click", gameBoard.displaySigns));

document
  .querySelectorAll("#header-player-name-selection1")
  .forEach((item) => item.addEventListener("click", player));

document
  .querySelectorAll("#header-player-name-selection2")
  .forEach((item) => item.addEventListener("click", player));
