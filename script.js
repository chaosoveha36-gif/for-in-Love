yesButton.addEventListener("click", () => {

  // Disable buttons
  yesButton.disabled = true;
  noButton.disabled = true;

  // Hide question
  questionCard.style.display = "none";

  // Show loader
  loader.style.display = "flex";

  // =====================================
  // START VIDEO IMMEDIATELY
  // =====================================

  resultVideo.pause();
  resultVideo.currentTime = 0;

  // Turn sound ON
  resultVideo.muted = false;
  resultVideo.volume = 1.0;

  // Start video immediately from user's click
  const playPromise = resultVideo.play();

  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        console.log("Video + Sound started successfully ❤️");
      })
      .catch((error) => {
        console.error("Video playback error:", error);

        // Show controls if browser blocks playback
        resultVideo.controls = true;
      });
  }

  // =====================================
  // WAIT FOR LOADING ANIMATION
  // =====================================

  setTimeout(() => {

    // Hide loader
    loader.style.display = "none";

    // Show result
    successCard.style.display = "block";

    // Create hearts
    createHearts();

  }, 2500);

});
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

const backButton =
  document.querySelector(".js-back");


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


  const padding = 15;


  const maxX =
    window.innerWidth -
    noButton.offsetWidth -
    padding;


  const maxY =
    window.innerHeight -
    noButton.offsetHeight -
    padding;


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


  noButton.style.position =
    "fixed";

  noButton.style.left =
    `${x}px`;

  noButton.style.top =
    `${y}px`;


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


    // Wait 2.5 seconds
    setTimeout(() => {

      // Hide loader
      loader.style.display =
        "none";


      // Show success card
      successCard.style.display =
        "block";


      // ==============================
      // PLAY VIDEO WITH SOUND
      // ==============================

      resultVideo.muted = false;

      resultVideo.volume = 1;

      resultVideo.currentTime = 0;


      resultVideo
        .play()
        .then(() => {

          console.log(
            "Love video is playing with sound ❤️"
          );

        })
        .catch((error) => {

          console.log(
            "Could not play video:",
            error
          );

          // If browser blocks sound,
          // show controls so user can play it.
          resultVideo.controls = true;

        });


      // Create floating hearts
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

    resultVideo.currentTime = 0;

    // Hide video controls if enabled
    resultVideo.controls = false;


    // Hide success
    successCard.style.display =
      "none";


    // Show question
    questionCard.style.display =
      "block";


    // Reset Yes button
    yesButton.disabled = false;

    yesButton.style.transform =
      "scale(1)";


    // Reset No button
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


    // Reset counter
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


    // Random position
    heart.style.left =
      Math.random() * 100 + "vw";


    // Random size
    heart.style.fontSize =
      `${18 + Math.random() * 25}px`;


    // Random speed
    heart.style.animationDuration =
      `${2.5 + Math.random() * 2.5}s`;


    // Random delay
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
// RESET ON WINDOW RESIZE
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
