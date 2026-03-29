let container = document.querySelector(".score_container")
let button = document.querySelector("#control_btn")
let words = document.querySelectorAll(".position")
let greyLayer = document.querySelector(".grey_layer")
let whiteLayer = document.querySelector(".white_layer")


function stage_one() {
    console.log("I'm here")
    words.forEach(turn2stage1)
    create_scores({values: [881, 1002, 2005, 1010, 985, 763, 890, 680, 753, 1993]})
    button.innerText = "Are you sure...?"
    button.onclick = stage_two
}

function turn2stage1(element) {
    element.classList.add("stage_one")
}

// ai helped me here
function create_scores({ values }) {
    container.innerText = ""
    values.forEach(value => {
        let score = document.createElement("p")
        score.innerText = value
        score.classList.add("score")
        container.appendChild(score)
    });
}

function stage_two() {
    words.forEach(turn2stage2)
    // I do remember Mimi is in the house.
    // I might remember where Mimi is.

    words[1].innerText = "might"
    words[3].innerText = "where" 
    words[4].innerText = "Mimi"   
    words[5].innerText = "is"
    words[6].innerText = ""
    words[7].innerText = ""
    
    update_scores({values: [601, 540, 205, 120, 540, 363, 280, 350, 353, 393],
                   duration: 1200})
    button.innerText = "I don't think so. "
    button.onclick = stage_three
}

function turn2stage2(element) {
    element.classList.add("stage_two")
}


function update_scores({ values, duration = 1000 }) {
    let scores = document.querySelectorAll(".score");
    scores.forEach((score, index) => {
        let startValue = parseInt(score.innerText, 10);
        let endValue = values[index];

        animate_number(score, startValue, endValue, duration);
        // score.classList.add("stage_two_animation")
    });
}

// ai helped me here: but I think the idea is to start a timer and decrement the value before the timer is up
function animate_number(element, start, end, duration) {
    let steps = 30;
    let stepTime = duration / steps;
    let currentStep = 0;

    let timer = setInterval(() => {
        currentStep++;

        let progress = currentStep / steps;
        let currentValue = Math.round(start + (end - start) * progress);

        element.innerText = currentValue;

        if (currentStep >= steps) {
            element.innerText = end;
            clearInterval(timer);
        }
    }, stepTime);
}


function stage_three() {
    words.forEach(turn2stage3)
    // I might remember where Mimi is.
    // Do I remember where Mimi is?

    words[0].innerText = "Do"
    words[1].innerText = "I" 
    words[8].innerText = "?" 

    
    update_scores({values: [10, 14, 25, 12, 54, 33, 18, 35, 53, 33],
                   duration: 1200})
    let button = document.querySelector("#control_btn")
    button.innerText = "Do I remember?"
    button.onclick = stage_four
}

function turn2stage3(element) {
    element.classList.add("stage_three")
}

function stage_four() {
    words.forEach(turn2stage4)
    // Do I remember where Mimi is?
    // I might not remember Mimi where

    words[0].innerText = "I"
    words[1].innerText = "might not" 
    words[3].innerText = "" 
    words[5].innerText = "where" 

    
    update_scores({values: [1.8, 2.12, 0.03, 1.34, 0.54, .33, 1.18, .35, .53, .33],
                   duration: 1200})

    create_random_scores({ count: 100, layer: whiteLayer });
    create_random_scores({ count: 100, layer: greyLayer });  
    
    let button = document.querySelector("#control_btn")
    button.innerText = "Mimi...? Mimi..?"
    button.onclick = add_more
}

function turn2stage4(element) {
    element.classList.add("stage_four")
}

function create_random_scores({count, layer}) {
    container.remove()
    for (let i = 0; i < count; i++) {
        let score = document.createElement("p");
        score.innerText = (Math.random() * 4).toFixed(2);

        score.classList.add("score", "chaos");

        // random position
        score.style.left = (Math.random() * 2 - 1) * 100 + "%";
        score.style.top = (Math.random() * 2 - 1) * 100 + "%";

        // random size
        score.style.fontSize = (30 + Math.random() * 30) + "px";

        // random animation
        score.style.animationDuration = (1 + Math.random() * 2) + "s";
        score.style.animationDelay = Math.random() * 2 + "s";

        layer.appendChild(score);
    }
}

function add_more() {
    create_random_scores({ count: 100, layer: whiteLayer });
    create_random_scores({ count: 100, layer: greyLayer }); 
}