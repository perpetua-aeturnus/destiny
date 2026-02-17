const video = document.getElementById("video");
const canvas = document.getElementById("freezeCanvas");
const frameImage = document.getElementById("frameImage");
const scanLine = document.getElementById("scanLine");
const scanText = document.getElementById("scanText");
const dynamicText = document.getElementById("dynamicText");
const continueBtn = document.getElementById("continueBtn");
const bgMusic = document.getElementById("bgMusic");

bgMusic.volume = 0.5;

const words = [
    "Magnanimous",
    "Illustrious",
    "Eminent",
    "Exemplary",
    "Formidable",
    "Preeminent",
    "Redoubtable",
    "Sublime",
    "Stellar",
    "Transcendent"
];

async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        video.srcObject = stream;
        bgMusic.play().catch(()=>{});

        setTimeout(() => {
            freezeFrame();
            scanLine.classList.add("verified");
            scanText.innerHTML = "VERIFIED";
            setTimeout(startSequence, 2000);
        }, 7000);

    } catch (err) {
        scanText.innerHTML = "Permission Denied";
    }
}

function freezeFrame() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    video.style.display = "none";
    canvas.style.display = "block";
}

function typeWriter(text, callback, speed = 60) {
    dynamicText.innerHTML = "";
    let i = 0;

    function typing() {
        if (i < text.length) {
            dynamicText.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        } else {
            if (callback) callback();
        }
    }
    typing();
}

function deleteText(callback) {
    let text = dynamicText.innerHTML;
    let i = text.length;

    function deleting() {
        if (i > 0) {
            dynamicText.innerHTML = text.substring(0, i - 1);
            i--;
            setTimeout(deleting, 40);
        } else {
            if (callback) callback();
        }
    }
    deleting();
}

function startSequence() {

    typeWriter("you have been selected of your rare unsurmountable qualities", () => {
        setTimeout(() => {
            deleteText(showImages);
        }, 2000);
    });
}

function showImages() {

    let index = 0;

    function nextImage() {
        if (index >= words.length) {
            continueBtn.classList.remove("hidden");
            return;
        }

        canvas.style.display = "none";
        frameImage.classList.remove("hidden");
        frameImage.src = `img${index + 1}.jpg`;

        typeWriter(words[index], () => {
            dynamicText.classList.add("bold");
            setTimeout(() => {
                dynamicText.classList.remove("bold");
                deleteText(() => {
                    index++;
                    nextImage();
                });
            }, 1500);
        });
    }

    nextImage();
}

startCamera();