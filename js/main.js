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

//Creo i 5 box contenenti i random dell'array
function showPcNum(pcNumFunction, container) {
  let pcNum = pcNumFunction();
  console.log(pcNum); //DEBUG
  for (let i = 0; i < pcNum.length; i++) {
    const box = document.createElement("div");
    container.append(box);
    box.innerText = pcNum[i];
    box.className = "pc_number";
  }
  container.innerHTML += "<h1>Memorizza i numeri e l'ordine</h1>";
  return pcNum;
}
//Creo i 9 box pulsanti numerati per la risposta utente
function userChoiceNum(container, toCompareArr) {
  const userNum = [];
  for (let i = 1; i <= 9; i++) {
    const box = document.createElement("div");
    container.append(box);
    box.innerText = i;
    box.className = "pc_number";
  }
  container.innerHTML +=
    "<h1>Clicca sui numeri nell'ordine che hai memorizzato</h1>";

  for (let i = 0; i < container.childElementCount - 1; i++) {
    container.children.item(i).addEventListener("click", function () {
      console.log(i + 1); //DEBUG
      if (userNum.length < 5) {
        userNum.push(i + 1);
      } else {
        console.log(userNum); //DEBUG
        compareArr(toCompareArr, userNum);
      }
    });
  }
}

//compariamo gli array
function compareArr(firstArray, secondArray) {
  if (firstArray == secondArray) {
    container.innerHTML =
      "<h1>Perfetto! Hai memorizzato perfettamente la sequenza di numeri</h1>";
  }
}

//mostro i numeri dell'array per 30 secondi
function simonGame(showPcNumFunction, userChoiceFunction) {
  const pcArr = showPcNumFunction(computerNum, gameBox);
  setTimeout(function () {
    gameBox.innerHTML = ""; //Creo la scelta utente
    userChoiceFunction(gameBox, pcArr);
  }, 1000);
}

function compareGameNum(container, pcNum, userNum) {
  if (pcNum === userNum) {
    container.innerHTML =
      "<p>Perfetto! Hai memorizzato la sequenza di numeri </p>";
  }
}
const gameBox = document.getElementById("game");
const play = document.getElementById("play");

play.addEventListener("click", function () {
  gameBox.innerHTML = "";
  simonGame(showPcNum, userChoiceNum);
});
