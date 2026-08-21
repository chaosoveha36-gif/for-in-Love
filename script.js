// ============================================
// LOVE WEBSITE - FINAL JAVASCRIPT
// ============================================

document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // GET ELEMENTS
    // =========================

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


    // =========================
    // CHECK ELEMENTS
    // =========================

    if (
        !questionCard ||
        !resultCard ||
        !loader ||
        !yesBtn ||
        !noBtn ||
        !backBtn ||
        !loveVideo
    ) {

        console.error(
            "❌ Some HTML elements were not found."
        );

        return;
    }


    console.log(
        "✅ Love website JavaScript loaded!"
    );


    // =========================
    // VARIABLES
    // =========================

    let noCount = 0;

    let isMoving = false;


    const noMessages = [
        "No 😢",
        "Are you sure? 🥺",
        "Really? 😭",
        "Think again 💔",
        "Please? 🥹",
        "One more chance ❤️",
        "Try Yes 😏"
    ];


    // =========================
    // NO BUTTON
    // =========================

    function moveNoButton() {

        if (isMoving) {
            return;
        }

        isMoving = true;

        noCount++;


        // Change text

        noBtn.textContent =
            noMessages[
                noCount % noMessages.length
            ];


        // Make YES button bigger

        const scale =
            Math.min(
                1 + noCount * 0.05,
                1.4
            );


        yesBtn.style.transform =
            `scale(${scale})`;


        // Screen padding

        const padding = 20;


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
            Math.max(
                padding,
                Math.random() * maxX
            );


        const randomY =
            Math.max(
                padding,
                Math.random() * maxY
            );


        // Move button

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


        setTimeout(function () {

            isMoving = false;

        }, 200);

    }


    // Desktop

    noBtn.addEventListener(
        "mouseenter",
        moveNoButton
    );


    // Mobile

    noBtn.addEventListener(
        "touchstart",
        function (event) {

            event.preventDefault();

            moveNoButton();

        },
        {
            passive: false
        }
    );


    // =========================
    // YES BUTTON
    // =========================

    yesBtn.addEventListener(
        "click",
        function () {

            console.log(
                "❤️ YES BUTTON CLICKED"
            );


            // Disable buttons

            yesBtn.disabled = true;

            noBtn.disabled = true;


            // Hide question

            questionCard.style.display =
                "none";


            // Show loading

            loader.style.display =
                "flex";


            // Wait

            setTimeout(
                showResult,
                1800
            );

        }
    );


    // =========================
    // SHOW RESULT
    // =========================

    function showResult() {

        console.log(
            "💕 Showing result..."
        );


        // Hide loader

        loader.style.display =
            "none";


        // Show result

        resultCard.style.display =
            "block";


        // Reset video

        loveVideo.currentTime = 0;


        // Try sound

        loveVideo.muted = false;

        loveVideo.volume = 1;


        // Play video

        const playPromise =
            loveVideo.play();


        if (
            playPromise !== undefined
        ) {

            playPromise
                .then(function () {

                    console.log(
                        "🔊 Video playing with sound!"
                    );

                })
                .catch(function (error) {

                    console.warn(
                        "⚠️ Browser blocked autoplay sound.",
                        error
                    );


                    // Show controls

                    loveVideo.controls =
                        true;

                });

        }


        // Create hearts

        createHearts();

    }


    // =========================
    // BACK BUTTON
    // =========================

    backBtn.addEventListener(
        "click",
        function () {

            console.log(
                "↩ BACK BUTTON CLICKED"
            );


            // Stop video

            loveVideo.pause();


            // Reset video

            loveVideo.currentTime = 0;


            // Remove controls

            loveVideo.controls =
                false;


            // Hide result

            resultCard.style.display =
                "none";


            // Show question

            questionCard.style.display =
                "block";


            // Enable buttons

            yesBtn.disabled = false;

            noBtn.disabled = false;


            // Reset YES button

            yesBtn.style.transform =
                "scale(1)";


            // Reset NO button

            noBtn.style.position =
                "";

            noBtn.style.left =
                "";

            noBtn.style.top =
                "";

            noBtn.style.transform =
                "";


            // Reset text

            noBtn.textContent =
                "No 😢";


            // Reset counter

            noCount = 0;

        }
    );


    // =========================
    // FLOATING HEARTS
    // =========================

    function createHearts() {

        const hearts = [
            "❤️",
            "💖",
            "💕",
            "💗",
            "💓",
            "💞",
            "💘"
        ];


        for (
            let i = 0;
            i < 35;
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
                (
                    18 +
                    Math.random() * 25
                ) +
                "px";


            // Random speed

            heart.style.animationDuration =
                (
                    2.5 +
                    Math.random() * 2.5
                ) +
                "s";


            // Add

            document.body.appendChild(
                heart
            );


            // Remove

            setTimeout(
                function () {

                    heart.remove();

                },
                6000
            );

        }

    }

});
