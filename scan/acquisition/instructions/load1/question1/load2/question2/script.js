const noBtn = document.getElementById("noBtn");
const clickSound = document.getElementById("clickSound");
const frame = document.getElementById("frame");

clickSound.volume = 1.0;

noBtn.addEventListener("click", () => {

    clickSound.play();

    /* Slide acceleration */
    noBtn.classList.add("crash-move");

    /* After impact create shatter */
    setTimeout(() => {

        const rect = noBtn.getBoundingClientRect();

        for (let i = 0; i < 20; i++) {

            const piece = document.createElement("div");
            piece.classList.add("piece");

            piece.style.left = rect.left + rect.width / 2 + "px";
            piece.style.top = rect.top + rect.height / 2 + "px";

            /* random explosion direction */
            piece.style.setProperty("--x", (Math.random() - 0.5) * 200 + "px");
            piece.style.setProperty("--y", (Math.random() - 0.5) * 200 + "px");

            document.body.appendChild(piece);

            setTimeout(() => piece.remove(), 600);
        }

        noBtn.style.visibility = "hidden";

    }, 600);

});