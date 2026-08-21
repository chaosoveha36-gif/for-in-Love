// =========================================
// ELEMENTS
// =========================================
const questionCard = document.querySelector(".question-card");
const successCard = document.querySelector(".success-card");
const loader = document.querySelector(".loader");
const yesButton = document.querySelector(".js-yes");
const noButton = document.querySelector(".js-no");
const resultVideo = document.querySelector(".result-video");
const backButton = document.querySelector(".js-back");

// =========================================
// NO BUTTON TEXTS & COUNTER
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

// Desktop hover
noButton.addEventListener("mouseenter", moveNoButton);

// Mobile touch
noButton.addEventListener("touchstart", (event) => {
  event.preventDefault();
  moveNoButton();
});

// =========================================
// MOVE NO BUTTON FUNCTION
// =========================================
function moveNoButton() {
  noCount++;

  noButton.textContent = noTexts[noCount % noTexts.length];

  // Make YES button bigger
  const scale = Math.min(1 + noCount * 0.04, 1.3);
  yesButton.style.transform = `scale(${scale})`;

  const padding = 15;
  const maxX = window.innerWidth - noButton.offsetWidth - padding;
  const maxY = window.innerHeight - noButton.offsetHeight - padding;

  const x = Math.floor(Math.random() * Math.max(maxX, padding));
  const y = Math.floor(Math.random() * Math.max(maxY, padding));

  noButton.style.position = "fixed";
  noButton.style.left = `${x}px`;
  noButton.style.top = `${y}px`;

  const rotate = Math.floor(Math.random() * 20) - 10;
  noButton.style.transform = `rotate(${rotate}deg)`;
}

// =========================================
// YES BUTTON CLICK
// =========================================
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

  const playPromise = resultVideo.play();

  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        console.log("Video + Sound started successfully ❤️");
      })
      .catch((error) => {
        console.error("Video playback error:", error);
        resultVideo.controls = true;
      });
  }

  // =====================================
  // WAIT FOR LOADING ANIMATION (2.5s)
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
// BACK BUTTON CLICK
// =========================================
backButton.addEventListener("click", () => {
  // Stop video
  resultVideo.pause();
  resultVideo.currentTime = 0;
  resultVideo.controls = false;

  // Hide success card
  successCard.style.display = "none";

  // Show question card
  questionCard.style.display = "block";

  // Reset Yes button
  yesButton.disabled = false;
  yesButton.style.transform = "scale(1)";

  // Reset No button
  noButton.disabled = false;
  noButton.textContent = "No ×";
  noButton.style.position = "";
  noButton.style.left = "";
  noButton.style.top = "";
  noButton.style.transform = "";

  // Reset counter
  noCount = 0;
});

// =========================================
// FLOATING HEARTS FUNCTION
// =========================================
function createHearts() {
  const hearts = ["❤️", "💖", "💕", "💗", "💓", "💞"];

  for (let i = 0; i < 35; i++) {
    const heart = document.createElement("div");
    heart.className = "success-heart-float";
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

    // Random position
    heart.style.left = Math.random() * 100 + "vw";

    // Random size
    heart.style.fontSize = `${18 + Math.random() * 25}px`;

    // Random speed
    heart.style.animationDuration = `${2.5 + Math.random() * 2.5}s`;

    // Random delay
    heart.style.animationDelay = `${Math.random() * 1.5}s`;

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 6000);
  }
}

// =========================================
// RESET ON WINDOW RESIZE
// =========================================
window.addEventListener("resize", () => {
  noButton.style.position = "";
  noButton.style.left = "";
  noButton.style.top = "";
  noButton.style.transform = "";
});
