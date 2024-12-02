const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player = {
    x: 100,
    y: canvas.height / 2,
    width: 50,
    height: 50,
    speed: 5
};

let enemies = [];
let score = 0; // Initialize score
let level = 1; // Initialize level
let enemiesDefeated = 0; // Initialize enemies defeated counter

// Scores for each enemy type
const enemyScores = {
    'regular': 10,
    'fast': 15,
    'strong': 20,
    'stealthy': 25,
    'boss': 50
};

// Load sound files
const collisionSound = document.getElementById('collisionSound');
const levelUpSound = document.getElementById('levelUpSound');

function createEnemy(type) {
    let enemy = {
        type: type,
        x: canvas.width,
        y: Math.random() * (canvas.height - 50),
        width: type === 'boss' ? 80 : 50,
        height: type === 'boss' ? 80 : 50,
        speed: type === 'fast' ? 6 : type === 'stealthy' ? 2 : 3,
        color: type === 'fast' ? 'blue' : type === 'strong' ? 'green' : type === 'stealthy' ? 'purple' : type === 'boss' ? 'orange' : 'red',
        hp: type === 'strong' ? 3 : type === 'boss' ? 10 : 1
    };
    enemies.push(enemy);
}

function update() {
    // Move player
    if (keys['ArrowUp']) player.y -= player.speed;
    if (keys['ArrowDown']) player.y += player.speed;
    if (keys['ArrowLeft']) player.x -= player.speed;
    if (keys['ArrowRight']) player.x += player.speed;

    // Update enemies
    enemies.forEach((enemy, index) => {
        enemy.x -= enemy.speed;
        if (enemy.x + enemy.width < 0) {
            enemies.splice(index, 1);
        }
    });

    // Create new enemies based on level
    if (Math.random() < 0.01 * level) createEnemy('regular');
    if (Math.random() < 0.005 * level) createEnemy('fast');
    if (Math.random() < 0.003 * level) createEnemy('strong');
    if (Math.random() < 0.002 * level) createEnemy('stealthy');
    if (Math.random() < 0.001 * level) createEnemy('boss');

    // Check for collisions
    checkCollisions();

    // Level up logic
    if (enemiesDefeated >= 10) {
        level += 1;
        enemiesDefeated = 0;
        levelUpSound.play(); // Play level up sound
        console.log(`Level up! Welcome to level ${level}`);
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player
    ctx.fillStyle = 'white';
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Draw enemies
    enemies.forEach(enemy => {
        ctx.fillStyle = enemy.color;
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    });

    // Draw score
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 30);

    // Draw level
    ctx.fillText(`Level: ${level}`, 10, 60);
}

function checkCollisions() {
    enemies.forEach((enemy, index) => {
        if (player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y) {
            // Collision detected with player
            console.log('Collision detected!');
            enemy.hp -= 1;
            if (enemy.hp <= 0) {
                enemies.splice(index, 1); // Remove enemy if its health drops to zero
                score += enemyScores[enemy.type]; // Increase score based on enemy type
                enemiesDefeated += 1; // Increase enemies defeated counter
                collisionSound.play(); // Play collision sound
            }
            // Here you can also decrease player's life or end game
        }
    });
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Handle keyboard input
let keys = {};
window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});
window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Start game loop
gameLoop();
