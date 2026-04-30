let berry = document.querySelector(".berry");
let plant13 = document.querySelector("#plant13");
let box = document.querySelector(".interactionBox");
let tree_area = document.querySelector(".tree_container");
let sun = document.querySelector(".sun");
let body = document.querySelector("body");
let river_area = document.querySelector(".river_container")
let river = document.querySelectorAll(".river");
let river_spans = document.querySelectorAll(".river span");
let drink = document.querySelector(".drink")
let water = document.querySelector(".water")
let drink_water = document.querySelector(".drink_water")
let createdDrink = false;
let fireStarted = false;
let mouseX = 0;
let mouseY = 0;


berry.addEventListener("click", function(){
    console.log("clicked");
    box.innerText = "picked berry";
    berry.remove();
})

drink_water.addEventListener("click", function(){
    create_interaction();
    drink_water.remove();
})

window.addEventListener("scroll", scrolled);

function scrolled() {
    if (fireStarted) {
        body.style.backgroundColor = "black";
        return;
    }
    let percentage = getScrollPercentage();
    console.log(percentage);

    let sunTargetX = 800;
    let sunTargetY = 400;
    let treeTargetX = -1500;
    let riverTargetX = -2000;

    let sunProgress = Math.min(percentage / 0.2, 1);

    sun.style.left = (sunTargetX * sunProgress) + "px";
    sun.style.top = (sunTargetY * sunProgress) + "px";
    sun.style.opacity = 1 - 0.8 * sunProgress;

    let lightness = 1 - percentage;
    let value = Math.round(255 * lightness);
    body.style.backgroundColor = `rgba(${value}, ${value}, ${value}, 1)`;

    let treeProgress = Math.min(percentage / 0.5, 1);
    tree_area.style.left = (treeTargetX * treeProgress) + "px";

    let riverProgress = Math.min(percentage / 0.8, 1);
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

    if (percentage >= 0.8 && !createdDrink) {
        createdDrink = true;
        create_drink()
        create_water()
    }
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
        body.innerText = ""
        body.style.backgroundColor = "black"
        let newimage = document.createElement("img")
        newimage.className = "fire"
        newimage.src = "images/fire-gif.gif"
        body.append(newimage)
        let messageBoard = document.createElement("div")
        messageBoard.className = "message_board"
        body.append(messageBoard)

        fireInteraction();

        startFireTimer();
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
    setTimeout(function(){
        body.innerText = ""

        let theme = document.createElement("img");
        theme.className = "theme_image";
        theme.src = "images/frankenstein_cover.jpg";
        body.append(theme);

        showTitle();

    }, 15000);
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