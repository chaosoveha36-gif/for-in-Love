// =========================================
// ELEMENTS
// =========================================

const celebrateBtn =
  document.getElementById("celebrateBtn");

const birthdayMessage =
  document.getElementById("birthdayMessage");


// =========================================
// CELEBRATE BUTTON
// =========================================

celebrateBtn.addEventListener("click", () => {

  // Show hidden birthday message
  birthdayMessage.style.display = "block";

  // Change button
  celebrateBtn.innerHTML =
    "🎂 Happy Birthday! 🎉";

  celebrateBtn.disabled = true;

  celebrateBtn.style.opacity = "0.8";

  // Create confetti
  createConfetti();

});


// =========================================
// CONFETTI
// =========================================

function createConfetti() {

  const pieces = 120;

  for (let i = 0; i < pieces; i++) {

    const confetti =
      document.createElement("div");

    confetti.className =
      "confetti";


    // Random horizontal position

    confetti.style.left =
      Math.random() * 100 + "vw";


    // Random size

    const size =
      Math.random() * 8 + 6;

    confetti.style.width =
      size + "px";

    confetti.style.height =
      size * 1.5 + "px";


    // Random color

    const colors = [
      "#ff6b9a",
      "#ffd27d",
      "#ffffff",
      "#c77dff",
      "#7dd3fc",
      "#86efac"
    ];

    confetti.style.background =
      colors[
        Math.floor(
          Math.random() * colors.length
        )
      ];


    // Random animation

    confetti.style.animationDuration =
      2 +
      Math.random() * 3 +
      "s";


    confetti.style.animationDelay =
      Math.random() * 1.5 +
      "s";


    document.body.appendChild(confetti);


    // Remove

    setTimeout(() => {

      confetti.remove();

    }, 6000);

  }

}
