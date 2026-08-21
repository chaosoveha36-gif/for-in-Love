// ======================================
// GET ELEMENTS
// ======================================

const questionCard =
    document.getElementById("questionCard");

const resultCard =
    document.getElementById("resultCard");

const loader =
    document.getElementById("loader");

const yesBtn =
    document.getElementById("yesBtn");

const noBtn =
    document.getElementById("noBtn");

const backBtn =
    document.getElementById("backBtn");

const loveVideo =
    document.getElementById("loveVideo");


// ======================================
// NO BUTTON
// ======================================

let noCount = 0;

const noMessages = [
    "No 😢",
    "Are you sure? 🥺",
    "Really? 😭",
    "Think again 💔",
    "Please? 🥹",
    "One more chance ❤️",
    "Try Yes 😏"
];


// Desktop
noBtn.addEventListener(
    "mouseenter",
    moveNoButton
);


// Mobile
noBtn.addEventListener(
    "touchstart",
    function(event) {

        event.preventDefault();

        moveNoButton();

    }
);


// ======================================
// MOVE NO BUTTON
// ======================================

function moveNoButton() {

    noCount++;


    // Change text

    noBtn.textContent =
        noMessages[
            noCount % noMessages.length
        ];


    // Make Yes bigger

    const scale =
        Math.min(
            1 + noCount * 0.05,
            1.35
        );


    yesBtn.style.transform =
        `scale(${scale})`;


    // Get screen size

    const padding = 10;


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
        Math.random() *
        Math.max(maxX, padding);


    const randomY =
        Math.random() *
        Math.max(maxY, padding);


    // Fixed position

    noBtn.style.position =
        "fixed";


    noBtn.style.left =
        `${randomX}px`;


    noBtn.style.top =
        `${randomY}px`;


    // Random rotation

    const rotation =
        Math.random() * 20 - 10;


    noBtn.style.transform =
        `rotate(${rotation}deg)`;

}


// ======================================
// YES BUTTON
// ======================================

yesBtn.addEventListener(
    "click",
    function() {

        // Disable buttons

        yesBtn.disabled = true;

        noBtn.disabled = true;


        // Hide question

        questionCard.style.display =
            "none";


        // Show loader

        loader.style.display =
            "flex";


        // Wait 2 seconds

        setTimeout(
            showResult,
            2000
        );

    }
);


// ======================================
// SHOW RESULT
// ======================================

function showResult() {

    // Hide loader

    loader.style.display =
        "none";


    // Show result

    resultCard.style.display =
        "block";


    // Reset video

    loveVideo.currentTime = 0;


    // Enable sound

    loveVideo.muted = false;

    loveVideo.volume = 1;


    // Try playing video

    const playPromise =
        loveVideo.play();


    if (playPromise !== undefined) {

        playPromise
            .then(function() {

                console.log(
                    "Video playing with sound ❤️"
                );

            })
            .catch(function(error) {

                console.log(
                    "Autoplay with sound blocked:",
                    error
                );


                /*
                Browser blocked sound.

                Show controls so user can
                press play.
                */

                loveVideo.controls = true;

            });

    }


    // Create hearts

    createHearts();

}


// ======================================
// BACK BUTTON
// ======================================

backBtn.addEventListener(
    "click",
    function() {

        // Stop video

        loveVideo.pause();


        // Reset video

        loveVideo.currentTime = 0;


        // Hide controls

        loveVideo.controls = false;


        // Hide result

        resultCard.style.display =
            "none";


        // Show question

        questionCard.style.display =
            "block";


        // Enable buttons

        yesBtn.disabled = false;

        noBtn.disabled = false;


        // Reset Yes

        yesBtn.style.transform =
            "scale(1)";


        // Reset No

        noBtn.style.position =
            "";

        noBtn.style.left =
            "";

        noBtn.style.top =
            "";

        noBtn.style.transform =
            "";


        noBtn.textContent =
            "No 😢";


        // Reset count

        noCount = 0;

    }
);


// ======================================
// FLOATING HEARTS
// ======================================

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
        i < 30;
        i++
    ) {

        const heart =
            document.createElement("div");


        heart.className =
            "floating-heart";


        // Random emoji

        heart.textContent =
            hearts[
                Math.floor(
                    Math.random() *
                    hearts.length
                )
            ];


        // Random position

        heart.style.left =
            Math.random() * 100 +
            "vw";


        // Random size

        heart.style.fontSize =
            18 +
            Math.random() * 25 +
            "px";


        // Random animation

        heart.style.animationDuration =
            2.5 +
            Math.random() * 2.5 +
            "s";


        // Add to page

        document.body.appendChild(
            heart
        );


        // Remove after animation

        setTimeout(
            function() {

                heart.remove();

            },
            6000
        );

    }

}
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const questionCard = document.getElementById("questionCard");
const resultCard = document.getElementById("resultCard");
const loader = document.getElementById("loader");

const loveVideo = document.getElementById("loveVideo");
const backBtn = document.getElementById("backBtn");


// ================================
// YES BUTTON
// ================================

yesBtn.onclick = function () {

    console.log("YES BUTTON CLICKED");

    questionCard.style.display = "none";

    loader.style.display = "flex";

    setTimeout(function () {

        loader.style.display = "none";

        resultCard.style.display = "block";

        loveVideo.currentTime = 0;

        loveVideo.muted = false;

        loveVideo.volume = 1;

        loveVideo.play()
            .then(function () {

                console.log("Video started");

            })
            .catch(function (error) {

                console.log(
                    "Video sound blocked:",
                    error
                );

                loveVideo.controls = true;

            });

    }, 1500);
};


// ================================
// NO BUTTON
// ================================

noBtn.onclick = function () {

    console.log("NO BUTTON CLICKED");

    const maxX =
        window.innerWidth -
        noBtn.offsetWidth -
        20;

    const maxY =
        window.innerHeight -
        noBtn.offsetHeight -
        20;

    const x =
        Math.random() * maxX;

    const y =
        Math.random() * maxY;

    noBtn.style.position = "fixed";

    noBtn.style.left = x + "px";

    noBtn.style.top = y + "px";

};


// ================================
// BACK BUTTON
// ================================

backBtn.onclick = function () {

    console.log("BACK BUTTON CLICKED");

    loveVideo.pause();

    loveVideo.currentTime = 0;

    loveVideo.controls = false;

    resultCard.style.display = "none";

    questionCard.style.display = "block";

};


// ================================
// CHECK JAVASCRIPT
// ================================

console.log("✅ script.js loaded successfully");
