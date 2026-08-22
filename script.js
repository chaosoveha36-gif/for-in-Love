/* =========================================
   ELEMENTS
========================================= */

const questionCard = document.querySelector(".question-card");
const successCard = document.querySelector(".success-card");
const loader = document.querySelector(".loader");

const yesButton = document.querySelector(".js-yes");
const noButton = document.querySelector(".js-no");
const backButton = document.querySelector(".js-back");

const resultVideo = document.querySelector(".result-video");
const clickHearts = document.querySelector(".click-hearts");


/* =========================================
   SETTINGS
========================================= */

const noTexts = [
  "No 😢",
  "Are you sure? 🥺",
  "Really? 😭",
  "Think again 💔",
  "Please? 🥹",
  "One more chance ❤️",
  "Try Yes 😏"
];

const successHearts = [
  "❤️",
  "💖",
  "💕",
  "💗",
  "💓",
  "💞",
  "💘"
];

let noCount = 0;
let loadingTimer = null;
let isSuccess = false;


/* =========================================
   INITIAL STATE
========================================= */

successCard.style.display = "none";
loader.style.display = "none";

resultVideo.muted = false;
resultVideo.volume = 1;


/* =========================================
   NO BUTTON — DESKTOP
========================================= */

noButton.addEventListener("mouseenter", () => {

  if (!isSuccess && !noButton.disabled) {
    moveNoButton();
  }

});


/* =========================================
   NO BUTTON — MOBILE
========================================= */

noButton.addEventListener(
  "touchstart",
  (event) => {

    event.preventDefault();

    if (!isSuccess && !noButton.disabled) {
      moveNoButton();
    }

  },
  {
    passive: false
  }
);


/* =========================================
   NO BUTTON — CLICK
========================================= */

noButton.addEventListener("click", (event) => {

  event.preventDefault();

  if (!isSuccess) {
    moveNoButton();
  }

});


/* =========================================
   MOVE NO BUTTON
========================================= */

function moveNoButton() {

  noCount++;

  /* Change text */
  noButton.textContent =
    noTexts[noCount % noTexts.length];


  /* Make YES bigger */
  const scale =
    Math.min(
      1 + noCount * 0.045,
      1.3
    );

  yesButton.style.transform =
    `scale(${scale})`;


  /* Screen boundaries */
  const padding = 15;

  const maxX =
    Math.max(
      window.innerWidth -
        noButton.offsetWidth -
        padding,
      padding
    );

  const maxY =
    Math.max(
      window.innerHeight -
        noButton.offsetHeight -
        padding,
      padding
    );


  /* Random position */
  const x =
    Math.floor(
      Math.random() * maxX
    );

  const y =
    Math.floor(
      Math.random() * maxY
    );


  /* Move button */
  noButton.style.position = "fixed";

  noButton.style.left = `${x}px`;
  noButton.style.top = `${y}px`;


  /* Random rotation */
  const rotate =
    Math.floor(
      Math.random() * 24
    ) - 12;

  noButton.style.transform =
    `rotate(${rotate}deg)`;


  /* Little heart effect */
  createClickHeart(
    x + noButton.offsetWidth / 2,
    y + noButton.offsetHeight / 2
  );
}


/* =========================================
   YES BUTTON
========================================= */

yesButton.addEventListener(
  "click",
  handleYes
);


/* =========================================
   YES FUNCTION
========================================= */

function handleYes() {

  if (yesButton.disabled || isSuccess) {
    return;
  }


  isSuccess = true;


  /* Disable buttons */
  yesButton.disabled = true;
  noButton.disabled = true;


  /* Create click effect */
  createHeartBurst(
    window.innerWidth / 2,
    window.innerHeight / 2
  );


  /* Stop question video */
  const questionVideo =
    document.querySelector(".main-video");

  if (questionVideo) {
    questionVideo.pause();
  }


  /* Hide question */
  questionCard.style.display = "none";


  /* Show loader */
  loader.style.display = "flex";


  /* Prepare result video */
  resultVideo.pause();

  resultVideo.currentTime = 0;

  resultVideo.muted = false;

  resultVideo.volume = 1;


  /* =======================================
     START VIDEO
  ======================================= */

  startResultVideo();


  /* =======================================
     WAIT FOR LOADER
  ======================================= */

  clearTimeout(loadingTimer);

  loadingTimer = setTimeout(() => {

    /* Hide loader */
    loader.style.display = "none";


    /* Show success */
    successCard.style.display = "block";


    /* Force sound */
    resultVideo.muted = false;
    resultVideo.volume = 1;


    /* Try playing again */
    if (resultVideo.paused) {

      startResultVideo();

    }


    /* Celebration */
    createHearts();

  }, 1800);

}


/* =========================================
   START RESULT VIDEO
========================================= */

function startResultVideo() {

  resultVideo.muted = false;
  resultVideo.volume = 1;


  const playPromise =
    resultVideo.play();


  if (
    playPromise !== undefined
  ) {

    playPromise
      .then(() => {

        console.log(
          "❤️ Success video started with sound!"
        );

      })
      .catch((error) => {

        console.log(
          "Video autoplay was blocked:",
          error
        );


        /*
          If browser blocks autoplay,
          show native controls.
        */

        resultVideo.controls = true;

      });

  }

}


