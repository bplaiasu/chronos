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

function createEnemy(type) {
    let enemy = {
        type: type,
        x: canvas.width,
        y: Math.random() * (canvas.height - 50),
        width: 50,
        height: 50,
        speed: type === 'fast' ? 6 : 3,
        color: type === 'fast' ? 'blue' : type === 'strong' ? 'green' : 'red',
        hp: type === 'strong' ? 3 : 1
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

    // Check for collisions
    checkCollisions();

    // Level up logic
    if (enemiesDefeated >= 10) {
        level += 1;
        enemiesDefeated = 0;
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
                score += 10; // Increase score
                enemiesDefeated += 1; // Increase enemies defeated counter
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
