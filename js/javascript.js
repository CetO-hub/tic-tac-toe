const gameBoard = (() => {
  let choice = [];

  const createBoxArray = (e) => {
    const box = document.querySelectorAll(".box");
    let boxArray = [];
    box.forEach((item) => boxArray.push(item));
    return boxArray;
  };

  const setSign = (e) => {
    if (this.sign === "X") {
      choice.push("X");
      displaySigns();
    } else {
      choice.push("O");
      displaySigns();
    }

    const event = e.target;
    console.log(choice);
  };
  const displaySigns = () => {
    const isBoxArray = createBoxArray();
    for (sign of choice) {
      isBoxArray.forEach((item) => (item.innerHTML = sign));
      isBoxArray.shift();
    }
  };

  return { setSign };
})();

const gameFlow = (() => {
  return;
})();

const player = (name, sign) => {
  this.name = name;
  this.sign = sign;

  return { name, sign };
};

document
  .querySelectorAll(".box")
  .forEach((item) => item.addEventListener("click", gameBoard.setSign));
