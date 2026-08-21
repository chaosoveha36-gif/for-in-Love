const questionContainer = document.querySelector(".question-container");
const resultContainer = document.querySelector(".result-container");
const gifResult = document.querySelector(".gif-result");
const heartLoader = document.querySelector(".cssload-main");

const yesBtn = document.querySelector(".js-yes-btn");
const noBtn = document.querySelector(".js-no-btn");

// ======================================
// NO BUTTON - RUN AWAY
// ======================================

noBtn.addEventListener("mouseover", moveNoButton);
noBtn.addEventListener("touchstart", moveNoButton);

function moveNoButton() {
  const padding = 20;

  const maxX =
    window.innerWidth - noBtn.offsetWidth - padding;

  const maxY =
    window.innerHeight - noBtn.offsetHeight - padding;

  const newX =
    Math.floor(Math.random() * Math.max(maxX, padding));

  const newY =
    Math.floor(Math.random() * Math.max(maxY, padding));

  noBtn.style.position = "fixed";
  noBtn.style.left = `${newX}px`;
  noBtn.style.top = `${newY}px`;

  // Random little rotation
  const rotation =
    Math.floor(Math.random() * 20) - 10;

  noBtn.style.transform =
    `scale(1.08) rotate(${rotation}deg)`;
}


// ======================================
// YES BUTTON
// ======================================

yesBtn.addEventListener("click", () => {

  // Hide question
  questionContainer.style.display = "none";

  // Show heart loading animation
  heartLoader.style.display = "block";

  // Wait 3 seconds
  setTimeout(() => {

    // Hide loader
    heartLoader.style.display = "none";

    // Show result
    resultContainer.style.display = "block";

    // Play result video
    gifResult.currentTime = 0;
    gifResult.play();

    // Create floating hearts
    createHearts();

  }, 3000);
});


// ======================================
// FLOATING HEARTS
// ======================================

function createHearts() {

  for (let i = 0; i < 25; i++) {

    const heart = document.createElement("div");

    heart.className = "floating-heart";

    const hearts = [
      "❤️",
      "💖",
      "💕",
      "💗",
      "💓",
      "💞"
    ];

    heart.innerHTML =
      hearts[Math.floor(Math.random() * hearts.length)];

    heart.style.left =
      Math.random() * 100 + "vw";

    heart.style.animationDuration =
      (2 + Math.random() * 3) + "s";

    heart.style.animationDelay =
      Math.random() * 1.5 + "s";

    heart.style.fontSize =
      (18 + Math.random() * 25) + "px";

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 6000);
  }
}


// ======================================
// RESET NO BUTTON WHEN WINDOW RESIZES
// ======================================

window.addEventListener("resize", () => {

  noBtn.style.position = "";
  noBtn.style.left = "";
  noBtn.style.top = "";
  noBtn.style.transform = "";

});
