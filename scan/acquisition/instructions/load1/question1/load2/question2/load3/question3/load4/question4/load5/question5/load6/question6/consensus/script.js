const instructionArea = document.getElementById("instructionArea");
const continueBtn = document.getElementById("continueBtn");

const typeSound = document.getElementById("typeSound");
const clickSound = document.getElementById("clickSound");
const bgMusic = document.getElementById("bgMusic");

typeSound.volume = 0.8;
clickSound.volume = 1.0;
bgMusic.volume = 0.3;

let audioUnlocked = false;

document.addEventListener("click", () => {
    audioUnlocked = true;
    bgMusic.play().catch(()=>{});
}, { once: true });

const typingSpeed = 70;
const linePause = 600;

/* Gradual size control */
let baseFontSize = 18;
const fontIncreaseStep = 1.5;
const maxFontSize = 30;

const instructions = [

{ text: "So over thorough evaluation ...", color: "#00ff41" },
{ text: "we have come to a consensus that....", color: "#00ff41" },
{ text: "You have a boyfriend...", color: "#00ff41" },
{ text: "A one with unpleasing looks...", color: "#ffd000" },
{ text: "Apparently an ill-witt", color: "#00bfff" },
{ text: "And not even surapssing your desires", color: "#ff0033" },
{ text: "An apethtic emotional burden ", color: "#a020f0" },
{ text: " ONE WHO DOESNT LOVE", color: "#ff2d8d" },

{ gap: true },
{ gap: true },

{ text: "There is no need of a man who doesnt provide ...!!", color: "#00ff41" },
{ text: "Such a filth of a man who doesnt remember...!!", color: "#00ff41" },
{ text: "One who doesnt wish ur demands , your dates , your moods", color: "#00ff41" },
{ text: "A man who can't be eslaven cant be lovedd..!!!!", color: "#00ff41" },
{ text: "Such a dissapointment doesnt deserve an Angel", color: "#00ff41", angel: true },

{ gap: true },
{ gap: true },

{ text: "But we got you ....", color: "#00ff41", strong: true },
{ text: "The destiny has chosen you for something else", color: "#00ff41", strong: true }

];

let currentLine = 0;

function playTypeSound() {
    if (!audioUnlocked) return;
    typeSound.currentTime = 0;
    typeSound.play().catch(()=>{});
}

function typeLine(obj, callback) {

    if (obj.gap) {
        let gapLine = document.createElement("div");
        gapLine.innerHTML = "&nbsp;";
        instructionArea.appendChild(gapLine);
        setTimeout(callback, linePause);
        return;
    }

    let line = document.createElement("div");
    line.classList.add("line");
    line.style.color = obj.color;

    /* Gradually increase font size */
    line.style.fontSize = baseFontSize + "px";
    baseFontSize = Math.min(baseFontSize + fontIncreaseStep, maxFontSize);

    instructionArea.appendChild(line);

    let text = obj.text;
    let i = 0;

    function typing() {

        if (i < text.length) {

            line.innerHTML += text.charAt(i);

            if (text.charAt(i) !== " ") {
                playTypeSound();
            }

            i++;
            setTimeout(typing, typingSpeed);

        } else {

            if (obj.angel) {
                line.innerHTML = line.innerHTML.replace(
                    "Angel",
                    '<span class="cursive">Angel</span>'
                );
            }

            /* Strong glow for final paragraph */
            if (obj.strong) {
                line.classList.add("glow-strong");
            }

            setTimeout(callback, linePause);
        }
    }

    typing();
}

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

continueBtn.addEventListener("click", () => {
    clickSound.play();
    setTimeout(() => {
        window.location.href = "valen/index.html";
    }, 200);
});


window.onload = typeNextLine;

