const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const container = document.querySelector(".buttons-area");
const teaseMsg = document.getElementById("teaseMsg");

let teaseCooldown = false;

document.addEventListener("mousemove", (e) => {

    const rect = noBtn.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distance = Math.hypot(
        e.clientX - centerX,
        e.clientY - centerY
    );

    /* Shrink when cursor closer */
    const minScale = 0.6;
    const maxScale = 1;
    const scale = Math.max(minScale, Math.min(maxScale, distance / 150));
    noBtn.style.transform = `scale(${scale})`;

    /* Almost clicked tease */
    if (distance < 55 && !teaseCooldown) {
        showTease();
    }

    /* Escape movement */
    if (distance < 90) {
        moveButton();
    }

});

function moveButton() {

    const padding = 10;

    const maxX = container.clientWidth - noBtn.offsetWidth - padding;
    const maxY = container.clientHeight - noBtn.offsetHeight - padding;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
}

function showTease() {

    teaseCooldown = true;
    teaseMsg.style.opacity = "1";

    setTimeout(() => {
        teaseMsg.style.opacity = "0";
        teaseCooldown = false;
    }, 800);
}

yesBtn.addEventListener("click", () => {
    window.location.href = "consensus/index.html";
});