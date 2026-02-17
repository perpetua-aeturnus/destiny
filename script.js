const introText = document.getElementById("introText");
const storyText = document.getElementById("storyText");
const buttons = document.getElementById("buttons");
const introScreen = document.getElementById("introScreen");
const storyScreen = document.getElementById("storyScreen");
const continueBtn = document.getElementById("continueBtn");

const typeSound = document.getElementById("typeSound");
const clickSound = document.getElementById("clickSound");
const bgMusic = document.getElementById("bgMusic");

typeSound.volume = 0.15;
clickSound.volume = 0.6;
bgMusic.volume = 0.4;

let voices = [];

speechSynthesis.onvoiceschanged = () => {
    voices = speechSynthesis.getVoices();
};

function speak(text, rate = 0.85, pitch = 1) {
    let utter = new SpeechSynthesisUtterance(text);
    utter.rate = rate;
    utter.pitch = pitch;

    let femaleVoice = voices.find(v =>
        v.name.toLowerCase().includes("zira") ||
        v.name.toLowerCase().includes("samantha")
    );

    if (femaleVoice) utter.voice = femaleVoice;

    speechSynthesis.speak(utter);
}

function typeWriter(element, text, callback, speed = 80) {
    element.innerHTML = "";
    let i = 0;

    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            typeSound.currentTime = 0;
            typeSound.play();
            i++;
            setTimeout(typing, speed);
        } else {
            if (callback) callback();
        }
    }
    typing();
}

function typeLine(text, callback, speed = 50) {
    let line = document.createElement("div");
    storyText.appendChild(line);

    let i = 0;

    function typing() {
        if (i < text.length) {
            line.innerHTML += text.charAt(i);
            typeSound.currentTime = 0;
            typeSound.play();
            i++;
            setTimeout(typing, speed);
        } else {
            storyText.scrollTop = storyText.scrollHeight;
            if (callback) callback();
        }
    }
    typing();
}

function buttonClick(choice) {
    clickSound.play();
    buttons.classList.add("hidden");

    if (choice) {
        introScreen.classList.add("hidden");
        storyScreen.classList.remove("hidden");
        bgMusic.play();
        startStory();
    } else {
        typeWriter(introText, "ACCESS DENIED.");
    }
}

function startStory() {

    const lines = [
        "what you have entered is no simulation for fun",
        "It's a test",
        "A test no ordinary",
        "Test which will open gates",
        "gates of the world...",
        "The world that needs you",
        "the world that belongs to us , to me!",
        "",
        "",
        "There are 8.3 BILLION conscious beings living on this planet",
        "And you being here is NO coincidence",
        "It's your destiny",
        "you will always get to choose your destiny",
        "But Destiny has chosen you",
        "YOU ARE THE CHOSEN ONE"
    ];

    let delay = 0;

    lines.forEach((line, index) => {
        delay += 3500;

        setTimeout(() => {
            if (line === "") {
                storyText.appendChild(document.createElement("br"));
            } else {
                typeLine(line);

                if (line === "YOU ARE THE CHOSEN ONE") {
                    setTimeout(() => {
                        storyText.lastChild.classList.add("bold");
                        continueBtn.classList.remove("hidden");
                    }, 1000);
                }

                speak(line);
            }
        }, delay);
    });
}

window.onload = () => {
    typeWriter(introText, "WELCOME", () => {
        setTimeout(() => {
            typeWriter(introText, "Do you want to proceed?", () => {
                buttons.classList.remove("hidden");
            });
        }, 5000);
    }, 120);
};