

const questionContainer =
  document.querySelector(".question-container");

const resultContainer =
  document.querySelector(".result-container");

const gifResult =
  document.querySelector(".gif-result");

const heartLoader =
  document.querySelector(".cssload-main");

const yesBtn =
  document.querySelector(".js-yes-btn");

const noBtn =
  document.querySelector(".js-no-btn");


// =========================================
// NO BUTTON
// =========================================

const noMessages = [
  "No 😢",
  "Are you sure? 🥺",
  "Really? 😭",
  "Think again 💔",
  "Please? 🥹",
  "One more chance ❤️",
  "Don't do this 😭",
  "Try Yes 😏"
];

let noCount = 0;


// Desktop
noBtn.addEventListener("mouseenter", moveNoButton);


// Mobile
noBtn.addEventListener("touchstart", (event) => {

  event.preventDefault();

  moveNoButton();

});


function moveNoButton() {

  noCount++;

  // Change button text
  noBtn.textContent =
    noMessages[noCount % noMessages.length];


  // Make YES button slightly bigger
  const yesScale =
    Math.min(1 + noCount * 0.04, 1.35);

  yesBtn.style.transform =
    `scale(${yesScale})`;


  // Screen padding
  const padding = 15;


  // Available screen size
  const maxX =
    window.innerWidth -
    noBtn.offsetWidth -
    padding;

  const maxY =
    window.innerHeight -
    noBtn.offsetHeight -
    padding;


  // Random position
  const randomX =
    Math.floor(
      Math.random() *
      Math.max(maxX, padding)
    );

  const randomY =
    Math.floor(
      Math.random() *
      Math.max(maxY, padding)
    );


  // Move button
  noBtn.style.position = "fixed";

  noBtn.style.left =
    `${randomX}px`;

  noBtn.style.top =
    `${randomY}px`;


  // Random rotation
  const rotation =
    Math.floor(
      Math.random() * 20
    ) - 10;

  noBtn.style.transform =
    `rotate(${rotation}deg)`;
}


// =========================================
// YES BUTTON
// =========================================

yesBtn.addEventListener("click", () => {

  // Disable buttons
  yesBtn.disabled = true;
  noBtn.disabled = true;


  // Hide question
  questionContainer.style.display = "none";


  // Show heart loader
  heartLoader.style.display = "block";


  // Wait 3 seconds
  setTimeout(() => {

    // Hide loader
    heartLoader.style.display = "none";


    // Show result
    resultContainer.style.display = "block";


    // Play Love.mp4
    gifResult.currentTime = 0;

    gifResult.play().catch(() => {
      console.log("Video autoplay was blocked.");
    });


    // Create hearts
    createSuccessHearts();

  }, 3000);

});


// =========================================
// CREATE SUCCESS HEARTS
// =========================================

function createSuccessHearts() {

  const heartTypes = [
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
      "floating-heart";


    // Random heart
    heart.textContent =
      heartTypes[
        Math.floor(
          Math.random() *
          heartTypes.length
        )
      ];


    // Random position
    heart.style.left =
      Math.random() * 100 + "vw";


    // Random size
    heart.style.fontSize =
      18 +
      Math.random() * 30 +
      "px";


    // Random animation speed
    heart.style.animationDuration =
      2 +
      Math.random() * 3 +
      "s";


    // Random delay
    heart.style.animationDelay =
      Math.random() * 1.5 +
      "s";


    document.body.appendChild(heart);


    // Remove after animation
    setTimeout(() => {

      heart.remove();

    }, 6000);

  }

}


// =========================================
// RESET NO BUTTON ON RESIZE
// =========================================

window.addEventListener("resize", () => {

  noBtn.style.position = "";

  noBtn.style.left = "";

  noBtn.style.top = "";

  noBtn.style.transform = "";

});
