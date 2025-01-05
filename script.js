// Variabel permainan
let helicopterTop = 250;
let helicopterVelocity = 0;
let obstacleLeft = 400;
let obstacleHeight = 100;
let obstacleBottomHeight = 100;
let gravity = 0.3;
let thrust = -8;
let score = 0;
let gameInterval;
let isGameOver = false;
let obstacleSpeed = 5;

// Ambil elemen dengan jQuery
const $helicopter = $('.helicopter');
const $obstacle = $('.obstacle');
const $obstacleBottom = $('.obstacle-bottom');
const $scoreDisplay = $('.score');
const $restartBtn = $('#restartBtn');
const $startGameBtn = $('#startGameBtn');
const $backToDashboard = $('#backToDashboard');
const $gameScreen = $('#gameScreen');
const $dashboard = $('#dashboard');

// Fungsi untuk memulai permainan
function startGame() {
    resetGame();
    $gameScreen.removeClass('d-none');
    $dashboard.addClass('d-none');
    gameInterval = setInterval(gameLoop, 20);
}

// Fungsi utama permainan
function gameLoop() {
    if (!isGameOver) {
        applyGravity();
        moveHelicopter();
        moveObstacle();
        detectCollision();
        updateScore();
    }
}

// Fungsi untuk menerapkan gravitasi
function applyGravity() {
    helicopterVelocity += gravity;
    helicopterTop += helicopterVelocity;
}

// Fungsi untuk memindahkan helikopter
function moveHelicopter() {
    $helicopter.css('top', helicopterTop);

    if (helicopterTop > 480 || helicopterTop < 0) {
        endGame();
    }
}

// Fungsi untuk memindahkan rintangan
function moveObstacle() {
    obstacleLeft -= obstacleSpeed;

    if (obstacleLeft < -20) {
        obstacleLeft = 400;
        obstacleHeight = Math.random() * (300 - 150) + 50;
        obstacleBottomHeight = 500 - (obstacleHeight + 150);

        $obstacle.css('height', obstacleHeight);
        $obstacleBottom.css('height', obstacleBottomHeight);
        score++;
    }

    $obstacle.css('left', obstacleLeft);
    $obstacleBottom.css('left', obstacleLeft);
}

// Fungsi untuk mendeteksi tabrakan
function detectCollision() {
    const helicopterRect = $helicopter[0].getBoundingClientRect();
    const obstacleRect = $obstacle[0].getBoundingClientRect();
    const obstacleBottomRect = $obstacleBottom[0].getBoundingClientRect();

    if (
        (helicopterRect.left < obstacleRect.right &&
            helicopterRect.right > obstacleRect.left &&
            helicopterRect.top < obstacleRect.bottom) ||
        (helicopterRect.left < obstacleBottomRect.right &&
            helicopterRect.right > obstacleBottomRect.left &&
            helicopterRect.bottom > obstacleBottomRect.top)
    ) {
        endGame();
    }
}

// Fungsi untuk memperbarui skor
function updateScore() {
    $scoreDisplay.text(`Score: ${score}`);
}

// Fungsi untuk mengakhiri permainan
function endGame() {
    isGameOver = true;
    clearInterval(gameInterval);
    $restartBtn.removeClass('hidden');
    $scoreDisplay.text(`Game Over! Final Score: ${score}`);
}

// Fungsi untuk mereset permainan
function resetGame() {
    helicopterTop = 250;
    helicopterVelocity = 0;
    obstacleLeft = 400;
    score = 0;
    isGameOver = false;

    $helicopter.css('top', helicopterTop);
    $obstacle.css('left', obstacleLeft);
    $obstacleBottom.css('left', obstacleLeft);
    $scoreDisplay.text(`Score: ${score}`);
    $restartBtn.addClass('hidden');
}

// Event listener untuk tombol spasi dan enter
$(document).on('keydown', (e) => {
    if (e.key === ' ') {
        helicopterVelocity = thrust; // Dorong helikopter ke atas
    } else if (e.key === 'Enter' && isGameOver) {
        startGame(); // Restart game jika game over
    }
});

// Event listener untuk tombol start game
$startGameBtn.on('click', () => {
    startGame(); // Mulai permainan
});

// Event listener untuk tombol kembali ke dashboard
$backToDashboard.on('click', () => {
    $gameScreen.addClass('d-none');
    $dashboard.removeClass('d-none');
    clearInterval(gameInterval);
    resetGame(); // Reset permainan dan kembali ke menu utama
});

// Event listener untuk tombol restart
$restartBtn.on('click', () => {
    startGame(); // Mulai ulang permainan melalui tombol
});
