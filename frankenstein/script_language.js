let page = document.getElementById("page");
let left_screen = document.querySelector(".peek_container");
let para1_p = document.querySelector("#para_p");
let stage_title = document.querySelector("#stage_title");
let para_section = document.querySelector(".para")
let book = document.querySelector(".book")
let single_page = document.querySelector(".single_page")
let instruction = document.querySelector(".instruction")

let stage = -1;
let noteIndex = 0;
let thoughtStream = document.getElementById("thought_stream");
let thoughtScroll = document.getElementById("thought_scroll");
let currentThoughtDay = 0;
let createdThoughtNotes = [];

let correctText =
    "OF Mans First Disobedience, and the Fruit Of that Forbidden Tree, whose mortal tast Brought Death into the World, and all our woe, With loss of Eden, till one greater Man Restore us, and regain the blissful Seat, [ 5 ] Sing Heav'nly Muse, that on the secret top Of Oreb, or of Sinai, didst inspire That Shepherd, who first taught the chosen Seed, In the Beginning how the Heav'ns and Earth Rose out of Chaos: Or if Sion Hill [ 10 ] Delight thee more, and Siloa's Brook that flow'd Fast by the Oracle of God; I thence Invoke thy aid to my adventrous Song, That with no middle flight intends to soar Above th' Aonian Mount, while it pursues [ 15 ]";

let wordData = [
    { text: "OF", grammar: "" },
    { text: "Mans", grammar: "subject" },
    { text: "First", grammar: "" },
    { text: "Disobedience,", grammar: "object" },
    { text: "and", grammar: "" },
    { text: "the", grammar: "" },
    { text: "Fruit", grammar: "object" },
    { text: "Of", grammar: "" },
    { text: "that", grammar: "" },
    { text: "Forbidden", grammar: "" },
    { text: "Tree,", grammar: "object" },

    { text: "whose", grammar: "" },
    { text: "mortal", grammar: "" },
    { text: "tast", grammar: "subject" },
    { text: "Brought", grammar: "verb" },
    { text: "Death", grammar: "object" },
    { text: "into", grammar: "" },
    { text: "the", grammar: "" },
    { text: "World,", grammar: "object" },

    { text: "and", grammar: "" },
    { text: "all", grammar: "" },
    { text: "our", grammar: "" },
    { text: "woe,", grammar: "object" },

    { text: "With", grammar: "" },
    { text: "loss", grammar: "object" },
    { text: "of", grammar: "" },
    { text: "Eden,", grammar: "object" },

    { text: "till", grammar: "" },
    { text: "one", grammar: "" },
    { text: "greater", grammar: "" },
    { text: "Man", grammar: "subject" },
    { text: "Restore", grammar: "verb" },
    { text: "us,", grammar: "object" },
    { text: "and", grammar: "" },
    { text: "regain", grammar: "predicate" },
    { text: "the", grammar: "" },
    { text: "blissful", grammar: "" },
    { text: "Seat,", grammar: "object" },

    { text: "Sing", grammar: "verb" },
    { text: "Heav'nly", grammar: "" },
    { text: "Muse,", grammar: "object" },

    { text: "that", grammar: "" },
    { text: "on", grammar: "" },
    { text: "the", grammar: "" },
    { text: "secret", grammar: "" },
    { text: "top", grammar: "object" },
    { text: "Of", grammar: "" },
    { text: "Oreb,", grammar: "object" },
    { text: "or", grammar: "" },
    { text: "of", grammar: "" },
    { text: "Sinai,", grammar: "object" },

    { text: "didst", grammar: "verb" },
    { text: "inspire", grammar: "predicate" },
    { text: "That", grammar: "" },
    { text: "Shepherd,", grammar: "object" },

    { text: "who", grammar: "subject" },
    { text: "first", grammar: "" },
    { text: "taught", grammar: "verb" },
    { text: "the", grammar: "" },
    { text: "chosen", grammar: "" },
    { text: "Seed,", grammar: "object" },

    { text: "In", grammar: "" },
    { text: "the", grammar: "" },
    { text: "Beginning", grammar: "object" },

    { text: "how", grammar: "" },
    { text: "the", grammar: "" },
    { text: "Heav'ns", grammar: "subject" },
    { text: "and", grammar: "" },
    { text: "Earth", grammar: "subject" },
    { text: "Rose", grammar: "verb" },
    { text: "out", grammar: "" },
    { text: "of", grammar: "" },
    { text: "Chaos:", grammar: "object" },

    { text: "Or", grammar: "" },
    { text: "if", grammar: "" },
    { text: "Sion", grammar: "" },
    { text: "Hill", grammar: "subject" },

    { text: "Delight", grammar: "verb" },
    { text: "thee", grammar: "object" },
    { text: "more,", grammar: "" },

    { text: "and", grammar: "" },
    { text: "Siloa's", grammar: "" },
    { text: "Brook", grammar: "subject" },
    { text: "that", grammar: "" },
    { text: "flow'd", grammar: "verb" },
    { text: "Fast", grammar: "" },

    { text: "by", grammar: "" },
    { text: "the", grammar: "" },
    { text: "Oracle", grammar: "object" },
    { text: "of", grammar: "" },
    { text: "God;", grammar: "object" },

    { text: "I", grammar: "subject" },
    { text: "thence", grammar: "" },
    { text: "Invoke", grammar: "verb" },
    { text: "thy", grammar: "" },
    { text: "aid", grammar: "object" },
    { text: "to", grammar: "" },
    { text: "my", grammar: "" },
    { text: "adventrous", grammar: "" },
    { text: "Song,", grammar: "object" },

    { text: "That", grammar: "" },
    { text: "with", grammar: "" },
    { text: "no", grammar: "" },
    { text: "middle", grammar: "" },
    { text: "flight", grammar: "subject" },
    { text: "intends", grammar: "verb" },
    { text: "to", grammar: "" },
    { text: "soar", grammar: "predicate" },

    { text: "Above", grammar: "" },
    { text: "th'", grammar: "" },
    { text: "Aonian", grammar: "" },
    { text: "Mount,", grammar: "object" },

    { text: "while", grammar: "" },
    { text: "it", grammar: "subject" },
    { text: "pursues", grammar: "verb" },

    { text: "[", grammar: "" },
    { text: "15", grammar: "" },
    { text: "]", grammar: "" }
];

