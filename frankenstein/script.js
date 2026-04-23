let berry = document.querySelector(".berry");
let plant13 = document.querySelector("#plant13");
let box = document.querySelector(".interactionBox");
let tree_area = document.querySelector(".tree_container");
let sun = document.querySelector(".sun");
let body = document.querySelector("body");
let river_area = document.querySelector(".river_container")
let river_spans = document.querySelectorAll(".river span");

berry.addEventListener("click", popInteration)
function popInteration() {
    console.log("clicked");
    box.innerText = "picked berry";
    berry.remove();
}

window.addEventListener("scroll", scrolled);

function scrolled() {
    let percentage = getScrollPercentage();
    console.log(percentage);

    let sunTargetX = 800;
    let sunTargetY = 400;
    let treeTargetX = -1500;
    let riverTargetX = -2000;

    let sunProgress = Math.min(percentage / 0.2, 1);

    sun.style.left = (sunTargetX * sunProgress) + "px";
    sun.style.top = (sunTargetY * sunProgress) + "px";
    sun.style.opacity = 1 - sunProgress;
    let lightness = 1 - percentage;
    let value = Math.round(255 * lightness);
    body.style.backgroundColor = `rgba(${value}, ${value}, ${value}, 1)`;

    let treeProgress = Math.min(percentage / 0.5, 1);
    tree_area.style.left = (treeTargetX * treeProgress) + "px";

    let riverProgress = Math.min(percentage / 0.8, 1);
    river_area.style.left = (riverTargetX * riverProgress) + "px";

    let wave = Math.sin(riverProgress * Math.PI * 2 * 4);

    river_spans.forEach((span, index) => {
        const baseTop = index % 2 === 0 ? -80 : -20;  
        const amplitude = 30;
        span.style.top = (baseTop + wave * amplitude) + "px";
    });


}

function getScrollPercentage() {
    let scrolledAlready = window.scrollY;
    let pageHeight = document.body.scrollHeight;
    let windowHeight = window.innerHeight;
    let possibleScrollSpace = pageHeight - windowHeight;
    let percentage = (scrolledAlready / possibleScrollSpace);
    return percentage;
}