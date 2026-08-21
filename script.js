
// =========================================
// ELEMENTS
// =========================================

const questionCard =
  document.querySelector(".question-card");

const successCard =
  document.querySelector(".success-card");

const loader =
  document.querySelector(".loader");

const yesButton =
  document.querySelector(".js-yes");

const noButton =
  document.querySelector(".js-no");

const resultVideo =
  document.querySelector(".result-video");


// =========================================
// NO BUTTON
// =========================================

const noTexts = [
  "No 😢",
  "Are you sure? 🥺",
  "Really? 😭",
  "Think again 💔",
  "Please? 🥹",
  "One more chance ❤️",
  "Try Yes 😏"
];

let noCount = 0;


// Desktop
noButton.addEventListener(
  "mouseenter",
  moveNoButton
);


// Mobile
noButton.addEventListener(
  "touchstart",
  (event) => {

    event.preventDefault();

    moveNoButton();

  }
);


// =========================================
// MOVE NO BUTTON
// =========================================

function moveNoButton() {

  noCount++;


  // Change text
  noButton.textContent =
    noTexts[
      noCount % noTexts.length
    ];


  // Make Yes button stronger
  const scale =
    Math.min(
      1 + noCount * 0.04,
      1.3
    );

  yesButton.style.transform =
    `scale(${scale})`;


  // Screen boundaries
  const padding = 15;

  const maxX =
    window.innerWidth -
    noButton.offsetWidth -
    padding;

  const maxY =
    window.innerHeight -
    noButton.offsetHeight -
    padding;


  // Random position
  const x =
    Math.floor(
      Math.random() *
      Math.max(maxX, padding)
    );

  const y =
    Math.floor(
      Math.random() *
      Math.max(maxY, padding)
    );


  noButton.style.position = "fixed";

  noButton.style.left =
    `${x}px`;

  noButton.style.top =
    `${y}px`;


  // Random rotation
  const rotate =
    Math.floor(
      Math.random() * 20
    ) - 10;

  noButton.style.transform =
    `rotate(${rotate}deg)`;
}


// =========================================
// YES BUTTON
// =========================================

yesButton.addEventListener(
  "click",
  () => {

    // Disable buttons
    yesButton.disabled = true;
    noButton.disabled = true;


    // Hide question
    questionCard.style.display =
      "none";


    // Show loader
    loader.style.display =
      "flex";


    // Wait
    setTimeout(() => {

      // Hide loader
      loader.style.display =
        "none";


      // Show success
      successCard.style.display =
        "block";


      // Play result video
      resultVideo.currentTime = 0;

      resultVideo
        .play()
        .catch(() => {
          console.log(
            "Video autoplay blocked."
          );
        });


      // Hearts
      createHearts();

    }, 2500);

  }
);


// =========================================
// CREATE HEARTS
// =========================================

function createHearts() {

  const hearts = [
    "❤️",
    "💖",
    "💕",
    "💗",
    "💓",
    "💞"
  ];


  for (let i = 0; i < 35; i++) {

    const heart =
      document.createElement("div");


    heart.className =
      "success-heart-float";


    heart.textContent =
      hearts[
        Math.floor(
          Math.random() *
          hearts.length
        )
      ];


    // Position
    heart.style.left =
      Math.random() * 100 + "vw";


    // Size
    heart.style.fontSize =
      `${18 + Math.random() * 25}px`;


    // Speed
    heart.style.animationDuration =
      `${2.5 + Math.random() * 2.5}s`;


    // Delay
    heart.style.animationDelay =
      `${Math.random() * 1.5}s`;


    document.body.appendChild(
      heart
    );


    setTimeout(() => {

      heart.remove();

    }, 6000);

  }
}


// =========================================
// WINDOW RESIZE
// =========================================

window.addEventListener(
  "resize",
  () => {

    noButton.style.position = "";

    noButton.style.left = "";

    noButton.style.top = "";

    noButton.style.transform = "";

  }
);
  
