//funzione per generare numeri random in un range 1-9
const getRandomNumber = (min, max) =>
  Math.round(Math.random() * (max - min)) + min;
//inserisco in un array 5 numeri random non ripetuti
function computerNum() {
  const min = 1;
  const max = 9;
  const qtyNum = 5;
  const numbers = [];
  while (numbers.length < qtyNum) {
    const randomNum = getRandomNumber(min, max);
    numbers.push(randomNum);
  }
  return numbers;
}

function createBoxNum(max, arr) {
  for (let i = 0; i < max; i++) {
    const numBox = document.createElement("div");
    numBox.className = "game_number";
    numBox.innerText = arr[i];
    containerGame.append(numBox);
  }
}

function createBoxUserNum(max) {
  for (let i = 1; i <= max; i++) {
    const numBox = document.createElement("div");
    numBox.className = "game_number";
    numBox.classList.add("clickable");
    numBox.innerText = i;
    containerGame.append(numBox);
  }
}

function compareSequence(arr, arr2) {
  let counter = 0;
  let included = 0;
  let comparePosition = [];
  let compareInclusive = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === arr2[i]) {
      counter++;
      comparePosition.push(arr[i]);
    } else {
      comparePosition.push("x");
    }
    if (arr.includes(arr2[i])) {
      included++;
      compareInclusive.push(arr2[i]);
    } else {
      compareInclusive.push("x");
    }
  }
  if (counter === arr.length && counter === included) {
    containerGame.innerHTML +=
      "<h1>Bravo hai memorizzato perfettamente la sequenza</h1>";
  } else if (included === arr.length && counter > 0) {
    containerGame.innerHTML += `<h1>Hai memorizzato tutti i numeri della sequenza ma la posizione è giusta solo per ${comparePosition}</h1>`;
  } else if (included === arr.length && counter === 0) {
    containerGame.innerHTML += `<h1>Hai memorizzato tutti numeri della sequenza ma nessunodi essi è stato posizionato correttamente. La sequenza giusta era ${pcRandom}</h1>`;
  } else if (included === 0) {
    containerGame.innerHTML += `<h1>Come hai fatto non lo so, epppure non hai memorizzato nessun numero della sequenza che era ${pcRandom}</h1>`;
  } else {
    containerGame.innerHTML += `<h1>Hai memorizzato ${included} numeri della sequenza Disponendone bene ${counter} di essi.<br />
        la Sequenza corretta era ${arr}</h1>`;
  }
}

function simonGame() {
  const pcRandom = computerNum();
  const userNum = [];

  createBoxNum(pcRandom.length, pcRandom);

  containerGame.innerHTML +=
    "<h1>Memorizza la sequenza di numeri e non trascurare il loro ordine!</h1>";

  const userArr = [];
  setTimeout(function () {
    containerGame.innerHTML = "";
    createBoxUserNum(9);
    containerGame.innerHTML +=
      "<h1>Clicca sui numeri nell'ordine che sei riuscito a memorizzare poco fa.</h1>";

    const limits = containerGame.childElementCount - 1; //Togliamo il Messaggio
    let click = 0;
    for (let i = 0; i < limits; i++) {
      containerGame.children.item(i).addEventListener("click", function () {
        // console.log(i + 1); //DEBUG
        click++;
        if (click < 5) {
          userArr.push(i + 1);
        } else {
          userArr.push(i + 1);
          //   console.log(userArr);//DEBUG
          containerGame.innerHTML = "";
          createBoxNum(userArr.length, userArr);
          containerGame.innerHTML +=
            "<h1>Ecco i numeri che hai memorizzato</h1>";

          compareSequence(pcRandom, userArr);
          resetGame(containerGame);
        }
      });
    }
  }, 3000);
}

function startGame(button) {
  button.addEventListener("click", function () {
    containerGame.innerHTML = "";
    simonGame();
  });
}

function resetGame(container) {
  const btn = document.createElement("button");
  container.append(btn);
  btn.className = "reset";
  btn.textContent = "Gioca!";
  startGame(btn);
}

const containerGame = document.getElementById("game");
const play = document.querySelector(".play");

startGame(play);
