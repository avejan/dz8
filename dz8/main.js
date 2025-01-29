const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image();
const foodImg = new Image();
// ground.onload = function() {
//     console.log('Ground image loaded');
// };
//
// foodImg.onload = function() {
//     console.log('Food image loaded');
// };
//
// ground.onerror = function() {
//     console.log('Error loading ground image');
// };
//
// foodImg.onerror = function() {
//     console.log('Error loading food image');
// };

ground.src = "./img/ground.png";
foodImg.src = "./img/food.png";

let box = 32;
let score = 0;

let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box,
};

let snake = [];

snake[0] = {
    x: 9 * box,
    y: 10 * box,
};

let dir;
let gameInterval;

function direction(e) {
    if (e.keyCode === 37 && dir !== "right") dir = "left";
    else if (e.keyCode === 38 && dir !== "down") dir = "up";
    else if (e.keyCode === 39 && dir !== "left") dir = "right";
    else if (e.keyCode === 40 && dir !== "up") dir = "down";
}

document.addEventListener("keydown", direction);

function eatTail(head, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (head.x === arr[i].x && head.y === arr[i].y) {
            gameOver();
        }
    }
}

function gameOver() {
    clearInterval(gameInterval);
    document.getElementById("gameOverModal").style.display = "flex";
    document.getElementById("scoreDisplay").textContent = score;
}

// Restart the game when "New Game" button is clicked
document.getElementById("restartButton").addEventListener("click", function() {
    document.getElementById("gameOverModal").style.display = "none";
    restartGame();
});

function restartGame() {
    score = 0;
    snake = [{ x: 9 * box, y: 10 * box }];
    food = {
        x: Math.floor(Math.random() * 17 + 1) * box,
        y: Math.floor(Math.random() * 15 + 3) * box,
    };
    dir = undefined;
    gameInterval = setInterval(drawGame, 100);
}

function drawGame() {
    ctx.drawImage(ground, 0, 0);
    ctx.drawImage(foodImg, food.x, food.y);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "green" : "red";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "White";
    ctx.font = "50px Arial";
    ctx.fillText(score, box * 2.5, box * 1.7);

    let snakeY = snake[0].y;
    let snakeX = snake[0].x;

    if (snakeX === food.x && snakeY === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box,
        };
    } else snake.pop();

    if (
        snakeX < box ||
        snakeX > box * 17 ||
        snakeY < 3 * box ||
        snakeY > box * 17
    ) {
        gameOver();
    }

    if (dir === "left") snakeX -= box;
    if (dir === "right") snakeX += box;
    if (dir === "up") snakeY -= box;
    if (dir === "down") snakeY += box;

    let newHead = {
        x: snakeX,
        y: snakeY,
    };

    eatTail(newHead, snake);
    snake.unshift(newHead);
}

gameInterval = setInterval(drawGame, 100);
