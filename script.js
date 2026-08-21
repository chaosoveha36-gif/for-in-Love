/* =========================================
   ELEMENTS
========================================= */

const questionCard = document.querySelector(".question-card");

const successCard = document.querySelector(".success-card");

const loader = document.querySelector(".loader");

const yesButton = document.querySelector(".js-yes");

const noButton = document.querySelector(".js-no");

const resultVideo = document.querySelector(".result-video");

const backButton = document.querySelector(".js-back");

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
  "Try Yes 😏",
];

let noCount = 0;

let loadingTimer = null;

/* =========================================
   NO BUTTON — DESKTOP
========================================= */

noButton.addEventListener("mouseenter", moveNoButton);

/* =========================================
   NO BUTTON — MOBILE
========================================= */

noButton.addEventListener(
  "touchstart",
  (event) => {
    event.preventDefault();

    moveNoButton();
  },
  {
    passive: false,
  },
);

/* =========================================
   MOVE NO BUTTON
========================================= */

function moveNoButton() {
  noCount++;

  /* Change text */

  noButton.textContent = noTexts[noCount % noTexts.length];

  /* Make YES bigger */

  const scale = Math.min(1 + noCount * 0.04, 1.3);

  yesButton.style.transform = `scale(${scale})`;

  /* Screen boundaries */

  const padding = 15;

  const maxX = Math.max(
    window.innerWidth - noButton.offsetWidth - padding,

    padding,
  );

  const maxY = Math.max(
    window.innerHeight - noButton.offsetHeight - padding,

    padding,
  );

  /* Random position */

  const x = Math.floor(Math.random() * maxX);

  const y = Math.floor(Math.random() * maxY);

  /* Move button */

  noButton.style.position = "fixed";

  noButton.style.left = `${x}px`;

  noButton.style.top = `${y}px`;

  /* Random rotation */

  const rotate = Math.floor(Math.random() * 20) - 10;

  noButton.style.transform = `rotate(${rotate}deg)`;
}

/* =========================================
   YES BUTTON
========================================= */

yesButton.addEventListener("click", handleYes);

/* =========================================
   YES FUNCTION
========================================= */

function handleYes() {
  /* Prevent double click */

  if (yesButton.disabled) {
    return;
  }

  /* Disable buttons */

  yesButton.disabled = true;

  noButton.disabled = true;

  /* Hide question */

  questionCard.style.display = "none";

  /* Show loader */

  loader.style.display = "flex";

  /* =======================================
     PREPARE VIDEO
  ======================================= */

  resultVideo.pause();

  resultVideo.currentTime = 0;

  /* Turn sound ON */

  resultVideo.muted = false;

  resultVideo.volume = 1;

  /* =======================================
     START VIDEO IMMEDIATELY
  ======================================= */

  const playPromise = resultVideo.play();

  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        console.log("❤️ Video started with sound!");
      })

      .catch((error) => {
        console.error("Video playback error:", error);

        /*
          Some browsers may block
          unmuted video playback.
        */

        resultVideo.controls = true;
      });
  }

  /* =======================================
     WAIT FOR LOADER
  ======================================= */

  clearTimeout(loadingTimer);

  loadingTimer = setTimeout(() => {
    /* Hide loader */

    loader.style.display = "none";

    /* Show success */

    successCard.style.display = "block";

    /* Make sure video stays unmuted */

    resultVideo.muted = false;

    resultVideo.volume = 1;

    /*
        If video was blocked before,
        try again after success card
        becomes visible.
      */

    if (resultVideo.paused) {
      resultVideo.play().catch((error) => {
        console.log("Video needs user interaction:", error);

        resultVideo.controls = true;
      });
    }

    /* Create hearts */

    createHearts();
  }, 2500);
}

/* =========================================
   BACK BUTTON
========================================= */

backButton.addEventListener("click", handleBack);

/* =========================================
   BACK FUNCTION
========================================= */

function handleBack() {
  /* Stop loader timer */

  clearTimeout(loadingTimer);

  /* Hide loader */

  loader.style.display = "none";

  /* Stop video */

  resultVideo.pause();

  resultVideo.currentTime = 0;

  /* Reset video */

  resultVideo.muted = false;

  resultVideo.volume = 1;

  /* Hide controls */

  resultVideo.controls = false;

  /* Hide success */

  successCard.style.display = "none";

  /* Show question */

  questionCard.style.display = "block";

  /* Reset YES */

  yesButton.disabled = false;

  yesButton.style.transform = "scale(1)";

  /* Reset NO */

  noButton.disabled = false;

  noButton.textContent = "No ×";

  noButton.style.position = "";

  noButton.style.left = "";

  noButton.style.top = "";

  noButton.style.transform = "";

  /* Reset counter */

  noCount = 0;

  /* Remove floating hearts */

  document.querySelectorAll(".success-heart-float").forEach((heart) => {
    heart.remove();
  });
}

/* =========================================
   CREATE FLOATING HEARTS
========================================= */

function createHearts() {
  const hearts = ["❤️", "💖", "💕", "💗", "💓", "💞"];

  /* Remove old hearts */

  document.querySelectorAll(".success-heart-float").forEach((heart) => {
    heart.remove();
  });

  /* Create new hearts */

  for (let i = 0; i < 35; i++) {
    const heart = document.createElement("div");

    heart.className = "success-heart-float";

    /* Random heart */

    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

    /* Random position */

    heart.style.left = Math.random() * 100 + "vw";

    /* Random size */

    heart.style.fontSize = `${18 + Math.random() * 25}px`;

    /* Random speed */

    heart.style.animationDuration = `${2.5 + Math.random() * 2.5}s`;

    /* Random delay */

    heart.style.animationDelay = `${Math.random() * 1.5}s`;

    /* Add to body */

    document.body.appendChild(heart);

    /* Remove */

    setTimeout(() => {
      heart.remove();
    }, 6000);
  }
}

/* =========================================
   WINDOW RESIZE
========================================= */

window.addEventListener("resize", () => {
  /*
      Only reset the No button
      if it is currently moving.
    */

  if (noButton.style.position === "fixed") {
    noButton.style.position = "";

    noButton.style.left = "";

    noButton.style.top = "";

    noButton.style.transform = "";
  }
});

/* =========================================
   PREVENT VIDEO CONTEXT MENU
========================================= */

resultVideo.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});
