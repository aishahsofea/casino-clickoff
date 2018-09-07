let sec = 60;
let score = 0;
let exit = false;
const boing = new Audio("https://s3.amazonaws.com/ask-soundlibrary/cartoon/amzn_sfx_boing_short_1x_01.mp3");
let images = $(".memory-card"); //images is the list of div with a class of "memory-card"
let classList = [];

for (let i = 0; i < images.length; i++) {
    classList.push(images[i].classList[0]); //push the first class of each div to classList array
}

const generateRandomItem = _ => {
    randNum = Math.floor(Math.random()*32);
    randomItem = classList[randNum];
    randomItem = randomItem;
    return $(".instruction").html(`ITEM: <br> <b>${randomItem.replace("-", " ").toUpperCase()}</b>`);
}

(function random() {
    generateRandomItem()
    setInterval(function() {
        // pick random card to apply the animation every 200ms
        randPos = Math.floor(Math.random()*32);
        let currentElement = $(`#card-${randPos}`);
        currentElement.css("animation", "fade 5s linear alternate-reverse");
        currentElement.css("cursor", "pointer");
        setTimeout(function() {
            currentElement.css("animation", "");
            currentElement.css("cursor", "")
        }, 5000)
    }, 200)
})();

// shuffle the cards position
const cards = document.querySelectorAll(".memory-card");
function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random()*32);
        card.style.order = randomPos;
    })
};

// if the opacity of the current target is more than 0.3, the user will be able to click
// on the image and make it disappear.
// if user clicks on the right image, score incremented by 10.
// otherwise, decremented by 10.
// if the right image is clicked when the timer < 10s, timer is increased by 10.
// after clicking on the image, new random item is generated, annd the position is again shuffled

$(".memory-card").on("click", function(event) {
    let currentTarget = $(`#${event.currentTarget.id}`);
    if (currentTarget.css("opacity") > 0.3) {
        let clickedItem = event.currentTarget.classList[0];
        console.log(randomItem, clickedItem)
        if (randomItem == clickedItem) {
            score += 10;
            sec <= 10 ? sec += 10 : sec
        } else {
            score -= 10;
        }
        generateRandomItem();
        $(event.target).css("animation", "shake 1s cubic-bezier(.36,.07,.19,.97) both");
        setTimeout(function() {
            boing.play();
            $(event.target).css("animation", "");
            currentTarget.css("animation", "zoomOut 1s");
        }, 1000)
        setTimeout(function() {
            shuffle();
        }, 1500)
    }
})

const timer = _ => {
    $(".timer").html(`Timer: ${sec} s`);
    $(".score").html(`Score: ${score}`)
    sec--;
    sec < 10 ? $(".timer").css("color", "red") : $(".timer").css("color", "black");
    if (sec < 0 || score >= 100) {
        sec = 0;
        gameOver();
    }

    $(".exit").on("click", _ => {
        exit = true;
    })
}

let myTimer = setInterval(timer, 1000);

const gameOver = _ => {
    let pageMarkup = "";
    pageMarkup = `<div class="result">
                    <h1 class="won-or-lose"></h1>
                    <h3>SCORE: ${score}</h3>
                    <br>
                    <div>
                        <button class="new-game"><a href="index.html">NEW GAME</a></button>
                        <button class="exit">EXIT</button>
                    </div>
                </div>`;

    $("body").css("background", `url("images/game-over-bg.jpg") no-repeat center center / cover fixed`);
    $(".page").css("justify-content", "center");
    $(".page").html(pageMarkup);
    $("nav").html("");
    if (exit) {
        clearInterval(myTimer);
        $("body").html(`<div class="goodbye">GOODBYE</div>`);
        $("body").css("background", `url("images/goodbye-door.jpeg") no-repeat center center / cover fixed`);
    }
    finalScore();
}

const finalScore = _ => {
    score >= 100 ? $(".won-or-lose").html("YOU WON !") : $(".won-or-lose").html("YOU LOST !");
}

