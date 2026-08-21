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