let brokenWords = [
    { wrong: "OFM", correct: "OF" },
    { wrong: "ansF", correct: "Mans" },
    { wrong: "irstDis", correct: "First" },
    { wrong: "obedien,", correct: "Disobedience," },
    { wrong: "ceand", correct: "and" },
    { wrong: "theF", correct: "the" },
    { wrong: "ruit", correct: "Fruit" },
    { wrong: "Ofth", correct: "Of" },
    { wrong: "at", correct: "that" },
    { wrong: "bidFor", correct: "Forbidden" },
    { wrong: "denTr,", correct: "Tree," },

    { wrong: "eewho", correct: "whose" },
    { wrong: "semortalt", correct: "mortal" },
    { wrong: "astBr", correct: "tast" },
    { wrong: "oughtDea", correct: "Brought" },
    { wrong: "thi", correct: "Death" },
    { wrong: "ntot", correct: "into" },
    { wrong: "heW", correct: "the" },
    { wrong: "orld,", correct: "World," },

    { wrong: "an", correct: "and" },
    { wrong: "dallo", correct: "all" },
    { wrong: "urw", correct: "our" },
    { wrong: "oeWi,", correct: "woe," },

    { wrong: "thlo", correct: "With" },
    { wrong: "sso", correct: "loss" },
    { wrong: "fEd", correct: "of" },
    { wrong: "enti,", correct: "Eden," },

    { wrong: "llo", correct: "till" },
    { wrong: "ne", correct: "one" },
    { wrong: "grea", correct: "greater" },
    { wrong: "terMan", correct: "Man" },
    { wrong: "Res", correct: "Restore" },
    { wrong: "toreusandr,", correct: "us," },
    { wrong: "eg", correct: "and" },
    { wrong: "aint", correct: "regain" },
    { wrong: "he", correct: "the" },
    { wrong: "bliss", correct: "blissful" },
    { wrong: "fulSe,", correct: "Seat," },

    { wrong: "atSi", correct: "Sing" },
    { wrong: "ngHeav", correct: "Heav'nly" },
    { wrong: "'nlyMu", correct: "" },
    { wrong: "setha,", correct: "Muse," },
    { wrong: "to", correct: "that" },
    { wrong: "nt", correct: "on" },
    { wrong: "hesec", correct: "the" },
    { wrong: "rett", correct: "secret" },
    { wrong: "opO", correct: "top" },
    { wrong: "fOr", correct: "Of" },
    { wrong: "eb,", correct: "Oreb," },

    { wrong: "oro", correct: "or" },
    { wrong: "fS", correct: "of" },
    { wrong: "inai,", correct: "Sinai," },
    { wrong: "didstin", correct: "didst" },
    { wrong: "spireTh", correct: "inspire" },
    { wrong: "at", correct: "That" },
    { wrong: "Sheph,", correct: "Shepherd," },

    { wrong: "erdwhofir", correct: "who" },
    { wrong: "stta", correct: "first" },
    { wrong: "ught", correct: "taught" },
    { wrong: "thecho", correct: "the" },
    { wrong: "senSe,", correct: "chosen" },
    { wrong: "ed", correct: "Seed," },

    { wrong: "Int", correct: "In" },
    { wrong: "he", correct: "the" },
    { wrong: "Beginn", correct: "Beginning" },
    { wrong: "ingho", correct: "how" },
    { wrong: "wthe", correct: "the" },
    { wrong: "Heav", correct: "Heav'ns" },
    { wrong: "'nsand", correct: "and" },
    { wrong: "Ear", correct: "Earth" },
    { wrong: "thRoseou", correct: "Rose" },
    { wrong: "to", correct: "out" },
    { wrong: "fCh", correct: "of" },
    { wrong: "aos:", correct: "Chaos:" },

    { wrong: "O", correct: "Or" },
    { wrong: "rifSi", correct: "if" },
    { wrong: "onHi", correct: "Sion" },
    { wrong: "llDe", correct: "Hill" },

    { wrong: "light", correct: "Delight" },
    { wrong: "theemo,", correct: "thee" },
    { wrong: "rea", correct: "more," },

    { wrong: "nd", correct: "and" },
    { wrong: "Siloa'sBro", correct: "Siloa's" },
    { wrong: "ok", correct: "Brook" },
    { wrong: "th", correct: "that" },
    { wrong: "atflow", correct: "flow'd" },
    { wrong: "'dFa", correct: "Fast" },

    { wrong: "stb", correct: "by" },
    { wrong: "yth", correct: "the" },
    { wrong: "eOra", correct: "Oracle" },
    { wrong: "cleo", correct: "of" },
    { wrong: "fGo;", correct: "God;" },

    { wrong: "dIth", correct: "I" },
    { wrong: "enceInvo", correct: "thence" },
    { wrong: "ket", correct: "Invoke" },
    { wrong: "hya", correct: "thy" },
    { wrong: "id", correct: "aid" },
    { wrong: "tom", correct: "to" },
    { wrong: "yad", correct: "my" },
    { wrong: "ventro", correct: "adventrous" },
    { wrong: "usSong,", correct: "Song," },

    { wrong: "Thatwi", correct: "That" },
    { wrong: "thn", correct: "with" },
    { wrong: "om", correct: "no" },
    { wrong: "iddlefli", correct: "middle" },
    { wrong: "ghtin", correct: "flight" },
    { wrong: "tend", correct: "intends" },
    { wrong: "stoso", correct: "to" },
    { wrong: "ar", correct: "soar" },

    { wrong: "Abov'", correct: "Above" },
    { wrong: "ethA", correct: "th'" },
    { wrong: "onianMo", correct: "Aonian" },
    { wrong: "unt,", correct: "Mount," },

    { wrong: "whil", correct: "while" },
    { wrong: "eitp", correct: "it" },
    { wrong: "ursues", correct: "pursues" }
];

