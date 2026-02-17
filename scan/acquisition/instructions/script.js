const instructionArea = document.getElementById("instructionArea");
const continueBtn = document.getElementById("continueBtn");

const typeSound = document.getElementById("typeSound");
const clickSound = document.getElementById("clickSound");

typeSound.volume = 0.8;   // strong typing
clickSound.volume = 1.0;  // max click

let audioUnlocked = false;

/* Unlock audio on first interaction */
document.addEventListener("click", () => {
    audioUnlocked = true;
}, { once: true });

const instructions = [
"you have entered the question phase",
"make sure you are though with the rules",
"you will be tested on few questions",
"each question is meant to assess your ability and your ideas",
"this questions will be processed for further evaluation",
"questions dont expect right answers",
"the left answers answers can be right too",
"dont get frustrated mid test",
"qutting is not an option",
"you get to choose you destiny"
];

let currentLine = 0;

/* Play type sound per character */
function playTypeSound() {
    if (!audioUnlocked) return;

    typeSound.currentTime = 0;
    typeSound.play().catch(()=>{});
}

/* Type single line */
function typeLine(text, callback, speed = 45) {

    let line = document.createElement("div");
    instructionArea.appendChild(line);

    let i = 0;

    function typing() {
        if (i < text.length) {

            line.innerHTML += text.charAt(i);

            if (text.charAt(i) !== " ") {
                playTypeSound();
            }

            i++;
            setTimeout(typing, speed);

        } else {
            callback();
        }
    }

    typing();
}

/* Sequential typing */
function typeNextLine() {

    if (currentLine < instructions.length) {

        typeLine(instructions[currentLine], () => {
            currentLine++;
            typeNextLine();
        });

    } else {
        continueBtn.classList.remove("hidden");
    }
}

/* Continue button redirect */
continueBtn.addEventListener("click", () => {

    clickSound.play();

    setTimeout(() => {
        window.location.href = "question1.html";
    }, 200);

});

/* Start typing */
window.onload = typeNextLine;