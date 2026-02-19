const terminal = document.getElementById("terminal");
const progressFill = document.getElementById("progressFill");
const percentage = document.getElementById("percentage");
const continueBtn = document.getElementById("continueBtn");
const mainCursor = document.getElementById("mainCursor");

const typeSoundSrc = "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3";
const deleteSoundSrc = "https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3";

/* =======================
   SOUND OPTIMIZATION
======================= */

// Preload sounds
const preloadType = new Audio(typeSoundSrc);
const preloadDelete = new Audio(deleteSoundSrc);
preloadType.preload = "auto";
preloadDelete.preload = "auto";

// Instant playback using clone
function playTypeSound() {
    const sound = new Audio(typeSoundSrc);
    sound.volume = 0.15;
    sound.play();
}

function playDeleteSound() {
    const sound = new Audio(deleteSoundSrc);
    sound.volume = 0.15;
    sound.play();
}

/* =======================
   UTILITIES
======================= */

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeText(text, speed = 45, className = "") {
    const line = document.createElement("div");
    if (className) line.classList.add(className);
    terminal.insertBefore(line, mainCursor);

    for (let char of text) {
        line.textContent += char;
        playTypeSound();
        terminal.scrollTop = terminal.scrollHeight;
        await sleep(speed);
    }
    return line;
}

async function deleteText(line, speed = 25) {
    while (line.textContent.length > 0) {
        line.textContent = line.textContent.slice(0, -1);
        playDeleteSound();
        await sleep(speed);
    }
}

function addGap(lines = 1) {
    for (let i = 0; i < lines; i++) {
        const gap = document.createElement("div");
        gap.innerHTML = "&nbsp;";
        terminal.insertBefore(gap, mainCursor);
    }
}

/* =======================
   PROGRESS SYSTEM
======================= */

function startProgress(totalDuration) {

    let startTime = Date.now();
    let buttonShown = false;

    function update() {

        let elapsed = Date.now() - startTime;
        let percent = (elapsed / totalDuration) * 100;

        // Smooth slow-down effect after 85%
        if (percent > 85) {
            percent = 85 + (percent - 85) * 0.6;
        }

        percent = Math.min(percent, 100);

        progressFill.style.height = percent + "%";
        percentage.textContent = Math.floor(percent) + "%";

        // Show continue button early (~92%)
        if (percent >= 92 && !buttonShown) {
            continueBtn.style.display = "block";
            buttonShown = true;
        }

        if (percent < 100) {
            requestAnimationFrame(update);
        }
    }

    update();
}

/* =======================
   MAIN SEQUENCE
======================= */

async function runSequence() {

    const TOTAL_DURATION = 92000;  // Added extra buffer time
    startProgress(TOTAL_DURATION);

    await sleep(1000);

    let hello = await typeText("Hello");
    await sleep(5000);
    await deleteText(hello);

    let warn = await typeText("Move your hands away from the keypad");
    await sleep(3000);
    await deleteText(warn);

    await typeText("Collecting info....");
    await sleep(2000);

    await typeText("Name : ");
    await sleep(3000);
    await typeText("Malaika Butt");

    await typeText("Gender : ");
    await sleep(1000);
    let gender = await typeText("female ");
    await sleep(3000);
    await deleteText(gender);
    await typeText("angel", 70, "cursive");

    await typeText("Location : ");
    await sleep(3000);
    await typeText("University Rd, Sargodha, 40100, Pakistan");

    await typeText("Coordinates : ");
    await sleep(3000);
    await typeText("N 32° 4' 9.39\", E 72° 41' 5.9136\"");

    addGap(2);

    await typeText("gathering physical attributes..");
    await sleep(2000);

    await typeText("color : ");
    await sleep(1000);
    await typeText("fair");
    await sleep(2000);
    await typeText("face : ");
    await sleep(5000);
    await typeText("angel", 70, "cursive");
    await sleep(2000);

    await typeText("accessing more data...");
    await sleep(5000);
    await typeText("Cakes - 2 - H.U.G.E ");
    await sleep(2000);
    await typeText("Boobies - 2 - H.U.G.E");

    addGap(2);

    await typeText("accessing mental attributes");
    await sleep(7000);
    await typeText("--error--");

    addGap(2);

    await typeText("data acquisition successfully completed.. wait");

    // Ensure progress ends at 100 smoothly
    progressFill.style.height = "100%";
    percentage.textContent = "100%";
}

runSequence();
