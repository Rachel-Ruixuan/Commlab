let h1 = document.querySelector("#h1");
let h2 = document.querySelector("#h2");
let m1 = document.querySelector("#m1");
let m2 = document.querySelector("#m2");
let s1 = document.querySelector("#s1");
let s2 = document.querySelector("#s2");

let reelWidth = 60;

let startButton = document.querySelector(".clock");
let started = false;

let tickSound = document.querySelector("#tickSound");
let trainSound = document.querySelector("#trainSound");

function playTickSound() {
    tickSound.currentTime = 0;
    tickSound.play();
}

function playTrainSound() {
    trainSound.currentTime = 0;
    trainSound.volume = 0.5;
    trainSound.loop = true;
    trainSound.play();
}

function buildStrip(strip) {
    let i = 0;
    for (i = 0; i < 10; i = i + 1) {
        let div = document.createElement("div");
        div.className = "digit";
        div.innerText = i;
        strip.appendChild(div);
    }
}

buildStrip(h1);
buildStrip(h2);
buildStrip(m1);
buildStrip(m2);
buildStrip(s1);
buildStrip(s2);

let digits = document.querySelectorAll(".digit");

function updateClock() {
    let now = new Date();

    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();

    let hourText = String(hour).padStart(2, "0");
    let minuteText = String(minute).padStart(2, "0");
    let secondText = String(second).padStart(2, "0");

    let hour1 = hourText[0];
    let hour2 = hourText[1];
    let minute1 = minuteText[0];
    let minute2 = minuteText[1];
    let second1 = secondText[0];
    let second2 = secondText[1];

    h1.style.transform = "translateX(-" + (hour1 * reelWidth) + "px)";
    h2.style.transform = "translateX(-" + (hour2 * reelWidth) + "px)";
    m1.style.transform = "translateX(-" + (minute1 * reelWidth) + "px)";
    m2.style.transform = "translateX(-" + (minute2 * reelWidth) + "px)";
    s1.style.transform = "translateX(-" + (second1 * reelWidth) + "px)";
    s2.style.transform = "translateX(-" + (second2 * reelWidth) + "px)";

    playTickSound();
}

startButton.onclick = function () {
    if (started == false) {
        console.log("clock started");

        startButton.classList.add("start");

        let i = 0;
        for (i = 0; i < digits.length; i = i + 1) {
            digits[i].classList.add("start");
        }

        updateClock();
        setInterval(updateClock, 1000);
        playTrainSound();

        started = true;
    }
};