let meaningHighlights = [
    {
        text: "First Disobedience",
        type: "guilt"
    },
    {
        text: "Forbidden Tree",
        type: "temptation",
        img: "images/forbidden_tree.jpeg"
    },
    {
        text: "Brought Death into the World",
        type: "death"
    },
    {
        text: "all our woe",
        type: "sorrow"
    },
    {
        text: "loss of Eden",
        type: "loss"
    },
    {
        text: "one greater Man",
        type: "hope",
        img: "images/jesus.jpeg"
    },
    {
        text: "Restore us",
        type: "hope"
    },
    {
        text: "regain the blissful Seat",
        type: "paradise"
    },
    {
        text: "Sing Heav'nly Muse",
        type: "divine",
        sound: "sounds/choir_short.mp3",
        volume: 0.2,
        delay: 150
    },
    {
        text: "Rose out of Chaos",
        type: "creation"
    },
    {
        text: "Invoke thy aid",
        type: "prayer"
    },
    {
        text: "soar",
        type: "ambition"
    }
];

let notePositions = [
    { left: "5%", top: "10%" },
    { left: "30%", top: "12%" },
    { left: "8%", top: "70%" },
    { left: "28%", top: "75%" },
    { left: "2%", top: "65%" },
    { left: "35%", top: "40%" }
];