/* =========================================
   BACK BUTTON
========================================= */

backButton.addEventListener(
  "click",
  handleBack
);


/* =========================================
   BACK FUNCTION
========================================= */

function handleBack() {

  /* Reset state */
  isSuccess = false;


  /* Stop loader timer */
  clearTimeout(loadingTimer);


  /* Hide loader */
  loader.style.display = "none";


  /* Stop result video */
  resultVideo.pause();

  resultVideo.currentTime = 0;


  /* Reset video */
  resultVideo.muted = false;
  resultVideo.volume = 1;

  resultVideo.controls = false;


  /* Hide success */
  successCard.style.display = "none";


  /* Show question */
  questionCard.style.display = "block";


  /* Reset YES */
  yesButton.disabled = false;

  yesButton.style.transform =
    "scale(1)";


  /* Reset NO */
  noButton.disabled = false;

  noButton.textContent =
    "No ×";

  noButton.style.position = "";

  noButton.style.left = "";

  noButton.style.top = "";

  noButton.style.transform = "";


  /* Reset counter */
  noCount = 0;


  /* Remove success hearts */
  document
    .querySelectorAll(
      ".success-heart-float"
    )
    .forEach((heart) => {

      heart.remove();

    });


  /* Restart first video */
  const questionVideo =
    document.querySelector(".main-video");

  if (questionVideo) {

    questionVideo.currentTime = 0;

    questionVideo.muted = true;

    questionVideo.play().catch(() => {});

  }

}


/* =========================================
   CREATE FLOATING HEARTS
========================================= */

function createHearts() {

  /* Remove old hearts */

  document
    .querySelectorAll(
      ".success-heart-float"
    )
    .forEach((heart) => {

      heart.remove();

    });


  /* Create hearts */

  for (let i = 0; i < 40; i++) {

    const heart =
      document.createElement("div");


    heart.className =
      "success-heart-float";


    /* Random heart */

    heart.textContent =
      successHearts[
        Math.floor(
          Math.random() *
          successHearts.length
        )
      ];


    /* Random position */

    heart.style.left =
      Math.random() * 100 + "vw";


    /* Random size */

    heart.style.fontSize =
      `${16 + Math.random() * 27}px`;


    /* Random speed */

    heart.style.animationDuration =
      `${2.5 + Math.random() * 3}s`;


    /* Random delay */

    heart.style.animationDelay =
      `${Math.random() * 1.5}s`;


    /* Add to body */

    document.body.appendChild(
      heart
    );


    /* Remove */

    setTimeout(() => {

      heart.remove();

    }, 6500);

  }

}


/* =========================================
   HEART BURST
========================================= */

function createHeartBurst(x, y) {

  const amount = 18;


  for (let i = 0; i < amount; i++) {

    const heart =
      document.createElement("div");


    heart.className =
      "click-heart";


    heart.textContent =
      successHearts[
        Math.floor(
          Math.random() *
          successHearts.length
        )
      ];


    heart.style.left =
      `${x}px`;

    heart.style.top =
      `${y}px`;


    const angle =
      Math.random() *
      Math.PI *
      2;

    const distance =
      80 +
      Math.random() * 170;


    const moveX =
      Math.cos(angle) *
      distance;

    const moveY =
      Math.sin(angle) *
      distance;


    heart.style.setProperty(
      "--x",
      `${moveX}px`
    );

    heart.style.setProperty(
      "--y",
      `${moveY}px`
    );


    clickHearts.appendChild(
      heart
    );


    setTimeout(() => {

      heart.remove();

    }, 1100);

  }

}


/* =========================================
   SMALL CLICK HEART
========================================= */

function createClickHeart(x, y) {

  const heart =
    document.createElement("div");


  heart.className =
    "click-heart";


  heart.textContent = "💗";


  heart.style.left =
    `${x}px`;

  heart.style.top =
    `${y}px`;


  heart.style.setProperty(
    "--x",
    `${(Math.random() - .5) * 70}px`
  );

  heart.style.setProperty(
    "--y",
    `${-50 - Math.random() * 60}px`
  );


  clickHearts.appendChild(
    heart
  );


  setTimeout(() => {

    heart.remove();

  }, 1100);

}


/* =========================================
   WINDOW RESIZE
========================================= */

window.addEventListener(
  "resize",
  () => {

    /*
      Reset No button if it was
      moved outside normal layout.
    */

    if (
      noButton.style.position ===
      "fixed"
    ) {

      noButton.style.position = "";

      noButton.style.left = "";

      noButton.style.top = "";

      noButton.style.transform = "";

    }

  }
);


/* =========================================
   PREVENT VIDEO CONTEXT MENU
========================================= */

resultVideo.addEventListener(
  "contextmenu",
  (event) => {

    event.preventDefault();

  }
);


/* =========================================
   VIDEO ERROR HANDLING
========================================= */

resultVideo.addEventListener(
  "error",
  () => {

    console.error(
      "❌ Could not load 0822(1).mp4"
    );

  }
);


/* =========================================
   PAGE VISIBILITY
========================================= */

document.addEventListener(
  "visibilitychange",
  () => {

    if (
      document.hidden
    ) {

      resultVideo.pause();

    }

  }
);
