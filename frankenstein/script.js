let berry = document.querySelector(".berry");
let plant13 = document.querySelector("#plant13");
let box = document.querySelector(".interactionBox");
let tree_area = document.querySelector(".tree_container");
let sun = document.querySelector(".sun");
let moon = document.querySelector(".moon");
let scene_moon = document.querySelector(".scene_moon");
let body = document.querySelector("body");
let river_area = document.querySelector(".river_container");
let river = document.querySelectorAll(".river");
let river_spans = document.querySelectorAll(".river span");
let drink = document.querySelector(".drink");
let water = document.querySelector(".water");
let drink_water = document.querySelector(".drink_water");
let scene_fire = document.querySelector(".scene_fire");
let house_area = document.querySelector(".house_container");
let houses = document.querySelectorAll(".house");
let createdDrink = false;
let createdMoon = false;
let fireStarted = false;
let mouseX = 0;
let mouseY = 0;
let narrativeBoard = document.querySelector("#narrative_board");
let narratives = document.querySelectorAll(".narrative");
let currentNarrativeIndex = -1;

let createdFootsteps = false;
let footprintSvg;
let lastFootX = 0;
let lastFootY = 0;
let footCount = 0;

let FOOT_CONFIG = {
    distance: 120,        // smaller → more frequent steps
    size: 80,            // footprint size
    sideOffset: 25,      // left/right spacing (like walking)
    fadeDelay: 400,      // when fading starts (ms)
    lifetime: 1600,      // total lifetime before removal (ms)
    opacity: 1,        // max opacity
    scale: 0.8           // overall scale
};

berry.addEventListener("click", function(){
    console.log("clicked");
    box.innerText = "picked berry";
    berry.remove();
})

drink_water.addEventListener("click", function(){
    create_interaction();
    drink_water.remove();
})

house_area.addEventListener("click", function(){
    transition();
})

window.addEventListener("scroll", scrolled);

function transition() {
    houses.forEach(function(house){
        house.style.transition = "transform 1.5s ease-in-out"; 
        house.style.transform = "scale(15) translateX(50px)";
    });
    setTimeout(function(){
        window.location.href = "language.html"; 
    }, 3000); 
}

function scrolled() {
    let percentage = getScrollPercentage();
    updateNarratives();
    console.log(percentage);

    let sunTargetX = 900;
    let sunTargetY = 450;
    let treeTargetX = -1400;
    let riverTargetX = -2000;

    let sunProgress = Math.min(percentage / 0.1, 1);

    sun.style.left = (sunTargetX * sunProgress) + "px";
    sun.style.top = (sunTargetY * sunProgress) + "px";
    sun.style.opacity = 1 - 0.8 * sunProgress;

    let lightness = 1 - percentage;
    let value = Math.round(255 * lightness);
    if (fireStarted) {
        value = 0;
    }
    body.style.backgroundColor = `rgba(${value}, ${value}, ${value}, 1)`;
    
    let textValue = 255 - value;
    narratives.forEach(function(narrative) {
        narrative.style.color = `rgb(${textValue}, ${textValue}, ${textValue})`;
    });

    let treeProgress = Math.min(percentage / 0.2, 1);
    tree_area.style.left = (treeTargetX * treeProgress) + "px";

    let riverProgress = Math.min(percentage / 0.5, 1);
    river_area.style.left = (riverTargetX * riverProgress) + "px";
    tree_area.style.opacity = 1 - 0.6 * riverProgress;

    let cycles = 8;
    let phase = Math.floor(riverProgress * cycles * 2) % 2;

    river_spans.forEach((span, index) => {
        let isOdd = index % 2 === 0;
        let up = -80;
        let down = -30;
        if (phase === 0) {
            span.style.top = isOdd ? up + "px" : down + "px";
        } else {
            span.style.top = isOdd ? down + "px" : up + "px";
        }
    });

    if (percentage >= 0.5 && !createdDrink) {
        createdDrink = true;
        create_drink();
        create_water();
    }

    if (percentage >=0.83 && !createdMoon){
        createdMoon = true;
        newp = document.createElement("p");
        newp.innerText = "moon";
        newp.className = "moon";
        scene_moon.append(newp);
    }
    
    if (createdMoon) {
        let moon = document.querySelector(".moon")
        let moonTargetX = 900;
        let moonTargetY = -1000;
        let moonProgress = Math.min((percentage - 0.83) / 0.1, 1);
        moon.style.left = (moonTargetX * moonProgress) + "px";
        moon.style.top = (moonTargetY * moonProgress) + "px";
    }

    if (percentage >= 0.9 && !createdFootsteps) {
        createdFootsteps = true;
        createFootstepEffect();
    }

    let houseTargetX = -1600;
    let houseProgress = Math.min((percentage - 0.9) / 0.15, 1);
    house_area.style.left = (houseTargetX * houseProgress) + "px";
}