let thoughtDays = [
    {
        lines: [
            { speaker: "Agatha", text: "Father, you must eat something.", img: "images/agatha.png" },
            { speaker: "De Lacey", text: "My child... I am not hungry.", img: "images/delacey.png" },
            { speaker: "Felix", text: "Tomorrow will be better.", img: "images/felix.png" }
        ],
        note: "They give food to each other, even when they need it."
    },
    {
        lines: [
            { speaker: "Agatha", text: "It is cold again.", img: "images/agatha.png" },
            { speaker: "Felix", text: "I will gather wood.", img: "images/felix.png" },
            { speaker: "De Lacey", text: "Be careful.", img: "images/delacey.png" }
        ],
        note: "They take care of each other."
    },
    {
        lines: [
            { speaker: "Felix", text: "We were not always like this.", img: "images/felix.png" },
            { speaker: "Agatha", text: "Please... do not speak of it.", img: "images/agatha.png" },
            { speaker: "De Lacey", text: "The past is gone.", img: "images/delacey.png" }
        ],
        note: "They are sad about something that happened before."
    },
    {
        lines: [
            { speaker: "Agatha", text: "Shall I read?", img: "images/agatha.png" },
            { speaker: "De Lacey", text: "Your voice comforts me.", img: "images/delacey.png" },
            { speaker: "Felix", text: "Slowly.", img: "images/felix.png" }
        ],
        note: "I start to understand their words."
    },
    {
        lines: [
            { speaker: "Felix", text: "The wood is already cut.", img: "images/felix.png" },
            { speaker: "Agatha", text: "And the snow is cleared.", img: "images/agatha.png" },
            { speaker: "De Lacey", text: "A spirit helps us.", img: "images/delacey.png" }
        ],
        note: "I help them, but they do not know it is me."
    },
    {
        lines: [
            { speaker: "Felix", text: "I wish I could ease your pain.", img: "images/felix.png" },
            { speaker: "Agatha", text: "You already do.", img: "images/agatha.png" },
            { speaker: "De Lacey", text: "Love is enough.", img: "images/delacey.png" }
        ],
        note: "I want to be with them. I think they could accept me."
    }
];

