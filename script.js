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

const backButton =
  document.querySelector(".js-back");

const resultVideo =
  document.querySelector(".result-video");


// =========================================
// NO BUTTON TEXT
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


// =========================================
// NO BUTTON - DESKTOP
// =========================================

noButton.addEventListener(
  "mouseenter",
  moveNoButton
);


// =========================================
// NO BUTTON - MOBILE
// =========================================

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


  // Make YES bigger
  const scale =
    Math.min(
      1 + noCount * 0.04,
      1.3
    );


  yesButton.style.transform =
    `scale(${scale})`;


  // Screen padding
  const padding = 15;


  // Maximum position
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


  // Move button
  noButton.style.position =
    "fixed";


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

    // =====================================
    // DISABLE BUTTONS
    // =====================================

    yesButton.disabled = true;

    noButton.disabled = true;


    // =====================================
    // PREPARE VIDEO
    // =====================================

    resultVideo.pause();

    resultVideo.currentTime = 0;

    resultVideo.muted = false;

    resultVideo.volume = 1;


    // =====================================
    // START VIDEO IMMEDIATELY
    // =====================================

    const playPromise =
      resultVideo.play();


    if (playPromise !== undefined) {

      playPromise
        .then(() => {

          console.log(
            "❤️ Video started with sound!"
          );

        })
        .catch((error) => {

          console.error(
            "Video playback error:",
            error
          );


          /*
            Browser may block
            autoplay with sound.
          */

          resultVideo.controls = true;

        });

    }


    // =====================================
    // HIDE QUESTION
    // =====================================

    questionCard.style.display =
      "none";


    // =====================================
    // SHOW LOADER
    // =====================================

    loader.style.display =
      "flex";


    // =====================================
    // WAIT 2.5 SECONDS
    // =====================================

    setTimeout(() => {

      // Hide loader
      loader.style.display =
        "none";


      // Show success
      successCard.style.display =
        "block";


      // Create hearts
      createHearts();

    }, 2500);

  }
);


// =========================================
// BACK BUTTON
// =========================================

backButton.addEventListener(
  "click",
  () => {

    // =====================================
    // STOP VIDEO
    // =====================================

    resultVideo.pause();

    resultVideo.currentTime = 0;


    // Reset video settings
    resultVideo.muted = false;

    resultVideo.volume = 1;


    // Hide controls
    resultVideo.controls = false;


    // =====================================
    // HIDE SUCCESS
    // =====================================

    successCard.style.display =
      "none";


    // =====================================
    // SHOW QUESTION
    // =====================================

    questionCard.style.display =
      "block";


    // =====================================
    // RESET YES
    // =====================================

    yesButton.disabled = false;

    yesButton.style.transform =
      "scale(1)";


    // =====================================
    // RESET NO
    // =====================================

    noButton.disabled = false;

    noButton.textContent =
      "No ×";


    noButton.style.position =
      "";

    noButton.style.left =
      "";

    noButton.style.top =
      "";

    noButton.style.transform =
      "";


    // =====================================
    // RESET COUNTER
    // =====================================

    noCount = 0;

  }
);


// =========================================
// FLOATING HEARTS
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


  for (
    let i = 0;
    i < 35;
    i++
  ) {

    const heart =
      document.createElement("div");


    heart.className =
      "success-heart-float";


    // Random heart
    heart.textContent =
      hearts[
        Math.floor(
          Math.random() *
          hearts.length
        )
      ];


    // Random horizontal position
    heart.style.left =
      Math.random() * 100 + "vw";


    // Random size
    heart.style.fontSize =
      `${18 + Math.random() * 25}px`;


    // Random animation speed
    heart.style.animationDuration =
      `${2.5 + Math.random() * 2.5}s`;


    // Random animation delay
    heart.style.animationDelay =
      `${Math.random() * 1.5}s`;


    // Add to page
    document.body.appendChild(
      heart
    );


    // Remove after animation
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

    noButton.style.position =
      "";

    noButton.style.left =
      "";

    noButton.style.top =
      "";

    noButton.style.transform =
      "";

  }
);