function updateNarratives() {
    narratives.forEach(function (narrative) {
        let rect = narrative.getBoundingClientRect();

        if (
            rect.top < window.innerHeight * 0.75 &&
            rect.bottom > window.innerHeight * 0.25
        ) {
            narrative.classList.add("show_narrative");
        } else {
            narrative.classList.remove("show_narrative");
        }
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

function create_drink() {
    newp = document.createElement("p")
    newp.className = "drink"
    drink_water.append(newp)
    span1 = document.createElement("span")
    span1.innerText = "d"
    span2 = document.createElement("span")
    span2.innerText = "i"
    span3 = document.createElement("span")
    span3.innerText = "n"
    span4 = document.createElement("span")
    span4.innerText = "k"
    newp.append(span1)
    newp.append(span2)
    newp.append(span3)
    newp.append(span4)
}

function create_water(){
    newp = document.createElement("p")
    newp.className = "water"
    drink_water.append(newp)
    span1 = document.createElement("span")
    span1.innerText = "w"
    span2 = document.createElement("span")
    span2.innerText = "a"
    span3 = document.createElement("span")
    span3.innerText = "t"
    span4 = document.createElement("span")
    span4.innerText = "e"
    newp.append(span1)
    newp.append(span2)
    newp.append(span3)
    newp.append(span4)
}

function create_interaction(){
    let newp = document.createElement("p");
    newp.className = "interactionBox2";
    newp.innerText = "feeling better - but cold";

    newp.addEventListener("click", function(){
        create_interaction_fire();
        newp.remove();
    });

    river_area.append(newp);
}


function create_interaction_fire() {
    let newp = document.createElement("p")
    newp.className = "interactionBox3"
    newp.innerText = "start a fire"
    river_area.append(newp);

    newp.addEventListener("click", function(){
        fireStarted = true;
        body.style.backgroundColor = "black";
        newp.remove()

        let newimage = document.createElement("img");
        newimage.className = "fire";
        newimage.src = "images/fire-gif.gif";
        scene_fire.append(newimage);

        let messageBoard = document.createElement("div");
        messageBoard.className = "message_board";
        body.append(messageBoard);

        fireInteraction();
    })
}

document.addEventListener("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
});


function fireInteraction() {
    let fire = document.querySelector(".fire");
    if (!fire) return;

    let rect = fire.getBoundingClientRect();
    let fireX = rect.left + rect.width * 0.5;
    let fireY = rect.top + rect.height * 0.72;

    let dx = mouseX - fireX;
    let dy = mouseY - fireY;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 120) {
        console.log("too hot");
        sayTooHot();
    } else if (distance < 250) {
        console.log("warm");
        sayWarm();
    }
}

setInterval(fireInteraction, 1000)

function addMessage(messagetext){
    let messageBoard = document.querySelector(".message_board")
    if (!messageBoard) return;
    let p = document.createElement("p");
    p.innerText = messagetext;
    p.style.color = "white"
    messageBoard.prepend(p);

    updateMessageOpacity();
}

function sayTooHot() {
    addMessage("Too hot! It hurts...!")
}
function sayWarm() {
    addMessage("So warm...")
}

function updateMessageOpacity() {
    let messages = document.querySelectorAll(".message_board p");

    messages.forEach(function(message, index) {
        message.style.opacity = 1 - index * 0.18;
    });
}

function startFireTimer() {
    setTimeout(function () {
        let messageBoard = document.querySelector(".message_board");
        if (messageBoard) {
            messageBoard.remove();
        }
    }, 5000);
}

function clear_out() {
    body.innerText = ""
    let theme = document.createElement("img");
    theme.className = "theme_image";
    theme.src = "images/frankenstein_cover.jpg";
    body.append(theme);

    showTitle();
}

function showTitle() {
    let title1 = document.createElement("p");
    title1.className = "title1";
    title1.innerText = "Awakening"
    body.append(title1);

    let title2 = document.createElement("p");
    title2.className = "title2";
    title2.innerHTML = '<a href="language.html">Naming the World</a>';
    body.append(title2);

    setTimeout(function () {
        title1.classList.add("hide");
        title2.classList.add("show");
    }, 5000);
}


function createFootstepEffect() {
    footprintSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    footprintSvg.classList.add("footprint_svg");
    footprintSvg.setAttribute("viewBox", `0 0 ${window.innerWidth} ${window.innerHeight}`);

    footprintSvg.innerHTML = `
        <defs>
            <path id="feet-shape"
                d="M41.5,30.2C36,24.6,4.7,26.1,7.7,49.4c.8,5.9,4,10.2,8,19.9,3,7.2-.1,15.7,5.8,20.8S43,91.6,38.6,75.9c-1.8-6.5-7.6-9.3-8.9-14.1C26.1,47.9,51.7,40.6,41.5,30.2Z M41.7,7.6c-2.6-.3-5.2,2.8-5.6,7s1.3,7.8,3.9,8.1,5.2-2.9,5.6-7.1S44.4,7.8,41.7,7.6Z M28.8,21.9c2.2.2,4.1-2.1,4.5-5.1s-1.1-5.7-3.2-6-4.1,2.1-4.5,5.1S26.7,21.6,28.8,21.9Z M20.1,23.3c1.6.1,3.1-1.8,3.4-4.4s-.8-4.7-2.4-4.9-3,1.8-3.3,4.3S18.5,23.1,20.1,23.3Z M14.9,25.5c1.4-.2,2.4-1.9,2.1-3.9s-1.6-3.4-3-3.3-2.4,2-2.2,3.9S13.4,25.7,14.9,25.5Z M10.9,29.2c1-.1,1.7-1.4,1.5-2.8s-1.1-2.5-2.2-2.4-1.7,1.4-1.6,2.8S9.8,29.3,10.9,29.2Z"/>

            <symbol id="feet-left" viewBox="0 0 100 100">
                <use href="#feet-shape"></use>
            </symbol>

            <symbol id="feet-right" viewBox="0 0 100 100">
                <g transform="scale(-1, 1) translate(-100, 0)">
                    <use href="#feet-shape"></use>
                </g>
            </symbol>
        </defs>
    `;

    body.append(footprintSvg);
    document.addEventListener("mousemove", createFootprint);
}

function createFootprint(e) {
    let dx = e.clientX - lastFootX;
    let dy = e.clientY - lastFootY;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < FOOT_CONFIG.distance) return;

    lastFootX = e.clientX;
    lastFootY = e.clientY;

    let foot = document.createElementNS("http://www.w3.org/2000/svg", "use");
    foot.classList.add("footprint");

    let isLeft = footCount % 2 === 0;

    foot.setAttribute("href", isLeft ? "#feet-left" : "#feet-right");
    foot.setAttribute("width", FOOT_CONFIG.size);
    foot.setAttribute("height", FOOT_CONFIG.size);

    let angle = Math.atan2(dx, dy);
    let rotation = (1 - angle / Math.PI) * 180;

    let sideOffset = isLeft
        ? -FOOT_CONFIG.sideOffset
        : FOOT_CONFIG.sideOffset;

    let offsetX = e.clientX - Math.sin(angle) * sideOffset;
    let offsetY = e.clientY - Math.cos(angle) * sideOffset;

    foot.setAttribute(
        "transform",
        `translate(${offsetX}, ${offsetY})
        rotate(${rotation})
        scale(${FOOT_CONFIG.scale})`
    );

    footprintSvg.appendChild(foot);

    // fade in
    setTimeout(() => {
        foot.style.opacity = FOOT_CONFIG.opacity;
    }, 10);

    // fade out
    setTimeout(() => {
        foot.style.opacity = 0;
    }, FOOT_CONFIG.fadeDelay);

    // remove
    setTimeout(() => {
        foot.remove();
    }, FOOT_CONFIG.lifetime);

    footCount++;
}