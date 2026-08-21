// =========================================
// GET ELEMENTS
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

const backButton =
  document.querySelector(".js-back");


// =========================================
// NO BUTTON TEXT
// =========================================

const noTexts = [

  "No ×",

  "Are you sure? 🥺",

  "Really? 😭",

  "Think again 💔",

  "Please? 🥹",

  "One more chance ❤️",

  "Try Yes 😏"

];


let noCount = 0;


// =========================================
// NO BUTTON EVENTS
// =========================================

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


  // Change button text

  noButton.textContent =
    noTexts[
      noCount % noTexts.length
    ];


  // Make YES button bigger

  const scale =
    Math.min(
      1 + noCount * 0.04,
      1.3
    );


  yesButton.style.transform =
    `scale(${scale})`;


  // Screen padding

  const padding = 15;


  // Maximum X

  const maxX =
    window.innerWidth -
    noButton.offsetWidth -
    padding;


  // Maximum Y

  const maxY =
    window.innerHeight -
    noButton.offsetHeight -
    padding;


  // Random X

  const x =
    Math.floor(
      Math.random() *
      Math.max(maxX, padding)
    );


  // Random Y

  const y =
    Math.floor(
      Math.random() *
      Math.max(maxY, padding)
    );


  // Position

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

    // Disable buttons

    yesButton.disabled =
      true;

    noButton.disabled =
      true;


    // Hide question

    questionCard.style.display =
      "none";


    // Show loader

    loader.style.display =
      "flex";


    // Wait 2.5 seconds

    setTimeout(() => {


      // Hide loader

      loader.style.display =
        "none";


      // Show success

      successCard.style.display =
        "block";


      // ==================================
      // VIDEO WITH SOUND
      // ==================================

      resultVideo.muted =
        false;


      resultVideo.volume =
        1;


      resultVideo.currentTime =
        0;


      resultVideo
        .play()
        .then(() => {

          console.log(
            "Love.mp4 is playing with sound ❤️"
          );

        })
        .catch((error) => {

          console.log(
            "Browser blocked autoplay:",
            error
          );


          /*
            If browser blocks autoplay
            with sound, show controls.
          */

          resultVideo.controls =
            true;

        });


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


    // Stop video

    resultVideo.pause();


    // Reset video

    resultVideo.currentTime =
      0;


    // Hide controls

    resultVideo.controls =
      false;


    // Hide success

    successCard.style.display =
      "none";


    // Show question

    questionCard.style.display =
      "block";


    // Enable YES

    yesButton.disabled =
      false;


    // Reset YES size

    yesButton.style.transform =
      "scale(1)";


    // Enable NO

    noButton.disabled =
      false;


    // Reset NO text

    noButton.textContent =
      "No ×";


    // Reset NO position

    noButton.style.position =
      "";


    noButton.style.left =
      "";


    noButton.style.top =
      "";


    noButton.style.transform =
      "";


    // Reset counter

    noCount = 0;

  }
);


// =========================================
// CREATE FLOATING HEARTS
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


  // Create 35 hearts

  for (
    let i = 0;
    i < 35;
    i++
  ) {


    const heart =
      document.createElement(
        "div"
      );


    // Class

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


    // Random X

    heart.style.left =
      Math.random() *
      100 +
      "vw";


    // Random size

    heart.style.fontSize =
      `${
        18 +
        Math.random() * 25
      }px`;


    // Random speed

    heart.style.animationDuration =
      `${
        2.5 +
        Math.random() * 2.5
      }s`;


    // Random delay

    heart.style.animationDelay =
      `${
        Math.random() * 1.5
      }s`;


    // Add to page

    document.body.appendChild(
      heart
    );


    // Remove

    setTimeout(
      () => {

        heart.remove();

      },
      6000
    );

  }

}


// =========================================
// RESET NO BUTTON WHEN RESIZE
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
