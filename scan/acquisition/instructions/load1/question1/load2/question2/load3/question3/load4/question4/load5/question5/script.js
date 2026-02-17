const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const clickSound = document.getElementById("clickSound");

clickSound.volume = 1.0;

/* Track state per button */
let yesShifted = false;
let noShifted = false;

function handleYes() {

    clickSound.play();

    if (!yesShifted) {
        yesBtn.textContent = "bilkul nahi";
        yesBtn.classList.add("selected");
        yesShifted = true;
    } else {
        redirect();
    }
}

function handleNo() {

    clickSound.play();

    if (!noShifted) {
        noBtn.textContent = "bilkul nahi";
        noBtn.classList.add("selected");
        noShifted = true;
    } else {
        redirect();
    }
}

function redirect() {
    setTimeout(() => {
        window.location.href = "load6/index.html";
    }, 200);
}

yesBtn.addEventListener("click", handleYes);
noBtn.addEventListener("click", handleNo);