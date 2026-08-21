// ============================================
// LOVE WEBSITE
// FINAL JAVASCRIPT
// ============================================


document.addEventListener(
    "DOMContentLoaded",
    function () {


        // =====================================
        // GET HTML ELEMENTS
        // =====================================

        const questionCard =
            document.getElementById(
                "questionCard"
            );


        const resultCard =
            document.getElementById(
                "resultCard"
            );


        const loader =
            document.getElementById(
                "loader"
            );


        const yesBtn =
            document.getElementById(
                "yesBtn"
            );


        const noBtn =
            document.getElementById(
                "noBtn"
            );


        const backBtn =
            document.getElementById(
                "backBtn"
            );


        const loveVideo =
            document.getElementById(
                "loveVideo"
            );


        // =====================================
        // CHECK
        // =====================================

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
                "❌ HTML elements are missing!"
            );

            return;

        }


        console.log(
            "✅ JavaScript loaded successfully!"
        );


        // =====================================
        // VARIABLES
        // =====================================

        let noCount = 0;

        let moving = false;


        const noMessages = [

            "No 😢",

            "Are you sure? 🥺",

            "Really? 😭",

            "Think again 💔",

            "Please? 🥹",

            "One more chance ❤️",

            "Try Yes 😏"

        ];


        // =====================================
        // MOVE NO BUTTON
        // =====================================

        function moveNoButton() {


            if (moving) {

                return;

            }


            moving = true;


            noCount++;


            // Change text

            noBtn.textContent =
                noMessages[
                    noCount %
                    noMessages.length
                ];


            // Make YES bigger

            const scale =
                Math.min(
                    1 +
                    noCount * 0.05,
                    1.4
                );


            yesBtn.style.transform =
                `scale(${scale})`;


            // Screen padding

            const padding = 20;


            // Maximum position

            const maxX =
                window.innerWidth -
                noBtn.offsetWidth -
                padding;


            const maxY =
                window.innerHeight -
                noBtn.offsetHeight -
                padding;


            // Random X

            const randomX =
                Math.max(
                    padding,
                    Math.random() *
                    maxX
                );


            // Random Y

            const randomY =
                Math.max(
                    padding,
                    Math.random() *
                    maxY
                );


            // Move button

            noBtn.style.position =
                "fixed";


            noBtn.style.left =
                `${randomX}px`;


            noBtn.style.top =
                `${randomY}px`;


            // Rotation

            const rotation =
                Math.random() *
                20 -
                10;


            noBtn.style.transform =
                `rotate(${rotation}deg)`;


            setTimeout(
                function () {

                    moving = false;

                },
                200
            );

        }


        // =====================================
        // DESKTOP
        // =====================================

        noBtn.addEventListener(
            "mouseenter",
            moveNoButton
        );


        // =====================================
        // MOBILE
        // =====================================

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


        // =====================================
        // YES BUTTON
        // =====================================

        yesBtn.addEventListener(
            "click",
            function () {


                console.log(
                    "❤️ YES clicked!"
                );


                // Disable

                yesBtn.disabled =
                    true;

                noBtn.disabled =
                    true;


                // Hide question

                questionCard.style.display =
                    "none";


                // Show loader

                loader.style.display =
                    "flex";


                // Wait 1.8 seconds

                setTimeout(
                    showResult,
                    1800
                );

            }
        );


        // =====================================
        // SHOW RESULT
        // =====================================

        function showResult() {


            console.log(
                "💕 Showing result"
            );


            // Hide loader

            loader.style.display =
                "none";


            // Show result

            resultCard.style.display =
                "block";


            // Reset video

            loveVideo.currentTime =
                0;


            // Sound

            loveVideo.muted =
                false;


            loveVideo.volume =
                1;


            // Play video

            const playPromise =
                loveVideo.play();


            if (
                playPromise !==
                undefined
            ) {


                playPromise
                    .then(
                        function () {

                            console.log(
                                "🔊 Video playing!"
                            );

                        }
                    )
                    .catch(
                        function (error) {


                            console.warn(
                                "⚠️ Browser blocked sound autoplay.",
                                error
                            );


                            // Show controls

                            loveVideo.controls =
                                true;

                        }
                    );

            }


            // Hearts

            createHearts();

        }


        // =====================================
        // BACK BUTTON
        // =====================================

        backBtn.addEventListener(
            "click",
            function () {


                console.log(
                    "↩ Back clicked!"
                );


                // Stop video

                loveVideo.pause();


                // Reset video

                loveVideo.currentTime =
                    0;


                // Hide controls

                loveVideo.controls =
                    false;


                // Hide result

                resultCard.style.display =
                    "none";


                // Show question

                questionCard.style.display =
                    "block";


                // Enable buttons

                yesBtn.disabled =
                    false;

                noBtn.disabled =
                    false;


                // Reset YES

                yesBtn.style.transform =
                    "scale(1)";


                // Reset NO

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


                // Reset counter

                noCount = 0;


            }
        );


        // =====================================
        // CREATE FLOATING HEARTS
        // =====================================

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
                    document.createElement(
                        "div"
                    );


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


                // Random X

                heart.style.left =
                    Math.random() *
                    100 +
                    "vw";


                // Random size

                heart.style.fontSize =
                    (
                        18 +
                        Math.random() *
                        25
                    ) +
                    "px";


                // Random speed

                heart.style.animationDuration =
                    (
                        2.5 +
                        Math.random() *
                        2.5
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


    }
);
