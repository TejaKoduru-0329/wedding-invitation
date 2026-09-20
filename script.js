document.addEventListener("DOMContentLoaded", () => {


    const thread =
        document.getElementById("threadSystem");


    const scrollWrap =
        document.getElementById("scrollWrap");


    const openingScreen =
        document.getElementById("openingScreen");


    const openingCaption =
        document.getElementById("openingCaption");


    const untieHint =
        document.getElementById("untieHint");


    const particleLayer =
        document.getElementById("particleLayer");


    const enterButton =
        document.getElementById("enterButton");


    const weddingMusic =
        document.getElementById("weddingMusic");


    const sceneTwo =
        document.getElementById("sceneTwo");


    let opened = false;

    let pointerDown = false;

    let startY = 0;



    /* =================================================
       MUSIC
    ================================================= */

    function startMusic() {

        if (!weddingMusic) {
            return;
        }


        weddingMusic.volume = 0.75;

        weddingMusic.currentTime = 0;


        const playPromise =
            weddingMusic.play();


        if (playPromise !== undefined) {

            playPromise
                .then(() => {

                    console.log(
                        "Wedding music started 🎵"
                    );

                })
                .catch((error) => {

                    console.log(
                        "Music playback failed:",
                        error
                    );

                });

        }

    }



    /* =================================================
       PARTICLE BURST
    ================================================= */

    function createParticleBurst() {

        const particleCount = 65;


        const rect =
            thread.getBoundingClientRect();


        const centerX =
            rect.left +
            rect.width / 2;


        const centerY =
            rect.top +
            rect.height / 2;


        for (
            let i = 0;
            i < particleCount;
            i++
        ) {

            const particle =
                document.createElement("span");


            particle.className =
                "particle";


            const angle =
                Math.random() *
                Math.PI *
                2;


            const distance =
                60 +
                Math.random() *
                180;


            const x =
                Math.cos(angle) *
                distance;


            const y =
                Math.sin(angle) *
                distance;


            particle.style.left =
                `${centerX}px`;


            particle.style.top =
                `${centerY}px`;


            particle.style.setProperty(
                "--x",
                `${x}px`
            );


            particle.style.setProperty(
                "--y",
                `${y}px`
            );


            const size =
                3 +
                Math.random() *
                5;


            particle.style.width =
                `${size}px`;


            particle.style.height =
                `${size}px`;


            particleLayer.appendChild(
                particle
            );


            setTimeout(() => {

                particle.remove();

            }, 1000);

        }

    }



    /* =================================================
       OPEN SCROLL
    ================================================= */

    function openScroll() {

        if (opened) {
            return;
        }


        opened = true;


        /*
            Music starts directly from
            the user's interaction.
        */

        startMusic();


        /*
            Hide initial text.
        */

        openingCaption.classList.add(
            "hidden"
        );


        untieHint.classList.add(
            "hidden"
        );


        /*
            Snap particle effect.
        */

        createParticleBurst();


        /*
            Release thread.
        */

        thread.classList.add(
            "released"
        );


        /*
            Unroll.
        */

        setTimeout(() => {

            scrollWrap.classList.add(
                "opened"
            );

        }, 180);

    }



    /* =================================================
       CLICK
    ================================================= */

    thread.addEventListener(
        "click",
        openScroll
    );



    /* =================================================
       TOUCH / DRAG
    ================================================= */

    thread.addEventListener(
        "pointerdown",
        (event) => {

            if (opened) {
                return;
            }


            pointerDown = true;

            startY =
                event.clientY;


            thread.setPointerCapture(
                event.pointerId
            );

        }
    );


    thread.addEventListener(
        "pointermove",
        (event) => {

            if (
                !pointerDown ||
                opened
            ) {
                return;
            }


            const distance =
                Math.abs(
                    event.clientY -
                    startY
                );


            if (distance > 30) {

                pointerDown = false;

                openScroll();

            }

        }
    );


    thread.addEventListener(
        "pointerup",
        () => {

            pointerDown = false;

        }
    );



    /* =================================================
       KEYBOARD
    ================================================= */

    thread.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                openScroll();

            }

        }
    );



    /* =================================================
       ENTER SCENE 2
    ================================================= */


    /* =================================================
   ENTER SCENE 2
================================================= */

    enterButton.addEventListener(
        "click",
        () => {

            if (!opened) {
                return;
            }


            /*
                Scene 1 fades away.
            */

            openingScreen.classList.add(
                "finished"
            );


            /*
                Scene 2 becomes active.
            */

            sceneTwo.classList.add(
                "active"
            );

            activateSceneTwo();

            /*
                HIDE SCENE 1 SCROLL
            */

            document.body.classList.add(
                "scene-two-active"
            );


            /*
                IMPORTANT:
                We DO NOT restart the music.

                Music from Scene 1 continues.
            */


            document.body.style.overflow =
                "auto";


            /*
                Give Scene 2 its entrance moment,
                then scroll to it.
            */

            setTimeout(() => {

                sceneTwo.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }, 350);

        }
    );

});

/* =====================================================
   SCENE 2 — REVEAL SYSTEM
===================================================== */

const sceneTwoRevealItems =
    document.querySelectorAll(
        "#sceneTwo .reveal-scene"
    );


function activateSceneTwo() {

    /* Reset first */

    sceneTwoRevealItems.forEach((item) => {

        item.classList.remove("show");

    });


    /* Start reveal */

    setTimeout(() => {

        sceneTwoRevealItems.forEach(
            (item, index) => {

                setTimeout(() => {

                    item.classList.add("show");

                }, index * 900);

            }
        );

    }, 500);

}