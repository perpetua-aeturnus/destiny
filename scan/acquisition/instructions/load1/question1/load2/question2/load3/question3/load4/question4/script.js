const bigBtn = document.getElementById("bigBtn");
const smallBtn = document.getElementById("smallBtn");
const clickSound = document.getElementById("clickSound");

clickSound.volume = 1.0;

/* Track position state */
let isBigOnTop = true;

/* Swap positions every time big button is hovered */
bigBtn.addEventListener("mouseenter", swapButtons);

function swapButtons() {

    if (isBigOnTop) {

        /* Move big to bottom */
        bigBtn.style.top = "120px";
        smallBtn.style.bottom = "120px";

    } else {

        /* Move big back to top */
        bigBtn.style.top = "0px";
        smallBtn.style.bottom = "0px";
    }

    isBigOnTop = !isBigOnTop;
}

/* Small button → redirect */
smallBtn.addEventListener("click", () => {

    clickSound.play();

    setTimeout(() => {
        window.location.href = "load5/index.html";
    }, 200);

});

/* Big button → only sound */
bigBtn.addEventListener("click", () => {

    clickSound.play();

});