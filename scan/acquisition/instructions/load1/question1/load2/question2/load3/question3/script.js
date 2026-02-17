const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const dynamicWord = document.getElementById("dynamicWord");
const clickSound = document.getElementById("clickSound");

clickSound.volume = 1.0;

/* Hover effect on YES */
yesBtn.addEventListener("mouseenter", () => {
    dynamicWord.textContent = "moron";
});

yesBtn.addEventListener("mouseleave", () => {
    dynamicWord.textContent = "intelligent";
});

/* YES redirect */
yesBtn.addEventListener("click", () => {
    clickSound.play();
    setTimeout(() => {
        window.location.href = "load4/index.html";
    }, 200);
});

/* NO click behavior */
noBtn.addEventListener("click", () => {

    clickSound.play();

    /* Prevent double click */
    yesBtn.disabled = true;
    noBtn.disabled = true;

    setTimeout(() => {

        noBtn.textContent = "NO, A MORON";
        noBtn.classList.add("selected");

        /* Optional: also force question word */
        dynamicWord.textContent = "moron";

        setTimeout(() => {
            window.location.href = "load4/index.html";
        }, 600);

    }, 500); // 0.5 sec pause

});