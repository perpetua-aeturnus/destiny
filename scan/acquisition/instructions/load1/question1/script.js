const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const clickSound = document.getElementById("clickSound");

clickSound.volume = 1.0;

/* Redirect logic - BOTH buttons go to load2 */
function redirectToLoad2() {
    clickSound.play();
    setTimeout(() => {
        window.location.href = "load2/index.html";
    }, 200);
}

yesBtn.addEventListener("click", redirectToLoad2);
noBtn.addEventListener("click", redirectToLoad2);

/* Hover effect: NO becomes YES */
noBtn.addEventListener("mouseenter", () => {
    noBtn.textContent = "YES";
});

noBtn.addEventListener("mouseleave", () => {
    noBtn.textContent = "NO";
});