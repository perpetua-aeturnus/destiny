const totalImages = 24;
const images = [];

for (let i = 1; i <= totalImages; i++) {
    images.push(`img${i}.png`);
}

const texts = [
"Yeh wala chalega ? dont press no💕",
"yeh gulab pyara hai na? 😏",
"hai toohh .. will you? 💗",
"le bhi loo..",
"What about few more ?🤗",
"I kneel my love to you.. 🌙",
"vaise pyare toh haii..",
"ab bhi nahi..?sari baat manunga 📸",
"thoda sa late hogaya..",
"maan bhi jaaoo 🫶",
"ab bhi nahi.. ",
"abse pareshaan nahi karunga ",
"yeh wale phool ka kya khayal? ",
"pakkaa promise..💞",
"pakka wala pkaaa 😭",
"aahmm.. :)",
"ahhmm ahhhmmm ",
"ahmm ahmmm aaahmmm ;* 💓",
"pleasseee 😭",
"🥺",
"She loves me , she loves me not😳 ",
"May be she doesnt love me💔",
"may be she loves mee... 💝",
"so... maan hi gai? 💍🪢"
];

let currentIndex = 0;
let noFade = 1;
let yesPressed = false;

const imageFrame = document.getElementById("imageFrame");
const textDisplay = document.getElementById("textDisplay");
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const music = document.getElementById("bgMusic");

textDisplay.innerText = texts[0];

/* Smooth fade transition */
imageFrame.style.transition = "opacity 0.8s ease-in-out";

document.addEventListener("click", () => {
    music.play();
}, { once: true });

/* NO BUTTON LOGIC */

noBtn.addEventListener("click", () => {

    if (currentIndex < totalImages - 1 && !yesPressed) {

        currentIndex++;

        imageFrame.src = images[currentIndex];
        textDisplay.innerText = texts[currentIndex];

        noFade -= 1 / (totalImages - 1);
        noBtn.style.opacity = noFade;

        if (currentIndex >= totalImages - 1) {
            noBtn.style.display = "none";
        }
    }
});

/* YES BUTTON LOGIC */

yesBtn.addEventListener("click", () => {

    yesPressed = true;
    textDisplay.innerText = "I knew it 💖✨";

    let interval = setInterval(() => {

        currentIndex++;

        if (currentIndex < images.length) {

            imageFrame.style.opacity = 0;

            setTimeout(() => {
                imageFrame.src = images[currentIndex];
                imageFrame.style.opacity = 1;
            }, 400);

        } else {
            clearInterval(interval);
            launchFinalHeart();
        }

    }, 2000); // 2 seconds per image
});


/* FINAL HEART */

function launchFinalHeart() {

    const heart = document.createElement("div");
    heart.classList.add("final-heart");
    heart.innerHTML = "💖";
    document.body.appendChild(heart);

    setTimeout(() => {
        burstHeart(heart);
    }, 2000);
}

function burstHeart(heart) {

    const rect = heart.getBoundingClientRect();
    heart.remove();

    for (let i = 0; i < 20; i++) {

        const piece = document.createElement("div");
        piece.classList.add("piece");
        piece.innerHTML = "💗";

        piece.style.left = rect.left + "px";
        piece.style.top = rect.top + "px";

        piece.style.setProperty('--x', (Math.random() * 400 - 200) + "px");
        piece.style.setProperty('--y', (Math.random() * 400 - 200) + "px");

        document.body.appendChild(piece);

        setTimeout(() => piece.remove(), 1200);
    }
}

/* Background floating hearts */

function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "💗";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 20 + 15 + "px";
    heart.style.animationDuration = (Math.random() * 3 + 3) + "s";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 6000);
}

setInterval(createHeart, 300);
