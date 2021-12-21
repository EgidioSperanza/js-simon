let userClickedPattern = [];
let gamePattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let gameStarted = false;
let level = 0;
const btn = document.querySelectorAll(".btn");
const lvlTitle = document.getElementById("level-title");

//Start Game
document.addEventListener("keydown", function () {
  if (!gameStarted) {
    lvlTitle.textContent = "Level " + level;
    nextSequence();
    gameStarted = true;
  }
});

//Click user
for (let i = 0; i < btn.length; i++) {
  btn[i].addEventListener("click", function () {
    let userChosenColour = this.getAttribute("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  });
}

//CHECK
function checkAnswer(currentLevel) {
  const body = document.getElementsByTagName("body")[0];
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success"); //DEBUG
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong"); //DEBUG
    playSound("wrong");
    body.classList.add("game-over");
    setTimeout(function () {
      body.classList.remove("game-over");
    }, 200);
    lvlTitle.textContent = "Game Over, Press Any Key to Restart";
    startOver();
  }
}

//Restart
function startOver() {
  gameStarted = false;
  level = 0;
  gamePattern = [];
}

//Random
function nextSequence() {
  userClickedPattern = [];
  level++;
  lvlTitle.textContent = "Level " + level;
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  document.getElementById(randomChosenColour).classList.add("fade_in");
  setTimeout(function () {
    document.getElementById(randomChosenColour).classList.remove("fade_in");
  }, 100);
  playSound(randomChosenColour);
}

//Start Sound
function playSound(name) {
  let audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

//Press button Animation
function animatePress(currentColor) {
  currentColor = document.getElementById(currentColor);
  currentColor.classList.add("pressed");
  setTimeout(function () {
    currentColor.classList.remove("pressed");
  }, 100);
}
