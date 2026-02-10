let score = 0;
let timeLeft = 15;
let timer = null;
let running = false;

const thun = document.getElementById("thun");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const highScoreEl = document.getElementById("highScore");
const feedBtn = document.getElementById("feedBtn");
const popup = document.getElementById("popup");
const popupText = document.getElementById("popupText");

// load high score
let highScore = localStorage.getItem("thunHighScore") || 0;
highScoreEl.textContent = highScore;

feedBtn.addEventListener("click", () => {
    if (!running) startGame();
    if (timeLeft <= 0) return;

    score++;
    scoreEl.textContent = score;

    // Thun opens
    thun.src = "thunopen.jpg";
    setTimeout(() => {
        thun.src = "thunclose.jpg";
    }, 200);
});

function startGame() {
    running = true;
    timer = setInterval(() => {
        timeLeft--;
        timeEl.textContent = timeLeft;

        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(timer);
    feedBtn.disabled = true;

    let message = `Time's up! Score: ${score}`;

    if (score > highScore) {
        highScore = score;
        localStorage.setItem("thunHighScore", highScore);
        highScoreEl.textContent = highScore;
        message = `🏆 NEW HIGH SCORE: ${score}!`;
    }

    popupText.textContent = message;
    popup.classList.remove("hidden");
}

function restartGame() {
    popup.classList.add("hidden");
    score = 0;
    timeLeft = 15;
    running = false;

    scoreEl.textContent = 0;
    timeEl.textContent = 15;
    feedBtn.disabled = false;
}


