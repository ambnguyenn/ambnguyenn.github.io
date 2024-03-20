const rps = ["rock", "paper", "scissors"];
let player = "";
let comp = "";
let gameStatus = "";

const score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

updateScoreElement();

function computer() {
    const index = Math.floor(Math.random() * rps.length);
    comp = rps[index];
}

function compare(player, comp) {
    if (player == rps[0] && comp == rps[1]) {
        score.losses++;
        gameStatus = "lose"
    }
    else if (player == rps[1] && comp == rps[0]) {
        score.wins++;
        gameStatus = "win"
    }
    else if (player == rps[0] && comp == rps[2]) {
        score.wins++;
        gameStatus = "win"
    }
    else if (player == rps[2] && comp == rps[0]) {
        score.losses++;
        gameStatus = "lose";
    }
    else if (player == rps[1] && comp == rps[2]) {
        score.losses++;
        gameStatus = "lose";
    }
    else if (player == rps[2] && comp == rps[1]) {
        score.wins++;
        gameStatus = "win";
    } 
    else {
        score.ties++;
        gameStatus = "tie"
    }

    localStorage.setItem('score', JSON.stringify(score));

    displayGameResult();
    displayGameMoves();
    updateScoreElement();
}

function displayGameResult() {
    document.querySelector('.result').innerHTML = 
    `You ${gameStatus}.`;
}

function displayGameMoves() {
    document.querySelector('.moves').innerHTML = 
    `You
    <img src="images/${player}-emoji.png" class="move-icon"> 
    -
    <img src="images/${comp}-emoji.png" class="move-icon">
     Computer`;
}

function updateScoreElement() {
    document.querySelector('.score-board').innerText = 
    `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`
}

document.querySelector('.js-rock-button').addEventListener('click', rock);

function rock() {
    player = rps[0];
    computer();
    compare(player, comp);
}

document.querySelector('.js-paper-button').addEventListener('click', paper);

function paper() {
    player = rps[1];
    computer();
    compare(player, comp);
}

document.querySelector('.js-scissors-button').addEventListener('click', scissors);

function scissors() {
    player = rps[2];
    computer();
    compare(player, comp);
}

document.querySelector('.js-reset-button').addEventListener('click', reset);

function reset() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');

    updateScoreElement();
}

let isAutoPlaying = false;
let intervalId;

document.querySelector('.js-autoplay-button').addEventListener('click', autoPlay);

function autoPlay() {
    if (!isAutoPlaying) {
        intervalId = setInterval(() => {
            const playerIndex = Math.floor(Math.random() * rps.length);
            const randomPlayerMove = rps[playerIndex];
            player = randomPlayerMove
            computer();
            compare(player, comp)
        }, 1000)
        isAutoPlaying = true;
    } else {
        clearInterval(intervalId);
        isAutoPlaying = false;
    }
}

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        rock();
    } else if (event.key === 'p') {
        paper();
    } else if (event.key === 's') {
        scissors();
    }
});

    