function initThoughts(thoughtScroll, peephole) {

    let sectionHeight = 360;  

    thoughtDays.forEach(function(day) {
        let dayBox = document.createElement("div");
        dayBox.style.height = sectionHeight + "px";
        dayBox.style.padding = "20px";

        day.lines.forEach(function(line) {
            let bubble = document.createElement("div");
            bubble.className = "thought_bubble";

            let avatar = document.createElement("img");
            avatar.className = "bubble_avatar";
            avatar.src = line.img;

            let speech = document.createElement("span");
            speech.innerText = line.speaker + ": " + line.text;

            bubble.append(avatar);
            bubble.append(speech);
            dayBox.append(bubble);
        });

        thoughtScroll.append(dayBox);
    });

    let scrollProgress = 0;  
    let sensitivity = 0.0001; 

    let maxTranslate = sectionHeight * (thoughtDays.length - 1) + 200;

    peephole.addEventListener("wheel", function(e) {
        e.preventDefault();
        scrollProgress += e.deltaY * sensitivity;

        if (scrollProgress < 0) scrollProgress = 0;
        if (scrollProgress > 1) scrollProgress = 1;
        let currentDayIndex = Math.floor(scrollProgress * thoughtDays.length);

        let moveY = scrollProgress * maxTranslate;
        thoughtScroll.style.transform = `translateY(-${moveY}px)`;

        if (currentDayIndex >= thoughtDays.length) {
            currentDayIndex = thoughtDays.length - 1;
        }

        if (!createdThoughtNotes[currentDayIndex]) {
            createdThoughtNotes[currentDayIndex] = true;
            createOutsideNote(thoughtDays[currentDayIndex].note);
        }
    });
}

function createOutsideNote(text) {
    let note = document.createElement("p");
    note.className = "thought_note";
    note.innerText = text;

    if (noteIndex === 3) {
        note.style.fontSize = "20px";
    }
    if (noteIndex === 4) {
        note.style.fontSize = "25px";
    }
    if (noteIndex === 5) {
        note.style.fontSize = "30px";
    }

    let pos = notePositions[noteIndex % 6];

    note.style.left = pos.left;
    note.style.top = pos.top;
    noteIndex++;
    left_screen.append(note);
}

function clearPage() {
    para1_p.innerHTML = "";
}

function stageCover() {
    clearPage();

    let cover = document.createElement("img");
    cover.className = "book_cover";
    cover.src = "images/book_cover.png";

    cover.addEventListener("click", function () {
        stageLetters();
    });

    para1_p.appendChild(cover);
}

function stageLetters() {
    clearPage();
    stage_title.innerText = "Book 1";

    let letters = correctText.split("");

    letters.forEach(function (letter) {
        let span = document.createElement("span");
        span.className = "letter";

        if (letter === " ") {
            span.innerHTML = "&nbsp;";
        } else {
            span.innerText = letter;
        }

        let randomX = Math.random() * 80 - 40;
        let randomY = Math.random() * 80 - 40;
        span.style.transform = `translate(${randomX}px, ${randomY}px)`;

        para1_p.appendChild(span);
    });

    let hasHovered = false;
    let canHover = false;

    // prevent hover from triggering immediately after clicking the cover
    setTimeout(function () {
        canHover = true;
    }, 30);

    para_section.addEventListener("mouseenter", function () {
        if (!canHover) return;
        if (hasHovered) return;

        hasHovered = true;

        let allLetters = document.querySelectorAll(".letter");

        allLetters.forEach(function(letter) {
            let randomDelay = Math.random() * 2000;

            // let randomX = Math.random() * 300 - 150;
            // let randomY = Math.random() * 200 - 100;

            // letter.style.setProperty("--startX", `${randomX}px`);
            // letter.style.setProperty("--startY", `${randomY}px`);

            setTimeout(function() {
                letter.style.animation = "flyIn 2s ease forwards";
            }, randomDelay);
        });
    });
}

