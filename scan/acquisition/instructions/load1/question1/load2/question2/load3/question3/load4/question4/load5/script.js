const slideshowImage = document.getElementById("slideshowImage");
const imageBox = document.getElementById("imageBox");
const loadingText = document.getElementById("loadingText");
const continueBtn = document.getElementById("continueBtn");
const clickSound = document.getElementById("clickSound");

clickSound.volume = 1.0;

/* Adjustable total loading duration */
const playDuration = 6000;  // change this as needed

/* Slideshow images */
const images = [
    "img1.jpg",
    "img2.jpg",
    "img3.jpg",
    "img4.jpg",
    "img5.jpg",
    "img6.jpg"
];

let currentIndex = 0;

/* Change image every 400ms */
const slideshowInterval = setInterval(() => {

    currentIndex = (currentIndex + 1) % images.length;
    slideshowImage.src = images[currentIndex];

}, 400);

/* Stop slideshow after duration */
setTimeout(() => {

    clearInterval(slideshowInterval);

    imageBox.style.display = "none";
    loadingText.style.display = "none";

    document.querySelector(".loading-circle").style.animation = "none";

    continueBtn.classList.remove("hidden");

}, playDuration);

/* Continue redirect */
continueBtn.addEventListener("click", () => {

    clickSound.play();

    setTimeout(() => {
        window.location.href = "question5/index.html";
    }, 200);

});