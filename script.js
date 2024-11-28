const popup_finish_on = document.querySelector("#turn_on_popup_finish");
const new_game_button = document.querySelector(".new-game");
const exit_button = document.querySelector(".exit");
const score = document.querySelector("#score");

const failed_attempt = document.querySelector("#failed_attempts");
// const closePopup = document.querySelector(".exit");
const scorePopup = document.querySelector("#score-popup");
const commentPopup = document.querySelector(".status");
const score_div_Popup = document.querySelector(".score");

const popup_start = document.querySelector(".popup-content-start");
const popup_finish = document.querySelector(".popup-content-finish");
const overlay = document.querySelector(".overlay");
const imageContainer = document.querySelector(".image-container");
const start = document.querySelector(".start");

let score_counter = 0;
let failed_att_counter = 0;
let clickEnabled = true;
let arr = [];
let images = [];
let level_of_game;

// one option
const easy_level = ["bunny", "tiger", "horse", "bunny", "tiger", "horse"];
// second option
const middle_level = [
  "bunny",
  "tiger",
  "horse",
  "cat",
  "dog",
  "snake",
  "bunny",
  "tiger",
  "horse",
  "cat",
  "dog",
  "snake",
];
const hard_level = [
  "bunny",
  "tiger",
  "horse",
  "cat",
  "dog",
  "snake",
  "bunny",
  "tiger",
  "horse",
  "cat",
  "dog",
  "snake",
  "lion",
  "elephant",
  "lion",
  "elephant",
];
const extra_hard_level = [
  "bunny",
  "tiger",
  "horse",
  "cat",
  "dog",
  "snake",
  "bunny",
  "tiger",
  "horse",
  "cat",
  "dog",
  "snake",
  "lion",
  "elephant",
  "lion",
  "elephant",
  "monkey",
  "giraffe",
  "monkey",
  "giraffe",
];
// turning popup_start on
window.addEventListener("load", () => {
  overlay.classList.add("active");
  popup_start.classList.add("active");
});
function playAgain() {
  overlay.classList.add("active");
  popup_start.classList.add("active");
}

function closePopupstart() {
  overlay.classList.remove("active");
  popup_start.classList.remove("active");
}

start.addEventListener("click", handleStartclick);

function handleStartclick() {
  const level_value = document.querySelector("#level-select").value;

  if (level_value === "easy") {
    level_of_game = easy_level;
  } else if (level_value === "medium") {
    level_of_game = middle_level;
  } else if (level_value === "hard") {
    level_of_game = hard_level;
    imageContainer.classList.add("hard");
  } else {
    level_of_game = extra_hard_level;
    imageContainer.classList.add("extra-hard");
  }
  closePopupstart();
  createBordofimages(level_of_game);
  console.log(level_of_game);
}

// Function to create an image box and add it to the game board
function createdivwithImage(src) {
  let div_image = document.createElement("div");
  div_image.classList.add("image-box");
  let image = document.createElement("img");
  image.classList.add("hidden-image");
  image.src = `./img/${src}.jpg`;
  image.alt = `${src}`;
  div_image.appendChild(image);
  imageContainer.appendChild(div_image);
  return image;
}
// Function to create a randomized board of images
function createBordofimages(arr) {
  const shuffledArray = arr.sort((a, b) => 0.5 - Math.random());
  images = shuffledArray.map((name) => createdivwithImage(name));
  addImageEvenTListeners();
}

function addImageEvenTListeners() {
  images.forEach((image) => {
    image.addEventListener("click", handleImageclick);
  });
}

function handleImageclick(event) {
  const image = event.target;
  if (image.className === "image-revealed" || !clickEnabled) return;

  image.classList.remove("hidden-image");
  image.classList.add("image-revealed");
  arr.push(image);

  if (arr.length === 2) {
    clickEnabled = false;

    if (arr[0].src === arr[1].src) {
      score_counter++;
      score.textContent = score_counter;
      arr = [];
      clickEnabled = true;
    } else {
      failed_att_counter++;
      failed_attempt.innerText = failed_att_counter;
      const [firstImage, secondImage] = arr;
      setTimeout(() => {
        hideBack(firstImage);
        hideBack(secondImage);
        clickEnabled = true;
      }, 1000);
      arr = [];
    }
    console.log(level_of_game.length);

    if (
      failed_att_counter === level_of_game.length / 2 ||
      score_counter === level_of_game.length / 2
    ) {
      openPopupfinish();
      if (level_of_game.length === 6) {
        if (score_counter === 3) {
          commentPopup.innerHTML = "Very good, try next level!";
        } else {
          commentPopup.innerHTML = "Loser, you can't do even this!";
        }
      } else if (level_of_game.length === 12) {
        if (score_counter === 6) {
          commentPopup.innerHTML = "You are cool. Keep going!";
        } else {
          commentPopup.innerHTML = "You could beter! Again?";
        }
      } else if (level_of_game.length === 16) {
        if (score_counter === 8) {
          commentPopup.innerHTML = "You have a good memory";
        } else {
          commentPopup.innerHTML = "Not bad, but try again!";
        }
      } else {
        if (score_counter === 10) {
          commentPopup.innerHTML = "just DONE!";
        } else {
          commentPopup.innerHTML = "Almost!";
        }
      }
    }
  }
}
function hideBack(image) {
  image.classList.remove("image-revealed");
  image.classList.add("hidden-image");
}

function openPopupfinish() {
  scorePopup.textContent = score_counter;
  popup_finish.classList.add("active");
  overlay.classList.add("active");
}
function closePopupfinish() {
  popup_finish.classList.remove("active");
  overlay.classList.remove("active");
}

new_game_button.addEventListener("click", newGame);
exit_button.addEventListener("click", closecurrentTab);

function newGame() {
  if (imageContainer.classList.contains("hard")) {
    imageContainer.classList.remove("hard");
  } else if (imageContainer.classList.contains("extra-hard")) {
    imageContainer.classList.remove("extra-hard");
  }
  imageContainer.innerHTML = "";
  closePopupfinish();
  playAgain();
  score_counter = 0;
  failed_att_counter = 0;
  score.textContent = score_counter;
  failed_attempt.innerText = failed_att_counter;
  images.forEach((image) => {
    if (image.className === "image-revealed") {
      image.classList.remove("image-revealed");
      image.classList.add("hidden-image");
      console.log("was revealed");
    } else return;
  });
}

function closecurrentTab() {
  window.close();
}