function stageWords() {
    clearPage();

    let words = correctText.split(" ");

    words.forEach(function (word) {
        let span = document.createElement("span");
        span.className = "word";
        span.innerText = word;
        span.style.filter = "blur(20px)";

        para1_p.appendChild(span);
    });

    let allWords = document.querySelectorAll(".word");
    allWords.forEach(function (word) {
        word.addEventListener("mouseover", function () {
            this.style.filter = "blur(0px)";
        });
    });
}

function stageGrammar() {
    clearPage();

    wordData.forEach(function(item) {
        let span = document.createElement("span");
        span.className = "word";
        span.innerText = item.text + " ";

        span.addEventListener("mouseover", function () {
            if (item.grammar !== "") {
                span.classList.add(item.grammar);
            }
        });

        para1_p.appendChild(span);
    });

    let legend = document.createElement("div");
    legend.className = "grammar_legend";

    legend.innerHTML = `
        <p><span class="subject">subject</span></p>
        <p><span class="verb">verb</span></p>
        <p><span class="object">object</span></p>
        <p><span class="predicate">predicate</span></p>
    `;

    para1_p.appendChild(document.createElement("br"));
    para1_p.appendChild(legend);
}

function stageMeaning() {
    clearPage();

    let html = correctText;

    // build spans with data-index
    meaningHighlights.forEach(function(item, index) {
        let spanHTML;

        if (item.img) {
            spanHTML = `
                <span class="emotion ${item.type} has-image" data-index="${index}">
                    ${item.text}
                    <img src="${item.img}" class="hover-image">
                </span>
            `;
        } else {
            spanHTML = `
                <span class="emotion ${item.type}" data-index="${index}">
                    ${item.text}
                </span>
            `;
        }

        html = html.replace(item.text, spanHTML);
    });

    para1_p.innerHTML = html;

    // attach sound
    meaningHighlights.forEach(function(item, index) {
        if (!item.sound) return;

        let span = para1_p.querySelector(`[data-index="${index}"]`);
        if (!span) return;

        let audio = new Audio(item.sound);
        audio.loop = false;
        audio.volume = item.volume || 0.2;

        let timer;

        span.addEventListener("mouseenter", function() {
            timer = setTimeout(function() {
                audio.currentTime = 0;
                audio.play();
            }, item.delay || 100);
        });

        span.addEventListener("mouseleave", function() {
            clearTimeout(timer);
            audio.pause();
            audio.currentTime = 0;
        });
    });
}

function flipToStage(nextStageFunction) {
    single_page.classList.add("page_flip");
    instruction.classList.add("page_flip");

    setTimeout(function () {
        nextStageFunction();
    }, 400);

    setTimeout(function () {
        single_page.classList.remove("page_flip");
        instruction.classList.remove("page_flip");
    }, 800);
}

function updateStage() {
    setTimeout(function () {
        if (stage == -1) {
            stageCover();
        } else if (stage === 0) {
            flipToStage(stageLetters);
        } else if (stage === 1) {
            flipToStage(stageWords);
        } else if (stage === 2) {
            flipToStage(stageGrammar);
        } else if (stage == 3)  {
            flipToStage(stageMeaning);
        } else if (stage === 4) {
            flipToStage(stageQuestion);
        }
    }, 400);
}

page.addEventListener("click", function () {
    stage++;

    if (stage > 4) {
        stage = 4;
    }

    updateStage();
});

setTimeout(function () {
    let peephole = document.createElement("div");
    peephole.className = "peephole";

    let thoughtScroll = document.createElement("div");
    thoughtScroll.className = "thought_scroll";

    peephole.append(thoughtScroll);
    left_screen.append(peephole);

    initThoughts(thoughtScroll, peephole);
}, 3000);


stageCover();
